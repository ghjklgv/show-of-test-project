import { IService } from '../iService'
// import { IWebServiceListener } from '../serviceEngine/iWebServiceListener'
import { InvokeService } from '../InvokeService/invokeService'

export default class ApiPromiseCaller extends InvokeService implements IService {
  method: string
  invokeUrlArray: any
  requestData: any
  constructor (
    method: string,
    invokeUrl: string,
    requestData: any,
    parameter?: string,
    additionInvoke?: any
    // l?: IWebServiceListener
  ) {
    super(invokeUrl, requestData, parameter, additionInvoke)
    this.method = method
    this.invokeUrlArray = invokeUrl.split('/')
    this.requestData = requestData
    this.invokeUrl = super.getInvokeInterfaceUrl()
    this.invokeData = super.getInvokeInterfaceData(this.invokeUrl)
    this.timeoutMs = 15000
  }

  getContentType () {
    return 'application/json'
  }

  getMethod () {
    return this.method
  }

  getHeaders () {
    // test@liferay.com:test
    // const headers = { Authorization: 'Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0' }
    // britz.wang@kooppi.com:britz
    const headers = { Authorization: 'Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0' }
    return headers
  }

  getRequestData () {
    return this.requestData
  }

  getRequestBody () {
    return this.invokeData
  }

  getRpcUrlMethod () {
    return `/${this.invokeUrlArray[1]}`
  }

  getRpcMethod () {
    return this.invokeUrlArray[2]
  }
}
