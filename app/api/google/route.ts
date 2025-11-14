import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  const oAuth2Client = new google.auth.OAuth2(
    '1039678171151-jsqp4b77cpr6jp9u56152va0bgfqhi28.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/api/google-callback'
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });

  // 🚀 Redirect user directly to Google's OAuth page
  return NextResponse.redirect(authUrl);
}