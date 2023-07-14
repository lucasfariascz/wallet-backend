import safeJsonStringify from 'safe-json-stringify'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const hideSensitiveInfo = (args: any, ignoreArgs?: any[]): string => {
  if ((args[0] && (args[0].password || args[0].apiKey)) || ignoreArgs) {
    const sensitiveArgs = JSON.parse(safeJsonStringify(args))
    if (args[0].password) {
      sensitiveArgs[0].password = '****'
    }
    if (args[0].apiKey) {
      sensitiveArgs[0].apiKey = '****'
    }
    if (ignoreArgs) {
      ignoreArgs.forEach((element) => {
        sensitiveArgs[element] = ''
      })
    }

    return JSON.stringify(sensitiveArgs)
  }
  return safeJsonStringify(args)
}
