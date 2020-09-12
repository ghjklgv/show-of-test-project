import ApiEngine from '../../serviceMethod/serviceMethod'
import ApiPromiseCaller from '../../serviceEngine/apiCaller/apiPromiseCaller'
import Notification from '../../serviceEngine/notification/notification'

const engine = new ApiEngine()
const notification = new Notification()

export default class SpecialService {
  component: React.Component<any, any, any>

  constructor (component: React.Component<any, any, any>) {
    this.component = component
  }

  getInstitutionList = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trinstitution/get-institution-list',
      {}
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.component.setState(
            {
              institutionData: response
            },
            () => resolve(true)
          )
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          reject(false)
        })
    })
  }

  getUserList = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_home.viewuser/get-all-users',
      {
        searchColumn: '%'
      }
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.component.setState(
            {
              userData: response
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

  getCategoryList = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trcategory/get-category-list',
      {}
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.component.setState(
            {
              categoryData: response
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

  getDivisionList = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_home.division/get-division-list-by-user-id',
      {}
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.component.setState(
            {
              divisionData: response
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

  getSpecialCount = async () => {
    const { currentSub } = this.component.state
    let url = ''
    switch (currentSub) {
      case 'ITOver5000':
        url = '/cedd_training.viewattendee/count-attendee-list-by-over-fee'
        break
      case 'ITByDivision':
        url = '/cedd_training.viewattendee/count-attendee-list-by-it-training'
        break
      case 'ITByName':
        url = '/cedd_training.viewattendee/count-attendee-list-by-it-training'
        break
      case 'CSTDIByDivision':
        url =
          '/cedd_training.viewattendee/count-attendee-list-by-special-view-cstdi'
        break
      case 'QMByDivision':
        url =
          '/cedd_training.viewattendee/count-attendee-list-by-special-view-qm'
        break
      default:
        url =
          '/cedd_training.viewattendee/count-attendee-list-by-special-view-safety'
    }
    const data = { ...this.component.state.searchOption }
    if (data.divisionId === '') {
      data.divisionId = 0
    }
    if (data.attendeeUserId === '') {
      data.attendeeUserId = 0
    }
    if (currentSub === 'ITOver5000') {
      data.minFee = 0
    }
    data.isSearchFlag = data.fromDate === null ? false : true
    const service = new ApiPromiseCaller('post', url, data)
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          if (response > 0) {
            const { pagination } = this.component.state
            pagination.total = response
            this.component.setState(
              {
                pagination
              },
              () => {
                resolve(true)
              }
            )
          } else {
            this.component.setState(
              {
                loading: false,
                listRenderFlag: true
              },
              () => {
                reject(false)
              }
            )
          }
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          this.component.setState(
            {
              loading: false,
              listRenderFlag: true
            },
            () => {
              reject(false)
            }
          )
        })
    })
  }

  getSpecialList = async () => {
    const { currentSub } = this.component.state
    let url = ''
    switch (currentSub) {
      case 'ITOver5000':
        url = '/cedd_training.viewattendee/get-attendee-list-by-over-fee'
        break
      case 'ITByDivision':
        url =
          '/cedd_training.viewattendee/get-attendee-list-by-special-view-it-training-division'
        break
      case 'ITByName':
        url =
          '/cedd_training.viewattendee/get-attendee-list-by-special-view-it-training-name'
        break
      case 'CSTDIByDivision':
        url =
          '/cedd_training.viewattendee/get-attendee-list-by-special-view-cstdi'
        break
      case 'QMByDivision':
        url = '/cedd_training.viewattendee/get-attendee-list-by-special-view-qm'
        break
      default:
        url =
          '/cedd_training.viewattendee/get-attendee-list-by-special-view-safety'
    }
    const { pagination } = this.component.state
    const loadStart = (pagination.current - 1) * pagination.pageSize + 1
    const loadEnd = Math.min(
      pagination.current * pagination.pageSize,
      pagination.total
    )
    const keys = Object.keys(this.component.state.sortOption)
    let sort: string = ''
    for (const key of keys) {
      if (this.component.state.sortOption[key] !== '') {
        sort = `${key} ${this.component.state.sortOption[key]}`
        break
      }
    }
    const data = { ...this.component.state.searchOption }
    if (data.divisionId === '') {
      data.divisionId = 0
    }
    if (data.attendeeUserId === '') {
      data.attendeeUserId = 0
    }
    if (currentSub === 'ITOver5000') {
      data.minFee = 0
    }
    data.isSearchFlag = data.fromDate === null ? false : true
    data.sqlSort = sort
    data.start = loadStart
    data.end = loadEnd
    const service = new ApiPromiseCaller('post', url, data)
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.handleSpecialListGrouping(currentSub, response)
        })
        .catch(error => {
          notification.show('error', error.data.exception)
          this.component.setState({
            loading: false,
            listRenderFlag: true
          })
        })
    })
  }

  handleSpecialListGrouping = (type, response) => {
    let data: any = []
    const expand: any = []
    if (type === 'ITOver5000') {
      response.forEach(group => {
        if (group.groupName !== '') {
          group.attendeeList.forEach((item, index) => {
            item.key = item.attendeeId
            item.isItem = true
            item.iteration = index + 1
          })
          const groupData: any = {
            key: `group-${group.groupName}`,
            groupName: group.groupName,
            isGroup: true,
            courseFee: group.fee,
            children: group.attendeeList
          }
          expand.push(`group-${group.groupName}`)
          data.push(groupData)
        } else {
          group.attendeeList.forEach((item, index) => {
            item.key = item.attendeeId
            item.isItem = true
            item.iteration = index + 1
          })
          data = data.concat(group.attendeeList)
        }
      })
    } else if (type === 'ITByDivision') {
      response.forEach(group => {
        if (group.groupName !== '') {
          const groupData: any = {
            key: `group-${group.groupName}`,
            groupName: group.groupName,
            isGroup: true,
            courseFee: group.fee,
            children: []
          }
          expand.push(`group-${group.groupName}`)
          group.subList.forEach(sub => {
            sub.attendeeList.forEach((item, index) => {
              item.key = item.attendeeId
              item.isItem = true
              item.iteration = index + 1
            })
            const subData: any = {
              key: `${groupData.key}-sub-${sub.groupName}`,
              groupName: sub.groupName,
              isSub: true,
              courseFee: sub.fee,
              children: sub.attendeeList
            }
            expand.push(`${groupData.key}-sub-${sub.groupName}`)
            groupData.children.push(subData)
          })
          data.push(groupData)
        } else {
          group.subList[0].attendeeList.forEach((item, index) => {
            item.key = item.attendeeId
            item.isItem = true
            item.iteration = index + 1
          })
          data = data.concat(group.subList[0].attendeeList)
        }
      })
    } else {
      response.forEach(group => {
        if (group.groupName !== '') {
          const groupData: any = {
            key: `group-${group.groupName}`,
            groupName: group.groupName,
            isGroup: true,
            day: group.day,
            children: []
          }
          expand.push(`group-${group.groupName}`)
          group.subList.forEach(sub => {
            const subData: any = {
              key: `${groupData.key}-sub-${sub.groupName}`,
              groupName: sub.groupName,
              isSub: true,
              day: sub.day,
              children: []
            }
            expand.push(`${groupData.key}-sub-${sub.groupName}`)
            sub.subList.forEach(third => {
              const thirdData: any = {
                key: `${subData.key}-third-${third.groupName}`,
                groupName: third.groupName,
                isThird: true,
                day: third.day,
                children: []
              }
              expand.push(`${subData.key}-third-${third.groupName}`)
              third.subList.forEach(fourth => {
                fourth.attendeeList.forEach((item, index) => {
                  item.key = item.attendeeId
                  item.isItem = true
                  item.iteration = index + 1
                })
                const fourthData: any = {
                  key: `${thirdData.key}-fourth-${fourth.groupName}`,
                  groupName: fourth.groupName,
                  isFourth: true,
                  day: fourth.day,
                  children: fourth.attendeeList
                }
                expand.push(`${thirdData.key}-fourth-${fourth.groupName}`)
                thirdData.children.push(fourthData)
              })
              subData.children.push(thirdData)
            })
            groupData.children.push(subData)
          })
          data.push(groupData)
        } else {
          group.subList[0].subList[0].subList[0].attendeeList.forEach(
            (item, index) => {
              item.key = item.attendeeId
              item.isItem = true
              item.iteration = index + 1
            }
          )
          data = data.concat(
            group.subList[0].subList[0].subList[0].attendeeList
          )
        }
      })
    }
    this.component.setState({
      dataList: data,
      expandedKeys: expand,
      loading: false,
      listRenderFlag: true
    })
  }
}
