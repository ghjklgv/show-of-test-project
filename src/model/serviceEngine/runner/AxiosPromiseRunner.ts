import axios from 'axios'
import { IServiceRunner } from './invokeServiceRunner'
import { IService } from '../iService'
import { StaticService } from '../../static/static'
import { createHashHistory } from 'history'
import Notification from '../../../components/notification'

const history = createHashHistory()

export class AxiosPromiseRunner implements IServiceRunner {
  notification = new Notification()
  async run (service: IService): Promise<any> {
    // detect if enviroment needs pauth token
    const isPAuth = process.env.REACT_APP_PAUTH_TOKEN === 'true' ? true : false

    // detect if enviroment should use relative host
    const isCustomHostname =
      process.env.REACT_APP_CUSTOM_HOSTNAME === 'true' ? true : false
    const hostname = isCustomHostname
      ? StaticService.hostname + process.env.REACT_APP_API_HOST
      : process.env.REACT_APP_API_HOST

    // make axios request instance config
    // if in develop enviroment, use basic username/password authorization
    const config = {
      baseURL: hostname,
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
          // if in deploy enviroment, use pauth mode
          config.params = {
            p_auth: StaticService.token
          }
        } else {
          // if not, use headers basic authorization
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
        // console.log(response)
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
        console.log(error)
        // console.log(Response)

        // if (error.response.status === 401) {
        //   history.push('/')
        // } else if (error.status === 200) {
        //   // console.log(
        //   //   'Have to clean credential info & redirect to login page.'
        //   // )
        // }
        // return Promise.reject(error)
      }
    )

    // return axios promise
    return new Promise((resolve, reject) => {
      instance
        .request({
          baseURL: config.baseURL,
          data: service.getRequestBody() ? service.getRequestBody() : '',
          headers: config.headers,
          method: service.getMethod(),
          timeout: service.timeoutMs
        })
        .then(response => {
          console.log(response)
          // resolve(response.data)
        })
        .catch(error => {
          // console.log(error)
          // this.notification.show('error', error)
          reject(error)
        })
    })

    /* Start request */
  }
}
