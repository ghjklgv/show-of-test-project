import { ServiceEngine } from '../serviceEngine/serviceEngine'
import { IService } from '../serviceEngine/iService'

const engine = new ServiceEngine()

export default class ApiEngine {
  promiseEngine = (service: IService) => {
    return engine.promiseRequest(service)
  }

  uploadEngine = (service: IService) => {
    return engine.uploadRequest(service)
  }
}
