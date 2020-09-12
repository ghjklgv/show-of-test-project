export class InvokeService {
  hostUrl: string = ''
  invokeUrl: string = ''
  invokeData: any = {}
  token: string = ''
  timeoutMs: number = 1000
  parameter: string = 'undefined'
  additionInvoke: any = undefined
  constructor (
    invokeUrl: string,
    requestData: any,
    parameter?: string,
    additionInvoke?: any
  ) {
    this.invokeUrl = invokeUrl
    this.invokeData = requestData
    this.parameter = '' + parameter
    this.additionInvoke = additionInvoke
  }

  getInvokeInterfaceUrl () {
    if (this.parameter !== 'undefined') {
      return '$' + this.parameter + ' = ' + this.invokeUrl
    }
    return this.invokeUrl
  }

  getInvokeInterfaceData (interfaceUrl: string) {
    const invoke = {}
    if (this.additionInvoke !== undefined) {
      if (this.additionInvoke.length > 1) {
        for (const row of this.additionInvoke) {
          this.invokeData[row.invokeUrl] = row.requestData
          invoke[interfaceUrl] = this.invokeData
        }
      } else {
        this.invokeData[
          this.additionInvoke.invokeUrl
        ] = this.additionInvoke.requestData
        invoke[interfaceUrl] = this.invokeData
      }
    } else {
      invoke[interfaceUrl] = this.invokeData
    }
    return invoke
  }
}
