import axios from 'axios'
import { IServiceRunner } from './invokeServiceRunner'
import { IService } from '../iService'
import { StaticService } from '../../static/static'
import { createHashHistory } from 'history'

const history = createHashHistory()

export class AxiosUploadRunner implements IServiceRunner {
  async run (service: IService): Promise<any> {
    // detect if enviroment should use relative host
    const isPAuth = process.env.REACT_APP_PAUTH_TOKEN === 'true' ? true : false
    const isCustomHostname =
      process.env.REACT_APP_CUSTOM_HOSTNAME === 'true' ? true : false
    const hostname = isCustomHostname ? StaticService.hostname : ''

    // make axios request instance config
    // if in develop enviroment, use basic username/password authorization
    const config = {
      baseURL: '',
      headers: !isPAuth ? service.getHeaders() : {}
    }
    // assign api content type into headers
    config.headers['Content-Type'] = service.getContentType()

    // assign asiox instance
    const instance = axios.create()

    // add a request interceptor
    instance.interceptors.request.use(
      config => {
        if (isPAuth) {
          config.url =
            hostname +
            process.env.REACT_APP_API_UPLOAD_HOST +
            service.hostUrl +
            '?p_auth=' +
            StaticService.token
        } else {
          config.url =
            hostname +
            process.env.REACT_APP_API_UPLOAD_HOST +
            service.hostUrl
        }
        // Do something before request is sent
        return config
      },
      error => {
        // Do something with request error
        return error
      }
    )

    // add a response interceptor
    instance.interceptors.response.use(
      response => {
        if (response.status === 401) {
          history.push('/')
          // console.log(
          //   'Have to clean credential info & redirect to login page.'
          // )
        } else if (response.status === 200) {
          // console.log(
          //   'Have to clean credential info & redirect to login page.'
          // )
        }
        return response
      },
      error => {
        if (error.response.status === 401) {
          history.push('/')
        } else if (error.status === 200) {
          // console.log(
          //   'Have to clean credential info & redirect to login page.'
          // )
        }
        return Promise.reject(error)
      }
    )

    // return axios promise
    return new Promise((resolve, reject) => {
      instance
        .request({
          baseURL: config.baseURL,
          data: service.getRequestBody(),
          headers: config.headers,
          method: service.getMethod(),
          timeout: service.timeoutMs
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error.response)
        })
    })
  }
}
