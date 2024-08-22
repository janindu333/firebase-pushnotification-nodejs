// sendNotification.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with your actual path

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/**
 * Sends a push notification to a specific device.
 * @param {string} token - The FCM token of the device to send the notification to.
 * @param {string} title - The title of the notification.
 * @param {string} body - The body of the notification.
 * @param {object} data - Optional additional data to send with the notification.
 */
function sendPushNotification(token, title, body, data = {}) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
    data: data
  };

  admin.messaging().send(message)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
}

module.exports = { sendPushNotification };
