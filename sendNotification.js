const admin = require('firebase-admin');

const serviceAccount = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // to handle newline characters in Vercel env vars
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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
