const vapidPublicKey =
  'BOMFiuPeRG8gZKUXWkwBtZCDIQHT4ZwkTig9LGpP_wg9ow0jQRa0eQ70-SKf54Rq1fzVql4cQNqNm98_HA9Gy2w'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default urlBase64ToUint8Array(vapidPublicKey)
