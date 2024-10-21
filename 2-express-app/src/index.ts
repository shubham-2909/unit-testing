import express from 'express'
import { z } from 'zod'
export const app = express()
app.use(express.json())

const sumInput = z.object({
  a: z.number(),
  b: z.number(),
})
app.post('/sum', function (req, res) {
  const a = req.body.a
  const b = req.body.b
  const ans = a + b
  res.status(200).json({ ans })
})

app.post('/strictSum', async (req, res) => {
  const { success, data } = sumInput.safeParse(req.body)
  if (!success) {
    res.status(400).json({ message: 'Incorrect Inputs' })
    return
  }
  const ans = data.a + data.b
  res.status(200).json({ ans })
})

app.get('/sumHeaders', async (req, res) => {
  const parsedResponse = sumInput.safeParse({
    a: Number(req.headers['a']),
    b: Number(req.headers['b']),
  })

  if (!parsedResponse.success) {
    res.status(411).json({
      message: 'Incorrect inputs',
    })
    return
  }
  const ans = parsedResponse.data.a + parsedResponse.data.b
  res.status(200).json({ ans })
})
