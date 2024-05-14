import { experimental_AssistantResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/auth'
import { getChatsFromOpenAIAssistant } from '@/actions/openai-assitant.actions'
// import { nanoid } from '@/lib/utils'

const { ASSISTANT_ID, OPENAI_API_KEY } = process.env
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY || ''
})

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  const {
    // @ts-ignore
    user: { id: userId }
  } = await auth()
  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  // Parse the request body
  const input: any = await req.json()

  const { id } = input

  let threadId = input.threadId

  // b1: kiểm tra xem đã có chat trong DB chưa
  const chat = await getChatsFromOpenAIAssistant(id, userId)
  //b2: ?

  if (chat.id) {
    if (!threadId) threadId = chat.threadId
  } else {
    // Create a thread if needed
    threadId = input.threadId ?? (await openai.beta.threads.create({})).id

    // chỉ lưu và list nếu ko có treadId do làm chat list
    if (!chat.threadId) {
      const title = input.message.substring(0, 100)
      // const id = nanoid()
      const createdAt = Date.now()
      const path = `/assistant/travel/chat/${id}`

      // console.log('tạo :', input.threadId, id)
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        threadId: threadId,
        botType: 'openai-assistant',
        type: 'travel',
        messages: []
        // messages: [{ content: msg, role: 'user' }, ...messages]
      }
      await addChat(payload)
    } else {
      console.log('ko tạo đc threadId: ', input.threadId)
      const a = await openai.beta.threads.retrieve(threadId)
      console.log('a', a)
    }
  }

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message
  })

  return experimental_AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.createAndStream(threadId, {
        assistant_id:
          ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID is not set')
          })()
      })

      runStream.finalRun().then(runStreamRs => {
        const chargePointsBody = {
          // action: '+',
          value: runStreamRs?.usage?.total_tokens,
          user: userId,
          chat: chat.id || input.id,
          metadata: JSON.stringify({
            threadId,
            messageId: createdMessage.id,
            tokensUsage: runStreamRs?.usage,
            runResult: runStreamRs
          })
        }

        chargePoints(chargePointsBody)
      })

      // forward run status would stream message deltas
      await forwardStream(runStream)

      // const chargePointsBody = {
      //   // action: '+',
      //   value: runResult?.usage?.total_tokens,
      //   user: userId,
      //   chat: chat.id || input.id,
      //   metadata: JSON.stringify({
      //     threadId,
      //     messageId: createdMessage.id,
      //     tokensUsage: runResult?.usage,
      //     runResult
      //   })
      // }

      // await chargePoints(chargePointsBody)

      //('point-transaction/charge')

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      // while (
      //   runResult?.status === 'requires_action' &&
      //   runResult.required_action?.type === 'submit_tool_outputs'
      // ) {
      //   const tool_outputs =
      //     runResult.required_action.submit_tool_outputs.tool_calls.map(
      //       (toolCall: any) => {
      //         const parameters = JSON.parse(toolCall.function.arguments)

      //         switch (toolCall.function.name) {
      //           case 'getRoomTemperature': {
      //             const temperature =
      //               homeTemperatures[
      //                 parameters.room as keyof typeof homeTemperatures
      //               ]

      //             return {
      //               tool_call_id: toolCall.id,
      //               output: temperature.toString()
      //             }
      //           }

      //           case 'setRoomTemperature': {
      //             const oldTemperature =
      //               homeTemperatures[
      //                 parameters.room as keyof typeof homeTemperatures
      //               ]

      //             homeTemperatures[
      //               parameters.room as keyof typeof homeTemperatures
      //             ] = parameters.temperature

      //             sendDataMessage({
      //               role: 'data',
      //               data: {
      //                 oldTemperature,
      //                 newTemperature: parameters.temperature,
      //                 description: `Temperature in ${parameters.room} changed from ${oldTemperature} to ${parameters.temperature}`
      //               }
      //             })

      //             return {
      //               tool_call_id: toolCall.id,
      //               output: `temperature set successfully`
      //             }
      //           }

      //           default:
      //             throw new Error(
      //               `Unknown tool call function: ${toolCall.function.name}`
      //             )
      //         }
      //       }
      //     )

      //   runResult = await forwardStream(
      //     openai.beta.threads.runs.submitToolOutputsStream(
      //       threadId,
      //       runResult.id,
      //       { tool_outputs }
      //     )
      //   )
      // }
    }
  )
}

// HELPER FUNCTIONS
function addChat(payload: any) {
  return fetch(process.env.AI_CHAT_API_ENDPOINT + '/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

function chargePoints(payload: any) {
  // console.log('chargePoints > payload: ', payload)
  return fetch(process.env.AI_CHAT_API_ENDPOINT + '/point-transaction/charge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}
