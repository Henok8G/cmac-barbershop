// getRefreshToken.js
const dotenv = require('dotenv');
dotenv.config();

const { google } = require('googleapis');
const readline = require('readline');

// Create an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Generate auth URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar'],
  prompt: 'consent',
});

console.log('Authorize this app by visiting this url:', authUrl);

// Ask for code
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code) => {
  rl.close();
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    console.log('✅ Refresh token:', tokens.refresh_token);
  } catch (error) {
    console.error('Error retrieving access token', error);
  }
});
