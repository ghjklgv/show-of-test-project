// import { IService } from '../../serviceEngine/iService'
import ApiEngine from '../../serviceMethod/serviceMethod'
import ApiPromiseCaller from '../../serviceEngine/apiCaller/apiPromiseCaller'
import Notification from '../../serviceEngine/notification/notification'
import { StaticService } from '../../static/static'

const engine = new ApiEngine()
const notification = new Notification()

export default class CourseService {
  component: React.Component<any, any, any>

  constructor (component: React.Component<any, any, any>) {
    this.component = component
  }
  getEvalutionQuest = async (courseId: any, attendeeUserId: any) => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trevaluation/get-tr-evaluation',
      {
        courseId,
        attendeeUserId
      }
    )
    return engine.promiseEngine(service).then(response => {
      console.log(response.evaluation)
      const arrary = [] as any
      let i = 0
      let flag = false
      for (const data of response.evaluation) {
        const obj = {
          questionId: data.questionId,
          key_: ''
        }
        if (data.userAnswer) {
          flag = true
        }
        arrary.push(obj)
        data.queAnsWer = obj
        data.index = i
        i++
      }

      this.component.setState({
        EvalutionQuestData: response,
        answerSubmit: arrary,
        disabled: flag
      })
    })
  }

  getEvaluationPermission = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trownerrole/is-tr-owner',
      {}
    )
    return engine.promiseEngine(service).then(response => {
      this.component.setState({
        permissionFlag: response
      })
      console.log(response)
    })
  }

  saveEvaluation = async data => {
    console.log(data)
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trattendeeevaluation/add-tr-attendee-evaluation',
      data
    )
    return engine.promiseEngine(service).then(response => {
      console.log(response)
    })
  }
  getRegistration = async attendeeId => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/get-registration',
      { attendeeId },
      'courseAttendee'
    )
    return engine.promiseEngine(service).then(response => {
      this.component.setState(
        {
          dataRegistration: response
        },
        () => {
          const status = response.status
          if (status === 'Training') {
            this.getDtailInfo(
              attendeeId,
              response.courseId,
              response.supervisorUserId
            ).catch(() => false)
          } else {
            this.getDtailInfo(
              attendeeId,
              response.courseId,
              response.supervisorUserId
            ).catch(() => false)
          }
        }
      )
    })
  }

  getDtailInfo = async (attendeeId, courseId, supervisorUserId) => {
    const course = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewcourse/get-course',
      { '@courseId': '$courseAttendee.courseId' },
      'course'
    )

    const supervisorUser = new ApiPromiseCaller(
      'post',
      '/cedd_home.viewuser/get-user',
      { '@userId': '$courseAttendee.supervisorUserId' },
      'supervisorUser'
    )

    const registrationUserList = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/get-tr-user-info-list-by-course-id',
      { '@courseId': '$courseAttendee.courseId' },
      'registrationUserList[userId,userName,phone,position,division]'
    )

    const attendeeUser = new ApiPromiseCaller(
      'post',
      '/cedd_home.viewuser/get-user',
      { '@userId': '$courseAttendee.attendeeUserId' },
      'attendeeUser'
    )

    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/get-registration',
      { attendeeId },
      'courseAttendee',
      [course, supervisorUser, registrationUserList, attendeeUser]
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        const courseSelected: any = {
          attendeeId,
          supervisorUserId,
          courseId
        }
        const dataAttendeeDetail: any = {}
        if (response.supervisorUser !== null) {
          courseSelected.supervisorUser = response.supervisorUser.userName
        }
        if (response.attendeeUser !== null) {
          dataAttendeeDetail.userName = response.attendeeUser.userName
          dataAttendeeDetail.division = response.attendeeUser.division
          dataAttendeeDetail.phone = response.attendeeUser.phone
          dataAttendeeDetail.position = response.attendeeUser.position
          dataAttendeeDetail.chineseName = response.chineseName
          dataAttendeeDetail.remarks = response.remarks
          dataAttendeeDetail.isOtherDepart = response.isOtherDepart
        }

        courseSelected.title = response.course.title
        courseSelected.institutionListing = response.course.institutionListing
        courseSelected.courseNo = response.course.courseNo
        courseSelected.language = response.course.language
        courseSelected.category = response.course.category
        courseSelected.startDateTime = response.course.startDateTime
        courseSelected.endDateTime = response.course.endDateTime
        courseSelected.duration = response.course.duration
        courseSelected.themeRef = response.course.themeRef
        courseSelected.quota = response.course.quota
        courseSelected.vacancy = response.course.vacancy
        courseSelected.evaluationFlag = response.course.evaluationFlag
        courseSelected.evaluationType = response.course.evaluationType
        courseSelected.courseFee = response.course.courseFee
        courseSelected.overseas = response.course.overseas
        courseSelected.remarks = response.course.remarks

        const dataRegistrationUserList: any[] = []
        if (response.registrationUserList !== undefined) {
          for (const iterator of response.registrationUserList) {
            const user = {
              division: iterator.division || '-',
              position: iterator.position || '-',
              userName: iterator.userName,
              key: iterator.userId,
              phone: iterator.phone || '-'
            }
            dataRegistrationUserList.push(user)
          }
        }

        this.component.setState({
          originSelected: courseSelected,
          courseSelected,
          dataRegistrationUserList,
          dataAttendeeDetail
        })
      })
      .catch(error => {
        console.log('getDtailInfo-error:' + error.message)
        notification.show('error', error.data.exception)
      })
  }

  updateRegistration = async (attendeeId, courseId) => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/update-registration',
      { attendeeId, courseId },
      'courseAttendee[attendeeId]'
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        this.component.setState(
          {
            isEdit: false
          },
          () => {
            notification.show('success', 'edit success')
            this.getRegistration(response.attendeeId).catch(() => false)
          }
        )
      })
      .catch(error => {
        notification.show('error', error.data.exception)
      })
  }

  suspendCourse = async attendeeId => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/suspend-registration',
      { attendeeId },
      ''
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        this.component.setState(
          {
            suspendDialogVisible: false
          },
          () => {
            notification.show('success', 'suspend success')
            window.location.assign(
              `/training-db#/RegisterList/` + StaticService.saveObjectType
            )
          }
        )
      })
      .catch(error => {
        notification.show('error', error.data.exception)
      })
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

  checkCourseAttendeeEditable = async attendeeId => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcourseattendee/check-course-attendee-editable',
      { attendeeId },
      ''
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        this.component.setState({
          isCourseAttendeeEditable: response
        })
      })
      .catch(error => {
        notification.show('error', error.data.exception)
      })
  }
}
