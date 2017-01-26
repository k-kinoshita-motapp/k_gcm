'use strict';

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  // サンプルでは固定のメッセージを通知するようにしています。
  // 動的にユーザーごとにメッセージを変えたい場合は、
  // ペイロードの暗号化を行うか、FetchAPIで動的に情報を取得する必要があります。
  var DD = new Date();
  var Year = DD.getYear();
  var Month = DD.getMonth() + 1;
  var Day = DD.getDate();
  var Hours = DD.getHours();
  var Minutes = DD.getMinutes();
  var Seconds = DD.getSeconds();
  var title = '['+Hours+':'+Minutes+':'+Seconds+':'+']失礼致します';
  var body = '機能は随分お楽しみでしたね？';
  var icon = 'new_icon.jpg?170124';
  var tag = 'simple-push-demo-notification-tag';
  var url = 'https://www.npa.go.jp/';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      data: {
        url: url
      }
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

 var notoficationURL = "/"
  if (event.notification.data.url) {
    notoficationURL = event.notification.data.url
  }
  
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow(notoficationURL);
    }
  }));
});
