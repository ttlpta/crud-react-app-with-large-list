import React, { useGlobal, useDispatch, addCallback } from 'reactn'

import NotificationPopupWrapper from './NotificationPopupWrapper'
import { notificationReducer } from '../../reducers'

export default function NotificationPopup (props) {
  const [notification] = useGlobal('notification')
  const showNotification = useDispatch(notificationReducer.show)

  addCallback(global => {
    if (global.notification.show) {
      setTimeout(() => {
        showNotification({ show: false })
      }, 1500)
    }

    return null
  })

  return (
    <NotificationPopupWrapper
      className={`${notification.type} ${notification.show ? 'show' : ''}`}
    >
      {notification.message}
    </NotificationPopupWrapper>
  )
}
