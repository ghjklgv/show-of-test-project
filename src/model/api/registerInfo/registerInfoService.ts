import ApiEngine from '../../serviceMethod/serviceMethod'
import ApiPromiseCaller from '../../serviceEngine/apiCaller/apiPromiseCaller'
import Notification from '../../serviceEngine/notification/notification'
import { StaticService } from '../../static/static'

const engine = new ApiEngine()
const notification = new Notification()

export default class RegisterInfoService {
  component: React.Component<any, any, any>

  constructor (component: React.Component<any, any, any>) {
    this.component = component
  }

  getRegisterData = async () => {
    const course = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewcourse/get-course',
      {
        '@courseId': '$registerData.courseId'
      },
      'courseData'
    )
    const isAttendeeUser = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/check-attendee-user',
      {
        attendeeId: this.component.state.attendeeId
      },
      'isAttendeeUser'
    )
    const isSupervisor = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/check-supervisor',
      {
        attendeeId: this.component.state.attendeeId
      },
      'isSupervisor'
    )
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/get-registration',
      {
        attendeeId: this.component.state.attendeeId
      },
      'registerData',
      [course, isAttendeeUser, isSupervisor]
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.component.setState(
            {
              registerData: response,
              courseData: response.courseData,
              recordStatus: response.status
            },
            () => {
              resolve(true)
            }
          )
        })
        .catch(() => {
          // notification.show('error', error.data.exception)
          window.history.back()
          reject(false)
        })
    })
  }

  getSupervisorData = async () => {
    if (this.component.state.registerData.supervisorUserId !== '') {
      const service = new ApiPromiseCaller(
        'post',
        '/cedd_home.viewuser/get-user',
        {
          userId: this.component.state.registerData.supervisorUserId
        }
      )
      return new Promise((resolve, reject) => {
        engine
          .promiseEngine(service)
          .then(response => {
            this.component.setState(
              {
                supervisorData: response
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
    } else {
      return new Promise(resolve => {
        this.component.setState(
          {
            supervisorData: {
              userName: '-'
            }
          },
          () => {
            resolve(true)
          }
        )
      })
    }
  }

  getAttendeesData = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/get-tr-user-info-list-by-course-id',
      {
        courseId: this.component.state.registerData.courseId
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.component.setState(
            {
              attendeesData: response,
              loading: false,
              renderFlag: true
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

  getAttendeesDataSelect = async () => {
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
              attendeesData: response,
              detailRenderFlag: true
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

  getAttendeeUserData = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_home.viewuser/get-user',
      {
        userId: this.component.state.registerData.attendeeUserId
      }
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        this.component.setState({
          attendeeUserData: response,
          loading: false,
          renderFlag: true
        })
      })
      .catch(error => {
        notification.show('error', error.data.exception)
      })
  }

  getCourses = async sqlSort => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewcourse/get-course-list-can-register',
      {
        sqlSort
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
          expandedKeys: expand,
          chooseCourseRenderFlag: true
        })
      })
      .catch(error => {
        notification.show('error', error.data.exception)
      })
  }

  updateRegister = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/update-registration',
      {
        attendeeId: this.component.props.registerData.attendeeId,
        courseId: this.component.state.courseSelected.courseId
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(() => {
          this.component.setState(
            {
              isEdit: false,
              editLoading: false,
              editRenderFlag: true,
              detailRenderFlag: true
            },
            () => {
              resolve(true)
            }
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          this.component.setState(
            {
              editLoading: false,
              editRenderFlag: true
            },
            () => {
              reject(false)
            }
          )
        })
    })
  }

  submitSuspend = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/suspend-registration',
      {
        attendeeId: this.component.props.registerData.attendeeId
      }
    )
    return engine
      .promiseEngine(service)
      .then(() => {
        this.component.setState(
          {
            suspendModalVisible: false,
            suspendModalRenderFlag: true
          },
          () => {
            switch (StaticService.saveObjectType) {
              case 'MyTraining':
                window.location.assign('/training-db#/NormalUser/MyTraining')
                break
              case 'ByCategory':
                window.location.assign('/training-db#/NormalUser/ByCategory')
                break
              case 'ByDivision':
                window.location.assign('/training-db#/NormalUser/ByDivision')
                break
              case 'ByThemeRef':
                window.location.assign('/training-db#/NormalUser/ByThemeRef')
                break
              default:
                window.location.assign('/training-db#/NormalUser/Suspended')
            }
          }
        )
      })
      .catch(error => {
        notification.show('error', error.data.exception)
        this.component.setState({
          suspendModalLoading: false,
          suspendModalRenderFlag: true
        })
      })
  }
}
