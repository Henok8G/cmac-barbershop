import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
    prompt: 'consent',
  });

  return NextResponse.redirect(authUrl);
}

export function getOAuth2Client() {
  return new google.auth.OAuth2(
    '1039678171151-jsqp4b77cpr6jp9u56152va0bgfqhi28.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/api/google-callback'
  );
}
