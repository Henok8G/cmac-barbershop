import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// ---- MAIN HANDLER ----
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
    const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  if (!date) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
    prompt: 'consent',
  });
    return NextResponse.redirect(authUrl);
  }

  if (!date) {
    return NextResponse.json({ error: 'Missing date parameter' }, { status: 400 });
  }

  // Example barber calendars (you can replace these with your real barbers)
  const barberCalendars = [
    'primary', // default main calendar
    'barber1@gmail.com',
    'barber2@gmail.com'
  ];

  const startOfDay = new Date(`${date}T00:00:00`);
  const endOfDay = new Date(`${date}T23:59:59`);

  const startHour = 9; // 9 AM
  const endHour = 18;  // 6 PM
  const slotMinutes = 30;

  const slots: Record<string, string[]> = {};
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client,
});


  for (const calendarId of barberCalendars) {
    const events = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const busyTimes =
      events.data.items?.map((e) => new Date(e.start?.dateTime || '').getTime()) || [];

    const availableSlots: string[] = [];

    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += slotMinutes) {
        const slot = new Date(date);
        slot.setHours(h, m, 0, 0);

        const isBusy = busyTimes.some(
          (bt) => Math.abs(bt - slot.getTime()) < slotMinutes * 60 * 1000
        );

        if (!isBusy) {
          const timeStr = slot.toTimeString().slice(0, 5);
          availableSlots.push(timeStr);
        }
      }
    }

    slots[calendarId] = availableSlots;
  }

  return NextResponse.json(slots);
}
