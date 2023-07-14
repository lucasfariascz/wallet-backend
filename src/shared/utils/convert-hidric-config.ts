export function convertCoductivityToSalinity(coductivity: number): number {
  if (coductivity !== 0) {
    const result = 0.4665 * Math.pow(coductivity / 1000, 1.0878)
    return result
  }
  return coductivity
}

export function convertCoductivityToDissolvedSolids(coductivity: number): number {
  if (coductivity !== 0) {
    const result = 0.5 * coductivity
    return result
  }
  return coductivity
}
