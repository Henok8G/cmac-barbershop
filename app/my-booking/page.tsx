'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillNav from '../components/PillNav';

export default function MyBookingPage() {
  type Booking = {
    id: string;
    service: string;
    date: string;
    time: string;
    [key: string]: any;
  };
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

useEffect(() => {
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return;

  const fetchBookings = async () => {
    const res = await fetch(`/api/bookings?clientId=${clientId}`);
    const data = await res.json();
    setBookings(data as Booking[]);
  };

  fetchBookings();
}, []);

  const handleReschedule = async () => {
  if (!selectedBooking) return;
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return;

  try {
    const res = await fetch(`/api/bookings?clientId=${clientId}&bookingId=${selectedBooking.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: rescheduleDate, time: rescheduleTime }),
    });

    if (!res.ok) throw new Error('Failed to reschedule booking');

    // Update local state
    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id ? { ...b, date: rescheduleDate, time: rescheduleTime } : b
      )
    );

    setSelectedBooking(null);
    alert('Booking rescheduled successfully!');
  } catch (err) {
    console.error(err);
    alert('Failed to reschedule booking.');
  }
};


  const handleCancel = async (bookingId: string) => {
  const clientId = localStorage.getItem('clientId');
  if (!clientId) return;

  try {
    const res = await fetch(`/api/bookings?clientId=${clientId}&bookingId=${bookingId}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to cancel booking');

    // Remove the booking from state
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    setSelectedBooking(null);
    alert('Booking cancelled successfully!');
  } catch (err) {
    console.error(err);
    alert('Failed to cancel booking.');
  }
};


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

  <div className="bg-gray-900 text-white flex flex-col items-center justify-start pt-20">
  {/* Header Bar */}
    <PillNav
    logo="/assets/logo.png"
    logoAlt="Company Logo"
    items={[
      { label: 'Home', href: '/home' },
      { label: 'Book', href: '/booking' },
      { label: 'Services', href: '/home#services' },
      { label: 'About', href: '/about' },
      { label: 'Appointment', href: '/about' }
    ]}
    activeHref="/"
    ease="power2.easeOut"
    baseColor="#111827"
    pillColor="#9333EA"
    hoveredPillTextColor="#fff"
    pillTextColor="#fff"
  />
    </div>

          <h1 className="text-3xl font-bold mb-8 text-purple-400 text-center">
        My Bookings
      </h1>

      {/* Bookings list */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {bookings.length === 0 && (<p className="text-center text-gray-400 mt-8">No bookings found.</p>
        )}
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            className="bg-gray-800 p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform border border-gray-700"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedBooking(booking)}
          >
            <p className="text-gray-400">Service</p>
            <p className="font-semibold text-white">{booking.service}</p>

            <p className="text-gray-400 mt-2">Date</p>
            <p className="font-semibold text-white">{booking.date}</p>

            <p className="text-gray-400 mt-2">Time</p>
            <p className="font-semibold text-white">{booking.time}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal / Overlay */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedBooking.service}</h2>
              <p className="text-gray-400">Date: <span className="text-white font-semibold">{selectedBooking.date}</span></p>
              <p className="text-gray-400">Time: <span className="text-white font-semibold">{selectedBooking.time}</span></p>

              <div className="mt-6 flex gap-4">
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">New Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                />

                <label className="block text-sm font-medium mt-3 mb-1">New Time</label>
                <input
                  type="time"
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                />

                <button
                  className="w-full mt-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all"
                  onClick={handleReschedule}
                >
                  Confirm Reschedule
                </button>
              </div>

              <button
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all"
                onClick={() => handleCancel(selectedBooking?.id)}
              >
                Cancel
              </button>

              </div>

              <button
                className="mt-4 w-full py-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


