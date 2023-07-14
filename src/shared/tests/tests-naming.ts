export function describeText (method): string {
  return `test #${method}`
}

export function testDescription (description: string, shouldReturn?: string): string {
  if (shouldReturn) {
    description += ` - should return ${shouldReturn}`
  }
  return `test ${description}`
}
