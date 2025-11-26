/**
 * MAIN LAYOUT
 * ===========
 * Shared layout wrapper for all public pages.
 * Includes Header, main content area (Outlet), and Footer with shared background.
 */

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { MapPin, Search, User, ChevronDown, Globe, Facebook, Instagram, Linkedin, Youtube, MessageCircle, Menu, X } from 'lucide-react';
import { Service, Subservice } from '../domain/types';
import { getNavigationData, getCompanyInfo } from '../services/data/dataService';

// =============================================================================
// HEADER COMPONENT
// =============================================================================

const Header: React.FC = () => {
 const navigate = useNavigate();
  const [navData, setNavData] = useState<{ services: (Service & { subservices: Subservice[] })[] }>({ services: [] });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const companyInfo = getCompanyInfo();

  useEffect(() => {
    const loadNav = async () => {
      const data = await getNavigationData();
      setNavData(data);
    };
    loadNav();
  }, []);

  const handleServiceClick = (slug: string) => {
    navigate(`/services/${slug}`);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleSubserviceClick = (slug: string) => {
    navigate(`/subservices/${slug}`);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };
  return (
    <header className="flex flex-col w-full bg-[#EAEAEA] relative z-20 shadow-sm font-sans">
      {/* Top Utility Bar */}
      <div className="hidden md:flex justify-end items-center px-8 md:px-12 py-2 gap-6 text-[11px] font-bold text-gray-800 tracking-wide">
        <Link to="/about" className="hover:text-teal-700 transition-colors">Company</Link>
        <Link to="/portfolio" className="hover:text-teal-700 transition-colors">News</Link>
        <Link to="/contact" className="hover:text-teal-700 transition-colors">Contacts</Link>
        
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
          {/* HWOOD Logo */}
          <div className="w-10 h-10 flex items-center justify-center bg-[#005f5f] rounded-lg">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-3xl md:text-4xl font-bold tracking-tight text-black">{companyInfo.name}</span>
        </div>

        {/* Center Links - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          {navData.services.map((service) => (
            <div 
              key={service.id}
              className="relative"
              onMouseEnter={() => setActiveDropdown(service.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleServiceClick(service.slug)}
                className="flex items-center gap-1 px-4 py-2 text-base font-semibold text-black hover:text-teal-700 transition-colors rounded-lg hover:bg-white/50"
              >
                {service.title}
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === service.id ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown */}
              {activeDropdown === service.id && service.subservices.length > 0 && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[280px] z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                      {service.title}
                    </span>
                  </div>
                  {service.subservices.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubserviceClick(sub.slug)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{sub.title}</span>
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{sub.description}</p>
                    </button>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-100 mt-1">
                    <button 
                      onClick={() => handleServiceClick(service.slug)}
                      className="text-sm font-semibold text-[#005f5f] hover:underline"
                    >
                      View all {service.title} →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
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
        {/* Mobile Menu Button */}
          <button 
            className="lg:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-100 transition-colors shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
      </nav>

    {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            {navData.services.map((service) => (
              <div key={service.id} className="space-y-2">
                <button 
                  onClick={() => handleServiceClick(service.slug)}
                  className="w-full text-left font-bold text-lg text-gray-900"
                >
                  {service.title}
                </button>
                <div className="pl-4 space-y-2">
                  {service.subservices.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSubserviceClick(sub.slug)}
                      className="block w-full text-left text-gray-600 hover:text-[#005f5f]"
                    >
                      {sub.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      )}
    </header>
  );
};
      
// =============================================================================
// FOOTER COMPONENT
// =============================================================================

const Footer: React.FC = () => {
  const companyInfo = getCompanyInfo();
      
  return (
    <footer className="w-full px-8 md:px-12 lg:px-16 pt-16 pb-8 text-white relative z-10">
      {/* Top Row: Logo & Socials */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg">
            <span className="text-[#005f5f] font-bold text-xl">H</span>
          </div>
          <span className="text-3xl font-bold tracking-tight">{companyInfo.name}</span>
            <p className="text-sm text-gray-400">{companyInfo.tagline}</p>
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
            Subscribe to our newsletter and stay up to date with news from HWOOD.
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
            We provide after-sales service with a view to supporting the efficiency and productivity of our solutions.
          </p>
          <button className="bg-[#005f5f] text-white px-8 py-3 rounded font-bold hover:bg-[#004d4d] transition-colors">
            Request support
          </button>
        </div>
      </div>

      {/* Bottom Row: Copyright */}
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[11px] text-gray-400 tracking-wide">
        <p>© 2025 {companyInfo.name}. All rights reserved.</p>
        
        <div className="flex flex-wrap gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
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
