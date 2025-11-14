'use client';

import { useState } from 'react';
import Link from 'next/link';
import PillNav from '../components/PillNav';
import { motion } from 'framer-motion';

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState('vip');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const services = [
    { id: 'normal', title: 'Normal Cut', price: '800 ETB' },
    { id: 'vip', title: 'VIP Experience', price: '1,700 ETB' },
    { id: 'vvip', title: 'VVIP Luxury', price: '2,500 ETB' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  let clientId = localStorage.getItem('clientId');
  if (!clientId) {
    clientId = `client-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem('clientId', clientId);
  }

  // Gather form data
  const formData = new FormData(e.currentTarget);
  const bookingData = {
    name: `${formData.get('firstName')} ${formData.get('lastName')}`,
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: selectedService,
    date: formData.get('date'),
    time: selectedTime,
    specialRequest: specialRequest || '',
    clientId, // <-- this is important
  };

    try {
     const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) throw new Error('Failed to save booking');
    const data = await res.json();
    console.log('Server Response:', data);

    // Show success popup
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (err) {
    console.error('Error sending booking:', err);
    alert('Something went wrong while saving your booking!');
  }
  };

    return (
    <div className="min-h-screen bg-gray-900 text-white">

      <div className="bg-gray-900 text-white flex flex-col items-center justify-start pt-11">
        {/* Header Bar */}
          <PillNav
          logo="/assets/logo.png"
          logoAlt="Company Logo"
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Book', href: '/booking' },
            { label: 'Services', href: '/home#services' }, // remove onClick
            { label: 'About', href: '/about' },
            { label: 'Appointment', href: '/my-booking' }
          ]}
          activeHref="/"
          ease="power2.easeOut"
          baseColor="#2a313fff"
          pillColor="#9333EA"
          hoveredPillTextColor="#fff"
          pillTextColor="#fff"
        />
          </div>

      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-arrow-left-line w-6 h-6 flex items-center justify-center"></i>
            <span className="text-lg font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold">Book Your Session</h1>
        </div>
      </header>
    
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Complete Your Booking</h2>
              <p className="text-gray-400">Fill in your details and select your preferred time slot</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-lg font-semibold mb-4">Select Service</label>
                <div className="grid gap-3">
                  {services.map((service) => (
                    <label key={service.id} className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={selectedService === service.id}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="sr-only" 
                        
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedService === service.id ? 'border-purple-500' : 'border-gray-600'
                      }`}>
                        {selectedService === service.id && (
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className="font-medium">{service.title}</span>
                        <span className="text-purple-400 font-semibold">{service.price}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select Time</label>
                <input
                  type="time"
                  name="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  min="09:00 AM"
                  max="06:00 PM"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
              <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
               <textarea
                  name="specialRequest"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="Any specific requirements or preferences..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
               ></textarea>
              </div>


              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Time</label>
                <div className="grid grid-cols-5 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border transition-all duration-200 whitespace-nowrap ${
                        selectedTime === time
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-gray-800 border-gray-700 hover:border-purple-500'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
              >
                Confirm Booking
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Service</span>
                  <span className="font-semibold">
                    {services.find(s => s.id === selectedService)?.title}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-400">Price</span>
                  <span className="font-semibold text-purple-400">
                    {services.find(s => s.id === selectedService)?.price}
                  </span>
                </div>
                
                {selectedDate && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400">Date</span>
                    <span className="font-semibold">{selectedDate}</span>
                  </div>
                )}
                
                {selectedTime && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400">Time</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-400">
                    {services.find(s => s.id === selectedService)?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-6 text-center transform transition-all duration-300 animate-scale-in">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-green-600 rounded-full">
              <i className="ri-check-line w-8 h-8 flex items-center justify-center text-white"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Booking Confirmed!</h3>
            <p className="text-gray-400 mb-6">
              Your appointment has been successfully booked. We'll send you a confirmation email shortly.
            </p>
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
      `}</style>
        <motion.footer
            id="about"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-black text-gray-300 border-t border-gray-800 mt-32 py-16 px-6 relative overflow-hidden"
            >
          {/* Subtle gradient glow background */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-800/10 to-transparent pointer-events-none"></div>
        
          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {/* Column 1 — Logo + Tagline */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start">
                <img
                  src="/assets/logo.png"
                  alt="C-MAC Logo"
                  className="w-14 h-14 rounded-full border-2 border-purple-600 shadow-md"
                />
                <h3 className="ml-3 text-2xl font-bold text-white tracking-wide">C-MAC</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Precision. Confidence. Style.  
                Where every cut tells your story.
              </p>
            </div>
        
            {/* Column 2 — Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/home" className="hover:text-purple-400 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-purple-400 transition-colors">Services</a></li>
                <li><a href="/booking" className="hover:text-purple-400 transition-colors">Book a Session</a></li>
                <li><a href="/about" className="hover:text-purple-400 transition-colors">About</a></li>
              </ul>
            </div>
        
            {/* Column 3 — Contact Info + Socials */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Stay Connected</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📍 Bole, Addis Ababa, Ethiopia</li>
                <li>📞 0911238033</li>
                <li>✉️ info@cmacbarbershop.com</li>
              </ul>
        
              <div className="flex justify-center md:justify-start space-x-4 mt-5">
                <a href="#" className="hover:text-purple-400 transition-all transform hover:scale-110">
                  <i className="ri-facebook-circle-fill text-2xl"></i>
                </a>
                <a href="#" className="hover:text-purple-400 transition-all transform hover:scale-110">
                  <i className="ri-instagram-line text-2xl"></i>
                </a>
                <a href="#" className="hover:text-purple-400 transition-all transform hover:scale-110">
                  <i className="ri-twitter-x-line text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        
          {/* Divider + Copyright */}
          <div className="max-w-7xl mx-auto relative z-10 mt-16 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} <span className="text-purple-400 font-semibold">C-MAC Barbershop</span>.  
              All Rights Reserved.
            </p>
          </div>
              </motion.footer>
        

    </div>
  );
}