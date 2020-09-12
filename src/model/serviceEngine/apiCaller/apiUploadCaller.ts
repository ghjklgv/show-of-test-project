import { IService } from '../iService'
// import { IWebServiceListener } from '../iWebServiceListener'
import { InvokeService } from '../InvokeService/invokeService'

export default class ApiUploadCaller extends InvokeService implements IService {
  method: string
  invokeUrlArray: any
  requestData: any
  constructor (
    invokeUrl: string,
    requestData: any,
    parameter?: string,
    additionInvoke?: any
    // l?: IWebServiceListener
  ) {
    super(invokeUrl, requestData, parameter, additionInvoke)
    this.method = 'post'
    this.invokeUrlArray = invokeUrl.split('/')
    this.requestData = requestData
    this.hostUrl = invokeUrl
    this.timeoutMs = 15000
  }

  getContentType () {
    return 'multipart/form-data'
  }

  getMethod () {
    return this.method
  }

  getHeaders () {
    const headers = { Authorization: 'Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0' }
    return headers
  }

  getRequestData () {
    return this.requestData
  }

  getRequestBody () {
    const formData = new FormData()
    formData.append('file', this.requestData)
    formData.append('fileName', this.requestData.name)
    return formData
  }

  getRpcUrlMethod () {
    return `/${this.invokeUrlArray[1]}`
  }

  getRpcMethod () {
    return this.invokeUrlArray[2]
  }
}
