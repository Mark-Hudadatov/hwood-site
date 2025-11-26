/**
 * MAIN LAYOUT
 * ===========
 * Shared layout wrapper for all public pages.
 * Includes Header, main content area (Outlet), and Footer with shared background.
 */

import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MapPin, Search, User, ChevronDown, Globe, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';

// =============================================================================
// HEADER COMPONENT
// =============================================================================

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col w-full bg-[#EAEAEA] relative z-20 shadow-sm font-sans">
      {/* Top Utility Bar */}
      <div className="hidden md:flex justify-end items-center px-8 md:px-12 py-2 gap-6 text-[11px] font-bold text-gray-800 tracking-wide">
        <a href="#" className="hover:text-teal-700 transition-colors">Company</a>
        <a href="#" className="hover:text-teal-700 transition-colors">News</a>
        <a href="#" className="hover:text-teal-700 transition-colors">Contacts</a>
        
        <button className="flex items-center gap-1 border border-gray-400 rounded-full px-3 py-1 hover:bg-white hover:border-transparent transition-all">
          <Globe className="w-3 h-3" />
          <span>HEB</span>
        </button>
      </div>

      {/* Main Navbar */}
      <nav className="w-full h-20 px-8 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          {/* Custom SVG Logo Mark */}
          <div className="w-10 h-10 flex items-center justify-center text-[#005f5f]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M2 2h10l4 4-4 4H2V2z" />
              <path d="M2 12h14l4 5-4 5H2V12z" />
            </svg>
          </div>
          <span className="text-4xl font-normal tracking-tight text-black">HWOOD</span>
        </div>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-8 text-base font-semibold text-black">
          <button className="flex items-center gap-1 hover:text-teal-700 transition-colors">
            Lines <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 hover:text-teal-700 transition-colors">
            Machines <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 hover:text-teal-700 transition-colors">
            Components <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-100 transition-colors shadow-sm">
            <MapPin className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-100 transition-colors shadow-sm">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-100 transition-colors shadow-sm">
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
};

// =============================================================================
// FOOTER COMPONENT
// =============================================================================

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-8 md:px-12 lg:px-16 pt-16 pb-8 text-white relative z-10">
      {/* Top Row: Logo & Socials */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M2 2h10l4 4-4 4H2V2z" />
              <path d="M2 12h14l4 5-4 5H2V12z" />
            </svg>
          </div>
          <span className="text-3xl font-normal tracking-tight">HWOOD</span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          {[Facebook, Instagram, Linkedin, Youtube].map((Icon, idx) => (
            <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Middle Row: Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24">
        {/* Stay up to date */}
        <div>
          <h3 className="text-lg font-bold mb-4">Stay up to date</h3>
          <div className="w-full h-px bg-gray-600 mb-6" />
          <p className="mb-8 text-sm text-gray-300 leading-relaxed max-w-md">
            Subscribe to our newsletter and stay up to date with news from the world of HWOOD.
          </p>
          <button className="bg-white text-[#002828] px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors">
            Subscribe
          </button>
        </div>

        {/* Need help? */}
        <div>
          <h3 className="text-lg font-bold mb-4">Need help?</h3>
          <div className="w-full h-px bg-[#005f5f] mb-6" />
          <p className="mb-8 text-sm text-gray-300 leading-relaxed max-w-md">
            We provide after-sales service supporting the reliability and quality of our services.
          </p>
          <button className="bg-[#005f5f] text-white px-8 py-3 rounded font-bold hover:bg-[#004d4d] transition-colors">
            Request support
          </button>
        </div>
      </div>

      {/* Bottom Row: Copyright & Links */}
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[11px] text-gray-400 tracking-wide">
        <p>Copyright HWOOD | Israel, Netanya </p>
        
        <div className="flex flex-wrap gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy center</a>
          <a href="#" className="hover:text-white transition-colors">Privacy and cookie policy</a>
          <a href="#" className="hover:text-white transition-colors">List of cookies</a>
          
        </div>
      </div>
    </footer>
  );
};

// =============================================================================
// SIDE MENU COMPONENT
// =============================================================================

const SideMenu: React.FC = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pr-4">
      <button 
        className="w-14 h-14 bg-[#005f5f] rounded-l-2xl flex items-center justify-center shadow-lg hover:bg-[#004d4d] transition-colors"
        aria-label="Chat support"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

// =============================================================================
// FOOTER WRAPPER WITH TEXTURED BACKGROUND
// =============================================================================

const FooterWrapper: React.FC = () => {
  return (
    <div className="relative w-full bg-[#002828] overflow-hidden pt-16">
      {/* Background Texture - perfectly aligned, wider, shifted */}
      <div className="absolute inset-0 w-[140%] -left-[10%] h-full z-0 pointer-events-none">
        {/* Base layer */}
        <div className="absolute inset-0 bg-[#001f1f]" />

        {/* Diagonal Stripes (matching upper block) */}
        <div className="absolute -left-40 -top-40 h-[200%] w-80 bg-[#004D4D] -skew-x-[20deg]" />
        <div className="absolute left-0 -top-40 h-[200%] w-64 bg-[#005f5f] -skew-x-[20deg] opacity-70" />
        <div className="absolute left-56 -top-40 h-[200%] w-40 bg-[#003f3f] -skew-x-[20deg] opacity-50" />
        <div className="absolute left-96 -top-40 h-[200%] w-32 bg-[#004D4D] -skew-x-[20deg] opacity-30" />
      </div>

      {/* Actual Footer Content */}
      <Footer />
    </div>
  );
};


// =============================================================================
// MAIN LAYOUT EXPORT
// =============================================================================

export const MainLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen font-sans flex flex-col">
      <Header />
      
      {/* Main Content Area - Pages render here via Outlet */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      
      {/* Footer with textured background */}
      <FooterWrapper />
      
      {/* Side Menu (Fixed Right) */}
      <SideMenu />
    </div>
  );
};
