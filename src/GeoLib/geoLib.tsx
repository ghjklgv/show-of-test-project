import * as React from 'react'
import { Table, Select, Button } from 'antd'
// import { Link } from 'react-router-dom'
import GeoService from '../model/api/geoLib/geoLibService'
import * as moment from 'moment'
import './geoLib.css'
import { Link } from 'react-router-dom'
import { createHashHistory } from 'history'
import { PlusIcon, FilterUpIcon, FilterDownIcon } from '../components/icon'
const history = createHashHistory()
const filterUp = <FilterUpIcon style={{ color: '#47c36f', width: '8px' }} />
const filterDown = <FilterDownIcon style={{ color: '#47c36f', width: '8px' }} />
const filterNone = <FilterDownIcon style={{ color: '#0b2d79', width: '8px' }} />
// const expandArrow = <FilterUpIcon style={{ color: '#ffffff' }} />
interface IMyState {
  dataList: []
  Permission: {}
  sort: any
  pagination: any
  searchData: {
    status: string
    sqlSort: string
    start: number | null
    end: number | null
  }
  loading: boolean
}
const { Option } = Select
export default class GeoLib extends React.Component<any, IMyState> {
  geoService = new GeoService(this)
  constructor (props: any) {
    super(props)
    this.state = {
      sort: { submissionDate: '', requestNo: '' },
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        onChange: this.handleTablePage,
        status: '',
        sqlSort: '',
        start: 1,
        end: 20
      },
      Permission: {},
      searchData: { status: '', sqlSort: '', start: 1, end: 20 },
      dataList: [],
      loading: true
    }
    // console.log(this.state.pagination)
  }
  componentDidMount () {
    this.geoService.getTableData(this.state.pagination).catch()
  }
  handleChange = data => {
    const { pagination } = this.state
    pagination.status = data === '' ? null : data
    pagination.current = 1
    this.setState({ pagination, loading: true }, () => {
      this.geoService.getTableData(this.state.pagination).catch()
    })
  }
  onRowClick = data => {
    return {
      onClick: event => {
        if (data.status === 'Processing') {
          history.push('/GeoCreAndEdite/Processing/' + data.formId)
        }
        if (data.status === 'Assigned') {
          history.push('/GeoCreAndEdite/Assigned/' + data.formId)
        }
        if (data.status === 'Accepted') {
          history.push('/GeoCreAndEdite/Accepted/' + data.formId)
        }
        if (data.status === 'Rejected') {
          history.push('/GeoCreAndEdite/Rejected/' + data.formId)
        }
      }
    }
  }
  handleTableSort = (type, data, e) => {
    const { sort, pagination } = this.state
    pagination.current = 1
    for (const data of Object.keys(sort)) {
      if (data === type) {
        if (sort[type] === '') {
          sort[type] = 'DESC'
          pagination.sqlSort = type + ' DESC'
        } else if (sort[type] === 'DESC') {
          sort[type] = 'ASC'
          pagination.sqlSort = type + ' ASC'
        } else if (sort[type] === 'ASC') {
          sort[type] = ''
          pagination.sqlSort = ''
        }
      } else {
        sort[data] = ''
      }
    }
    this.setState({ sort, pagination, loading: true }, () => {
      this.geoService.getTableData(this.state.pagination).catch()
    })
  }
  handleTablePage = page => {
    const { pagination } = this.state
    pagination.current = page
    this.setState({ pagination, loading: true }, () => {
      this.geoService.getTableData(this.state.pagination).catch()
    })
  }
  render () {
    const columns = [
      {
        dataIndex: 'submissionDate',
        key: 'submissionDate',
        render (data, row) {
          return row ? moment(data).format('YYYY/MM/DD') : null
        },
        width: 200,
        fixed: 'left' as 'left',
        title: (
          <div
            onClick={this.handleTableSort.bind(
              this,
              'submissionDate',
              this.state.sort.submissionDate
            )}
            className='can-sort'
            style={{ cursor: 'pointer' }}
          >
            <span>Submission Date</span>
            {this.state.sort.submissionDate === ''
              ? filterNone
              : this.state.sort.submissionDate === 'ASC'
              ? filterUp
              : filterDown}
          </div>
        )
      },
      {
        dataIndex: 'requestNo',
        key: 'requestNo',
        width: 280,
        fixed: 'left' as 'left',
        title: (
          <div
            onClick={this.handleTableSort.bind(
              this,
              'requestNo',
              this.state.sort.requestNo
            )}
            className='can-sort'
            style={{ cursor: 'pointer' }}
          >
            <span>Request No.</span>
            {this.state.sort.requestNo === ''
              ? filterNone
              : this.state.sort.requestNo === 'ASC'
              ? filterUp
              : filterDown}
          </div>
        )
      },
      {
        title: 'Document Title',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Requestor',
        dataIndex: 'userName',
        key: 'docOwner',
        width: 280
      },
      {
        title: 'Application Status',
        dataIndex: 'status',
        key: 'status',
        width: 180,
        fixed: 'right' as 'right'
      }
    ]
    return (
      <div className='style'>
        <div className='geo-header-block'>
          <div className='geo-list-title'>
            <p>Civil Engineering Library</p>
          </div>
          <div>
            <Link to='/GeoCreAndEdite/create'>
              <Button className='plusButton'>
                <PlusIcon />
              </Button>
            </Link>
          </div>
        </div>
        <div className='geo-filter-block'>
          <div className='filter-block'>
            <p>Filter by status</p>
            <Select
              defaultValue='ALL'
              // style={{ width: 1 }}
              onChange={this.handleChange}
            >
              <Option value=''>ALL</Option>
              <Option value='Processing'>Processing</Option>
              <Option value='Assigned'>Assigned</Option>
              <Option value='Accepted'>Accepted</Option>
              <Option value='Rejected'>Rejected</Option>
            </Select>
          </div>
        </div>
        <div className='geo-table-block'>
          <Table
            pagination={this.state.pagination}
            onRow={this.onRowClick}
            rowKey='uuid'
            className='geo-table-style'
            dataSource={this.state.dataList}
            columns={columns}
            loading={this.state.loading}
            scroll={{ x: 1200 }}
          />
        </div>
      </div>
    )
  }
}
