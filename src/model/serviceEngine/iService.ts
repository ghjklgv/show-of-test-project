export interface IService {
  hostUrl: string
  invokeUrl: string
  invokeData: any
  token: string
  timeoutMs: number
  getContentType: () => string
  getMethod: () => any
  getHeaders: () => any
  getRequestData: () => any
  getRequestBody: () => any
  getRpcUrlMethod: () => string
  getRpcMethod: () => string
}
