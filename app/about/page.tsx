"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import PillNav from '../components/PillNav';

export default function AboutPage() {
  const team = [
    {
      name: "Abel Mekonnen",
      role: "Master Barber",
      bio: "Known for precision fades and smooth styling. Abel brings over 8 years of experience and passion for grooming excellence.",
      image: "/assets/about/abel.jpg",
    },
    {
      name: "Nati Samuel",
      role: "Fade Specialist",
      bio: "Sharp lines, quick hands. Nati’s all about giving you that clean, modern look every time.",
      image: "/assets/about/nati.jpg",
    },
    {
      name: "Brook Getachew",
      role: "Stylist & Beard Expert",
      bio: "Creative cuts and beard perfectionist—Brook ensures every client walks out with confidence.",
      image: "/assets/about/brook.jpg",
    },
  ];

  return (
    

    <main className="bg-black text-gray-300 min-h-screen overflow-hidden">

            <div className="bg-gray-900 text-white flex flex-col items-center justify-start">
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

      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-b from-purple-900/10 to-transparent">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white"
        >
          About <span className="text-purple-500">C-MAC</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-gray-400 max-w-2xl mx-auto"
        >
          Precision. Confidence. Style. Every cut tells a story.
        </motion.p>
      </section>

      {/* Owner Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/assets/about/owner.jpg"
            alt="Owner"
            width={500}
            height={500}
            className="rounded-2xl shadow-lg border-2 border-purple-700"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Meet the Founder</h2>
          <p className="text-gray-400 leading-relaxed">
            C-MAC Barbershop was founded by <span className="text-purple-400 font-semibold">Caleb M.</span>,
            a passionate barber who turned his craft into an art. Since 2015, he’s
            been building a team that values precision, authenticity, and client trust.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-t from-purple-900/10 to-transparent py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-10">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-xl mb-4 mx-auto"
                />
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-purple-400 text-sm">{member.role}</p>
                <p className="mt-3 text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
</section>

<section
  id="find-us"
  className="bg-gray-900 text-white py-20 border-t border-gray-800"
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

{/* Shop Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/assets/about/shop.jpg"
            alt="C-MAC Shop"
            width={500}
            height={500}
            className="rounded-2xl border-2 border-purple-700 shadow-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-gray-400 leading-relaxed">
            From humble beginnings in Bole, Addis Ababa, C-MAC Barbershop became a
            community hub where professionalism meets culture. Our mission is simple —
            redefine grooming with precision and care.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="text-center py-16 bg-gray-950 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-4">Contact & Location</h2>
        <p className="text-gray-400">📍 Bole, Addis Ababa, Ethiopia</p>
        <p className="text-gray-400 mt-1">📞 0911238033</p>
        <p className="text-gray-400 mt-1">✉️ info@cmacbarbershop.com</p>
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
    </main>
  );
}
