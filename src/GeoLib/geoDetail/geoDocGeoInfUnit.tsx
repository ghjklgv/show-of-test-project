import * as React from 'react'
import {
  Row,
  Col,
  Radio,
  Input,
  Table,
  Button,
  Upload,
  Tooltip,
  Modal
} from 'antd'
import { TableColumHKGridCoordinates } from './tableColumFormat'
import GeoService from '../../model/api/geoLib/geoLibService'
import {
  InforIcon,
  DeleteCircle,
  InforDisabledIcon
} from '../../components/icon'
import Notification from '../../components/notification'
import '../geoLib.css'
interface IMyState {
  key: number
  coordinatesSite: any
  coordinatesFeature: any
  visible: boolean
}
const { TextArea } = Input
const columns = new TableColumHKGridCoordinates()
export default class GeoDocGeoInfUnit extends React.PureComponent<
  any,
  IMyState
> {
  notification = new Notification()
  geoService = new GeoService(this)
  shapefileList: any = []
  gridfileList: any = []

  constructor (props: any) {
    super(props)
    this.state = {
      key: 0,
      coordinatesSite: [],
      coordinatesFeature: [],
      visible: false
    }
  }
  dataOnChange = (type: any, data: any) => {
    if (type === 'publicTwoBFlag' && data.target.value) {
      data.target.value = false
      this.onOpen()
    }
    this.props.dataOnChange(data.target.value, type)
  }
  coordinatesUpload = file => {
    if (this.checkFileCanUpload(file, this.props.specificFileEntryIds, 'shapefileList')) {
      this.shapefileList.push(file.name)
      this.geoService
        .upLoadFile(file)
        .then(res => {
          const obj = {
            fileNum: this.state.coordinatesSite.length + 1,
            fileName: file.name,
            size: file.size,
            createDate: file.lastModified,
            fileUrl: res.data[0].fileUrl
          }
          this.props.specificFileEntryIds.push(res.data[0].fileId)
          this.state.coordinatesSite.push(obj)
          this.setState(this.state.coordinatesSite)
        })
        .catch(error => {
          this.notification.show('error', error.data.exception)
        })
    }
    return false
  }
  gridHKLoadFile = (file) => {
    if (this.checkFileCanUpload(file, this.props.featureFileEntryIds, 'gridfileList')) {
      this.gridfileList.push(file.name)
      this.geoService
        .upLoadFile(file)
        .then(res => {
          const obj = {
            fileNum: this.state.coordinatesFeature.length + 1,
            fileName: file.name,
            size: file.size,
            createDate: file.lastModified,
            fileUrl: res.data[0].fileUrl
          }
          this.props.featureFileEntryIds.push(res.data[0].fileId)
          this.state.coordinatesFeature.push(obj)
          this.setState(this.state.coordinatesFeature)
        })
        .catch(error => {
          this.notification.show('error', error.data.exception)
        })
    }
    return false
  }
  checkDisabed = () => {
    if (this.props.disabled) {
      return true
    } else {
      if (this.props.celType === 'CEL') {
        return true
      } else {
        return false
      }
    }
  }
  onClose = () => {
    this.setState({ visible: false })
  }
  onOpen = () => {
    this.setState({ visible: true })
  }
  checkFileCanUpload = (file, list, key) => {
    if (file.size >= 1000000) {
      this.notification.show('error', 'The file size or amount exceeds the limited allowed')
      return false
    } else if (list.length >= 50) {
      this.notification.show('error', 'The file size or amount exceeds the limited allowed')
      return false
    } else if (this[key].includes(file.name)) {
      this.notification.show('error', 'File can not be duplicated')
      return false
    } else {
      return true
    }
  }
  deleteUploadFile = (index, text, e) => {
    if (text === 'coordinatesFeature') {
      const obj = {
        fileId: this.props.featureFileEntryIds[index]
      }
      this.geoService
        .deleteUploadFile(obj)
        .then(() => {
          this.gridfileList.splice(index, 1)
          this.state.coordinatesFeature.splice(index, 1)
          this.props.featureFileEntryIds.splice(index, 1)

          this.setState(this.state.coordinatesFeature, () => {
            this.setState({ key: this.state.key + 1 })
          })
        })
        .catch(error => {
          this.notification.show('error', error.data.exception)
        })
    } else {
      const obj = {
        fileId: this.props.specificFileEntryIds[index]
      }
      this.geoService
        .deleteUploadFile(obj)
        .then(() => {
          this.shapefileList.splice(index, 1)
          this.state.coordinatesSite.splice(index, 1)
          this.props.specificFileEntryIds.splice(index, 1)
          this.setState(this.state.coordinatesSite, () => {
            this.setState({ key: this.state.key + 1 })
          })
        })
        .catch(error => {
          this.notification.show('error', error.data.exception)
        })
    }
  }
  render () {
    console.log('GeoDocGeoInfUnit')
    const warringTtile = () => {
      return (
        <div className='warring-model-model-templete-title'>
          <DeleteCircle />
          <p>Public Disclosure</p>
        </div>
      )
    }
    const dataSource = [
      {
        key: '1',
        name: 'Easting',
        topLeft: this.props.topLeftEast,
        topRight: this.props.topRightEast,
        bottomLeft: this.props.bottomLeftEast,
        bottomRight: this.props.bottomRightEast,
        topLeftKey: 'topLeftEast',
        topRightKey: 'topRightEast',
        bottomLeftKey: 'bottomLeftEast',
        bottomRighKey: 'bottomRightEast'
      },
      {
        key: '2',
        name: 'Northing',
        topLeft: this.props.topLeftNorth,
        topRight: this.props.topRightNorth,
        bottomLeft: this.props.bottomLeftNorth,
        bottomRight: this.props.bottomRightNorth,
        topLeftKey: 'topLeftNorth',
        topRightKey: 'topRightNorth',
        bottomLeftKey: 'bottomLeftNorth',
        bottomRighKey: 'bottomRightNorth'
      }
    ]

    const dataSourceGrid = [
      {
        key: '1',
        name: 'Grid Coordinates',
        featureEast: this.props.featureEast,
        featureNorth: this.props.featureNorth,
        featureEastKey: 'featureEast',
        featureNorthKey: 'featureNorth'
      }
    ]
    return (
      <div className='content-block'>
        <div className='content-Title'>
          <p>PART IIB: DOCUMENTS FOR THE GEOTECHNICAL INFORMATION UNIT</p>
        </div>
        <div className='content-template'>
          <Modal
            width={620}
            // style={{ width: '620px', height: '300px' }}
            title={warringTtile()}
            visible={this.state.visible}
            onCancel={this.onClose}
            cancelText='OK'
            className='warring-model-model-templete'
          >
            <div className='warring-model-content'>
              <p>
                It is accepted that they are not the document owners and do not
                have the authority to release interpretative reports. They
                should answer “No” to the above question.
              </p>
            </div>
          </Modal>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={6}>
                <div className='gutter-box'>
                  <p> The report is</p>
                  <label
                    htmlFor=''
                    style={{ marginRight: '10px', color: '#000000' }}
                  >
                    *
                  </label>
                  {this.props.disabled ? (
                    <InforDisabledIcon />
                  ) : (
                    <Tooltip
                      placement='bottomLeft'
                      title={
                        'GEO District Divisions are required to submit Interpretative reports in supports of Government projects, and both Factual and Interpretative reports in supports if private projects, to the GIU.'
                      }
                    >
                      <InforIcon />
                    </Tooltip>
                  )}
                </div>
              </Col>
              <Col className='gutter-row' span={12}>
                <Radio.Group
                  disabled={this.checkDisabed() ? true : false}
                  onChange={this.dataOnChange.bind(this, 'report')}
                  name='radiogroup'
                  defaultValue={this.props.report}
                  value={this.props.report}
                >
                  <Radio value={'Factual'}>Factual</Radio>

                  {this.props.disabled ? (
                    <InforDisabledIcon style={{ marginRight: '52px' }} />
                  ) : (
                    <Tooltip
                      placement='bottomLeft'
                      title={
                        'Factual reports from both Govt. and private developments are made available to the public'
                      }
                    >
                      <InforIcon style={{ marginRight: '52px' }} />
                    </Tooltip>
                  )}
                  <Radio value={'Interpretative'}>Interpretative</Radio>
                </Radio.Group>
              </Col>
            </div>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={6}>
                <div className='gutter-box'>
                  <p style={{ width: '324px' }}>
                    If this is an Interpretative report, can it be made
                    available to the public?
                  </p>
                  <label htmlFor='' style={{ color: '#000000' }}>
                    *
                  </label>
                </div>
              </Col>
              <Col className='gutter-row' span={12}>
                <Radio.Group
                  disabled={this.checkDisabed() ? true : false}
                  onChange={this.dataOnChange.bind(this, 'publicTwoBFlag')}
                  name='radiogroup'
                  defaultValue={this.props.publicFlag}
                  value={this.props.publicFlag}
                >
                  <Radio value={true} style={{ marginRight: '100px' }}>
                    Yes{' '}
                  </Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Col>
            </div>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={6}>
                <div className='gutter-box'>
                  <p> The document owner is</p>
                  <label htmlFor='' style={{ color: '#000000' }}>
                    *
                  </label>
                </div>
              </Col>
              <Col className='gutter-row' span={28}>
                <div className='radio-input-block'>
                  <Radio.Group
                    disabled={this.checkDisabed() ? true : false}
                    onChange={this.dataOnChange.bind(this, 'owner')}
                    name='radiogroup'
                    defaultValue={this.props.owner}
                    value={this.props.owner}
                  >
                    <Radio value={'Gov'}>Hong Kong SAR Government </Radio>
                    <div className='radio-input-other'>
                      <Radio value={'Other'}>Other (please specify)</Radio>
                      <TextArea
                        maxLength={500}
                        style={{ marginTop: '18px', marginBottom: '6px' }}
                        disabled={
                          this.checkDisabed() || this.props.owner !== 'Other'
                            ? true
                            : false
                        }
                        onChange={this.dataOnChange.bind(this, 'ownerOther')}
                        value={this.props.ownerOther}
                        autosize={{ minRows: 5, maxRows: 8 }}
                      />
                      <p>(500 characters)</p>
                    </div>
                  </Radio.Group>
                </div>
              </Col>
            </div>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={32}>
                <div style={{ marginBottom: '20px' }}>
                  For site-specific documents, please provide below the HK grid
                  coordinates of the site:
                </div>
                <div className='content-coordinates-table-style'>
                  <Table
                    pagination={false}
                    dataSource={dataSource}
                    columns={columns.getColumHKGridCoordinates(
                      this.dataOnChange,
                      'create',
                      this.checkDisabed() ? true : false
                    )}
                  />
                </div>
              </Col>
            </div>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={32}>
                <div className='uploadButtonTemplete'>
                  <Upload
                    name='file'
                    accept='.cpg,.dbf,.sbn,.sbx,.shp,.shx,.prj,.sml'
                    disabled={this.checkDisabed() ? true : false}
                    beforeUpload={this.coordinatesUpload}
                    showUploadList={false}
                  >
                    <Button
                      disabled={this.checkDisabed() ? true : false}
                      type='primary'
                      icon='upload'
                      size='default'
                    >
                      Upload Shapefile
                    </Button>
                  </Upload>
                  <label>(1MB / file)</label>
                </div>

                <div className='content-upload-table-style'>
                  <Table
                    locale={{ emptyText: 'No Shapefile' }}
                    pagination={false}
                    dataSource={
                      this.props.type === 'create'
                        ? this.state.coordinatesSite
                        : this.props.specificFileEntryIds
                    }
                    // dataSource={this.state.coordinatesSite}
                    columns={columns.tableColumUploadFomat(
                      this.checkDisabed() ? true : false,
                      this.deleteUploadFile,
                      'coordinatesSite'
                    )}
                  />
                </div>
              </Col>
            </div>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={32}>
                <p style={{ marginBottom: '20px', marginTop: '100px' }}>
                  For documents related to slope features, please provide below
                  the HK grid coordinates of the feature(s)
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '14px'
                  }}
                >
                  <label
                    htmlFor=''
                    style={{ width: '140px', color: '#000000' }}
                  >
                    Feature No.
                  </label>
                  <Input
                    disabled={this.checkDisabed() ? true : false}
                    value={this.props.featureNo}
                    onChange={this.dataOnChange.bind(this, 'featureNo')}
                    style={{ width: '250px' }}
                    type='text'
                  />
                </div>
                <div className='content-coordinates-table-style'>
                  <Table
                    pagination={false}
                    dataSource={dataSourceGrid}
                    columns={columns.tableColumDocumentsRelated(
                      this.dataOnChange,
                      'create',
                      this.checkDisabed() ? true : false
                    )}
                  />
                </div>
              </Col>
            </div>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={32}>
                <div className='uploadButtonTemplete'>
                  <Upload
                    accept='.cpg,.dbf,.sbn,.sbx,.shp,.shx,.prj,.sml'
                    disabled={this.checkDisabed() ? true : false}
                    name='file'
                    beforeUpload={this.gridHKLoadFile}
                    showUploadList={false}
                  >
                    <Button
                      disabled={this.checkDisabed() ? true : false}
                      type='primary'
                      icon='upload'
                      size='default'
                      // onClick={this.upLoadFile}
                    >
                      Upload Shapefile
                    </Button>
                  </Upload>
                  <label>(1MB / file)</label>
                </div>
                <div className='content-upload-table-style'>
                  <Table
                    locale={{ emptyText: 'No Shapefile' }}
                    pagination={false}
                    dataSource={
                      this.props.type === 'create'
                        ? this.state.coordinatesFeature
                        : this.props.featureFileEntryIds
                    }
                    columns={columns.tableColumUploadFomat(
                      this.checkDisabed() ? true : false,
                      this.deleteUploadFile,
                      'coordinatesFeature'
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
