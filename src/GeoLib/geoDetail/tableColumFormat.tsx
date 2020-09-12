import * as React from 'react'
import { Input } from 'antd'
import * as moment from 'moment'
import { BinIcon } from '../../components/icon'

export class TableColumHKGridCoordinates {
  getColumHKGridCoordinates = (onChangeFun, type, disabledFlag) => {
    return [
      {
        title: 'Grid Coordinates',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Top Left',
        dataIndex: 'topLeft',
        className: disabledFlag ? 'inputTdStyleDisabled' : 'inputTdStyle',
        key: 'topLeft',
        render: (text, record, index) => {
          return (
            <div className='coordinat-table-content'>
              {disabledFlag ? (
                <p>{text}</p>
              ) : (
                <Input
                  disabled={disabledFlag}
                  onChange={onChangeFun.bind(this, record.topLeftKey)}
                />
              )}
            </div>
          )
        }
      },
      {
        title: 'Top Right',
        dataIndex: 'topRight',
        className: disabledFlag ? 'inputTdStyleDisabled' : 'inputTdStyle',
        key: 'topRight',
        render: (text, record, index) => {
          return (
            <div className='coordinat-table-content'>
              {disabledFlag ? (
                <p>{text}</p>
              ) : (
                <Input
                  disabled={disabledFlag}
                  onChange={onChangeFun.bind(this, record.topRightKey)}
                />
              )}
            </div>
          )
        }
      },
      {
        title: 'Bottom Left',
        dataIndex: 'bottomLeft',
        className: disabledFlag ? 'inputTdStyleDisabled' : 'inputTdStyle',
        key: 'bottomLeft',
        render: (text, record, index) => {
          return (
            <div className='coordinat-table-content'>
              {disabledFlag ? (
                <p>{text}</p>
              ) : (
                <Input
                  disabled={disabledFlag}
                  onChange={onChangeFun.bind(this, record.bottomLeftKey)}
                />
              )}
            </div>
          )
        }
      },
      {
        title: 'Bottom Right',
        dataIndex: 'bottomRight',
        className: disabledFlag ? 'inputTdStyleDisabled' : 'inputTdStyle',
        key: 'bottomRight',
        render: (text, record, index) => {
          return (
            <div className='coordinat-table-content'>
              {disabledFlag ? (
                <p>{text}</p>
              ) : (
                <Input
                  disabled={disabledFlag}
                  onChange={onChangeFun.bind(this, record.bottomRighKey)}
                />
              )}
            </div>
          )
        }
      }
    ]
  }
  tableColumDocumentsRelated = (onChangeFun, type, disabledFlag) => {
    return [
      {
        title: '',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Easting',
        dataIndex: 'featureEast',
        key: 'featureEast',
        className: disabledFlag ? 'inputTdStyleDisabled' : 'inputTdStyle',
        render: (text, record, index) => {
          return (
            <div className='coordinat-table-content'>
              {disabledFlag ? (
                <p>{text}</p>
              ) : (
                <Input
                  disabled={disabledFlag}
                  onChange={onChangeFun.bind(this, record.featureEastKey)}
                />
              )}
            </div>
          )
        }
      },
      {
        title: 'Northing',
        dataIndex: 'featureNorth',
        key: 'featureNorth',
        className: disabledFlag ? 'inputTdStyleDisabled' : 'inputTdStyle',
        render: (text, record, index) => {
          return (
            <div className='coordinat-table-content'>
              {disabledFlag ? (
                <p>{text}</p>
              ) : (
                <Input
                  disabled={disabledFlag}
                  onChange={onChangeFun.bind(this, record.featureNorthKey)}
                />
              )}
            </div>
          )
        }
      }
    ]
  }
  tableColumUploadFomat = (disabledFlag, uploadFunc, dataTitle) => {
    return [
      {
        title: 'NO',
        dataIndex: 'fileNum',
        key: 'fileNum',
        render: (text, record, index) => {
          return index + 1
        }
      },
      {
        title: 'Date Created',
        dataIndex: 'createDate',
        key: 'createDate',
        render: (text, record, index) => {
          return moment(text).format('YYYY/MM/DD  h:mm')
        }
      },
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        render: (text, record, index) => {
          if (text === 0) return '0 Bytes'
          const k = 1024
          const dm = 2
          const sizes = [
            'Bytes',
            'KB',
            'MB',
            'GB',
            'TB',
            'PB',
            'EB',
            'ZB',
            'YB'
          ]
          const i = Math.floor(Math.log(text) / Math.log(k))
          return (
            parseFloat((text / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
          )
        }
      },
      {
        title: 'File Name',
        dataIndex: 'fileUrl',
        key: 'fileUrl',
        render: (text, record, index) => {
          return (
            <div>
              {disabledFlag ? (
                <a href={text} target='_blank'>
                  {record.fileName}
                </a>
              ) : (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <a href={text} target='_blank'>
                    {record.fileName}{' '}
                  </a>
                  <BinIcon onClick={uploadFunc.bind(this, index, dataTitle)} />
                </div>
              )}
            </div>
          )
        }
      }
    ]
  }
  tableColumHistory = () => {
    return [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action'
      },
      {
        title: 'Date',
        dataIndex: 'actionDate',
        key: 'actionDate',
        render: (text, record, index) => {
          return moment(text).format('YYYY/MM/DD  h:mm')
        }
      },
      {
        title: 'Name',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position'
      }
    ]
  }
}
