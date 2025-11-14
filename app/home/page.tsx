
'use client';

import { useState } from 'react';
import Link from 'next/link';
import logo from './code/app/assets/logo.png';
import CountUp from '../Animation/animations';
import PillNav from '../components/PillNav';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedService, setSelectedService] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPlus1, setShowPlus1] = useState(false);
  const [showPlus2, setShowPlus2] = useState(false);
  const [showPlus3, setShowPlus3] = useState(false);

  const services = [
    {
      id: 'normal',
      title: 'Normal Cut',
      price: '800 ETB',
      features: ['Basic haircut', 'Hair wash', 'Basic styling'],
      gradient: 'from-gray-800 to-gray-900'
    },
    {
      id: 'vip',
      title: 'VIP Experience',
      price: '1,700 ETB',
      features: ['Premium haircut', 'Hair wash & condition', 'Professional styling', 'Beard trim'],
      gradient: 'from-purple-800 to-purple-900',
      popular: true
    },
    {
      id: 'vvip',
      title: 'VVIP Luxury',
      price: '2,500 ETB',
      features: ['Master stylist service', 'Haircut by the owner', 'Premium styling', 'Feet massage', 'Face steam', 'Scalp massage'],
      gradient: 'from-amber-800 to-amber-900'
    }
  ];

  const handleBooking = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-left overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20luxury%20barber%20shop%20interior%20with%20dark%20moody%20lighting%2C%20professional%20styling%20chairs%2C%20mirrors%20with%20warm%20ambient%20lighting%2C%20contemporary%20design%2C%20sophisticated%20atmosphere%2C%20high-end%20salon%20equipment%2C%20dark%20wood%20and%20metal%20accents%2C%20minimal%20aesthetic&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-slide-up">
            C-MAC Barbershop
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-slide-up delay-200">
            Experience the art of professional grooming with our expert stylists.
          </p>
          <button 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-350 transform hover:scale-110 animate-slide-up delay-250"
          >
            Book Your Session
          </button>
        </div>
      </section>
<div className="bg-gray-900 text-white flex flex-col items-center justify-start pt-10">
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
    baseColor="#111827"
    pillColor="#9333EA"
    hoveredPillTextColor="#fff"
    pillTextColor="#fff"
  />
</div>

        <div className="w-[94%] h-32 border border-purple-600 rounded-3xl mt-10 mx-auto flex items-center justify-around px-0 shadow-lg shadow-purple-900/50 bg-gradient-to-r from-gray-800 to-gray-900">
      {/* Left CountUp */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-baseline justify-center">
          <CountUp
            to={1000}
            duration={3}
            className="text-3xl font-extrabold text-white"
            onEnd={() => setShowPlus1(true)}
          />
          {showPlus1 && <span className="text-4xl font-bold text-purple-400 ml-1">+</span>}
        </div>
        <p className="text-base text-gray-300 mt-1 font-bold">Clients</p>
      </div>

      {/* Center CountUp */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-baseline">
          <CountUp
            to={250}
            duration={3}
            className="text-3xl font-extrabold text-white"
            onEnd={() => setShowPlus2(true)}
          />
          {showPlus2 && <span className="text-4xl font-bold text-purple-400 ml-1">+</span>}
        </div>
        <p className="text-sm text-gray-300 mt-1 font-bold text-center">Projects</p>
      </div>

      {/* Right CountUp */}
      <div className="flex flex-col items-end">
        <div className="flex items-baseline">
          <CountUp
            to={99}
            duration={3}
            className="text-3xl font-extrabold text-white"
            onEnd={() => setShowPlus3(true)}
          />
          {showPlus3 && <span className="text-4xl font-bold text-purple-400 ml-1">+</span>}
        </div>
        <p className="text-sm text-gray-300 mt-1 font-bold">Satisfaction</p>
      </div>
    </div>

      {/* Services Section */}
      <motion.section
       id="services" 
       className="py-20 px-6"
       initial="hidden"
       whileInView="visible"
       viewport={{ once: false, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Experience
            </motion.h2>
            <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select from our carefully crafted service packages, each designed to deliver Stylish results
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative group transform transition-all duration-500 hover:scale-105 animate-fade-in-up delay-${index * 100}`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`relative bg-gradient-to-br ${service.gradient} p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 h-full`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <div className="text-4xl font-bold mb-6 text-white">
                      {service.price}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <i className="ri-check-line w-5 h-5 flex items-center justify-center text-green-400 mr-3"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => handleBooking(service.id)}
                      className="w-full bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose Us</h2>
            <p className="text-xl text-gray-400">Professional excellence meets modern luxury</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full group-hover:scale-110 transition-transform duration-300">
                <i className="ri-scissors-cut-line w-8 h-8 flex items-center justify-center text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Expert Stylists</h3>
              <p className="text-gray-400">Our master stylists bring years of experience and artistic vision to every cut</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full group-hover:scale-110 transition-transform duration-300">
                <i className="ri-star-line w-8 h-8 flex items-center justify-center text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
              <p className="text-gray-400">We use only the finest products and tools for exceptional results</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full group-hover:scale-110 transition-transform duration-300">
                <i className="ri-time-line w-8 h-8 flex items-center justify-center text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Flexible Scheduling</h3>
              <p className="text-gray-400">Book appointments that fit your schedule with our convenient booking system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Book Your Session</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded-full transition-colors"
              >
                <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-400 mb-2">Selected Service:</p>
              <p className="text-lg font-semibold">
                {services.find(s => s.id === selectedService)?.title} - {services.find(s => s.id === selectedService)?.price}
              </p>
            </div>
            
            <Link 
              href="/booking" 
              className="block w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-3 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              ቀጠርዎን ማሲያዝ ይቀጥሉ
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(40px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-100 { animation-delay: 100ms; }
      `}</style>

        <section
          id="find-us"
          className="bg-gray-900 text-white py-10 border-t border-gray-800"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-6 text-center text-purple-400"
            >
              Find Us
            </motion.h2>
        
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-10"
            >
              We’re located in the heart of Addis Ababa. Drop by for your session or
              book in advance to skip the wait.
            </motion.p>
        
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-800"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126104.79668459517!2d38.63854719726562!3d8.992849700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85005e9f6a35%3A0x205a9f42c035dd2a!2sC-MAC%20Barbershop!5e0!3m2!1sam!2set!4v1762977427121!5m2!1sam!2set"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </section>

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
