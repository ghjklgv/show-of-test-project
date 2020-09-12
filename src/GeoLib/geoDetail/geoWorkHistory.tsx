import * as React from 'react'
import { Row, Col, Table } from 'antd'
import '../geoLib.css'
import { TableColumHKGridCoordinates } from './tableColumFormat'
const columns = new TableColumHKGridCoordinates()

interface IMyState {}

export default class GeoWorkHistory extends React.PureComponent<any, IMyState> {
  render () {
    console.log('GeoWorkHistory')
    return (
      <div className='content-block'>
        <div className='content-Title'>
          <p>WORKFLOW HISTORY</p>
        </div>
        <div className='content-template'>
          <Row gutter={16}>
            <Col className='gutter-row' span={32}>
              <div className='content-upload-table-style'>
                <Table
                  pagination={false}
                  dataSource={this.props.workflowHistoryList}
                  columns={columns.tableColumHistory()}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
