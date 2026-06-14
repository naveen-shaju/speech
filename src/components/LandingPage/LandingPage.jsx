import React, { useState, useEffect, useRef } from 'react';

export default function LandingPage({ onBookAppointment }) {
  const [activeTab, setActiveTab] = useState('services');
  const isManualScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    isManualScroll.current = true;
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  useEffect(() => {
    const sections = ['hero', 'services', 'about', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      if (isManualScroll.current) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveTab(id === 'hero' ? 'services' : id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (isManualScroll.current) return;
      
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveTab('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm border-b border-surface-variant/10">
        <div className="flex justify-between items-center px-4 md:px-margin-desktop py-2 md:py-4 max-w-container-max mx-auto w-full">
          <div className="flex items-center">
            <img
              alt="Speech & Development Care Center Logo"
              className="h-8 md:h-16 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHNaP38D8Jy7WNPXKvoKds8KFAbzoNfJrgMR4vWGHvP89FXjyBeUVNwZs-lOiiBxjkmibnbLvJbGAb6S69hihGLb_xCop2epBYSWj3F-LDkjS-iicvJ9oMUWwiGBzarolFyb-cs5ffo4aaJ-RF3SO-CR6oqzGb9NaB9LxpYg3YmW9zeqtyRkqDH8pWzK1O1LAGEUwAvR36AAHir49Q0g-2SAPxQh4U3Xcz7vp7wAufdTqRD9mwqOYmHjYSEqFl9kHbunSDJxW7ct8=w512"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center ml-12 lg:ml-24">
            <a
              onClick={() => handleTabClick('services')}
              className={`font-title-lg text-title-lg pb-1 transition-all ${
                activeTab === 'services'
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-secondary hover:text-primary'
              }`}
              href="#services"
            >
              Services
            </a>
            <a
              onClick={() => handleTabClick('about')}
              className={`font-title-lg text-title-lg pb-1 transition-all ${
                activeTab === 'about'
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-secondary hover:text-primary'
              }`}
              href="#about"
            >
              Expertise
            </a>
            <a
              onClick={() => handleTabClick('contact')}
              className={`font-title-lg text-title-lg pb-1 transition-all ${
                activeTab === 'contact'
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-secondary hover:text-primary'
              }`}
              href="#contact"
            >
              Contact
            </a>
          </nav>

          <button
            onClick={onBookAppointment}
            className="hidden md:block bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
          >
            Book an Appointment
          </button>
          
          {/* Mobile Navigation */}
          <nav className="flex md:hidden gap-3 items-center">
            <a
              onClick={() => handleTabClick('services')}
              className={`text-[11px] font-bold pb-0.5 border-b transition-all ${
                activeTab === 'services' ? 'text-primary border-primary' : 'text-secondary border-transparent'
              }`}
              href="#services"
            >
              Services
            </a>
            <a
              onClick={() => handleTabClick('about')}
              className={`text-[11px] pb-0.5 border-b transition-all ${
                activeTab === 'about' ? 'text-primary border-primary' : 'text-secondary border-transparent'
              }`}
              href="#about"
            >
              Expertise
            </a>
            <a
              onClick={() => handleTabClick('contact')}
              className={`text-[11px] pb-0.5 border-b transition-all ${
                activeTab === 'contact' ? 'text-primary border-primary' : 'text-secondary border-transparent'
              }`}
              href="#contact"
            >
              Contact
            </a>
            <button
              onClick={onBookAppointment}
              className="bg-primary text-on-primary px-3 py-1.5 rounded-full text-[10px] font-bold shadow-md shadow-primary/20 cursor-pointer"
            >
              Book
            </button>
          </nav>
        </div>
      </header>

      <main className="pt-12 md:pt-20 overflow-x-hidden flex-grow">
        {/* Hero Section */}
        <section id="hero" className="relative flex items-center px-4 md:px-margin-desktop py-8 md:py-16 animate-fadeIn">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-secondary-container/30 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-primary-fixed/20 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto grid grid-cols-[1.2fr_0.8fr] md:grid-cols-2 gap-4 sm:gap-10 md:gap-16 lg:gap-20 items-center">
            <div className="space-y-3 md:space-y-8 text-left">
              <div className="inline-flex items-center gap-1 md:gap-2 bg-secondary-container px-2 md:px-4 py-0.5 md:py-1.5 rounded-full text-on-secondary-container font-label-sm uppercase tracking-widest text-[9px] md:text-xs font-semibold">
                <span className="material-symbols-outlined text-[12px] md:text-[18px]">verified</span>
                Compassionate Clinical Care
              </div>
              <h1 className="font-display-lg text-[22px] sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.1] md:leading-tight max-w-xl font-black">
                Empowering Voice, <br />
                <span className="text-tertiary">Connecting Minds,</span>
                <br />
                Nurturing Growth
              </h1>
              <p className="font-body-md text-[12px] md:text-body-lg text-on-surface-variant max-w-lg leading-relaxed mx-0">
                Dedicated, specialized support for speech, communication, and developmental milestones at every stage of life.
              </p>
              <div className="flex gap-2 md:gap-4 justify-start">
                <button
                  onClick={onBookAppointment}
                  className="bg-primary text-on-primary px-3 md:px-8 py-2 md:py-4 rounded-lg md:rounded-xl font-bold shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all cursor-pointer text-[11px] md:text-base"
                >
                  Get Guided Care
                </button>
                <a
                  href="#services"
                  className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-8 py-2 md:py-4 rounded-lg md:rounded-xl font-bold text-primary border border-outline-variant hover:bg-surface-container-low transition-all text-[11px] md:text-base"
                >
                  <span className="material-symbols-outlined text-sm md:text-base">play_circle</span>
                  How it works
                </a>
              </div>
              
              {/* Trust/Credibility Badges */}
              <div className="flex flex-wrap items-center justify-start gap-x-2 md:gap-x-6 gap-y-1 md:gap-y-3 pt-4 sm:pt-6 border-t border-surface-variant/20 text-on-surface-variant text-[8px] sm:text-xs md:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="material-symbols-outlined text-primary text-[12px] sm:text-[18px] md:text-[20px]">workspace_premium</span>
                  <span className="font-semibold text-on-surface">ASHA Certified</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="material-symbols-outlined text-primary text-[12px] sm:text-[18px] md:text-[20px]">school</span>
                  <span className="font-semibold text-on-surface">Stanford PhD Led</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="material-symbols-outlined text-primary text-[12px] sm:text-[18px] md:text-[20px]">verified_user</span>
                  <span className="font-semibold text-on-surface">15+ Yrs Experience</span>
                </div>
              </div>
            </div>
            
            <div className="relative group flex justify-start">
              <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl shadow-primary/10 max-w-lg w-full aspect-[3/4] md:aspect-auto">
                <img
                  alt="Speech & Development Care Center"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLs4dPi-g03n5qTQkyR8H5KevyEV4HJ_wqJjlEJwYNKRedqYImcY1eVhdPgtiAb8tFjIsul7-qikm8fQ8oOMyZKTsrnrzRpCdQ7re0KgByiEUeXqasAmtXBoTBCWSB46KTXgGSeP__Fsl5pl-_4FYZBv8r2XI1PjkkQ6kt3XWxkO3B_pDCB69VlFJX-mXPctlkFIYpSr9hM0UYGnEVY--wri4YGkDd4-dEI2SETrL_BxjSfZtXjlxjIwVwCxmTJNQUcdEbs4A4eW=w1600"
                />
              </div>
              
              {/* Floating Card 1: 1200+ Families */}
              <div className="absolute -bottom-3 -left-3 md:-bottom-10 md:-left-[120px] glass-card p-1.5 md:p-5 rounded-lg md:rounded-xl block max-w-[80px] sm:max-w-[100px] md:max-w-[240px] hover:-translate-y-1 transition-transform duration-300">
                <div className="hidden md:flex -space-x-1.5 md:-space-x-2.5 overflow-hidden mb-1.5 md:mb-3">
                  <div className="inline-flex h-4 w-4 md:h-8 md:w-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant items-center justify-center text-[6px] md:text-[10px] font-bold ring-1 md:ring-2 ring-white">ES</div>
                  <div className="inline-flex h-4 w-4 md:h-8 md:w-8 rounded-full bg-secondary-fixed text-on-secondary-fixed items-center justify-center text-[6px] md:text-[10px] font-bold ring-1 md:ring-2 ring-white">AM</div>
                  <div className="inline-flex h-4 w-4 md:h-8 md:w-8 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant items-center justify-center text-[6px] md:text-[10px] font-bold ring-1 md:ring-2 ring-white">KP</div>
                  <div className="inline-flex h-4 w-4 md:h-8 md:w-8 rounded-full bg-primary text-on-primary items-center justify-center text-[6px] md:text-[10px] font-bold ring-1 md:ring-2 ring-white">+</div>
                </div>
                <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-2">
                  <div className="w-3.5 h-3.5 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[8px] md:text-lg">diversity_3</span>
                  </div>
                  <div className="font-bold text-[8px] md:text-[14px] text-primary">1,200+ Families</div>
                </div>
                <p className="text-on-surface-variant text-[7px] md:text-[12px] leading-tight md:leading-snug">
                  Supported through personalized developmental journeys this year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section id="about" className="relative md:min-h-[calc(100vh-6rem)] flex items-center px-margin-mobile md:px-margin-desktop py-6 md:py-12 bg-surface-container-lowest animate-fadeIn border-t border-b border-surface-variant/20">
          <div className="max-w-container-max mx-auto grid grid-cols-[0.8fr_1.2fr] md:grid-cols-2 gap-5 md:gap-20 items-center">
            <div className="flex justify-center">
              <div className="relative rounded-xl overflow-hidden aspect-square max-w-md w-full shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  alt="Dr. Elena Sterling"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA13eGQVVwXn3RlKROrDWHY_QvEVuoLA_y0dqrl0TvLk2nEq5NM8peXweZURON6TefIoUtlOO9Vl0Ybab2tONLmjBuiw7Sfb2JzejbgBJKxRrgz9L3DKl1wZcft9u8Vj_NQ6gEh8kBFdZnEDz6qhMLL0RsezAHOTsohFGDbR-gFKfDrOrb6hE1GmXv-0_WyIz_DGv2l3PtkdOnWr7ssfVsxIuF6hFXEL8-rj_7BJWjmH_N28nOU508_scEy-zpXTF7OF38p9tRRbjk"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <p className="text-white font-bold text-[12px] md:text-2xl">Dr. Elena Sterling</p>
                  <p className="text-white/80 text-[9px] md:text-sm font-medium">Lead Clinical Specialist</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 md:space-y-8">
              <h2 className="font-headline-md text-[18px] md:text-headline-md text-primary font-bold">
                A Legacy of Care
              </h2>
              <div className="space-y-3 md:space-y-6 text-on-surface-variant">
                <p className="font-body-lg italic border-l-2 md:border-l-4 border-primary pl-2 md:pl-6 text-[11px] md:text-lg">
                  "Every child's voice is a unique symphony waiting to be heard.<span className="hidden md:inline"> Our mission is to provide the instruments and the guidance to make that possible.</span>"
                </p>
                <p className="font-body-md text-[11px] md:text-base leading-relaxed">
                  <span className="md:hidden">15 years of expertise in neurodevelopmental communication.</span>
                  <span className="hidden md:inline">
                    With over 15 years of specialized experience in neurodevelopmental communication, Dr. Sterling founded the center on the principle that therapy should be as unique as the individual.
                  </span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 pt-1 md:pt-4">
                  <div className="flex items-center md:items-start gap-1.5 md:gap-3">
                    <span className="material-symbols-outlined text-primary text-[14px] md:text-xl md:mt-1">school</span>
                    <div>
                      <p className="font-bold text-[10px] md:text-[16px] text-on-surface leading-tight">PhD Linguistics<span className="hidden md:inline"> Clinical Linguistics</span></p>
                      <p className="text-[14px] hidden md:block text-on-surface-variant">Stanford University</p>
                    </div>
                  </div>
                  <div className="flex items-center md:items-start gap-1.5 md:gap-3">
                    <span className="material-symbols-outlined text-primary text-[14px] md:text-xl md:mt-1">verified_user</span>
                    <div>
                      <p className="font-bold text-[10px] md:text-[16px] text-on-surface leading-tight">ASHA Certified</p>
                      <p className="text-[14px] hidden md:block text-on-surface-variant">Board Certified Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="relative md:min-h-[calc(100vh-6rem)] flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-6 md:py-8 bg-background">
          <div className="max-w-container-max mx-auto mb-8 text-center">
            <h2 className="font-headline-md text-[18px] md:text-headline-md text-primary font-bold mb-2">
              Specialized Pathways
            </h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto text-[11px] md:text-base">
              Customized clinical intervention designed around developmental milestones and personal goals.
            </p>
          </div>
          <div className="max-w-container-max mx-auto bento-grid">
            {/* Child Speech */}
            <div
              onClick={onBookAppointment}
              className="bento-item-4 glass-card p-3 md:p-6 rounded-lg md:rounded-xl group hover:bg-primary hover:text-on-primary transition-all duration-500 cursor-pointer flex flex-col items-center md:items-start text-center md:text-left justify-between"
            >
              <div className="flex flex-col items-center md:items-start w-full">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[24px] md:text-[32px] mb-1 md:mb-3 block">
                  child_care
                </span>
                <h3 className="font-bold text-[12px] md:text-base group-hover:text-on-primary mb-1 md:mb-2">Child Speech</h3>
                <p className="hidden md:block text-xs md:text-sm opacity-80 mb-4 group-hover:text-white/90">
                  Articulative development and early phonological clarity for growing minds.
                </p>
              </div>
              <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform self-center md:self-start text-[16px] md:text-sm">
                arrow_forward
              </span>
            </div>

            {/* Autism Support */}
            <div
              onClick={onBookAppointment}
              className="bento-item-4 glass-card p-3 md:p-6 rounded-lg md:rounded-xl group hover:bg-primary hover:text-on-primary transition-all duration-500 cursor-pointer flex flex-col items-center md:items-start text-center md:text-left justify-between"
            >
              <div className="flex flex-col items-center md:items-start w-full">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[24px] md:text-[32px] mb-1 md:mb-3 block">
                  extension
                </span>
                <h3 className="font-bold text-[12px] md:text-base group-hover:text-on-primary mb-1 md:mb-2">Autism Support</h3>
                <p className="hidden md:block text-xs md:text-sm opacity-80 mb-4 group-hover:text-white/90">
                  Neuro-affirming communication strategies and sensory-integrated support.
                </p>
              </div>
              <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform self-center md:self-start text-[16px] md:text-sm">
                arrow_forward
              </span>
            </div>

            {/* Early Intervention */}
            <div
              onClick={onBookAppointment}
              className="bento-item-4 glass-card p-3 md:p-6 rounded-lg md:rounded-xl group hover:bg-primary hover:text-on-primary transition-all duration-500 cursor-pointer flex flex-col items-center md:items-start text-center md:text-left justify-between"
            >
              <div className="flex flex-col items-center md:items-start w-full">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[24px] md:text-[32px] mb-1 md:mb-3 block">
                  spa
                </span>
                <h3 className="font-bold text-[12px] md:text-base group-hover:text-on-primary mb-1 md:mb-2">Early Intervention</h3>
                <p className="hidden md:block text-xs md:text-sm opacity-80 mb-4 group-hover:text-white/90">
                  Proactive identification and foundational support for toddlers 0-3.
                </p>
              </div>
              <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform self-center md:self-start text-[16px] md:text-sm">
                arrow_forward
              </span>
            </div>

            {/* Learning/Language */}
            <div
              onClick={onBookAppointment}
              className="bento-item-6 glass-card p-4 md:p-6 rounded-lg md:rounded-xl flex items-center gap-3 md:gap-6 group hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px] md:text-[48px]">auto_stories</span>
              </div>
              <div>
                <h3 className="font-bold text-[12px] md:text-base">Learning & Language</h3>
                <p className="hidden md:block text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1 md:mt-2">
                  Cognitive-linguistic strategies for academic success and literacy development.
                </p>
              </div>
            </div>

            {/* Stammering/Voice */}
            <div
              onClick={onBookAppointment}
              className="bento-item-6 glass-card p-4 md:p-6 rounded-lg md:rounded-xl flex items-center gap-3 md:gap-6 group hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px] md:text-[48px]">record_voice_over</span>
              </div>
              <div>
                <h3 className="font-bold text-[12px] md:text-base">Stammering & Voice</h3>
                <p className="hidden md:block text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1 md:mt-2">
                  Fluency shaping and vocal health management for all age groups.
                </p>
              </div>
            </div>

            {/* Guidance Card */}
            <div className="bento-item bg-secondary-container p-5 md:p-8 rounded-lg md:rounded-xl text-center space-y-2 md:space-y-4 relative overflow-hidden border border-primary/10 shadow-sm col-span-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="font-headline-md text-[16px] md:text-xl text-primary font-bold">
                  <span className="md:hidden">Need Guidance?</span>
                  <span className="hidden md:inline">I'm Not Sure – Need Guidance?</span>
                </h3>
                <p className="font-body-lg text-on-secondary-container max-w-xl mx-auto text-[11px] md:text-sm">
                  <span className="md:hidden">Free 15-minute consultation.</span>
                  <span className="hidden md:inline">Every journey starts with understanding. Schedule a free 15-minute consultation to find the right path for your family.</span>
                </p>
                <button
                  onClick={onBookAppointment}
                  className="bg-primary text-on-primary px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl font-bold shadow-lg hover:bg-tertiary transition-colors cursor-pointer text-[11px] md:text-sm relative z-10 mt-1 md:mt-2"
                >
                  <span className="md:hidden">Request Help</span>
                  <span className="hidden md:inline">Request Clinical Guidance</span>
                </button>
              </div>
            </div>

            {/* Adult Support */}
            <div
              onClick={onBookAppointment}
              className="bento-item-6 glass-card p-4 md:p-6 rounded-lg md:rounded-xl flex items-center gap-3 md:gap-6 group hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px] md:text-[48px]">groups</span>
              </div>
              <div>
                <h3 className="font-bold text-[12px] md:text-base">Adult Support</h3>
                <p className="hidden md:block text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1 md:mt-2">
                  Post-stroke recovery, social communication, and professional voice coaching.
                </p>
              </div>
            </div>

            {/* Parent Consultation */}
            <div
              onClick={onBookAppointment}
              className="bento-item-6 glass-card p-4 md:p-6 rounded-lg md:rounded-xl flex items-center gap-3 md:gap-6 group hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[32px] md:text-[48px]">psychology_alt</span>
              </div>
              <div>
                <h3 className="font-bold text-[12px] md:text-base">Parent Consultation</h3>
                <p className="hidden md:block text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1 md:mt-2">
                  Empowering caregivers with tools and home-based developmental strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-24 px-4 md:px-margin-desktop">
          <div className="max-w-container-max mx-auto rounded-xl bg-primary p-8 md:p-20 text-center text-on-primary relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-container/40 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            <div className="relative z-10 space-y-4 md:space-y-8">
              <h2 className="font-headline-md text-[20px] md:text-[40px] font-bold">
                Ready to unlock their potential?
              </h2>
              <p className="text-[12px] md:text-lg opacity-90 max-w-[200px] md:max-w-lg mx-auto leading-relaxed">
                Book your initial evaluation and begin a personalized journey toward better communication.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={onBookAppointment}
                  className="bg-white text-primary px-6 md:px-12 py-2.5 md:py-5 rounded-full font-bold hover:bg-secondary-fixed transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer text-[12px] md:text-base w-full sm:w-auto"
                >
                  Book an Evaluation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-surface-container w-full px-4 md:px-margin-desktop py-8 md:py-20 border-t border-surface-variant/20">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-gutter mb-6 md:mb-16">
          <div className="col-span-1">
            <div className="font-headline-md text-headline-md font-bold text-primary mb-3 md:mb-6 flex items-center">
              <img
                alt="Speech & Development Care Center Logo"
                className="h-8 md:h-16 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHNaP38D8Jy7WNPXKvoKds8KFAbzoNfJrgMR4vWGHvP89FXjyBeUVNwZs-lOiiBxjkmibnbLvJbGAb6S69hihGLb_xCop2epBYSWj3F-LDkjS-iicvJ9oMUWwiGBzarolFyb-cs5ffo4aaJ-RF3SO-CR6oqzGb9NaB9LxpYg3YmW9zeqtyRkqDH8pWzK1O1LAGEUwAvR36AAHir49Q0g-2SAPxQh4U3Xcz7vp7wAufdTqRD9mwqOYmHjYSEqFl9kHbunSDJxW7ct8=w512"
              />
            </div>
            <p className="text-on-surface-variant font-body-md mb-6 leading-relaxed text-sm hidden md:block">
              Compassionate expertise for speech and developmental milestones.
            </p>
            <div className="flex gap-2 md:gap-4">
              <a
                className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:text-primary transition-colors border border-surface-variant/10 text-secondary"
                href="#"
              >
                <span className="material-symbols-outlined text-[16px] md:text-[20px]">public</span>
              </a>
              <a
                className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:text-primary transition-colors border border-surface-variant/10 text-secondary"
                href="#"
              >
                <span className="material-symbols-outlined text-[16px] md:text-[20px]">share</span>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <h4 className="font-title-lg text-primary font-bold mb-6 text-base md:text-lg">Practice</h4>
            <ul className="space-y-4">
              <li>
                <a className="text-on-surface-variant hover:text-primary underline transition-all text-sm" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary underline transition-all text-sm" href="#">
                  Our Team
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary underline transition-all text-sm" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-primary underline transition-all text-sm" href="#">
                  Patient Portal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-title-lg text-primary font-bold mb-2 md:mb-6 text-[11px] md:text-lg">Contact</h4>
            <ul className="space-y-2 md:space-y-4 text-on-surface-variant text-[10px] md:text-sm">
              <li className="flex gap-1 md:gap-2">
                <span className="material-symbols-outlined text-primary text-[14px] md:text-base">location_on</span>
                <span>
                  123 Healing Path Way,
                  <br />
                  Suite 200, Boston MA
                </span>
              </li>
              <li className="flex gap-1 md:gap-2">
                <span className="material-symbols-outlined text-primary text-[14px] md:text-base">call</span>
                <span>(555) 012-3456</span>
              </li>
              <li className="flex gap-1 md:gap-2">
                <span className="material-symbols-outlined text-primary text-[14px] md:text-base">mail</span>
                <span className="break-all">care@speechdevelopment.com</span>
              </li>
            </ul>
            
            {/* Hours shown under Contact on mobile only */}
            <div className="md:hidden mt-4">
              <h4 className="font-title-lg text-primary font-bold mb-1 text-[11px]">Hours</h4>
              <ul className="space-y-1 text-on-surface-variant text-[10px]">
                <li className="flex justify-between">
                  <span>Mon - Fri:</span> <span className="ml-2">8:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span> <span className="ml-2">9:00 - 14:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span> <span className="ml-2">Closed</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden md:block">
            <h4 className="font-title-lg text-primary font-bold mb-6 text-base md:text-lg">Hours</h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li className="flex justify-between">
                <span>Mon - Fri:</span> <span>8:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span> <span>9:00 - 14:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span> <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-container-max mx-auto pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant font-body-md text-xs md:text-sm">
          <p>© 2024 Speech & Development Care Center. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-all" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-all" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-all" href="#">
              Accessibility
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
