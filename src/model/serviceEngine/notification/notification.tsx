import * as React from 'react'
import { Icon, notification } from 'antd'

const closeSvg = () => (
  <svg width='26' height='26' viewBox='0 0 26 26'>
    <path
      fill='#ffffff'
      d='M5.927 3.502L13 10.575l7.073-7.073a1.715 1.715 0 0 1 2.425 2.425L15.425 13l7.073 7.073a1.715 1.715 0 0 1-2.425 2.425L13 15.425l-7.073 7.073a1.715 1.715 0 0 1-2.425-2.425L10.575 13 3.502 5.927a1.715 1.715 0 0 1 2.425-2.425z'
    />
  </svg>
)
const CloseIcon = (props: any) => {
  return <Icon component={closeSvg} {...props} />
}

const notifySuccessSvg = () => (
  <svg width='26' height='26' viewBox='0 0 26 26'>
    <path
      fill='#47c36f'
      d='M25.318 3.69a2.37 2.37 0 0 1 0 3.327l-15.65 15.77a.714.714 0 0 1-1.013.005L.692 14.899a2.358 2.358 0 0 1-.027-3.31 2.314 2.314 0 0 1 3.29-.034l5.207 5.12L22.018 3.693a2.315 2.315 0 0 1 3.3-.002z'
    />
  </svg>
)
const NotifySuccessIcon = (props: any) => {
  return <Icon component={notifySuccessSvg} {...props} />
}

const notifyErrorSvg = () => (
  <svg width='32' height='32' viewBox='0 0 32 32'>
    <g fillRule='evenodd'>
      <circle cx='16' cy='16' r='16' fill='#ffffff' />
      <path
        fill='#df4242'
        d='M5.927 3.502L13 10.575l7.073-7.073a1.715 1.715 0 0 1 2.425 2.425L15.425 13l7.073 7.073a1.715 1.715 0 0 1-2.425 2.425L13 15.425l-7.073 7.073a1.715 1.715 0 0 1-2.425-2.425L10.575 13 3.502 5.927a1.715 1.715 0 0 1 2.425-2.425z'
        transform='translate(6.5,6.5) scale(0.75,0.75)'
      />
    </g>
  </svg>
)
const NotifyErrorIcon = (props: any) => {
  return <Icon component={notifyErrorSvg} {...props} />
}

export default class Notification {
  show (type: string, content: any) {
    let [iconType, time]: [any, any] = [null, 4.5]
    if (type === 'success') {
      iconType = <NotifySuccessIcon />
    } else if (type === 'error') {
      iconType = <NotifyErrorIcon />
      time = null
    }
    notification[type]({
      btn: <CloseIcon />,
      message: content,
      icon: iconType,
      className: 'global-notification global-notification-' + type,
      duration: time,
      onClose: () => {
        setTimeout(() => notification.destroy(), 1000)
      }
    })
  }

  destroy () {
    notification.destroy()
  }
}
