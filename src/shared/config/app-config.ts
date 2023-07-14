const defaultPort = 3000
export const port = (): number => {
  const value = Number(process.env.PORT)
  return isNaN(value) ? defaultPort : value
}
