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
    window.scrollTo(0, 0);
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
              src="/logo.jpeg"
            />
          </div>

          {/* Desktop Navigation (Rendered on both mobile and desktop) */}
          <nav className="flex gap-3 sm:gap-6 md:gap-8 items-center ml-2 sm:ml-6 md:ml-12 lg:ml-24">
            <a
              onClick={() => handleTabClick('services')}
              className={`font-title-lg text-[10px] sm:text-sm md:text-title-lg pb-0.5 md:pb-1 transition-all ${activeTab === 'services'
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-secondary hover:text-primary'
                }`}
              href="#services"
            >
              Services
            </a>
            <a
              onClick={() => handleTabClick('about')}
              className={`font-title-lg text-[10px] sm:text-sm md:text-title-lg pb-0.5 md:pb-1 transition-all ${activeTab === 'about'
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-secondary hover:text-primary'
                }`}
              href="#about"
            >
              Expertise
            </a>
            <a
              onClick={() => handleTabClick('contact')}
              className={`font-title-lg text-[10px] sm:text-sm md:text-title-lg pb-0.5 md:pb-1 transition-all ${activeTab === 'contact'
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
            className="block bg-primary text-on-primary px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 cursor-pointer text-[10px] sm:text-sm md:text-base"
          >
            Book an Appointment
          </button>
        </div>
      </header>

      <main className="pt-12 md:pt-20 overflow-x-hidden flex-grow">
        {/* Hero Section */}
        <section id="hero" className="relative flex items-center px-4 md:px-margin-desktop py-8 md:py-16 animate-fadeIn">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-secondary-container/30 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-primary-fixed/20 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto grid grid-cols-[1.2fr_0.8fr] md:grid-cols-2 gap-2 sm:gap-10 md:gap-16 lg:gap-20 items-center">
            <div className="space-y-3 md:space-y-8 text-left">
              <div className="inline-flex items-center gap-0.5 sm:gap-2 bg-secondary-container px-1.5 sm:px-4 py-0.5 md:py-1.5 rounded-full text-on-secondary-container font-label-sm uppercase tracking-widest text-[7.5px] sm:text-xs font-semibold">
                <span className="material-symbols-outlined text-[9px] sm:text-[18px]">verified</span>
                Compassionate Clinical Care
              </div>
              <h1 className="font-display-lg text-[13px] sm:text-[22px] md:text-5xl lg:text-6xl text-primary leading-[1.1] md:leading-tight max-w-xl font-black">
                Empowering Voice, <br />
                <span className="text-tertiary">Connecting Minds,</span>
                <br />
                Nurturing Growth
              </h1>
              <p className="font-body-md text-[8px] sm:text-[12px] md:text-body-lg text-on-surface-variant max-w-lg leading-relaxed mx-0">
                Dedicated, specialized support for speech, communication, and developmental milestones at every stage of life.
              </p>
              <div className="flex gap-1.5 sm:gap-4 justify-start">
                <button
                  onClick={onBookAppointment}
                  className="bg-primary text-on-primary px-2 sm:px-6 py-1 sm:py-3 rounded-md sm:rounded-xl font-bold shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all cursor-pointer text-[7.5px] sm:text-[11px] md:text-base"
                >
                  Get Guided Care
                </button>
                <a
                  href="#services"
                  className="flex items-center justify-center gap-0.5 sm:gap-2 px-2 sm:px-6 py-1 sm:py-3 rounded-md sm:rounded-xl font-bold text-primary border border-outline-variant hover:bg-surface-container-low transition-all text-[7.5px] sm:text-[11px] md:text-base"
                >
                  <span className="material-symbols-outlined text-[10px] sm:text-base">play_circle</span>
                  How it works
                </a>
              </div>

              {/* Trust/Credibility Badges */}
              <div className="flex flex-row flex-nowrap items-center justify-between sm:justify-start gap-x-1 sm:gap-x-6 pt-4 sm:pt-6 border-t border-surface-variant/20 text-on-surface-variant text-[8px] sm:text-xs md:text-sm w-full">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="material-symbols-outlined text-primary text-[12px] sm:text-[18px] md:text-[20px]">verified_user</span>
                  <span className="font-semibold text-on-surface">RCI Registered</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="material-symbols-outlined text-primary text-[12px] sm:text-[18px] md:text-[20px]">school</span>
                  <span className="font-semibold text-on-surface">MSc SLP</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="material-symbols-outlined text-primary text-[12px] sm:text-[18px] md:text-[20px]">history</span>
                  <span className="font-semibold text-on-surface">5+ Yrs Experience</span>
                </div>
              </div>
            </div>

            <div className="relative group flex justify-start">
              <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl shadow-primary/10 max-w-[160px] sm:max-w-[220px] md:max-w-lg w-full aspect-[3/2] md:aspect-auto ml-auto">
                <img
                  alt="Speech & Development Care Center"
                  className="w-full h-full object-cover animate-fadeIn"
                  src="/hero.jpg"
                />
              </div>

              {/* Floating Card 1: 1200+ Families */}
              <div className="absolute -bottom-2 -left-6 sm:-left-12 md:-bottom-10 md:-left-[120px] glass-card p-1.5 sm:p-3 md:p-5 rounded-lg md:rounded-xl block max-w-[85px] sm:max-w-[130px] md:max-w-[240px] scale-[0.6] sm:scale-75 md:scale-100 origin-bottom-left hover:-translate-y-1 transition-transform duration-300">
                <div className="hidden md:flex -space-x-1.5 md:-space-x-2.5 overflow-hidden mb-1.5 md:mb-3">
                  <div className="inline-flex h-4 w-4 md:h-8 md:w-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant items-center justify-center text-[6px] md:text-[10px] font-bold ring-1 md:ring-2 ring-white">ES</div>
                  <div className="inline-flex h-4 w-4 md:h-8 md:w-8 rounded-full bg-secondary-fixed text-on-secondary-fixed items-center justify-center text-[6px] md:text-[10px] font-bold ring-1 md:ring-2 ring-white">AM</div>
                  <div className="inline-flex h-4 w-4 md:h-8 md:w-8 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed-variant items-center justify-center text-[6px] md:text-[10px] font-bold ring-1 md:ring-2 ring-white">KP</div>
                  <div className="inline-flex h-4 w-4 md:h-8 md:w-8 rounded-full bg-primary text-on-primary items-center justify-center text-[6px] md:text-[10px] font-bold ring-1 md:ring-2 ring-white">+</div>
                </div>
                <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[7px] sm:text-[10px] md:text-lg">diversity_3</span>
                  </div>
                  <div className="font-bold text-[7px] sm:text-[10px] md:text-[14px] text-primary">1,200+ Families</div>
                </div>
                <p className="text-on-surface-variant text-[5.5px] sm:text-[8px] md:text-[12px] leading-tight md:leading-snug">
                  Supported through personalized developmental journeys this year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section id="about" className="relative md:min-h-[calc(100vh-6rem)] flex items-center px-margin-mobile md:px-margin-desktop py-6 md:py-12 bg-surface-container-lowest animate-fadeIn border-t border-b border-surface-variant/20">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
            <div className="flex justify-center">
              <div className="relative rounded-xl overflow-hidden aspect-square max-w-md w-full shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  alt="Divyashree"
                  src="/therapist.jpg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <p className="text-white font-bold text-[12px] md:text-2xl">Divyashree</p>
                  <p className="text-white/80 text-[9px] md:text-sm font-medium">Speech-Language Pathologist</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 md:space-y-8">
              <h2 className="font-headline-md text-[18px] md:text-headline-md text-primary font-bold">
                A Legacy of Care
              </h2>
              <div className="space-y-3 md:space-y-6 text-on-surface-variant">
                <p className="font-body-lg italic border-l-2 md:border-l-4 border-primary pl-2 md:pl-6 text-[11px] md:text-lg">
                  "Every child’s voice deserves to be heard. My mission is to make sure no parent walks alone in that journey."
                </p>
                <p className="font-body-md text-[11px] md:text-base leading-relaxed">
                  With 5 years of dedicated clinical experience, I am Divyashree - a passionate Speech-Language Pathologist committed to making a real difference in every child’s communication journey. I believe that behind every child struggling to speak, there is a parent who needs guidance, reassurance, and the right tools. Too many families are navigating this path without proper advice or therapy - and that is exactly the gap I built Communica to fill. My platform is a space where parents and caregivers are trained, counselled, and empowered to actively support their child’s growth at home - because when a parent understands their child’s needs, progress happens every single day. Every child matters here. Every milestone celebrated. Every family supported one step at a time.
                </p>
                <div className="grid grid-cols-2 gap-3 md:gap-4 pt-1 md:pt-4">
                  <div className="flex items-center md:items-start gap-1.5 md:gap-3">
                    <span className="material-symbols-outlined text-primary text-[14px] md:text-xl md:mt-1">school</span>
                    <div>
                      <p className="font-bold text-[10px] md:text-[16px] text-on-surface leading-tight">MSc Speech-Language Pathology</p>
                    </div>
                  </div>
                  <div className="flex items-center md:items-start gap-1.5 md:gap-3">
                    <span className="material-symbols-outlined text-primary text-[14px] md:text-xl md:mt-1">verified_user</span>
                    <div>
                      <p className="font-bold text-[10px] md:text-[16px] text-on-surface leading-tight">RCI Registered Speech-Language Pathologist</p>
                    </div>
                  </div>
                  <div className="flex items-center md:items-start gap-1.5 md:gap-3">
                    <span className="material-symbols-outlined text-primary text-[14px] md:text-xl md:mt-1">workspace_premium</span>
                    <div>
                      <p className="font-bold text-[10px] md:text-[16px] text-on-surface leading-tight">OPT Level 1 Certified Practitioner</p>
                    </div>
                  </div>
                  <div className="flex items-center md:items-start gap-1.5 md:gap-3">
                    <span className="material-symbols-outlined text-primary text-[14px] md:text-xl md:mt-1">psychology</span>
                    <div>
                      <p className="font-bold text-[10px] md:text-[16px] text-on-surface leading-tight">Natural Language Acquisition</p>
                      <p className="text-[9px] sm:text-[14px] block text-on-surface-variant">GLP Practitioner</p>
                    </div>
                  </div>
                  <div className="flex items-center md:items-start gap-1.5 md:gap-3 col-span-2">
                    <span className="material-symbols-outlined text-primary text-[14px] md:text-xl md:mt-1">history</span>
                    <div>
                      <p className="font-bold text-[10px] md:text-[16px] text-on-surface leading-tight">5 Years of Clinical Experience</p>
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
                <p className="block text-[9px] sm:text-xs md:text-sm opacity-80 mb-2 md:mb-4 group-hover:text-white/90">
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
                <p className="block text-[9px] sm:text-xs md:text-sm opacity-80 mb-2 md:mb-4 group-hover:text-white/90">
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
                <p className="block text-[9px] sm:text-xs md:text-sm opacity-80 mb-2 md:mb-4 group-hover:text-white/90">
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
                <p className="block text-[9px] sm:text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1">
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
                <p className="block text-[9px] sm:text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1">
                  Fluency shaping and vocal health management for all age groups.
                </p>
              </div>
            </div>

            {/* Guidance Card */}
            <div className="bento-item bg-secondary-container p-4 md:p-8 rounded-lg md:rounded-xl text-center space-y-2 md:space-y-4 relative overflow-hidden border border-primary/10 shadow-sm col-span-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="font-headline-md text-xs sm:text-base md:text-xl text-primary font-bold">
                  I'm Not Sure – Need Guidance?
                </h3>
                <p className="font-body-lg text-on-secondary-container max-w-xl mx-auto text-[9px] sm:text-xs md:text-sm">
                  Every journey starts with understanding. Schedule a free 15-minute consultation to find the right path for your family.
                </p>
                <button
                  onClick={onBookAppointment}
                  className="bg-primary text-on-primary px-3 sm:px-6 md:px-8 py-1.5 sm:py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold shadow-lg hover:bg-tertiary transition-colors cursor-pointer text-[9px] sm:text-xs md:text-sm mt-1 md:mt-2"
                >
                  Request Clinical Guidance
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
                <p className="block text-[9px] sm:text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1">
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
                <p className="block text-[9px] sm:text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1">
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
        <div className="max-w-container-max mx-auto grid grid-cols-4 gap-2 sm:gap-6 md:gap-gutter mb-6 md:mb-16">
          <div className="col-span-1">
            <div className="font-headline-md text-headline-md font-bold text-primary mb-2 md:mb-6 flex items-center">
              <img
                alt="Speech & Development Care Center Logo"
                className="h-6 sm:h-8 md:h-16 w-auto object-contain"
                src="/logo.jpeg"
              />
            </div>
            <p className="text-on-surface-variant font-body-md mb-2 md:mb-6 leading-relaxed text-[8px] sm:text-xs md:text-sm block">
              Compassionate expertise for speech and developmental milestones.
            </p>
            <div className="flex gap-1.5 md:gap-4">
              <a
                className="w-5 h-5 sm:w-10 sm:h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:text-primary transition-colors border border-surface-variant/10 text-secondary"
                href="#"
              >
                <span className="material-symbols-outlined text-[10px] sm:text-[20px]">public</span>
              </a>
              <a
                className="w-5 h-5 sm:w-10 sm:h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:text-primary transition-colors border border-surface-variant/10 text-secondary"
                href="#"
              >
                <span className="material-symbols-outlined text-[10px] sm:text-[20px]">share</span>
              </a>
            </div>
          </div>
          <div className="block">
            <h4 className="font-title-lg text-primary font-bold mb-2 md:mb-6 text-[10px] sm:text-base md:text-lg">Practice</h4>
            <ul className="space-y-1 sm:space-y-4 text-[9px] sm:text-sm text-on-surface-variant">
              <li>
                <a className="hover:text-primary underline transition-all" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-primary underline transition-all" href="#">
                  Our Team
                </a>
              </li>
              <li>
                <a className="hover:text-primary underline transition-all" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-primary underline transition-all" href="#">
                  Patient Portal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-title-lg text-primary font-bold mb-2 md:mb-6 text-[10px] sm:text-base md:text-lg">Contact</h4>
            <ul className="space-y-1 sm:space-y-4 text-on-surface-variant text-[9px] sm:text-sm">
              <li className="flex gap-1 md:gap-2">
                <span className="material-symbols-outlined text-primary text-[10px] sm:text-base">location_on</span>
                <span>
                  123 Healing Path Way,
                  <br />
                  Suite 200, Boston MA
                </span>
              </li>
              <li className="flex gap-1 md:gap-2">
                <span className="material-symbols-outlined text-primary text-[10px] sm:text-base">call</span>
                <span>(555) 012-3456</span>
              </li>
              <li className="flex gap-1 md:gap-2">
                <span className="material-symbols-outlined text-primary text-[10px] sm:text-base">mail</span>
                <span className="break-all">care@speechdevelopment.com</span>
              </li>
            </ul>
          </div>
          <div className="block">
            <h4 className="font-title-lg text-primary font-bold mb-2 md:mb-6 text-[10px] sm:text-base md:text-lg">Hours</h4>
            <ul className="space-y-1 sm:space-y-4 text-on-surface-variant text-[9px] sm:text-sm">
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
