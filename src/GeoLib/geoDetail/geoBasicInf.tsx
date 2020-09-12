import * as React from 'react'
import { Row, Col, Radio, Input, Tooltip } from 'antd'
import '../geoLib.css'
import { InforIcon, SlashIcon, InforDisabledIcon } from '../../components/icon'

interface IMyState {}

export default class GeoBasicInf extends React.PureComponent<any, IMyState> {
  //   service = new EvaluationService(this)
  constructor (props: any) {
    super(props)
    // this.state = {
    // }
  }
  dataOnChange = (type: any, data: any) => {
    this.props.dataOnChange(data.target.value, type)
  }
  render () {
    console.log('GeoBasicInf')
    return (
      <div className='content-block'>
        <div className='content-Title'>
          <p>PART I: BASIC INFORMATION</p>
        </div>
        <div className='content-template'>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={6}>
                <div className='gutter-box'>
                  <p>The document is submitted to</p>
                  <label htmlFor='' style={{ color: '#000000' }}>
                    *
                  </label>
                </div>
              </Col>
              <Col className='gutter-row' span={12}>
                <Radio.Group
                  disabled={this.props.disabled}
                  name='radiogroup'
                  defaultValue={this.props.celType}
                  value={this.props.celType}
                  onChange={this.dataOnChange.bind(this, 'celType')}
                >
                  <div className='content-readio-flex'>
                    <Radio value={'CEL'}>General Library</Radio>
                    {this.props.disabled ? (
                      <InforDisabledIcon style={{ marginRight: '100px' }} />
                    ) : (
                      <Tooltip
                        placement='bottomLeft'
                        title={
                          'General reference material, periodicals, internal reports, and non-site-specific reports plus, inter alia, LPM Stage 1, 2 and 3 Reports'
                        }
                      >
                        <InforIcon style={{ marginRight: '100px' }} />
                      </Tooltip>
                    )}
                    <Radio value={'GIU'}>Geotechnical Information Unit</Radio>
                    {this.props.disabled ? (
                      <InforDisabledIcon />
                    ) : (
                      <Tooltip
                        placement='bottomLeft'
                        title={'Site-specific geotechnical data and reports'}
                      >
                        <InforIcon />
                      </Tooltip>
                    )}
                  </div>
                </Radio.Group>
              </Col>
            </div>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={6}>
                <div className='gutter-box'>
                  <p>Document Title</p>
                  <label htmlFor='' style={{ color: '#000000' }}>
                    *
                  </label>
                </div>
              </Col>
              <Col className='gutter-row' span={11}>
                <Input
                  disabled={this.props.disabled}
                  value={this.props.title}
                  onChange={this.dataOnChange.bind(this, 'title')}
                />
              </Col>
            </div>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={6}>
                <div className='content-two-row-style'>
                  <div className='gutter-box'>
                    <p>Consultant / Contractor / Author</p>
                    <label htmlFor='' style={{ color: '#000000' }}>
                      *
                    </label>
                  </div>
                  <label>(please fill in at least one item)</label>
                </div>
              </Col>
              <Col className='gutter-row' span={5}>
                <div style={{ display: 'flex' }}>
                  <Input
                    disabled={this.props.disabled}
                    value={this.props.consultant}
                    onChange={this.dataOnChange.bind(this, 'consultant')}
                  />
                </div>
              </Col>
              <Col className='gutter-row' span={1}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <SlashIcon />
                </div>
              </Col>
              <Col className='gutter-row' span={5}>
                <div style={{ display: 'flex' }}>
                  <Input
                    disabled={this.props.disabled}
                    value={this.props.contractor}
                    onChange={this.dataOnChange.bind(this, 'contractor')}
                  />
                </div>
              </Col>
              <Col className='gutter-row' span={1}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <SlashIcon />
                </div>
              </Col>
              <Col className='gutter-row' span={5}>
                <div style={{ display: 'flex' }}>
                  <Input
                    disabled={this.props.disabled}
                    value={this.props.author}
                    onChange={this.dataOnChange.bind(this, 'author')}
                  />
                </div>
              </Col>
            </div>
          </Row>
          <Row gutter={16}>
            <div className='content-row-margin'>
              <Col className='gutter-row' span={6}>
                <div className='content-two-row-style'>
                  <div className='gutter-box'>
                    <p>Client Department / Document Owner</p>
                    <label htmlFor='' style={{ color: '#000000' }}>
                      *
                    </label>
                  </div>
                  <label>(please fill in at least one item)</label>
                </div>
              </Col>
              <Col className='gutter-row' span={5}>
                <div style={{ display: 'flex' }}>
                  <Input
                    disabled={this.props.disabled}
                    value={this.props.clientDept}
                    onChange={this.dataOnChange.bind(this, 'clientDept')}
                  />
                </div>
              </Col>
              <Col className='gutter-row' span={1}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <SlashIcon />
                </div>
              </Col>
              <Col className='gutter-row' span={5}>
                <div style={{ display: 'flex' }}>
                  <Input
                    disabled={this.props.disabled}
                    value={this.props.docOwner}
                    onChange={this.dataOnChange.bind(this, 'docOwner')}
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
