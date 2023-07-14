export function toFixedNumber(value: number, fixed: number): number {
  if (!value) {
    return 0.0
  }
  const num = value.toFixed(fixed)

  return Number(num)
}
