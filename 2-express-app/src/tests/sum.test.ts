import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '..'
describe('POST /sum', () => {
  it('should be able to add 2 positive numbers', async () => {
    const resp = await request(app).post('/sum').send({
      a: 2,
      b: 4,
    })
    expect(resp.statusCode).toBe(200)
    expect(resp.body.ans).toBe(6)
  })
  it('should able to add a positive and a negative', async () => {
    const resp = await request(app).post('/sum').send({
      a: 3,
      b: -5,
    })

    expect(resp.statusCode).toBe(200)
    expect(resp.body.ans).toBe(-2)
  })

  it('should be able to add 2 negative numbers', async () => {
    const resp = await request(app).post('/sum').send({
      a: -4,
      b: -5,
    })
    expect(resp.statusCode).toBe(200)
    expect(resp.body.ans).toBe(-9)
  })
  it('should return the sum of two zero number', async () => {
    const res = await request(app).post('/sum').send({
      a: 0,
      b: 0,
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.ans).toBe(0)
  })
})

describe('POST: /strictSum', () => {
  it('should return error for invalid input types', async () => {
    const resp = await request(app)
      .post('/strictSum')
      .send({ a: ['2322'], b: 4 })
    expect(resp.statusCode).toBe(400)
  })

  it('should be able to add 2 positive numbers', async () => {
    const resp = await request(app).post('/sum').send({
      a: 2,
      b: 4,
    })
    expect(resp.statusCode).toBe(200)
    expect(resp.body.ans).toBe(6)
  })
  it('should able to add a positive and a negative', async () => {
    const resp = await request(app).post('/sum').send({
      a: 3,
      b: -5,
    })

    expect(resp.statusCode).toBe(200)
    expect(resp.body.ans).toBe(-2)
  })

  it('should be able to add 2 negative numbers', async () => {
    const resp = await request(app).post('/sum').send({
      a: -4,
      b: -5,
    })
    expect(resp.statusCode).toBe(200)
    expect(resp.body.ans).toBe(-9)
  })
  it('should return the sum of two zero number', async () => {
    const res = await request(app).post('/sum').send({
      a: 0,
      b: 0,
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.ans).toBe(0)
  })
})

describe('GET: /sumHeaders', () => {
  it('should get a sum just checking', async () => {
    const resp = await request(app).get('/sumHeaders').set({
      a: '1',
      b: '2',
    })

    expect(resp.statusCode).toBe(200)
    expect(resp.body.ans).toBe(3)
  })
  it('should return 411 if no inputs are provided', async () => {
    const res = await request(app).get('/sumHeaders').send()
    expect(res.statusCode).toBe(411)
  })
})
