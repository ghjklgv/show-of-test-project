import ApiEngine from '../../serviceMethod/serviceMethod'
import ApiPromiseCaller from '../../serviceEngine/apiCaller/apiPromiseCaller'
// import ApiUploadCaller from 'src/model/serviceEngine/apiCaller/apiUploadCaller'
import Notification from '../../serviceEngine/notification/notification'
import { StaticService } from '../../../model/static/static'

const engine = new ApiEngine()
const notification = new Notification()

export default class RegisterService {
  component: React.Component<any, any, any>

  constructor (component: React.Component<any, any, any>) {
    this.component = component
  }

  getCourse = async sortStr => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewcourse/get-course-list-can-register',
      {
        sqlSort: sortStr
      }
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        let data: any = []
        const expand: any = []
        response.forEach((row, index) => {
          if (row.groupName !== '') {
            const rowData: any = {
              key: `group-${row.groupName}`,
              courseId: `group-${index}`,
              title: row.groupName,
              isGroup: true,
              children: []
            }
            expand.push(`group-${row.groupName}`)
            if (row.courseList.length > 0) {
              row.courseList.forEach((col, index) => {
                col.key = col.courseId
                col.iteration = index + 1
                rowData.children.push(col)
              })
            }
            data.push(rowData)
          } else {
            if (row.courseList.length > 0) {
              row.courseList.forEach((col, index) => {
                col.key = col.courseId
                col.iteration = index + 1
              })
              data = data.concat(row.courseList)
            }
          }
        })
        this.component.setState({
          courseLoading: false,
          courseList: data,
          courseModal: true,
          expandedKeys: expand
        })
      })
      .catch(error => {
        notification.show('error', error.data.exception)
      })
  }

  getUser = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_home.viewuser/get-all-users',
      {
        searchColumn: '%'
      }
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        this.component.setState({
          userList: response
        })
      })
      .catch(error => {
        notification.show('error', error.data.exception)
      })
  }

  getAttendee = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/get-tr-user-info-list-by-course-id',
      {
        courseId: this.component.state.courseSelected.courseId
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.component.setState(
            {
              attendeeList: response
            },
            () => {
              resolve(true)
            }
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          reject(false)
        })
    })
  }

  getCourseDetail = async () => {
    const canRegistered = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourse/check-course-can-register',
      {
        courseId: this.component.state.courseID
      },
      'canRegistered'
    )
    const isRegistered = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/check-user-course-exist',
      {
        courseId: this.component.state.courseID
      },
      'isRegistered'
    )
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewcourse/get-course',
      {
        courseId: this.component.state.courseID
      },
      undefined,
      [canRegistered, isRegistered]
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          if (
            response.courseId === undefined ||
            !response.canRegistered ||
            response.isRegistered
          ) {
            window.location.replace(`/training-db#/NewRegister`)
            reject(false)
          } else {
            this.component.setState(
              {
                courseSelectTemp: response,
                courseSelected: response,
                notifyCheck: response.notifySupervisorFlag
              },
              () => {
                resolve(true)
              }
            )
          }
        })
        .catch(() => {
          // notification.show('error', error.data.exception)
          window.location.replace(`/training-db#/NewRegister`)
          reject(false)
        })
    })
  }

  submitRegister = async data => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/add-registration',
      data
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        notification.show('success', 'registration successfully submitted.')
        if (StaticService.saveObjectType === 'ByDivision') {
          window.location.assign('/training-db#/NormalUser/ByDivision')
        } else if (StaticService.saveObjectType === 'ByThemeRef') {
          window.location.assign('/training-db#/NormalUser/ByThemeRef')
        } else {
          window.location.assign('/training-db#/NormalUser/ByCategory')
        }
        // this.component.setState({
        //   submitPending: false
        // })
      })
      .catch(error => {
        notification.show('error', error.data.exception)
        this.component.setState({
          submitPending: false
        })
      })
  }

  checkCourseCanRegister = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourse/check-course-can-register',
      {
        courseId: this.component.state.courseID
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          console.log(response)
          this.component.setState(
            {
              canRegister: response
            },
            () => {
              if (response) {
                resolve(true)
              } else {
                this.component.setState({
                  modalVisible: true,
                  renderFlag: true
                })
                reject(false)
              }
            }
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          reject(false)
        })
    })
  }

  checkUserHasRegistered = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/check-user-course-exist',
      {
        courseId: this.component.state.courseID
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          console.log(response)
          this.component.setState(
            {
              isRegistered: response
            },
            () => {
              if (response) {
                resolve(true)
              } else {
                reject(false)
                window.location.replace(
                  `/training-db#/NewRegister/${this.component.state.courseSN}`
                )
              }
            }
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          reject(false)
        })
    })
  }

  checkAttendeeSuspended = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/check-user-course-suspend',
      {
        courseId: this.component.state.courseID
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          console.log(response)
          this.component.setState(
            {
              isSuspended: response
            },
            () => {
              if (!response) {
                resolve(true)
              } else {
                this.component.setState({
                  modalVisible: true,
                  renderFlag: true
                })
                reject(false)
              }
            }
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          reject(false)
        })
    })
  }

  getAttendeeId = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/get-user-course-attendee-id',
      {
        courseId: this.component.state.courseID
      }
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        window.location.replace(`/training-db#/NormalUser/Detail/${response}`)
      })
      .catch(error => {
        notification.show('error', error.data.exception)
      })
  }

  checkIsAttendeeUser = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/check-attendee-user',
      {
        attendeeId: this.component.state.attendeeId
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          console.log(response)
          this.component.setState(
            {
              isAttendeeUser: response
            },
            () => {
              resolve(true)
            }
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          reject(false)
        })
    })
  }

  checkIsAdmin = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trownerrole/is-tr-owner',
      {}
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.component.setState(
            {
              isAdmin: response
            },
            () => {
              resolve(true)
            }
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          reject(false)
        })
    })
  }

  checkIsSupervisor = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/check-supervisor',
      {
        attendeeId: this.component.state.attendeeId
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          console.log(response)
          this.component.setState(
            {
              isSupervisor: response
            },
            () => {
              if (
                !this.component.state.isAttendeeUser &&
                !this.component.state.isAdmin &&
                !this.component.state.isSupervisor
              ) {
                this.component.setState({
                  modalVisible: true,
                  renderFlag: true
                })
                reject(false)
              } else {
                resolve(true)
              }
            }
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          reject(false)
        })
    })
  }

  checkIsSuspend = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/check-suspend',
      {
        attendeeId: this.component.state.attendeeId
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          console.log(response)
          this.component.setState(
            {
              isSuspended: response
            },
            () => {
              if (!response) {
                window.location.replace(
                  `/training-db#/NormalUser/Detail/${this.component.state.attendeeId}`
                )
              } else {
                if (this.component.state.isAttendeeUser) {
                  window.location.replace(
                    `/training-db#/NormalUser/Suspended/${this.component.state.attendeeId}`
                  )
                } else {
                  this.component.setState({
                    modalVisible: true,
                    renderFlag: true
                  })
                }               
              }
            }
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
        })
    })
  }
}
