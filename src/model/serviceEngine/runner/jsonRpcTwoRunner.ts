import axios from 'axios'
import { IServiceRunner } from './invokeServiceRunner'
import { IService } from '../iService'
import { StaticService } from '../../static/static'
import { createHashHistory } from 'history'
const history = createHashHistory()
export class RpcPromiseRunner implements IServiceRunner {
  async run (service: IService): Promise<any> {
    const config = {
      baseURL: '',
      headers: service.getHeaders()
      // invoke: service.getInvokeMethod()
    }
    config.headers['Content-Type'] = service.getContentType()
    const instance = axios.create()
    /* Add Interceptor */
    // Add a request interceptor
    // let session = sessionStorage.getItem('userJWT')
    instance.interceptors.request.use(
      config => {
        if (StaticService.token) {
          // config.headers.Authorization = 'Basic ' + StaticService.searchOption.token
          config.url =
            process.env.REACT_APP_API_HOST + service.getRpcUrlMethod()
        } else {
          config.url =
            process.env.REACT_APP_API_HOST + service.getRpcUrlMethod()
        }
        // Do something before request is sent
        return config
      },
      error => {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    instance.interceptors.response.use(
      response => {
        if (response.status === 401) {
          history.push('/')
          console.log(
            'Have to clean credential info & redirect to login page.'
          )
        } else if (response.status === 200) {
          console.log(
            'Have to clean credential info & redirect to login page.'
          )
        }
        return response
      },
      error => {
        if (error.response.status === 401) {
          history.push('/')
        } else if (error.status === 200) {
          console.log(
            'Have to clean credential info & redirect to login page.'
          )
        }
        return Promise.reject(error)
      }
    )
    return new Promise((resolve, reject) => {
      const rpcSetting = {
        jsonrpc: '2.0',
        method: service.getRpcMethod(),
        params: service.getRequestBody()
      }
      // data.p_auth = StaticService.searchOption.token
      instance
        .request({
          baseURL: config.baseURL,
          data: rpcSetting,
          headers: config.headers,
          method: service.getMethod(),
          timeout: service.timeoutMs
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error.response.status)
          // service.onRequestFail(error.response)
        })
    })
    /* Start request */
  }
}
