import * as React from 'react'
import { Row, Col, Radio } from 'antd'
// import EvaluationService from '../model/api/evaluation/evaluationService'
// import { Link } from 'react-router-dom'
import '../geoLib.css'
interface IMyState {}

export default class GeoDocGenLib extends React.PureComponent<any, IMyState> {
  //   service = new EvaluationService(this)
  constructor (props: any) {
    super(props)
    // this.state = {
    // }
  }
  dataOnChange = (type: any, data: any) => {
    this.props.dataOnChange(data.target.value, type)
  }
  checkDisabed = () => {
    if (this.props.disabled) {
      return true
    } else {
      if (this.props.celType === 'GIU') {
        return true
      } else {
        return false
      }
    }
  }
  render () {
    console.log('GeoDocGenLib')
    return (
      <div className='content-block'>
        <div className='content-Title'>
          <p>PART IIA: DOCUMENTS FOR THE GENERAL LIBRARY</p>
        </div>
        <div className='content-template'>
          <Row gutter={16}>
            <Col className='gutter-row' span={6}>
              <div className='gutter-box'>
                <p style={{ width: '335px' }}>
                  Can the document be made available to the public?
                </p>
                <label htmlFor='' style={{ color: '#000000' }}>
                  *
                </label>
              </div>
            </Col>
            <Col className='gutter-row' span={6}>
              <Radio.Group
                disabled={this.checkDisabed() ? true : false}
                name='radiogroup'
                defaultValue={this.props.publicFlag}
                value={this.props.publicFlag}
                onChange={this.dataOnChange.bind(this, 'publicTwoAFlag')}
              >
                <Radio value={true}>Yes </Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
