import { ErrorCodes, Notifications } from '../../constants'
import { Routes } from '../../containers/routes'
import { PUSH_REGISTER, PUSH_UNREGISTER } from '../../graphql'
import PUBLIC_VAPID_KEY from '../../publicVapidKey'
import { notificationError, notificationSuccess } from '../notifications'

export const handleSubmit = async ({
  values,
  cb,
  refetchQuery,
  initialValues,
  resetForm,
  history,
  message
}) => {
  try {
    await cb({
      variables: values,
      refetchQueries: [{ query: refetchQuery, variables: { limit: 10, offset: 0 } }]
    })
    resetForm(initialValues)
    notificationSuccess(message)
  } catch (error) {
    handleErrors(error, history)
  }
}

export const handleUpdate = async ({ values, cb, message, history, refetchQuery }) => {
  try {
    refetchQuery
      ? await cb({
          variables: values,
          refetchQueries: [{ query: refetchQuery, variables: { _id: values._id } }]
        })
      : await cb({
          variables: values
        })
    notificationSuccess(message)
  } catch (error) {
    handleErrors(error, history)
  }
}

export const handleDelete = async ({ cb, message, history }) => {
  try {
    await cb()
    history.goBack()
    notificationSuccess(message)
  } catch (error) {
    handleErrors(error, history)
  }
}

export const handleRegister = async ({ values, cb, message, history }) => {
  try {
    await cb({
      variables: values
    })
    history.push(Routes.LOGIN.path)
    notificationSuccess(message)
  } catch (error) {
    handleErrors(error, history)
  }
}

export const handlePasswordResetRequest = async ({ values, cb, message, history }) => {
  try {
    await cb({
      variables: values
    })
    notificationSuccess(message)
  } catch (error) {
    handleErrors(error, history)
  }
}

export const handleErrors = (error, history) => {
  const errorCode = error.graphQLErrors[0].message
  if (errorCode === ErrorCodes.UNAUTHENTICATED) {
    history.push(Routes.LOGIN.path)
    notificationError(Notifications.UNAUTHENTICATED)
  } else if (errorCode === ErrorCodes.VALIDATION_ERROR) {
    notificationError(Notifications.VALIDATION_ERROR)
  } else if (errorCode === ErrorCodes.REQ_OVERLAP) {
    notificationError(Notifications.REQ_OVERLAP)
  } else if (errorCode === ErrorCodes.AUTH_EXISTS) {
    notificationError(Notifications.AUTH_EXISTS)
  } else if (errorCode === ErrorCodes.UNAUTHORIZED) {
    notificationError(Notifications.UNAUTHORIZED)
  } else if (errorCode === ErrorCodes.AUTH_DOESNT_EXIST) {
    notificationError(Notifications.AUTH_DOESNT_EXIST)
  } else if (errorCode === ErrorCodes.TOKEN_EXPIRED) {
    notificationError(Notifications.TOKEN_EXPIRED)
  } else {
    notificationError()
  }
}

export const handleLogin = async ({ values, cb, refetchQuery }) => {
  try {
    await cb({
      variables: values,
      refetchQueries: [{ query: refetchQuery }]
    })
  } catch (error) {
    const errorCode = error.graphQLErrors[0].message
    if (errorCode === ErrorCodes.UNAUTHENTICATED) {
      notificationError(Notifications.INVALID_LOGIN)
    } else if (errorCode === ErrorCodes.AUTH_NOT_ACTIVATED) {
      notificationError(Notifications.AUTH_NOT_ACTIVATED)
    } else {
      notificationError()
    }
  }
}

export const isRouteAllowed = (allowedRoles, authRoles) =>
  allowedRoles.some(role => authRoles.includes(role))

export const pushUnsubscribe = function({ client, setSubscription }) {
  navigator.serviceWorker.ready.then(registration => {
    //Find the registered push subscription in the service worker
    registration.pushManager
      .getSubscription()
      .then(subscription => {
        if (!subscription) {
          return
          //If there isn't a subscription, then there's nothing to do
        }

        subscription
          .unsubscribe()
          .then(successful =>
            client
              .mutate({
                mutation: PUSH_UNREGISTER,
                variables: { pushSubscriptionInput: subscription.toJSON() }
              })
              .then(result => setSubscription(null))
          )
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  })
}

export const pushSubscribe = function({ client, setSubscription, authId }) {
  navigator.serviceWorker.ready.then(registration => {
    if (!registration.pushManager) {
      alert('Push Unsupported')
      return
    }

    registration.pushManager
      .subscribe({
        userVisibleOnly: true, //Always display notifications
        applicationServerKey: PUBLIC_VAPID_KEY
      })
      .then(subscription =>
        client
          .mutate({
            mutation: PUSH_REGISTER,
            variables: { pushSubscriptionInput: subscription.toJSON(), authId }
          })
          .then(result => setSubscription(subscription))
      )
      .catch(err => console.error('Push subscription error: ', err))
  })
}

export const mapStatusToText = status => {
  switch (status) {
    case 'approved':
      return 'schválena'
    case 'rejected':
      return 'zamítnuta'
    case 'canceled':
      return 'zrušena'
    case 'done':
      return 'provedena'
    default:
      return 'neschválena'
  }
}
