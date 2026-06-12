import React, { useState, useEffect } from 'react';

export default function LandingPage({ onBookAppointment }) {
  const [activeTab, setActiveTab] = useState('services');

  useEffect(() => {
    const sections = ['services', 'about', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto left-0 right-0 border-b border-surface-variant/10">
        <div className="font-headline-md text-headline-md font-bold text-primary tracking-tight flex items-center ml-2 md:ml-10">
          <img
            alt="Speech & Development Care Center Logo"
            className="h-15 md:h-20 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8UoJXK8wYReH6iHeAGNksuALmcosJxMjwKMzWMv5kKBkJsZicB_e40DJitU1bM12rEwETo5nDF8YKdEjCWh0gNkC11pxVHehOkePqqD6fHex9WT5fyYlpfBfZKTa4tpDXCmWCmfDKK4ekkFTWTWsKQ3kU-3wdIv1r0cBno5GXOWYDWMumIqogMOoFuxzea2goSTAvKQ5r43Xlw_rwa-fO8lljKz0hD37OzpFrq2f9JOgfpXfErnRqnCpWjybLj3en1PjOzHzb_vE"
          />
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a
            onClick={() => setActiveTab('services')}
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
            onClick={() => setActiveTab('about')}
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
            onClick={() => setActiveTab('contact')}
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
          className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
        >
          Book an Appointment
        </button>
      </header>

      <main className="pt-24 overflow-x-hidden flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-6rem)] flex items-center px-margin-mobile md:px-margin-desktop py-12 animate-fadeIn">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-secondary-container/30 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-primary-fixed/20 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:gap-20">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-secondary-container px-4 py-1.5 rounded-full text-on-secondary-container font-label-sm uppercase tracking-widest text-xs font-semibold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Compassionate Clinical Care
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight max-w-xl font-bold">
                Empowering Voice, <br />
                <span className="text-tertiary">Connecting Minds,</span>
                <br />
                Nurturing Growth
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed mx-auto lg:mx-0">
                Dedicated, specialized support for speech, communication, and developmental milestones at every stage of life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onBookAppointment}
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all cursor-pointer"
                >
                  Get Guided Care
                </button>
                <a
                  href="#services"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-primary border border-outline-variant hover:bg-surface-container-low transition-all"
                >
                  <span className="material-symbols-outlined">play_circle</span>
                  How it works
                </a>
              </div>
            </div>
            <div className="relative group flex justify-center lg:justify-end">
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-primary/10 max-w-lg w-full">
                <img
                  alt="Speech & Development Care Center"
                  className="w-full h-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYX5s6eEyQ1cuy1Gtm1eY7Kr03pAIJR4v3-yJwZi_7LapemjpSkp5NH7XRL6Fymfg91hOQDwgb06r1bhHp390ZmKMSVKGL1ck1oWy5WX9eNNjhwIo9L5wW3FvHI1PBwPLDusAN5eCIsG1aNrpy1-SXao06w4aJb_9uqFPmQ3bf8ByA0xpxDM4U8Flqu09qs8Mc8qXns-o7ZUP9CD1bYDA7SPQCTLf_z6-AN24FGMU-36puua4ojH8NI-uaOndVlwvgm_B9WnSiI8E"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              {/* Decorative Floating Card */}
              <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-xl hidden md:block max-w-[240px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">diversity_3</span>
                  </div>
                  <div className="font-bold text-[16px] text-primary">1,200+ Families</div>
                </div>
                <p className="text-on-surface-variant text-[14px]">
                  Supported through personalized developmental journeys this year.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section id="about" className="relative min-h-[calc(100vh-6rem)] flex items-center px-margin-mobile md:px-margin-desktop py-12 bg-surface-container-lowest animate-fadeIn border-t border-b border-surface-variant/20">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="relative rounded-xl overflow-hidden aspect-square max-w-md w-full shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  alt="Dr. Elena Sterling"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA13eGQVVwXn3RlKROrDWHY_QvEVuoLA_y0dqrl0TvLk2nEq5NM8peXweZURON6TefIoUtlOO9Vl0Ybab2tONLmjBuiw7Sfb2JzejbgBJKxRrgz9L3DKl1wZcft9u8Vj_NQ6gEh8kBFdZnEDz6qhMLL0RsezAHOTsohFGDbR-gFKfDrOrb6hE1GmXv-0_WyIz_DGv2l3PtkdOnWr7ssfVsxIuF6hFXEL8-rj_7BJWjmH_N28nOU508_scEy-zpXTF7OF38p9tRRbjk"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  <p className="text-white font-bold text-xl md:text-2xl">Dr. Elena Sterling</p>
                  <p className="text-white/80 text-sm font-medium">Lead Clinical Specialist</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <h2 className="font-headline-md text-headline-md text-primary font-bold">
                A Legacy of Care
              </h2>
              <div className="space-y-6 text-on-surface-variant">
                <p className="font-body-lg italic border-l-4 border-primary pl-6 text-lg">
                  "Every child's voice is a unique symphony waiting to be heard. Our mission is to provide the instruments and the guidance to make that possible."
                </p>
                <p className="font-body-md text-base leading-relaxed">
                  With over 15 years of specialized experience in neurodevelopmental communication, Dr. Sterling founded the center on the principle that therapy should be as unique as the individual.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1">school</span>
                    <div>
                      <p className="font-bold text-[16px] text-on-surface">PhD Clinical Linguistics</p>
                      <p className="text-[14px]">Stanford University</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-1">verified_user</span>
                    <div>
                      <p className="font-bold text-[16px] text-on-surface">ASHA Certified</p>
                      <p className="text-[14px]">Board Certified Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-8 bg-background">
          <div className="max-w-container-max mx-auto mb-8 text-center">
            <h2 className="font-headline-md text-headline-md text-primary font-bold mb-2">
              Specialized Pathways
            </h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
              Customized clinical intervention designed around developmental milestones and personal goals.
            </p>
          </div>
          <div className="max-w-container-max mx-auto bento-grid">
            {/* Child Speech */}
            <div
              onClick={onBookAppointment}
              className="bento-item-4 glass-card p-5 md:p-6 rounded-xl group hover:bg-primary hover:text-on-primary transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[32px] mb-3 block">
                  child_care
                </span>
                <h3 className="font-bold text-base group-hover:text-on-primary mb-2">Child Speech</h3>
                <p className="text-xs md:text-sm opacity-80 mb-4 group-hover:text-white/90">
                  Articulative development and early phonological clarity for growing minds.
                </p>
              </div>
              <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform self-start text-sm">
                arrow_forward
              </span>
            </div>

            {/* Autism Support */}
            <div
              onClick={onBookAppointment}
              className="bento-item-4 glass-card p-5 md:p-6 rounded-xl group hover:bg-primary hover:text-on-primary transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[32px] mb-3 block">
                  extension
                </span>
                <h3 className="font-bold text-base group-hover:text-on-primary mb-2">Autism Support</h3>
                <p className="text-xs md:text-sm opacity-80 mb-4 group-hover:text-white/90">
                  Neuro-affirming communication strategies and sensory-integrated support.
                </p>
              </div>
              <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform self-start text-sm">
                arrow_forward
              </span>
            </div>

            {/* Early Intervention */}
            <div
              onClick={onBookAppointment}
              className="bento-item-4 glass-card p-5 md:p-6 rounded-xl group hover:bg-primary hover:text-on-primary transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[32px] mb-3 block">
                  spa
                </span>
                <h3 className="font-bold text-base group-hover:text-on-primary mb-2">Early Intervention</h3>
                <p className="text-xs md:text-sm opacity-80 mb-4 group-hover:text-white/90">
                  Proactive identification and foundational support for toddlers 0-3.
                </p>
              </div>
              <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform self-start text-sm">
                arrow_forward
              </span>
            </div>

            {/* Learning/Language */}
            <div className="bento-item-6 glass-card p-6 rounded-xl flex items-center gap-6 group hover:shadow-2xl transition-all cursor-pointer">
              <div className="hidden sm:block">
                <span className="material-symbols-outlined text-primary text-[48px]">auto_stories</span>
              </div>
              <div>
                <h3 className="font-bold text-base mb-2">Learning & Language</h3>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Cognitive-linguistic strategies for academic success and literacy development.
                </p>
              </div>
            </div>

            {/* Stammering/Voice */}
            <div className="bento-item-6 glass-card p-6 rounded-xl flex items-center gap-6 group hover:shadow-2xl transition-all cursor-pointer">
              <div className="hidden sm:block">
                <span className="material-symbols-outlined text-primary text-[48px]">record_voice_over</span>
              </div>
              <div>
                <h3 className="font-bold text-base mb-2">Stammering & Voice</h3>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Fluency shaping and vocal health management for all age groups.
                </p>
              </div>
            </div>

            {/* Guidance Card */}
            <div className="bento-item bg-secondary-container p-6 md:p-8 rounded-xl text-center space-y-4 relative overflow-hidden border border-primary/10 shadow-sm col-span-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="font-headline-md text-lg md:text-xl text-primary font-bold">
                  I'm Not Sure – Need Guidance?
                </h3>
                <p className="font-body-lg text-on-secondary-container max-w-xl mx-auto mb-4 text-xs md:text-sm">
                  Every journey starts with understanding. Schedule a free 15-minute consultation to find the right path for your family.
                </p>
                <button
                  onClick={onBookAppointment}
                  className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-tertiary transition-colors cursor-pointer text-xs md:text-sm"
                >
                  Request Clinical Guidance
                </button>
              </div>
            </div>

            {/* Adult Support */}
            <div className="bento-item-6 glass-card p-5 md:p-6 rounded-xl group hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-[28px] mb-3 block">groups</span>
                <h3 className="font-bold text-base mb-1">Adult Support</h3>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Post-stroke recovery, social communication, and professional voice coaching.
                </p>
              </div>
            </div>

            {/* Parent Consultation */}
            <div className="bento-item-6 glass-card p-5 md:p-6 rounded-xl group hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-[28px] mb-3 block">
                  psychology_alt
                </span>
                <h3 className="font-bold text-base mb-1">Parent Consultation</h3>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Empowering caregivers with tools and home-based developmental strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto rounded-xl bg-primary p-12 md:p-20 text-center text-on-primary relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-container/40 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="font-headline-md text-headline-md md:text-[40px] font-bold">
                Ready to unlock their potential?
              </h2>
              <p className="font-body-lg opacity-90 max-w-lg mx-auto text-base md:text-lg">
                Book your initial evaluation and begin a personalized journey toward better communication.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={onBookAppointment}
                  className="bg-white text-primary px-12 py-5 rounded-full font-bold hover:bg-secondary-fixed transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                >
                  Book an Evaluation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-surface-container w-full px-margin-mobile md:px-margin-desktop py-20 border-t border-surface-variant/20">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
          <div className="col-span-1">
            <div className="font-headline-md text-headline-md font-bold text-primary mb-6 flex items-center">
              <img
                alt="Speech & Development Care Center Logo"
                className="h-16 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8UoJXK8wYReH6iHeAGNksuALmcosJxMjwKMzWMv5kKBkJsZicB_e40DJitU1bM12rEwETo5nDF8YKdEjCWh0gNkC11pxVHehOkePqqD6fHex9WT5fyYlpfBfZKTa4tpDXCmWCmfDKK4ekkFTWTWsKQ3kU-3wdIv1r0cBno5GXOWYDWMumIqogMOoFuxzea2goSTAvKQ5r43Xlw_rwa-fO8lljKz0hD37OzpFrq2f9JOgfpXfErnRqnCpWjybLj3en1PjOzHzb_vE"
              />
            </div>
            <p className="text-on-surface-variant font-body-md mb-6 leading-relaxed text-sm">
              Compassionate expertise for speech and developmental milestones.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:text-primary transition-colors border border-surface-variant/10 text-secondary"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">public</span>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:text-primary transition-colors border border-surface-variant/10 text-secondary"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </a>
            </div>
          </div>
          <div>
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
            <h4 className="font-title-lg text-primary font-bold mb-6 text-base md:text-lg">Contact</h4>
            <ul className="space-y-4 text-on-surface-variant text-sm">
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span>
                  123 Healing Path Way,
                  <br />
                  Suite 200, Boston MA
                </span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-primary">call</span>
                <span>(555) 012-3456</span>
              </li>
              <li className="flex gap-2">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span>care@speechdevelopment.com</span>
              </li>
            </ul>
          </div>
          <div>
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
