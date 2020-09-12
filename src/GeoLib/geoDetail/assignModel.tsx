import * as React from 'react'
import { Row, Col, Modal, Select } from 'antd'
import GeoService from '../../model/api/geoLib/geoLibService'
import '../geoLib.css'
import { createHashHistory } from 'history'
const history = createHashHistory()
interface IMyState {
  approvingUserIds: any
  selectUser: any
}
const { Option } = Select

export default class AssignModel extends React.PureComponent<any, IMyState> {
  geoService = new GeoService(this)
  constructor (props: any) {
    super(props)
    this.state = {
      approvingUserIds: [],
      selectUser: []
    }
  }
  selectLOption = () => {
    return this.props.approvingUserIds.map(data => (
      <Option key={data.userId}>{data.userName}</Option>
    ))
  }
  handleChange = data => {
    this.setState({ selectUser: data })
  }
  sentData = () => {
    const obj = {
      formId: this.props.id,
      approvingUserIds: this.state.selectUser
    }
    this.geoService
      .assign(obj)
      .then(() => {
        console.log('sented')
        history.push('/')
        this.props.assignModelChangeState.bind(this, false)
      })
      .catch()
  }
  render () {
    console.log('AssignModel')
    return (
      <Modal
        // bodyStyle={{ height: '100%' }}
        okText='Assign'
        className='geo-assignModel-style'
        title='Assign to'
        visible={this.props.assignVisible}
        onOk={this.sentData}
        onCancel={this.props.assignModelChangeState.bind(this, false)}
        okButtonProps={{
          disabled: this.state.selectUser.length !== 0 ? false : true
        }}
      >
        <div>
          <Row gutter={16}>
            <div>
              <Col className='gutter-row' span={32}>
                <div className='assign-content-block'>
                  <div className='gutter-box'>Assign the request to</div>
                  <Select
                    mode='multiple'
                    //   size={size}
                    disabled={this.props.disabled}
                    placeholder='Please select'
                    //   defaultValue={['a10', 'c12']}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  >
                    {this.selectLOption()}
                  </Select>
                </div>
              </Col>
            </div>
          </Row>
        </div>
      </Modal>
    )
  }
}
