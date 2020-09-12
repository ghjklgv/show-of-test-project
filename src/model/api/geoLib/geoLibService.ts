import ApiEngine from '../../serviceMethod/serviceMethod'
import ApiPromiseCaller from '../../serviceEngine/apiCaller/apiPromiseCaller'
import ApiUploadCaller from '../../serviceEngine/apiCaller/apiUploadCaller'
import Notification from '../../../components/notification'

// import * as moment from 'moment'

const engine = new ApiEngine()
// const notification = new Notification()

export default class ExportCsvService {
  component: React.Component<any, any, any>
  notification = new Notification()

  constructor (component: React.Component<any, any, any>) {
    this.component = component
  }

  getPermission = async () => {
    const serviceSec = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmworkflowrole/my-workflow-role',
      { formKey: 'CEL' }
    )
    return engine
      .promiseEngine(serviceSec)
      .then(response => {
        const obj = { Approving: false, Assigning: false }
        for (const item of response) {
          console.log(item)
          if (item === 'Approving') {
            obj.Approving = true
          }
          if (item === 'Assigning') {
            obj.Assigning = true
          }
        }
        this.component.setState({
          Permission: obj,
          assigningKey: this.component.state.assigningKey + 1
        })
      })
      .catch()
  }

  getUserList = async () => {
    const serviceSec = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmworkflowrole/get-cel-approving-roles',
      {}
    )
    engine
      .promiseEngine(serviceSec)
      .then(response => {
        const service = new ApiPromiseCaller(
          'post',
          '/cedd_home.viewuser/get-users-by-role-ids',
          { roleIds: response }
        )
        return engine
          .promiseEngine(service)
          .then(response => {
            this.component.setState({ approvingUserIds: response })
          })
          .catch()
      })
      .catch()
  }

  getTableData = async searchData => {
    const serviceSec = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcel/count-cel-list',
      { status: searchData.status }
    )

    return engine
      .promiseEngine(serviceSec)
      .then(response => {
        const loadStart = (searchData.current - 1) * searchData.pageSize + 1
        const loadEnd = Math.min(
          searchData.current * searchData.pageSize,
          response
        )
        searchData.start = loadStart
        searchData.end = loadEnd
        this.component.state.pagination.total = response
        if (response !== 0) {
          const serviceUserId = new ApiPromiseCaller(
            'post',
            '/cedd_home.viewuser/get-user',
            { '@userId': '$ListData.requestUserId' },
            'userData'
          )
          const service = new ApiPromiseCaller(
            'post',
            '/cedd_form.fmcel/get-cel-list',
            searchData,
            'ListData',
            serviceUserId
          )
          engine
            .promiseEngine(service)
            .then(response => {
              console.log(response)
              for (const item of response) {
                item.userName = item.userData.userName
              }
              this.component.setState({ dataList: response, loading: false })
            })
            .catch()
        } else {
          this.component.setState({ dataList: [], loading: false })
        }
      })
      .catch()
  }

  saveGeo = async data => {
    const key = [
      'topLeftEast',
      'topLeftNorth',
      'topRightEast',
      'topRightNorth',
      'bottomLeftEast',
      'bottomLeftNorth',
      'bottomRightEast',
      'bottomRightNorth',
      'featureEast',
      'featureNorth'
    ]
    // if (data.celType === 'CEL') {
    for (const dataKey of key) {
      if (data[dataKey] === '') {
        data[dataKey] = 0
      }
    }
    // }
    const serviceSec = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcel/add-application',
      data
    )
    return engine
      .promiseEngine(serviceSec)
      .then(response => {
        this.notification.show('success', 'Successfully Saved')
        console.log(response)
        // this.component.setState({ Permission: obj })
      })
      .catch()
  }

  upLoadFile = async file => {
    const serviceSec = new ApiUploadCaller(
      '/cedd_form.fmcelfile/upload-file',
      file
    )
    return engine
      .uploadEngine(serviceSec)
      .then(response => {
        this.notification.show('success', 'Successfully uploaded')
        return response
      })
      .catch(error => error)
  }

  assign = async data => {
    const serviceSec = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcel/assign',
      data
    )
    return engine
      .promiseEngine(serviceSec)
      .then(response => {
        this.notification.show('success', 'Successfully Saved')
        return response
      })
      .catch()
  }

  accept = async data => {
    const serviceSec = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcel/accept',
      data,
      'form'
    )
    return engine
      .promiseEngine(serviceSec)
      .then(response => {
        this.notification.show('success', 'Successfully Saved')
        console.log(response)
        // this.component.setState({ Permission: obj })
      })
      .catch()
  }

  reject = async data => {
    const serviceSec = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcel/reject',
      data
    )
    return engine
      .promiseEngine(serviceSec)
      .then(response => {
        this.notification.show('success', 'Successfully Saved')
        console.log(response)
        // this.component.setState({ Permission: obj })
      })
      .catch()
  }

  deleteUploadFile = async data => {
    const serviceSec = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcelfile/del-cel-file',
      data
    )
    return engine
      .promiseEngine(serviceSec)
      .then(response => {
        this.notification.show('success', 'Successfully Delete File')
        console.log(response)
        // this.component.setState({ Permission: obj })
      })
      .catch(error => error)
  }

  exportFile = async data => {
    const serviceSec = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcel/export-pdf',
      data
    )
    return engine
      .promiseEngine(serviceSec)
      .then(response => {
        console.log(response)
        window.open(response)

        // this.component.setState({ Permission: obj })
      })
      .catch(() => {
        this.notification.show(
          'error',
          'The file size or amount exceeds the limited allowed.'
        )
      })
  }

  getDetail = async id => {
    const workflowHistoryList = new ApiPromiseCaller(
      'post',
      '/cedd_form.viewworkflowhistory/get-list',
      {
        formKey: 'CEL',
        '@formId': '$form.formId'
      },
      'workflowHistoryList[action, userName, position, actionDate]'
    )
    const formFileList = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcelfile/get-list',
      {
        celFileKey: 'FORM',
        '@formId': '$form.formId'
      },
      'formFileEntryIds[fileName, size, fileEntryId, createDate, fileUrl] '
    )
    const featureFileList = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcelfile/get-list',
      {
        celFileKey: 'FEATURE',
        '@formId': '$form.formId'
      },
      'featureFileEntryIds[fileName, size, fileEntryId, createDate, fileUrl] '
    )
    const specificFileList = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcelfile/get-list',
      {
        celFileKey: 'SPECIFIC',
        '@formId': '$form.formId'
      },
      'specificFileEntryIds[fileName, size, fileEntryId, createDate, fileUrl] '
    )
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_form.fmcel/get-cel-by-form-id',
      { formId: id },
      'form',
      [workflowHistoryList, formFileList, featureFileList, specificFileList]
    )
    return engine
      .promiseEngine(service)
      .then(response => {
        console.log(response)
        if (response.celType === 'CEL') {
          response.publicTwoAFlag = response.publicFlag
        } else {
          response.publicTwoBFlag = response.publicFlag
        }
        this.component.setState({ dataPackage: response, disabled: true })
      })
      .catch()
  }
}
