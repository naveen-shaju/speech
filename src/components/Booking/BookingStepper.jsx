import React, { useState } from 'react';

export default function BookingStepper({ onExit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    selectedDate: 11, // Day number in Nov 2024
    sessionMode: 'inperson', // 'inperson' or 'online'
    selectedTime: '09:00 AM',
    selectedService: 'Speech Therapy',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  // Helper to change input values and clear validation error on input
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Perform validation for the current step
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.parentName.trim()) {
        newErrors.parentName = 'Parent/Guardian name is required';
      }
      if (!formData.childName.trim()) {
        newErrors.childName = "Child's name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else {
        const digits = formData.phone.replace(/\D/g, '');
        if (digits.length < 7) {
          newErrors.phone = 'Please enter a valid phone number (at least 7 digits)';
        }
      }
    }

    if (step === 2) {
      if (!formData.selectedDate) {
        newErrors.selectedDate = 'Please select a date';
      }
      if (!formData.selectedTime) {
        newErrors.selectedTime = 'Please select an appointment time';
      }
    }

    if (step === 3) {
      if (!formData.selectedService) {
        newErrors.selectedService = 'Please select a therapy service';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsSubmitted(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetForm = () => {
    setFormData({
      parentName: '',
      childName: '',
      email: '',
      phone: '',
      selectedDate: 11,
      sessionMode: 'inperson',
      selectedTime: '09:00 AM',
      selectedService: 'Speech Therapy',
      notes: '',
    });
    setErrors({});
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  // November 2024 calendar rendering helper
  // Nov 1, 2024 is Friday. Columns are M, T, W, T, F, S, S
  // Friday is 5th column, so offset is 4 empty spots.
  const calendarOffset = 4;
  const daysInMonth = 30;

  const renderCalendar = () => {
    const days = [];
    // Render offset cells
    for (let i = 0; i < calendarOffset; i++) {
      days.push(<div key={`offset-${i}`} className="p-2 text-on-surface-variant/30"></div>);
    }
    // Render actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = formData.selectedDate === day;
      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleInputChange('selectedDate', day)}
          className={`p-2 rounded-lg text-center font-medium transition-all cursor-pointer ${
            isSelected
              ? 'bg-primary text-white font-bold shadow-md'
              : 'hover:bg-secondary-container hover:text-primary text-on-surface'
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const dayOfWeekName = (day) => {
    // Nov 1 is Friday. (Nov 1 % 7) = 1 (Friday).
    // Let's compute day of week name
    const weekdays = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];
    return weekdays[day % 7];
  };

  const formatSelectedDate = () => {
    const dayName = dayOfWeekName(formData.selectedDate);
    const months = ['Nov'];
    return `${dayName}, Nov ${formData.selectedDate}`;
  };

  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Navigation Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 bg-surface/80 backdrop-blur-md shadow-sm border-b border-surface-variant/20">
        <div className="flex items-center ml-2 md:ml-10">
          <img
            alt="Speech & Development Care Center Logo"
            className="h-15 md:h-20 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8UoJXK8wYReH6iHeAGNksuALmcosJxMjwKMzWMv5kKBkJsZicB_e40DJitU1bM12rEwETo5nDF8YKdEjCWh0gNkC11pxVHehOkePqqD6fHex9WT5fyYlpfBfZKTa4tpDXCmWCmfDKK4ekkFTWTWsKQ3kU-3wdIv1r0cBno5GXOWYDWMumIqogMOoFuxzea2goSTAvKQ5r43Xlw_rwa-fO8lljKz0hD37OzpFrq2f9JOgfpXfErnRqnCpWjybLj3en1PjOzHzb_vE"
          />
        </div>
        <button
          onClick={onExit || resetForm}
          className="text-secondary hover:text-primary transition-colors flex items-center gap-2 font-title-lg text-base md:text-title-lg"
        >
          <span className="material-symbols-outlined">close</span>
          <span className="hidden md:inline">Exit</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-margin-desktop flex flex-col items-center max-w-container-max mx-auto w-full">
        {!isSubmitted ? (
          <>
            {/* Progress Stepper */}
            <div className="w-full max-w-2xl mb-12">
              <div className="flex justify-between items-center relative">
                {/* Stepper Progress Lines */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-high -z-10 -translate-y-1/2 rounded-full"></div>
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>

                {/* Step 1 Node */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 ${
                      currentStep >= 1
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-surface-container-high text-on-surface-variant border-transparent'
                    }`}
                  >
                    1
                  </div>
                  <span
                    className={`font-label-sm text-xs md:text-label-sm ${
                      currentStep >= 1 ? 'text-primary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    Contact
                  </span>
                </div>

                {/* Step 2 Node */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 ${
                      currentStep >= 2
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-surface-container-high text-on-surface-variant border-transparent'
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`font-label-sm text-xs md:text-label-sm ${
                      currentStep >= 2 ? 'text-primary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    Details
                  </span>
                </div>

                {/* Step 3 Node */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 ${
                      currentStep >= 3
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-surface-container-high text-on-surface-variant border-transparent'
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`font-label-sm text-xs md:text-label-sm ${
                      currentStep >= 3 ? 'text-primary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    Service
                  </span>
                </div>

                {/* Step 4 Node */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 ${
                      currentStep >= 4
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-surface-container-high text-on-surface-variant border-transparent'
                    }`}
                  >
                    4
                  </div>
                  <span
                    className={`font-label-sm text-xs md:text-label-sm ${
                      currentStep >= 4 ? 'text-primary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    Confirm
                  </span>
                </div>
              </div>
            </div>

            {/* Form Steps Card Container */}
            <div className="w-full max-w-3xl glass-card rounded-xl p-8 md:p-12 min-h-[500px] flex flex-col justify-between">
              <div>
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <section className="step-transition space-y-8 animate-fadeIn">
                    <div className="text-center md:text-left">
                      <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
                        Welcome
                      </h1>
                      <p className="text-secondary font-body-lg text-body-lg">
                        Tell us a bit about yourself and your child to get started.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-label-sm text-label-sm text-outline">
                          Parent/Guardian Name
                        </label>
                        <input
                          className={`w-full bg-surface-container-low border-2 rounded-lg p-4 text-on-surface placeholder-outline-variant transition-all ${
                            errors.parentName ? 'border-error ring-1 ring-error/20' : 'border-transparent focus:border-primary/50'
                          }`}
                          value={formData.parentName}
                          onChange={(e) => handleInputChange('parentName', e.target.value)}
                          placeholder="Full name"
                          type="text"
                        />
                        {errors.parentName && (
                          <p className="text-error text-xs font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            {errors.parentName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="font-label-sm text-label-sm text-outline">
                          Child's Name
                        </label>
                        <input
                          className={`w-full bg-surface-container-low border-2 rounded-lg p-4 text-on-surface placeholder-outline-variant transition-all ${
                            errors.childName ? 'border-error ring-1 ring-error/20' : 'border-transparent focus:border-primary/50'
                          }`}
                          value={formData.childName}
                          onChange={(e) => handleInputChange('childName', e.target.value)}
                          placeholder="First & Last name"
                          type="text"
                        />
                        {errors.childName && (
                          <p className="text-error text-xs font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            {errors.childName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="font-label-sm text-label-sm text-outline">
                          Email Address
                        </label>
                        <input
                          className={`w-full bg-surface-container-low border-2 rounded-lg p-4 text-on-surface placeholder-outline-variant transition-all ${
                            errors.email ? 'border-error ring-1 ring-error/20' : 'border-transparent focus:border-primary/50'
                          }`}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="example@email.com"
                          type="email"
                        />
                        {errors.email && (
                          <p className="text-error text-xs font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="font-label-sm text-label-sm text-outline">
                          Phone Number
                        </label>
                        <input
                          className={`w-full bg-surface-container-low border-2 rounded-lg p-4 text-on-surface placeholder-outline-variant transition-all ${
                            errors.phone ? 'border-error ring-1 ring-error/20' : 'border-transparent focus:border-primary/50'
                          }`}
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          type="tel"
                        />
                        {errors.phone && (
                          <p className="text-error text-xs font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {/* Step 2: Date, Place & Mode */}
                {currentStep === 2 && (
                  <section className="step-transition space-y-8 animate-fadeIn">
                    <div className="text-center md:text-left">
                      <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
                        Scheduling
                      </h2>
                      <p className="text-secondary font-body-lg text-body-lg">
                        When and where would you like the session to take place?
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* Date Picker */}
                      <div className="space-y-4">
                        <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                          Select a Date
                        </label>
                        <div className="bg-surface-container-low rounded-xl p-4 border border-surface-variant/20 shadow-inner">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-title-lg text-primary font-bold">
                              November 2024
                            </span>
                            <div className="flex gap-2 text-secondary">
                              <span className="material-symbols-outlined cursor-not-allowed opacity-50">
                                chevron_left
                              </span>
                              <span className="material-symbols-outlined cursor-not-allowed opacity-50">
                                chevron_right
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center text-label-sm mb-2 font-bold text-outline">
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                            <div>S</div>
                          </div>
                          <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
                            {renderCalendar()}
                          </div>
                        </div>
                        {errors.selectedDate && (
                          <p className="text-error text-xs font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            {errors.selectedDate}
                          </p>
                        )}
                      </div>

                      {/* Mode Toggle & Times */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                            Session Mode
                          </label>
                          <div className="flex p-1 bg-surface-container rounded-full border border-surface-variant/20">
                            <button
                              type="button"
                              onClick={() => handleInputChange('sessionMode', 'inperson')}
                              className={`flex-1 py-3 rounded-full text-label-sm font-semibold transition-all ${
                                formData.sessionMode === 'inperson'
                                  ? 'bg-white text-primary shadow-sm'
                                  : 'text-secondary hover:text-primary'
                              }`}
                            >
                              In-Person
                            </button>
                            <button
                              type="button"
                              onClick={() => handleInputChange('sessionMode', 'online')}
                              className={`flex-1 py-3 rounded-full text-label-sm font-semibold transition-all ${
                                formData.sessionMode === 'online'
                                  ? 'bg-white text-primary shadow-sm'
                                  : 'text-secondary hover:text-primary'
                              }`}
                            >
                              Telehealth
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                            Available Times
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => {
                              const isSelected = formData.selectedTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => handleInputChange('selectedTime', time)}
                                  className={`p-3 border-2 rounded-lg text-label-sm font-semibold transition-all ${
                                    isSelected
                                      ? 'border-primary bg-primary-container/20 text-primary'
                                      : 'border-outline-variant hover:border-primary text-on-surface-variant'
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                          {errors.selectedTime && (
                            <p className="text-error text-xs font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">error</span>
                              {errors.selectedTime}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Step 3: Service Selection & Notes */}
                {currentStep === 3 && (
                  <section className="step-transition space-y-8 animate-fadeIn">
                    <div className="text-center md:text-left">
                      <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
                        Service Selection
                      </h2>
                      <p className="text-secondary font-body-lg text-body-lg">
                        How can we support your child's developmental journey?
                      </p>
                    </div>
                    <div className="space-y-8">
                      <div className="flex flex-wrap gap-3">
                        {[
                          'Speech Therapy',
                          'Occupational Therapy',
                          'Behavioral Analysis',
                          'Sensory Integration',
                          'Early Intervention',
                        ].map((service) => {
                          const isSelected = formData.selectedService === service;
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => handleInputChange('selectedService', service)}
                              className={`px-6 py-3 rounded-full border-2 font-semibold text-label-sm transition-all ${
                                isSelected
                                  ? 'border-primary bg-primary text-white shadow-md'
                                  : 'border-outline-variant text-secondary hover:border-primary hover:text-primary'
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => handleInputChange('selectedService', 'Speech Therapy')} // Defaults back or triggers help
                          className="px-6 py-3 rounded-full border border-outline-variant bg-surface-container-low text-tertiary font-semibold text-label-sm hover:bg-surface-container transition-all flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">help_outline</span>
                          Need Guidance?
                        </button>
                      </div>
                      {errors.selectedService && (
                        <p className="text-error text-xs font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          {errors.selectedService}
                        </p>
                      )}

                      <div className="space-y-4">
                        <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          className="w-full bg-surface-container-low border border-transparent focus:border-primary/50 rounded-xl p-4 text-on-surface placeholder-outline-variant resize-none transition-all"
                          value={formData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Share any specific concerns or current goals for your child..."
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </section>
                )}

                {/* Step 4: Confirmation Screen */}
                {currentStep === 4 && (
                  <section className="step-transition space-y-8 animate-fadeIn">
                    <div className="text-center">
                      <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
                        Confirm Your Visit
                      </h2>
                      <p className="text-secondary font-body-lg text-body-lg">
                        Please review your appointment summary below.
                      </p>
                    </div>
                    <div className="bg-surface-container/50 rounded-2xl p-8 border border-white/40 shadow-sm space-y-6">
                      <div className="flex flex-col md:flex-row justify-between border-b border-outline-variant pb-6 gap-6">
                        <div>
                          <p className="text-outline font-label-sm uppercase tracking-widest mb-1">
                            Patient & Contact
                          </p>
                          <h3 className="font-headline-md-mobile text-primary font-bold">
                            {formData.childName} (Parent: {formData.parentName})
                          </h3>
                          <p className="text-secondary font-medium mt-1">
                            {formData.email} • {formData.phone}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-outline font-label-sm uppercase tracking-widest mb-1">
                            Service
                          </p>
                          <span className="inline-block bg-primary-fixed text-on-primary-fixed-variant px-4 py-1 rounded-full font-semibold text-label-sm mt-1 border border-primary/20">
                            {formData.selectedService}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">calendar_today</span>
                          </div>
                          <div>
                            <p className="text-outline font-label-sm uppercase">Date & Time</p>
                            <p className="font-title-lg text-on-surface font-semibold">
                              {formatSelectedDate()} • {formData.selectedTime}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">location_on</span>
                          </div>
                          <div>
                            <p className="text-outline font-label-sm uppercase">Mode</p>
                            <p className="font-title-lg text-on-surface font-semibold">
                              {formData.sessionMode === 'inperson' ? 'In-Person Clinic' : 'Telehealth'}
                            </p>
                          </div>
                        </div>
                      </div>
                      {formData.notes && (
                        <div className="border-t border-outline-variant/50 pt-4 mt-2">
                          <p className="text-outline font-label-sm uppercase mb-1">Additional Notes</p>
                          <p className="text-on-surface-variant italic font-body-md">
                            "{formData.notes}"
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-xl border border-primary/10 flex gap-4">
                      <span className="material-symbols-outlined text-primary">info</span>
                      <p className="text-on-surface-variant font-label-sm">
                        A confirmation email will be sent upon booking with preparation steps for your child's first visit.
                      </p>
                    </div>
                  </section>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="mt-12 pt-6 flex justify-between items-center border-t border-surface-variant/20">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2 ${
                    currentStep === 1 ? 'invisible' : 'visible'
                  }`}
                >
                  <span className="material-symbols-outlined">arrow_back</span> Back
                </button>
                <div className="flex gap-4 items-center">
                  <span className="text-outline font-label-sm hidden md:block">
                    Step {currentStep} of {totalSteps}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary text-white font-bold px-8 md:px-12 py-4 rounded-full shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center gap-3 cursor-pointer"
                  >
                    <span>{currentStep === totalSteps ? 'Confirm Appointment' : 'Continue'}</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Success State (Final) */
          <section className="step-transition text-center space-y-8 py-10 animate-fadeIn max-w-lg glass-card rounded-xl p-12">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 scale-110 shadow-lg">
                <span className="material-symbols-outlined text-white text-5xl font-bold">check</span>
              </div>
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping -z-10"></div>
            </div>
            <div className="space-y-4">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary font-bold">
                Booking Confirmed!
              </h2>
              <p className="text-secondary font-body-lg text-body-lg max-w-md mx-auto">
                We're excited to support your family, <strong>{formData.parentName}</strong>. A calendar invite and intake forms for <strong>{formData.childName}</strong> have been sent to <strong>{formData.email}</strong>.
              </p>
            </div>
            <div className="pt-8">
              <button
                type="button"
                onClick={onExit || resetForm}
                className="bg-primary text-white font-bold px-10 py-4 rounded-full hover:shadow-xl transition-all hover:scale-105 cursor-pointer shadow-md"
              >
                Return to Dashboard
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full px-margin-mobile md:px-margin-desktop py-12 grid grid-cols-1 md:grid-cols-4 gap-gutter bg-surface-container dark:bg-inverse-surface mt-auto border-t border-surface-variant/20">
        <div className="col-span-1 md:col-span-1">
          <div className="font-headline-md text-headline-md font-bold text-primary mb-4">
            <div className="flex items-center">
              <img
                alt="Speech & Development Care Center Logo"
                className="h-12 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8UoJXK8wYReH6iHeAGNksuALmcosJxMjwKMzWMv5kKBkJsZicB_e40DJitU1bM12rEwETo5nDF8YKdEjCWh0gNkC11pxVHehOkePqqD6fHex9WT5fyYlpfBfZKTa4tpDXCmWCmfDKK4ekkFTWTWsKQ3kU-3wdIv1r0cBno5GXOWYDWMumIqogMOoFuxzea2goSTAvKQ5r43Xlw_rwa-fO8lljKz0hD37OzpFrq2f9JOgfpXfErnRqnCpWjybLj3en1PjOzHzb_vE"
              />
            </div>
          </div>
          <p className="text-on-surface-variant font-body-md text-body-md max-w-xs mt-2">
            Excellence in speech and developmental therapy since 2012.
          </p>
        </div>
        <div className="col-span-1">
          <h4 className="font-title-lg text-primary font-bold mb-4">Patient Care</h4>
          <ul className="space-y-2">
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium" href="#">
                Patient Portal
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium" href="#">
                Financial Assistance
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium" href="#">
                Feedback
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-title-lg text-primary font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium" href="#">
                Terms of Service
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-all text-sm font-medium" href="#">
                Accessibility
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-1 text-on-surface-variant font-body-md text-sm">
          <h4 className="font-title-lg text-primary font-bold mb-4">Contact Us</h4>
          <p className="mb-1">123 Excellence Blvd, Suite 400</p>
          <p className="mb-1">Phone: (555) 123-4567</p>
          <p className="mt-4 text-xs text-outline">© 2024 Speech & Development Care Center.</p>
        </div>
      </footer>
    </div>
  );
}
