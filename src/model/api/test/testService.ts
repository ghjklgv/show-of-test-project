import ApiEngine from '../../serviceMethod/serviceMethod'
import ApiPromiseCaller from '../../serviceEngine/apiCaller/apiPromiseCaller'
import ApiUploadCaller from 'src/model/serviceEngine/apiCaller/apiUploadCaller'
import Notification from '../../serviceEngine/notification/notification'

const engine = new ApiEngine()
const notification = new Notification()

export default class TestService {
  component: React.Component<any, any, any>

  constructor (component: React.Component<any, any, any>) {
    this.component = component
  }

  getCount = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_booking.viewreservation/get-room-reservations-count',
      {
        siteId: 1,
        searchKeyword: '%',
        startDate: '',
        endDate: ''
      }
    )
    return engine.promiseEngine(service)
      .then(response => {
        this.component.setState({
          count: response
        })
      })
      .catch((error) => {
        notification.show('error', error.data.exception)
      })
  }

  getList = async () => {
    const image = new ApiPromiseCaller(
      'post',
      '/cedd_booking.bkroominfo/get-room-image-url',
      {
        '@fileEntryId': '$list.roomImageId'
      },
      'image'
    )
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_booking.viewreservation/get-room-reservations-page',
      {
        siteId: 1,
        searchKeyword: '%',
        start: 1,
        end: this.component.state.count,
        startDate: '',
        endDate: ''
      },
      'list[reservationId,purpose,roomImageId]',
      image
    )
    return engine.promiseEngine(service)
      .then((response) => {
        notification.show('success', 'get list successfully')
        this.component.setState({
          list: response
        })
      })
      .catch((error) => {
        notification.show('error', error.data.exception)
      })
  }

  uploadImg = async (data, url) => {
    const service = new ApiUploadCaller(
      '/cedd_booking.bkroominfo/add-room-image-file',
      data
    )
    return engine.uploadEngine(service)
      .then((response) => {
        notification.show('success', 'upload image successfully')
      })
      .catch((error) => {
        notification.show('error', error.data.exception)
      })
  }
}
