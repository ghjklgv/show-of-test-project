import * as React from 'react'
import { Row, Col, Radio, Input, Checkbox } from 'antd'
// import EvaluationService from '../model/api/evaluation/evaluationService'
// import { Link } from 'react-router-dom'
import '../geoLib.css'
interface IMyState {
  type: string
}
const { TextArea } = Input

export default class GeoResultSum extends React.PureComponent<any, IMyState> {
  //   service = new EvaluationService(this)
  constructor (props: any) {
    super(props)
    this.state = {
      type: ''
    }
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
  chenkType = () => {
    if (
      !this.props.reasonIsHasCopy &&
      !this.props.reasonIsDraftDoc &&
      !this.props.reasonIsNotBound &&
      !this.props.reasonIsUntitled &&
      !this.props.reasonIsClassified &&
      !this.props.reasonIsOthers
    ) {
      return 'Accepted'
    } else {
      return 'Rejected'
    }
  }
  render () {
    console.log('GeoResultSum')
    return (
      <div className='content-block'>
        <div className='content-Title'>
          <p>PART IV: RESULT SUMMARY</p>
        </div>
        <div>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={6}>
                <div className='gutter-box'>The application is</div>
              </Col>
              <Col className='gutter-row' span={9}>
                <Radio.Group
                  name='radiogroup'
                  defaultValue={this.chenkType()}
                  value={this.chenkType()}
                  disabled={this.checkDisabed() ? true : false}
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
                  value={this.props.replyNo}
                  disabled={this.checkDisabed() ? true : false}
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
                <Input disabled={this.checkDisabed() ? true : false} />
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
              <Col className='gutter-row' span={12}>
                <div className='geo-lib-checkboxStyle'>
                  <Checkbox
                    checked={this.props.reasonIsHasCopy}
                    disabled={this.checkDisabed() ? true : false}
                  >
                    The CEL / GIU already has a copy{' '}
                  </Checkbox>
                  <Checkbox
                    checked={this.props.reasonIsDraftDoc}
                    disabled={this.checkDisabed() ? true : false}
                  >
                    The document is a draft document
                  </Checkbox>
                  <Checkbox
                    checked={this.props.reasonIsNotBound}
                    disabled={this.checkDisabed() ? true : false}
                  >
                    The document is not probably bound
                  </Checkbox>
                  <Checkbox
                    checked={this.props.reasonIsUntitled}
                    disabled={this.checkDisabed() ? true : false}
                  >
                    The document is untitled
                  </Checkbox>
                  <Checkbox
                    checked={this.props.reasonIsClassified}
                    disabled={this.checkDisabed() ? true : false}
                  >
                    The document is classified as Restricted, Confidential or
                    under a higher category
                  </Checkbox>
                  <Checkbox
                    defaultChecked={this.props.reasonIsOthers}
                    checked={this.props.reasonIsOthers}
                    disabled={this.checkDisabed() ? true : false}
                  >
                    Other reasons:
                  </Checkbox>
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  <TextArea
                    value={this.props.otherReasons}
                    autosize={{ minRows: 5, maxRows: 8 }}
                    disabled={this.checkDisabed() ? true : false}
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
