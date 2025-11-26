/**
 * HOME PAGE - HWOOD
 * =================
 * Landing page showing:
 * 1. Hero carousel (3 slides)
 * 2. Services grid (Our Core Services)
 * 3. Projects & News section
 * 4. About HWOOD section
 */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { Service, Story } from '../domain/types';
import { getServices, getStories, getHeroSlides, getCompanyInfo } from '../services/data/dataService';
import { HeroSlide } from '../services/data/mockData';
import { ROUTES } from '../router';

// =============================================================================
// HERO CAROUSEL COMPONENT
// =============================================================================

interface HeroCarouselProps {
  slides: HeroSlide[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) return null;

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background Image with Transition */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.imageUrl}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              key={slide.id}
            >
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              {slide.subtitle}
            </p>
            {slide.ctaLink && (
              <button
                onClick={() => navigate(slide.ctaLink!)}
                className="inline-flex items-center gap-2 bg-white text-[#005f5f] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                {slide.ctaText || 'Learn More'}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 md:right-12 flex gap-3">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#005f5f] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#005f5f] transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-8 md:left-12 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// SERVICE CARD COMPONENT
// =============================================================================

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <div
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
      onClick={onClick}
    >
      <img
        src={service.imageUrl}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">
          {service.title}
        </h3>
        <p className="text-white/90 text-sm md:text-base leading-relaxed font-light line-clamp-3">
          {service.description}
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: service.accentColor || '#005f5f' }}
      />

      {/* Hover Arrow */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center transition-colors">
        <ArrowRight className="w-5 h-5 text-white group-hover:text-[#005f5f] transition-colors" />
      </div>
    </div>
  );
};

// =============================================================================
// STORY CARD COMPONENT
// =============================================================================

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <div className="flex-shrink-0 w-[280px] md:w-[340px] group cursor-pointer">
      <div className="w-full aspect-[4/3] relative mb-4 rounded-2xl overflow-hidden">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mb-3">
        <span className="inline-block px-3 py-1 rounded-full bg-[#005f5f]/10 text-[#005f5f] text-xs font-semibold uppercase tracking-wide">
          {story.type}
        </span>
      </div>

      <h3 className="text-gray-900 text-lg font-bold leading-tight mb-2 group-hover:text-[#005f5f] transition-colors line-clamp-2">
        {story.title}
      </h3>

      <div className="text-gray-500 text-sm">
        {story.date}
      </div>
    </div>
  );
};

// =============================================================================
// ABOUT SECTION
// =============================================================================

const AboutSection: React.FC = () => {
  const companyInfo = getCompanyInfo();

  return (
    <section className="relative w-full py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[#005f5f] text-3xl md:text-4xl font-bold mb-6">
              About {companyInfo.name}
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
              {companyInfo.description}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Precision-built solutions for construction companies, architects, and private clients.
              Our state-of-the-art facility combines advanced CNC technology with traditional
              craftsmanship to deliver exceptional results.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-[#005f5f] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#004d4d] transition-colors"
            >
              Discover {companyInfo.name}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
              alt="HWOOD Production"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#005f5f] text-white p-6 rounded-xl shadow-lg hidden md:block">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm text-white/80">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// MAIN HOME PAGE COMPONENT
// =============================================================================

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      const [servicesData, storiesData, slidesData] = await Promise.all([
        getServices(),
        getStories(),
        getHeroSlides(),
      ]);
      setServices(servicesData);
      setStories(storiesData);
      setHeroSlides(slidesData);
    };
    loadData();
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const handleServiceClick = (service: Service) => {
    navigate(ROUTES.SERVICE(service.slug));
  };

  return (
    <>
      {/* 1. Hero Carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* 2. Our Core Services */}
      <section className="w-full bg-[#F5F5F5] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-[#005f5f] text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                Our Core Services
              </h2>
              <p className="text-gray-600 text-lg">
                Complete production solutions for your projects
              </p>
            </div>
            <Link
              to="/about"
              className="text-[#005f5f] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              View all services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Recent Projects & News */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-gray-900 text-3xl md:text-4xl font-bold mb-2">
                Recent Projects & News
              </h2>
              <p className="text-gray-600">
                Stay updated with our latest work and announcements
              </p>
            </div>
            <Link
              to="/portfolio"
              className="text-[#005f5f] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              View all
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
            >
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
              <div className="w-8 flex-shrink-0" />
            </div>

            {/* Scroll Arrow */}
            <div className="absolute right-0 top-1/3 -translate-y-1/2 z-10 hidden md:block">
              <button
                onClick={scrollRight}
                className="w-12 h-12 bg-[#005f5f] rounded-full flex items-center justify-center shadow-lg hover:bg-[#004d4d] transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About Section */}
      <div className="bg-[#F5F5F5]">
        <AboutSection />
      </div>

      {/* 5. CTA Section */}
      <section className="bg-[#005f5f] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-8 md:px-12 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Contact us for a free consultation and quote. Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="bg-white text-[#005f5f] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
