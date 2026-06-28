import React, { useState, useEffect } from 'react';

export default function BookingStepper({ onExit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    selectedDate: new Date().toISOString(), // Default to today's date
    sessionMode: 'inperson', // 'inperson' or 'online'
    selectedTime: '09:00 AM',
    selectedService: 'Speech Therapy',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [viewedYear, setViewedYear] = useState(new Date().getFullYear());
  const [viewedMonth, setViewedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const sendBookingEmail = async () => {
    const formattedDate = formatSelectedDate();
    const mode = formData.sessionMode === 'inperson' ? 'In-Person Clinic' : 'Telehealth';
    let accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
      accessKey = '96d126f7-a0aa-4ff5-859e-92c5edcee3a8';
    }

    const payload = {
      access_key: accessKey,
      subject: `New Appointment Booking: ${formData.childName} - Speech & Development Care Center`,
      from_name: formData.parentName,
      email: formData.email,
      message: `Dear Admin,

A new appointment has been booked. Below are the details:

- Parent/Guardian Name: ${formData.parentName}
- Child's Name: ${formData.childName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Selected Service: ${formData.selectedService}
- Session Mode: ${mode}
- Date: ${formattedDate}
- Time: ${formData.selectedTime}
- Additional Notes: ${formData.notes || 'None'}

Thank you.`,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('Web3Forms Response Stringified:', JSON.stringify(data));
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      } else {
        sendBookingEmail();
        setIsSubmitted(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };  const resetForm = () => {
    setFormData({
      parentName: '',
      childName: '',
      email: '',
      phone: '',
      selectedDate: new Date().toISOString(),
      sessionMode: 'inperson',
      selectedTime: '09:00 AM',
      selectedService: 'Speech Therapy',
      notes: '',
    });
    setViewedYear(new Date().getFullYear());
    setViewedMonth(new Date().getMonth());
    setErrors({});
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getCalendarOffset = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const handlePrevMonth = () => {
    const today = new Date();
    if (viewedYear > today.getFullYear() || (viewedYear === today.getFullYear() && viewedMonth > today.getMonth())) {
      if (viewedMonth === 0) {
        setViewedMonth(11);
        setViewedYear((prev) => prev - 1);
      } else {
        setViewedMonth((prev) => prev - 1);
      }
    }
  };

  const handleNextMonth = () => {
    if (viewedMonth === 11) {
      setViewedMonth(0);
      setViewedYear((prev) => prev + 1);
    } else {
      setViewedMonth((prev) => prev + 1);
    }
  };

  const renderCalendar = () => {
    const days = [];
    const offset = getCalendarOffset(viewedYear, viewedMonth);
    const daysCount = getDaysInMonth(viewedYear, viewedMonth);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Render offset cells
    for (let i = 0; i < offset; i++) {
      days.push(<div key={`offset-${i}`} className="p-2"></div>);
    }

    // Render actual days
    for (let day = 1; day <= daysCount; day++) {
      const cellDate = new Date(viewedYear, viewedMonth, day);
      const isPast = cellDate < today;

      let isSelected = false;
      if (formData.selectedDate) {
        const selected = new Date(formData.selectedDate);
        isSelected =
          selected.getDate() === day &&
          selected.getMonth() === viewedMonth &&
          selected.getFullYear() === viewedYear;
      }

      days.push(
        <button
          key={day}
          type="button"
          disabled={isPast}
          onClick={() => handleInputChange('selectedDate', cellDate.toISOString())}
          className={`p-2 rounded-lg text-center font-medium transition-all ${
            isPast
              ? 'text-on-surface-variant/20 cursor-not-allowed opacity-30'
              : isSelected
              ? 'bg-primary text-white font-bold shadow-md cursor-pointer'
              : 'hover:bg-secondary-container hover:text-primary text-on-surface cursor-pointer'
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const formatSelectedDate = () => {
    if (!formData.selectedDate) return '';
    const date = new Date(formData.selectedDate);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  };
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Navigation Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 bg-surface/80 backdrop-blur-md shadow-sm border-b border-surface-variant/20">
        <div className="flex items-center">
          <img
            alt="Speech & Development Care Center Logo"
            className="h-16 w-auto object-contain"
            src="/logo.jpeg"
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
                              {new Date(viewedYear, viewedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                            <div className="flex gap-2 text-secondary">
                              {(() => {
                                const today = new Date();
                                const isPrevDisabled = viewedYear === today.getFullYear() && viewedMonth === today.getMonth();
                                return (
                                  <button
                                    type="button"
                                    disabled={isPrevDisabled}
                                    onClick={handlePrevMonth}
                                    className={`material-symbols-outlined transition-all ${
                                      isPrevDisabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer hover:text-primary'
                                    }`}
                                  >
                                    chevron_left
                                  </button>
                                );
                              })()}
                              <button
                                type="button"
                                onClick={handleNextMonth}
                                className="material-symbols-outlined cursor-pointer hover:text-primary transition-all"
                              >
                                chevron_right
                              </button>
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
