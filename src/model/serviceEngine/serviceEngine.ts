import { IServiceRunner } from './runner/invokeServiceRunner'
import { IService } from './iService'
import { AxiosPromiseRunner } from './runner/AxiosPromiseRunner'
import { AxiosUploadRunner } from './runner/AxiosUploadRunner'
import { RpcPromiseRunner } from './runner/jsonRpcTwoRunner'

export class ServiceEngine {
  promiseRunner: IServiceRunner
  uploadRunner: IServiceRunner
  rpcRunner: IServiceRunner

  constructor () {
    this.promiseRunner = new AxiosPromiseRunner()
    this.uploadRunner = new AxiosUploadRunner()
    this.rpcRunner = new RpcPromiseRunner()
  }

  async promiseRequest (service: IService): Promise<any> {
    const _this = this
    return new Promise((resolve, reject) => {
      _this.promiseRunner.run(service)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  async uploadRequest (service: IService): Promise<any> {
    const _this = this
    return new Promise((resolve, reject) => {
      _this.uploadRunner.run(service)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  async rpc2Request (service: IService): Promise<any> {
    const _this = this
    return new Promise((resolve, reject) => {
      _this.rpcRunner.run(service)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }
}
