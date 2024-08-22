// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { sendPushNotification } = require('./sendNotification');

const app = express();
app.use(bodyParser.json());

// Default route to check if the server is running
app.get('/', (req, res) => {
  res.status(200).send('Server is up and running!');
});

// API endpoint to send a push notification
app.post('/send-notification', (req, res) => {
  const { token, title, body, data } = req.body;

  if (!token || !title || !body) {
    return res.status(400).send('Missing required fields: token, title, or body');
  }

  sendPushNotification(token, title, body, data);
  res.status(200).send('Notification sent');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
