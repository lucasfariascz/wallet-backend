/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOperation } from '@/services/log/log-object'
import { LogServiceImpl } from '@/services/log/log-service.impl'
import { hideSensitiveInfo } from '@/services/log/log-utils'

export class IgnoreArgsOptions {
  ignoreArgsIndexes: number[]
}

export function TraceLogs(options?: IgnoreArgsOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // keep a reference to the original function
    const originalValue = descriptor.value
    const logs = new LogServiceImpl()
    // Replace the original function with a wrapper

    descriptor.value = function (...args: any[]) {
      let ignoreArgs: number[]
      if (options?.ignoreArgsIndexes.length) {
        ignoreArgs = options?.ignoreArgsIndexes
      }
      const operation: LogOperation = {
        class: target.constructor.name,
        method: propertyKey,
        args: hideSensitiveInfo(args, ignoreArgs)
      }

      logs.info(operation)
      // Call the original function
      let result = originalValue.apply(this, args)
      if (result && result.then) {
        result = result
          .then((promiseResult) => {
            operation.async = true
            operation.result = promiseResult?.toString()
            logs.info(operation)
            return Promise.resolve(promiseResult)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      } else {
        operation.async = false
        operation.result = result?.toString()
        logs.info(operation)
      }
      return result
    }
  }
}
