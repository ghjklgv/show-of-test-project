import * as React from 'react'
import { Button } from 'antd'
import GeoBasicInf from './geoDetail/geoBasicInf'
import GeoDocGenLib from './geoDetail/geoDocGenLib'
import GeoDocGeoInfUnit from './geoDetail/geoDocGeoInfUnit'
import GeoResultSum from './geoDetail/geoResultSum'
import GeoUploadDoc from './geoDetail/geoUploadDoc'
import GeoWorkHistory from './geoDetail/geoWorkHistory'
import './geoLib.css'
import GeoService from '../model/api/geoLib/geoLibService'
import ApproverModel from './geoDetail/approverModel'
import AssignModel from './geoDetail/assignModel'
// import { Link } from 'react-router-dom'
import { createHashHistory } from 'history'
import { ArrowLeft } from '../components/icon'

const history = createHashHistory()
interface IMyProps {
  match?
}
interface IMyState {
  approvingUserIds: any
  assigningKey: number
  Permission: any
  approverVisible: boolean
  assignVisible: boolean
  dataPackage: any
  disabled: boolean
  userList: any[]
}

export default class GeoCreAndEdite extends React.Component<
  IMyProps,
  IMyState
> {
  geoService = new GeoService(this)
  constructor (props: any) {
    super(props)
    this.state = {
      approvingUserIds: [],
      assigningKey: 0,
      Permission: { Approving: false, Assigning: false },
      userList: [],
      disabled: false,
      approverVisible: false,
      assignVisible: false,
      dataPackage: {
        replyNo: '',
        isApprover: false,
        isExport: false,
        celType: 'CEL',
        title: '',
        consultant: '',
        contractor: null,
        author: null,
        clientDept: '',
        docOwner: null,
        report: '',
        publicFlag: null,
        publicTwoAFlag: null,
        publicTwoBFlag: false,
        owner: '',
        ownerOther: '',
        topLeftEast: '',
        topLeftNorth: '',
        topRightEast: '',
        topRightNorth: '',
        bottomLeftEast: '',
        bottomLeftNorth: '',
        bottomRightEast: '',
        bottomRightNorth: '',
        featureNo: null,
        featureEast: '',
        featureNorth: '',
        uploadFileFlag: false,
        specificFileEntryIds: [],
        featureFileEntryIds: [],
        formFileEntryIds: [],
        workflowHistoryList: [],
        reasonIsClassified: null,
        reasonIsDraftDoc: null,
        reasonIsHasCopy: null,
        reasonIsNotBound: null,
        reasonIsOthers: null,
        reasonIsUntitled: null,
        otherReasons: '',
        reason: ''
      }
    }
  }
  componentDidMount () {
    if (this.props.match.params.id) {
      this.geoService.getDetail(this.props.match.params.id).catch()
    }
  }
  dataOnChange = (changeData: any, type: any) => {
    if (type === 'celType') {
      if (changeData === 'CEL') {
        this.state.dataPackage.publicFlag = null
      } else if (type === 'celType') {
        this.state.dataPackage.publicFlag = null
      }
    }
    this.state.dataPackage[type] = changeData
    this.setState(this.state.dataPackage)
  }
  basicComponent = () => {
    return (
      <GeoBasicInf
        disabled={this.state.disabled}
        celType={this.state.dataPackage.celType}
        dataOnChange={this.dataOnChange}
        title={this.state.dataPackage.title}
        consultant={this.state.dataPackage.consultant}
        contractor={this.state.dataPackage.contractor}
        author={this.state.dataPackage.author}
        clientDept={this.state.dataPackage.clientDept}
        docOwner={this.state.dataPackage.docOwner}
      />
    )
  }
  geoDocGenLibComponent = () => {
    return (
      <GeoDocGenLib
        disabled={this.state.disabled}
        dataOnChange={this.dataOnChange}
        publicFlag={this.state.dataPackage.publicTwoAFlag}
        celType={this.state.dataPackage.celType}
      />
    )
  }
  geoDocGeoInfUnitComponent = () => {
    return (
      <GeoDocGeoInfUnit
        type={this.props.match.params.type}
        disabled={this.state.disabled}
        dataOnChange={this.dataOnChange}
        celType={this.state.dataPackage.celType}
        report={this.state.dataPackage.report}
        owner={this.state.dataPackage.owner}
        ownerOther={this.state.dataPackage.ownerOther}
        publicFlag={this.state.dataPackage.publicTwoBFlag}
        featureNo={this.state.dataPackage.featureNo}
        topLeftEast={this.state.dataPackage.topLeftEast}
        topRightNorth={this.state.dataPackage.topRightNorth}
        topRightEast={this.state.dataPackage.topRightEast}
        topLeftNorth={this.state.dataPackage.topLeftNorth}
        bottomLeftEast={this.state.dataPackage.bottomLeftEast}
        bottomLeftNorth={this.state.dataPackage.bottomLeftNorth}
        bottomRightEast={this.state.dataPackage.bottomRightEast}
        bottomRightNorth={this.state.dataPackage.bottomRightNorth}
        featureEast={this.state.dataPackage.featureEast}
        featureNorth={this.state.dataPackage.featureNorth}
        specificFileEntryIds={this.state.dataPackage.specificFileEntryIds}
        featureFileEntryIds={this.state.dataPackage.featureFileEntryIds}
      />
    )
  }
  geoResultSumComponent = () => {
    return (
      <GeoResultSum
        disabled={this.state.disabled}
        replyNo={this.state.dataPackage.replyNo}
        reasonIsClassified={this.state.dataPackage.reasonIsClassified}
        reasonIsDraftDoc={this.state.dataPackage.reasonIsDraftDoc}
        reasonIsHasCopy={this.state.dataPackage.reasonIsHasCopy}
        reasonIsNotBound={this.state.dataPackage.reasonIsNotBound}
        reasonIsOthers={this.state.dataPackage.reasonIsOthers}
        reasonIsUntitled={this.state.dataPackage.reasonIsUntitled}
        otherReasons={this.state.dataPackage.otherReasons}
      />
    )
  }
  geoUploadDocComponent = () => {
    return (
      <GeoUploadDoc
        disabled={this.state.disabled}
        dataOnChange={this.dataOnChange}
        uploadFileFlag={this.state.dataPackage.uploadFileFlag}
        formFileEntryIds={this.state.dataPackage.formFileEntryIds}
        type={this.props.match.params.type}
      />
    )
  }
  geoWorkHistoryComponent = () => {
    return (
      <GeoWorkHistory
        workflowHistoryList={this.state.dataPackage.workflowHistoryList}
      />
    )
  }
  getTitleControlButton = type => {
    console.log(type)
    switch (type) {
      case 'create':
        return this.titleCreateType()
      case 'Processing':
        if (this.state.Permission.Assigning) {
          return this.titleAcceptType()
        } else {
          return this.titleAcceptNoPerType()
        }
      case 'Assigned':
        if (this.state.Permission.Approving) {
          return this.titleApproverType()
        } else {
          return this.titleAcceptNoPerType()
        }
      case 'Accepted':
        return this.titleRejectedType()
      case 'Rejected':
        return this.titleRejectedType()
      default:
        return ''
    }
  }
  titleRejectedType = () => {
    return (
      <div className='title-bar'>
        <div className='bar-name'>
          {/* <Link to='/'> */}
          <div className='back-Style' onClick={this.toList}>
            <ArrowLeft />
            <p>Back</p>
          </div>
          {/* </Link> */}
        </div>
        <div className='event-button'>
          <div>
            {!this.state.dataPackage.isExport ? (
              ''
            ) : (
              <Button className='geo-detail-sent' onClick={this.onExport}>
                Export
              </Button>
            )}
            <Button className='geo-detail-sent' disabled={true} type='primary'>
              Replied
            </Button>
          </div>
        </div>
      </div>
    )
  }
  titleCreateType = () => {
    return (
      <div className='title-bar'>
        <div className='bar-name'>
          {this.props.match.type ? 'New Request' : 'New Request'}
        </div>
        <div className='event-button'>
          {/* <Link to='/'> */}
          <Button className='geo-detail-cancel' onClick={this.toList}>
            Cancel
          </Button>
          {/* </Link> */}
          <Button
            className='geo-detail-sent'
            onClick={this.saveGeo}
            type='primary'
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }
  titleAcceptNoPerType = () => {
    return (
      <div className='title-bar'>
        <div className='bar-name'>
          {/* <Link to='/'> */}
          <div className='back-Style' onClick={this.toList}>
            <ArrowLeft />
            <p>Back</p>
          </div>
          {/* </Link> */}
        </div>
      </div>
    )
  }
  titleAcceptType = () => {
    return (
      <div className='title-bar'>
        <div className='bar-name'>
          {/* <Link to='/'> */}
          <div className='back-Style' onClick={this.toList}>
            <ArrowLeft />
            <p>Back</p>
          </div>
          {/* </Link> */}
        </div>

        <div className='event-button'>
          <Button
            className='geo-detail-sent'
            onClick={this.assignModelChangeState.bind(this, true)}
            type='primary'
          >
            Assign
          </Button>
        </div>
      </div>
    )
  }
  titleApproverType = () => {
    return (
      <div className='title-bar'>
        <div className='bar-name'>
          {/* <Link to='/'> */}
          <div className='back-Style' onClick={this.toList}>
            <ArrowLeft />
            <p>Back</p>
          </div>
          {/* </Link> */}
        </div>
        <div className='event-button'>
          <Button
            className='geo-detail-sent'
            onClick={this.approverModelChangeState.bind(this, true)}
            disabled={!this.state.dataPackage.isApprover}
            type='primary'
          >
            Reply
          </Button>
        </div>
      </div>
    )
  }
  saveGeo = () => {
    if (this.state.dataPackage.celType === 'CEL') {
      this.state.dataPackage.publicFlag = this.state.dataPackage.publicTwoAFlag
      this.geoService
        .saveGeo(this.state.dataPackage)
        .then(() => {
          history.push('/')
        })
        .catch()
    } else {
      this.state.dataPackage.publicFlag = this.state.dataPackage.publicTwoBFlag
      this.geoService
        .saveGeo(this.state.dataPackage)
        .then(() => {
          history.push('/')
        })
        .catch()
    }
  }
  assignModelChangeState = (flag, e) => {
    this.setState({ assignVisible: flag })
  }
  approverModelChangeState = (flag, e) => {
    this.setState({ approverVisible: flag })
  }
  onExport = () => {
    this.geoService.exportFile({ formId: this.props.match.params.id }).catch()
  }
  toList = () => {
    history.push('/')
  }
  // }
  render () {
    return (
      <div className='style'>
        {this.props.match.params.type === 'Processing' ? (
          <AssignModel
            approvingUserIds={this.state.approvingUserIds}
            id={this.props.match.params.id}
            assignModelChangeState={this.assignModelChangeState}
            assignVisible={this.state.assignVisible}
          />
        ) : (
          ''
        )}
        {this.props.match.params.type === 'Assigned' ? (
          <ApproverModel
            id={this.props.match.params.id}
            celType={this.state.dataPackage.celType}
            approverModelChangeState={this.approverModelChangeState}
            approverVisible={this.state.approverVisible}
          />
        ) : (
          ''
        )}
        {this.getTitleControlButton(this.props.match.params.type)}
        <div className='geo-detail-block'>{this.basicComponent()}</div>
        <div className='geo-detail-block'>{this.geoDocGenLibComponent()}</div>
        <div className='geo-detail-block'>
          {this.geoDocGeoInfUnitComponent()}
        </div>
        <div className='geo-detail-block'>{this.geoUploadDocComponent()}</div>
        {this.props.match.params.type === 'Assigned' ||
        this.props.match.params.type === 'Processing' ||
        this.props.match.params.type === 'create' ? (
          ''
        ) : (
          <div className='geo-detail-block'>{this.geoResultSumComponent()}</div>
        )}
        {this.props.match.params.type === 'create' ? (
          ''
        ) : (
          <div className='geo-detail-block'>
            {this.geoWorkHistoryComponent()}
          </div>
        )}
        
      </div>
    )
  }
}
