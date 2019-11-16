import { notification } from 'antd'
import { Notifications } from '../../constants'

notification.config({
  duration: 3
})

export const notificationSuccess = description => {
  notification['success']({
    message: Notifications.SUCCESS,
    description
  })
}

export const notificationError = description => {
  notification['error']({
    message: Notifications.ERROR,
    description: description || Notifications.ERROR_DESCRIPTION
  })
}
