import * as React from 'react'
import { notification } from 'antd'
import { IcDelete, IcTick } from './icon'

export default class Notification {
  show (type: string, content: any) {
    let [iconType, time]: [any, any] = [null, 4.5]
    if (type === 'success') {
      iconType = (
        <div className='notification-icon'>
          <IcTick />
        </div>
      )
    } else if (type === 'error') {
      iconType = (
        <div className='notification-icon'>
          <IcDelete />
        </div>
      )
      time = 3
    }
    console.log(time)
    notification[type]({
      // btn: <CloseIcon />,
      message: content,
      icon: iconType,
      className: 'notification-' + type,
      duration: 4,
      onClose: () => {
        setTimeout(() => notification.destroy(), 1000)
      }
    })
  }

  destroy () {
    notification.destroy()
  }
}
