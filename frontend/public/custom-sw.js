self.addEventListener('notificationclick', event => {
  const notification = event.notification
  event.waitUntil(
    // eslint-disable-next-line no-undef
    clients.matchAll().then(clis => {
      const client = clis.find(c => c.visibilityState === 'visible')
      if (client) {
        client.navigate(notification.data)
        client.focus()
      } else {
        // eslint-disable-next-line no-undef
        clients.openWindow(notification.data)
      }
      notification.close()
    })
  )
})

self.addEventListener('push', event => {
  const { title, body, data } = JSON.parse(event.data.text())
  event.waitUntil(
    self.registration.showNotification(title, { body, data: data.url, vibrate: [200, 100, 200] })
  )
})
