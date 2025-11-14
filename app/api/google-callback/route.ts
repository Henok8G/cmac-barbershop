import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const CLIENT_ID = '1039678171151-jsqp4b77cpr6jp9u56152va0bgfqhi28.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/api/google-callback';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code found in query params' });
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    console.log('✅ Google Tokens Received:', tokens);

    // For testing — show success in browser
    return new NextResponse(
      `<h1 style="font-family:sans-serif;color:#22c55e;text-align:center;margin-top:40px;">
        ✅ Google Calendar Connected Successfully!
      </h1>
      <pre style="background:#111;color:#ccc;padding:20px;border-radius:8px;max-width:600px;margin:20px auto;overflow:auto;">
        ${JSON.stringify(tokens, null, 2)}
      </pre>`,
      { headers: { 'Content-Type': 'text/html' } }
    );

  } catch (err) {
    console.error('❌ Error getting tokens:', err);
    return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
  }
}
