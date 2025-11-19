import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const bookings: any[] = []; // if you are using an in-memory array

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { date, time, name, service, specialRequest, clientId } = data;

  if (!clientId) {
    return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
  }

  // 1️⃣ Google Calendar setup
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: "REPLACE_WITH_YOUR_TOKEN" });


  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  // 2️⃣ Prepare event times
  const startDateTime = new Date(`${date}T${time}`).toISOString();
  const endDateTime = new Date(new Date(`${date}T${time}`).getTime() + 30 * 60 * 1000).toISOString();

  // 3️⃣ Insert event to Google Calendar
  let calendarEvent;
  try {
    calendarEvent = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: `Barbershop: ${service}`,
        description: `Appointment for ${name}${specialRequest ? ` - Note: ${specialRequest}` : ''}`,
        start: { dateTime: startDateTime, timeZone: 'Africa/Addis_Ababa' },
        end: { dateTime: endDateTime, timeZone: 'Africa/Addis_Ababa' },
      },
    });

    console.log('✅ Booking added to Google Calendar');
  } catch (err) {
    console.error('❌ Failed to add booking to Google Calendar:', err);
  }

  // 4️⃣ Save booking in memory with Google event ID
  const booking = {
    id: Date.now(),
    date,
    time,
    name,
    service,
    specialRequest: specialRequest || '',
    clientId,
    googleEventId: calendarEvent?.data.id, // store event ID
  };
  console.log('Google Event ID:', calendarEvent?.data.id);


  bookings.push(booking);

  return NextResponse.json({ message: 'Booking saved!', booking });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get('clientId');
  const bookingId = searchParams.get('bookingId');

  if (!clientId || !bookingId) {
    return NextResponse.json({ message: 'Missing clientId or bookingId' }, { status: 400 });
  }

  const index = bookings.findIndex(b => b.id.toString() === bookingId && b.clientId === clientId);
  if (index === -1) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  bookings.splice(index, 1); // remove booking

  return NextResponse.json({ message: 'Booking cancelled successfully' });
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get('clientId');
  const bookingId = searchParams.get('bookingId');
  let body;
  try {
    await calendar.events.update({
      calendarId: "primary",
      eventId: booking.googleEventId,
      requestBody: {
        summary: `Barbershop: ${booking.service}`,
        description: `Appointment for ${booking.name}`,
        start: { dateTime: startDateTime, timeZone: "Africa/Addis_Ababa" },
        end: { dateTime: endDateTime, timeZone: "Africa/Addis_Ababa" },
      },
    });
    console.log('✅ Google Calendar event updated');
  } catch (err) {
    console.error('❌ Failed to update Google Calendar:', err);
    return NextResponse.json({ message: 'Failed to update Google Calendar', error: err }, { status: 500 });
  }

  const { date, time } = body;

  console.log("📌 PATCH Request Received:", {
    clientId,
    bookingId,
    newDate: date,
    newTime: time
  });

  if (!clientId || !bookingId || !date || !time) {
    return NextResponse.json({ message: 'Missing data' }, { status: 400 });
  }

  const booking = bookings.find(b => b.id.toString() === bookingId && b.clientId === clientId);
  if (!booking) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  booking.date = date;
  booking.time = time;

  if (booking.googleEventId) {
    try {
      const oAuth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
      );
      oAuth2Client.setCredentials({ refresh_token: "REPLACE_WITH_YOUR_TOKEN" });

      const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

      const startDateTime = new Date(`${date}T${time}`).toISOString();
      const endDateTime = new Date(new Date(`${date}T${time}`).getTime() + 30 * 60 * 1000).toISOString();

      const updatedEvent = await calendar.events.update({
        calendarId: "primary",
        eventId: booking.googleEventId,
        requestBody: {
          summary: `Barbershop: ${booking.service}`,
          description: `Appointment for ${booking.name}`,
          start: { dateTime: startDateTime, timeZone: "Africa/Addis_Ababa" },
          end: { dateTime: endDateTime, timeZone: "Africa/Addis_Ababa" },
        },
      });

      console.log('✅ Google Calendar event updated', updatedEvent.data.id);
    } catch (err) {
      console.error('❌ Failed to update Google Calendar:', err);
      return NextResponse.json({ message: 'Failed to update Google Calendar', error: err }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Booking rescheduled successfully', booking });
}

export async function GET(request: NextRequest) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    // If no date, redirect to auth URL
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
      prompt: 'consent',
    });
    return NextResponse.redirect(authUrl);
  }

  // Example barber calendars
  const barberCalendars = ['primary', 'barber1@gmail.com', 'barber2@gmail.com'];
  const startOfDay = new Date(`${date}T00:00:00`);
  const endOfDay = new Date(`${date}T23:59:59`);
  const startHour = 9;
  const endHour = 18;
  const slotMinutes = 30;
  const slots: Record<string, string[]> = {};

  for (const calendarId of barberCalendars) {
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
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
          availableSlots.push(slot.toTimeString().slice(0, 5));
        }
      }
    }
    slots[calendarId] = availableSlots;
  }

  return NextResponse.json(slots);
}
