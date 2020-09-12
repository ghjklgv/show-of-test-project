import * as React from 'react'
import { Row, Col, Radio, Table, Button, Upload, Modal } from 'antd'
import { TableColumHKGridCoordinates } from './tableColumFormat'
import GeoService from '../../model/api/geoLib/geoLibService'
import { DeleteCircle } from '../../components/icon'
import Notification from '../../components/notification'
import '../geoLib.css'
interface IMyState {
  key: any
  docUpload: any
  visible: boolean
}
const columns = new TableColumHKGridCoordinates()

export default class GeoUploadDoc extends React.PureComponent<any, IMyState> {
  geoService = new GeoService(this)
  notification = new Notification()
  uploadfileList: any = []

  constructor (props: any) {
    super(props)
    this.state = {
      key: 0,
      visible: false,
      docUpload: []
    }
  }
  dataOnChange = (type: any, data: any) => {
    if (type === 'uploadFileFlag' && !data.target.value) {
      this.onOpen()
    }
    this.props.dataOnChange(data.target.value, type)
  }
  upLoadFile = file => {
    if (this.checkFileCanUpload(file)) {
      this.uploadfileList.push(file.name)
      this.geoService
        .upLoadFile(file)
        .then(res => {
          const obj = {
            fileNum: this.state.docUpload.length + 1,
            fileName: file.name,
            size: file.size,
            createDate: file.lastModified,
            fileUrl: res.data[0].fileUrl
          }
          this.props.formFileEntryIds.push(res.data[0].fileId)
          this.state.docUpload.push(obj)
          this.setState(this.state.docUpload)
        })
        .catch(error => {
          this.notification.show('error', error.data.exception)
        })
    }
    return false
  }
  checkFileCanUpload = file => {
    if (file.size >= 500000000) {
      this.notification.show('error', 'The file size or amount exceeds the limited allowed')
      return false
    } else if (this.props.formFileEntryIds.length >= 10) {
      this.notification.show('error', 'The file size or amount exceeds the limited allowed')
      return false
    } else if (this.uploadfileList.includes(file.name)) {
      this.notification.show('error', 'File can not be duplicated')
      return false
    } else {
      return true
    }
  }
  checkDisabed = () => {
    if (this.props.disabled) {
      return true
    } else {
      return false
    }
  }
  onClose = () => {
    this.setState({ visible: false })
  }
  onOpen = () => {
    this.setState({ visible: true })
  }
  deleteUploadFile = (index, text, e) => {
    const obj = {
      fileId: this.props.formFileEntryIds[index]
    }
    this.geoService
      .deleteUploadFile(obj)
      .then(() => {
        this.uploadfileList.splice(index, 1)
        this.state.docUpload.splice(index, 1)
        this.props.formFileEntryIds.splice(index, 1)
        this.setState(this.state.docUpload, () => {
          this.setState({ key: this.state.key + 1 })
        })
      })
      .catch(error => {
        this.notification.show('error', error.data.exception)
      })
  }
  render () {
    console.log('GeoUploadDoc')
    const warringTtile = () => {
      return (
        <div className='warring-model-model-templete-title'>
          <DeleteCircle />
          <p>Documents to be Submitted</p>
        </div>
      )
    }
    return (
      <div className='content-block'>
        <div className='content-Title'>
          <p>PART III: UPLOAD DOCUMENT</p>
        </div>
        <Modal
          title={warringTtile()}
          visible={this.state.visible}
          onCancel={this.onClose}
          cancelText='OK'
          className='warring-model-model-templete'
        >
          <div className='warring-model-content'>
            <p>
              Please mark the request number of this application on the
              documents to be submitted.
            </p>
          </div>
        </Modal>
        <div className='content-template'>
          <Row gutter={16}>
            <Col className='gutter-row' span={32}>
              <Radio.Group
                name='radiogroup'
                disabled={this.checkDisabed() ? true : false}
                defaultValue={this.props.uploadFileFlag}
                value={this.props.uploadFileFlag}
                onChange={this.dataOnChange.bind(this, 'uploadFileFlag')}
              >
                <Radio value={true}>
                  I ATTACH HEREWITH the documents as stated in my application.{' '}
                </Radio>
                <Radio value={false}>
                  I WILL SUBMIT the documents as stated in my application.
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={32}>
                <div className='uploadButtonTemplete'>
                  <Upload
                    name='file'
                    disabled={this.checkDisabed() ? true : false}
                    beforeUpload={this.upLoadFile}
                    showUploadList={false}
                  >
                    <Button
                      type='primary'
                      icon='upload'
                      size='default'
                      disabled={this.checkDisabed() ? true : false}
                      // onClick={this.upLoadFile}
                    >
                      Upload Shapefile
                    </Button>
                  </Upload>
                  <label>(500MB / file)</label>
                </div>
                <div className='content-upload-table-style'>
                  <Table
                    locale={{ emptyText: 'No Document' }}
                    pagination={false}
                    dataSource={
                      this.props.type === 'create'
                        ? this.state.docUpload
                        : this.props.formFileEntryIds
                    }
                    columns={columns.tableColumUploadFomat(
                      this.checkDisabed() ? true : false,
                      this.deleteUploadFile,
                      'docUpload'
                    )}
                  />
                </div>
              </Col>
            </div>
          </Row>
        </div>
      </div>
    )
  }
}
