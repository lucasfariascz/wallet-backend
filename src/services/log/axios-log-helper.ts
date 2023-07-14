/* eslint-disable @typescript-eslint/no-explicit-any */
import safeJsonStringify from 'safe-json-stringify'
import { LogOperation } from './log-object'
import { LogServiceImpl } from './log-service.impl'

const axiosClass = 'axios'
const axiosGet = 'get'
const axiosPost = 'post'
const axiosPut = 'put'
const axiosDelete = 'delete'
const logService = new LogServiceImpl()

const getOperationObject = (endpoint: string, axiosMethod: string, args: any): LogOperation => {
  return {
    class: axiosClass,
    endpoint: endpoint,
    method: axiosMethod,
    args: safeJsonStringify(args)
  }
}

export const logAxiosGetOperation = (endpoint: string, response?: any) => {
  logAxiosOperation(axiosGet, endpoint, [], response)
}

export const logAxiosPostOperation = (endpoint: string, data: any, response?: any) => {
  logAxiosOperation(axiosPost, endpoint, data, response)
}

export const logAxiosPutOperation = (endpoint: string, data: any, response?: any) => {
  logAxiosOperation(axiosPut, endpoint, data, response)
}

export const logAxiosDeleteOperation = (endpoint: string) => {
  logAxiosOperation(axiosDelete, endpoint, [])
}

export const logAxiosOperation = (method: string, endpoint: string, data: any, response?: any) => {
  const operation = getOperationObject(endpoint, method, data)
  if (response) {
    operation.result = safeJsonStringify({
      status: response.status,
      headers: response.headers,
      data: response.data
    })
    operation.async = true
  }
  logService.info(operation)
}
