import * as React from 'react'
import { Row, Col, Radio, Input, Checkbox, Modal, Button } from 'antd'
import '../geoLib.css'
import GeoService from '../../model/api/geoLib/geoLibService'
import { createHashHistory } from 'history'
const history = createHashHistory()
interface IMyState {
  data: any
  loading: boolean
}
const { TextArea } = Input

export default class ApproverModel extends React.PureComponent<any, IMyState> {
  geoService = new GeoService(this)
  constructor (props: any) {
    super(props)
    this.state = {
      data: {
        type: 'Accepted',
        formId: this.props.id,
        reasonIsClassified: false,
        reasonIsDraftDoc: false,
        reasonIsHasCopy: false,
        reasonIsNotBound: false,
        reasonIsOthers: false,
        reasonIsUntitled: false,
        otherReasons: '',
        replyNo: ''
      },
      loading: false
    }
  }
  onChangeType = data => {
    this.state.data.type = data.target.value
    this.setState(this.state.data)
  }
  onSave = data => {
    this.setState(
      {
        loading: true
      },
      () => {
        if (this.state.data.type === 'Accepted') {
          this.geoService
            .accept({ formId: this.props.id, replyNo: this.state.data.replyNo })
            .then(() => {
              this.props.approverModelChangeState.bind(this, false)
              history.push('/')
            })
            .catch(() => {
              this.setState({
                loading: false
              })
            })
        } else {
          this.geoService
            .reject(this.state.data)
            .then(() => {
              this.props.approverModelChangeState.bind(this, false)
              history.push('/')
            })
            .catch(() => {
              this.setState({
                loading: false
              })
            })
        }
      }
    )
  }
  onChangeData = (type, data) => {
    this.state.data[type] = data.target.checked
    this.setState(this.state.data)
  }
  onTextDataChange = (type, data) => {
    this.state.data[type] = data.target.value
    this.setState(this.state.data)
  }
  render () {
    console.log('ApproverModel')

    return (
      <Modal
        className='geo-approverModel-style'
        title='Reply Slip'
        visible={this.props.approverVisible}
        onOk={this.onSave}
        onCancel={this.props.approverModelChangeState.bind(this, false)}
        footer={[
          <Button
            key='cancel'
            onClick={this.props.approverModelChangeState.bind(this, false)}
          >
            Cancel
          </Button>,
          <Button
            key='reply'
            onClick={this.onSave}
            disabled={
              !(
                (this.state.data.type === 'Accepted' &&
                  this.state.data.replyNo !== '') ||
                (this.state.data.type === 'Rejected' &&
                  (this.state.data.reasonIsClassified ||
                    this.state.data.reasonIsDraftDoc ||
                    this.state.data.reasonIsHasCopy ||
                    this.state.data.reasonIsNotBound ||
                    this.state.data.reasonIsUntitled ||
                    (this.state.data.reasonIsOthers &&
                      this.state.data.otherReasons !== '')))
              )
            }
            loading={this.state.loading}
            type='primary'
          >
            Reply
          </Button>
        ]}
      >
        <div className='content-block'>
          <div>
            <Row gutter={16}>
              <div className='content-row-margin'>
                <Col className='gutter-row' span={6}>
                  <div className='gutter-box'>The application is</div>
                </Col>
                <Col className='gutter-row' span={9}>
                  <Radio.Group
                    name='radiogroup'
                    onChange={this.onChangeType}
                    value={this.state.data.type}
                    // disabled={this.checkDisabed() ? true : false}
                  >
                    <Radio value={'Accepted'}>Accepted</Radio>
                    <Radio value={'Rejected'}>Rejected</Radio>
                  </Radio.Group>
                </Col>
              </div>
            </Row>
            <Row gutter={16}>
              <div className='content-row-margin'>
                <Col className='gutter-row' span={6}>
                  <div className='gutter-box'>Report No.</div>
                </Col>
                <Col className='gutter-row' span={6}>
                  <Input
                    onChange={this.onTextDataChange.bind(this, 'replyNo')}
                    disabled={
                      this.props.celType === 'GIU'
                        ? this.state.data.type === 'Rejected'
                          ? true
                          : false
                        : true
                    }
                  />
                </Col>
              </div>
            </Row>
            <Row gutter={16}>
              <div className='content-row-margin'>
                <Col className='gutter-row' span={6}>
                  <div className='gutter-box'>Accession No.</div>
                </Col>
                <Col className='gutter-row' span={6}>
                  <Input
                    onChange={this.onTextDataChange.bind(this, 'replyNo')}
                    disabled={
                      this.props.celType === 'CEL'
                        ? this.state.data.type === 'Rejected'
                          ? true
                          : false
                        : true
                    }
                  />
                </Col>
              </div>
            </Row>
            <Row gutter={16}>
              <div className='content-row-margin'>
                <Col className='gutter-row' span={6}>
                  <div className='gutter-box'>
                    Document is returned for the following reason(s):
                  </div>
                </Col>
                <Col className='gutter-row' span={16}>
                  {/* <Checkbox.Group
                    style={{ width: '100%' }}
                    // disabled={this.checkDisabed() ? true : false}
                  > */}
                  <div className='geo-lib-checkboxStyle'>
                    <Checkbox
                      checked={this.state.data.reasonIsHasCopy}
                      onChange={this.onChangeData.bind(this, 'reasonIsHasCopy')}
                      disabled={
                        this.state.data.type === 'Accepted' ? true : false
                      }
                    >
                      The CEL / GIU already has a copy{' '}
                    </Checkbox>
                    <Checkbox
                      checked={this.state.data.reasonIsDraftDoc}
                      onChange={this.onChangeData.bind(
                        this,
                        'reasonIsDraftDoc'
                      )}
                      disabled={
                        this.state.data.type === 'Accepted' ? true : false
                      }
                    >
                      The document is a draft document
                    </Checkbox>
                    <Checkbox
                      checked={this.state.data.reasonIsNotBound}
                      onChange={this.onChangeData.bind(
                        this,
                        'reasonIsNotBound'
                      )}
                      disabled={
                        this.state.data.type === 'Accepted' ? true : false
                      }
                    >
                      The document is not probably bound
                    </Checkbox>
                    <Checkbox
                      checked={this.state.data.reasonIsUntitled}
                      onChange={this.onChangeData.bind(
                        this,
                        'reasonIsUntitled'
                      )}
                      disabled={
                        this.state.data.type === 'Accepted' ? true : false
                      }
                    >
                      The document is untitled
                    </Checkbox>
                    <Checkbox
                      checked={this.state.data.reasonIsClassified}
                      onChange={this.onChangeData.bind(
                        this,
                        'reasonIsClassified'
                      )}
                      disabled={
                        this.state.data.type === 'Accepted' ? true : false
                      }
                    >
                      The document is classified as Restricted, Confidential or
                      under a higher category
                    </Checkbox>
                    <Checkbox
                      onChange={this.onChangeData.bind(this, 'reasonIsOthers')}
                      checked={this.state.data.reasonIsOthers}
                      disabled={
                        this.state.data.type === 'Accepted' ? true : false
                      }
                    >
                      Other reasons:
                    </Checkbox>
                  </div>
                  <div style={{ paddingLeft: '20px' }}>
                    <TextArea
                      onChange={this.onTextDataChange.bind(
                        this,
                        'otherReasons'
                      )}
                      autosize={{ minRows: 5, maxRows: 8 }}
                      disabled={
                        this.state.data.type === 'Accepted' ? true : false
                      }
                    />
                  </div>
                  {/* </Checkbox.Group> */}
                </Col>
              </div>
            </Row>
          </div>
        </div>
      </Modal>
    )
  }
}
