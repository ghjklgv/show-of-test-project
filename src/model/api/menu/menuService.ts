import ApiEngine from '../../serviceMethod/serviceMethod'
import ApiPromiseCaller from '../../serviceEngine/apiCaller/apiPromiseCaller'
import Notification from '../../serviceEngine/notification/notification'

const engine = new ApiEngine()
const notification = new Notification()

export default class MenuService {
  component: React.Component<any, any, any>

  constructor (component: React.Component<any, any, any>) {
    this.component = component
  }

  getDivisionMenu = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_home.division/get-all-list-by-user-id',
      {}
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        this.component.setState({
          menuData: response
        })
      })
      .catch(error => {
        notification.show('error', error.data.exception)
      })
  }
}
