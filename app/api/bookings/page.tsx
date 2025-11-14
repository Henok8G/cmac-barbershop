'use client';
import React, { useEffect, useState } from 'react';

export default function BookingPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`/api/bookings?clientId=${clientId}`);
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data.bookings || data); // depends on API
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="p-6 text-white">Loading bookings...</p>;

  if (bookings.length === 0) return <p className="p-6 text-white">No bookings found.</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Service</th>
            <th className="border border-gray-400 px-4 py-2">Date</th>
            <th className="border border-gray-400 px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b: any) => (
            <tr key={b.id}>
              <td className="border border-gray-400 px-4 py-2">{b.id}</td>
              <td className="border border-gray-400 px-4 py-2">{b.service}</td>
              <td className="border border-gray-400 px-4 py-2">{b.date}</td>
              <td className="border border-gray-400 px-4 py-2">{b.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
