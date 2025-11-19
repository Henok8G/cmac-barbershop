import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request: NextRequest) {
  // Debug environment variables
  console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
  console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET);
  console.log('Redirect URI:', process.env.GOOGLE_REDIRECT_URI);

  // Initialize Google OAuth client
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  // If no code, redirect user to Google consent screen
  if (!code) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
      prompt: 'consent',
    });

    return NextResponse.redirect(authUrl);
  }

  try {
    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    console.log('✅ Google Tokens Received:', tokens);

    // Return success HTML page
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

    // Always return a JSON error response
    return NextResponse.json(
      { error: 'Failed to get access token', details: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
