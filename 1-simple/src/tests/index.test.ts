import { describe, expect, it, test } from '@jest/globals'
import { multiply, sum } from '../index'
describe('sum module', () => {
  it('should calculate args 2,1', () => {
    expect(sum(2, 1)).toBe(3)
  })
  // more it for another case
})

describe('multipley function', () => {
  test('should work for 2 and 5', () => {
    expect(multiply(2, 5)).toBe(10)
  })
})
