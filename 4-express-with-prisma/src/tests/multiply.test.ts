import { describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import { app } from '..'

vi.mock('../db')
describe('POST: /multiply', () => {
  it('Should give error for wrong type of inputs', async () => {
    const resp = await request(app).post('/multiply').send({
      a: '23',
      b: 12,
    })
    expect(resp.statusCode).toBe(411)
  })

  it('Should work for two numbers', async () => {
    const resp = await request(app).post('/multiply').send({
      a: 10,
      b: -5,
    })
    expect(resp.statusCode).toBe(200)
    expect(resp.body.answer).toBe(-50)
  })
})
