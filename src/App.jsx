import React, { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import BookingStepper from './components/Booking/BookingStepper';
import './App.css';

function App() {
  const [view, setView] = useState('landing'); // 'landing' or 'booking'

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onBookAppointment={() => setView('booking')} />
      ) : (
        <BookingStepper onExit={() => setView('landing')} />
      )}
    </>
  );
}

export default App;
