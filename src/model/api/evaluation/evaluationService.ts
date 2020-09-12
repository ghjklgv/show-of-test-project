import ApiEngine from '../../serviceMethod/serviceMethod'
import ApiPromiseCaller from '../../serviceEngine/apiCaller/apiPromiseCaller'
import Notification from '../../serviceEngine/notification/notification'
// import { resolve } from 'path'
// import { format } from 'util';
// import * as moment from 'moment'

const engine = new ApiEngine()
const notification = new Notification()

export default class EvaluationService {
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

  getTableCount = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewevaluation/get-evaluation-count',
      {}
    )
    return engine.promiseEngine(service).then(response => {
      return response
    })
  }

  getTableHeader = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trevaluationquestion/get-evaluation-question-columns',
      {},
      'questionColumns[questionId,columnName]'
    )
    return engine.promiseEngine(service).then(response => {
      console.log(response)
      return response
    })
  }

  getDataList = async (countStart, countEnd, sqlSort, sortQuestionId) => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewevaluation/get-evaluation-list',
      {
        sqlSort,
        sortQuestionId,
        start: countStart,
        end: countEnd
      }
    )
    return engine.promiseEngine(service).then(response => {
      console.log(response)

      this.component.setState({
        dataList: response
      })
    })
  }
  getSortDataList = async (countStart, countEnd, sqlSort, sortQuestionId) => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewevaluation/get-evaluation-list',
      {
        sqlSort,
        sortQuestionId,
        start: countStart,
        end: countEnd
      }
    )
    return engine.promiseEngine(service).then(response => {
      console.log(response)
      for (const data of response[0].subList[0].subList[0].userEvaluationList) {
        for (const answer of data.evaluationAnswers) {
          data[answer.questionId] = answer.answerKey
        }
      }
      this.component.setState({
        dataList: response[0].subList[0].subList[0].userEvaluationList
      })
    })
  }

  getEvaluationColumn = async () => {
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.trevaluationquestion/get-evaluation-question-columns',
      {}
    )
    return new Promise((resolve, reject) => {
      engine
        .promiseEngine(service)
        .then(response => {
          this.component.setState(
            {
              headerColumn: response
            },
            () => resolve(true)
          )
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

  getEvaluationCount = async () => {
    const data = { ...this.component.state.searchOption }
    if (data.divisionId === '') {
      data.divisionId = 0
    }
    if (data.attendeeUserId === '') {
      data.attendeeUserId = 0
    }
    data.isSearchFlag = data.fromDate === null ? false : true
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewevaluation/get-evaluation-count',
      data
    )
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

  getEvaluationList = async () => {
    const { pagination } = this.component.state
    const loadStart = (pagination.current - 1) * pagination.pageSize + 1
    const loadEnd = Math.min(
      pagination.current * pagination.pageSize,
      pagination.total
    )
    const data = { ...this.component.state.searchOption }
    data.sqlSort = ''
    data.sortQuestionId = 0
    const keys = Object.keys(this.component.state.sortOption)
    for (const key of keys) {
      if (this.component.state.sortOption[key] !== '') {
        if (key !== 'questionId') {
          data.sqlSort = `${key} ${this.component.state.sortOption[key]}`
          break
        } else {
          data.sqlSort = this.component.state.questionSort
          data.sortQuestionId = this.component.state.sortOption.questionId
        }
      }
    }
    if (data.divisionId === '') {
      data.divisionId = 0
    }
    if (data.attendeeUserId === '') {
      data.attendeeUserId = 0
    }
    data.isSearchFlag = data.fromDate === null ? false : true
    data.start = loadStart
    data.end = loadEnd
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewevaluation/get-evaluation-list',
      data
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        let data: any = []
        const expand: any = []
        response.forEach(group => {
          if (group.groupName !== '') {
            const groupData: any = {
              key: `group-${group.groupName}`,
              groupName: group.groupName,
              isGroup: true,
              children: []
            }
            expand.push(`group-${group.groupName}`)
            group.subList.forEach(sub => {
              const subData: any = {
                key: `${groupData.key}-sub-${sub.groupName}`,
                groupName: sub.groupName,
                isSub: true,
                children: []
              }
              expand.push(`${groupData.key}-sub-${sub.groupName}`)
              sub.subList.forEach(third => {
                third.userEvaluationList.forEach((item, index) => {
                  item.key = item.attendeeId
                  item.isItem = true
                  item.iteration = index + 1
                })
                const thirdData: any = {
                  key: `${subData.key}-third-${third.groupName}`,
                  groupName: third.groupName,
                  isThird: true,
                  average: third.average,
                  children: third.userEvaluationList
                }
                expand.push(`${subData.key}-third-${third.groupName}`)
                subData.children.push(thirdData)
              })
              groupData.children.push(subData)
            })
            data.push(groupData)
          } else {
            group.subList[0].subList[0].userEvaluationList.forEach(
              (item, index) => {
                item.key = item.attendeeId
                item.isItem = true
                item.iteration = index + 1
              }
            )
            data = data.concat(group.subList[0].subList[0].userEvaluationList)
          }
        })
        this.component.setState({
          dataList: data,
          expandedKeys: expand,
          loading: false,
          listRenderFlag: true
        })
      })
      .catch(error => {
        notification.show('error', error.data.exception)
        this.component.setState({
          loading: false,
          listRenderFlag: true
        })
      })
  }
}
