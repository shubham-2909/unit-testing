import { describe, expect, vi, it } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import db from '../__mocks__/db'
vi.mock('../db')
describe('POST /sum', () => {
  it('should return the sum of two numbers', async () => {
    db.result.create.mockResolvedValue({
      id: 1,
      a: 2,
      b: 3,
      answer: 5,
      type: 'Sum',
    })
    vi.spyOn(db.result, 'create')
    const res = await request(app).post('/sum').send({
      a: 1,
      b: 2,
    })
    expect(db.result.create).toHaveBeenCalledWith({
      data: {
        a: 1,
        b: 2,
        type: 'Sum',
        answer: 3,
      },
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.answer).toBe(3)
    expect(res.body.id).toBe(1)
  })

  it('should return 411 if no inputs are provided', async () => {
    const res = await request(app).post('/sum').send({})
    expect(res.statusCode).toBe(411)
    expect(res.body.message).toBe('Incorrect inputs')
  })
})
