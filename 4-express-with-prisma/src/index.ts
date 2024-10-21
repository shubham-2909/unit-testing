import express from 'express'
import { z } from 'zod'
import db from './db'

export const app = express()
app.use(express.json())

const inputSchema = z.object({
  a: z.number(),
  b: z.number(),
})

app.post('/sum', async (req, res) => {
  const parsedResponse = inputSchema.safeParse(req.body)

  if (!parsedResponse.success) {
    res.status(411).json({
      message: 'Incorrect inputs',
    })
    return
  }

  const answer = parsedResponse.data.a + parsedResponse.data.b

  const result = await db.result.create({
    data: {
      a: parsedResponse.data.a,
      b: parsedResponse.data.b,
      answer: answer,
      type: 'Sum',
    },
  })

  res.status(200).json({
    answer,
    id: result.id,
  })
})

app.post('/multiply', async (req, res) => {
  const parsedResponse = inputSchema.safeParse(req.body)
  if (!parsedResponse.success) {
    res.status(411).json({ message: 'Incorrect inputs' })
    return
  }
  const answer = parsedResponse.data.a * parsedResponse.data.b
  await db.result.create({
    data: {
      a: parsedResponse.data.a,
      b: parsedResponse.data.b,
      answer,
      type: 'Multiply',
    },
  })
  res.status(200).json({ answer })
})
