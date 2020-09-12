import ApiEngine from '../../serviceMethod/serviceMethod'
import ApiPromiseCaller from '../../serviceEngine/apiCaller/apiPromiseCaller'
import * as moment from 'moment'

const engine = new ApiEngine()
// const notification = new Notification()

export default class ExportCsvService {
  component: React.Component<any, any, any>

  constructor (component: React.Component<any, any, any>) {
    this.component = component
  }
  getExportData = async (apiUrl: any, data: any) => {
    if (data.attendeeUserId === '') {
      data.attendeeUserId = 0
    }
    if (data.divisionId === '') {
      data.divisionId = 0
    }
    const service = new ApiPromiseCaller(
      'post',
      '/cedd_training.viewattendee/' + apiUrl,
      data
    )
    return engine.promiseEngine(service).then(response => {
      for (const data of response) {
        data.overseas = data.overseasFlag ? 'Overseas' : 'Local'
        data.startTime = moment(data.startDateTime).format('hh:mm A')
        data.endTime = moment(data.endDateTime).format('hh:mm A')
        data.startDate = moment(data.startDateTime).format('YYYY/MM/DD')
        data.endDate = moment(data.endDateTime).format('YYYY/MM/DD')
      }
      for (const data of response) {
        for (const answers of data.evaluationAnswers) {
          data[answers.questionId] = answers.answerKey
        }
      }
      this.component.setState({
        excelData: response
      })
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
      response.push({ columnName: 'Overseas/Local', questionId: 'overseas' })
      response.push({
        columnName: 'is record from Other Depart',
        questionId: 'isOtherDepart'
      })
      response.push({ columnName: 'Created By', questionId: 'createBy' })
      return response
    })
  }
}
