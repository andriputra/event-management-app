import React from 'react';
import HomePage from './pages/HomePage';
import EventProvider from './context/EventProvider';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <EventProvider>
      <Header/>
      <HomePage />
      <Footer/>
    </EventProvider>
  );
}

export default App;
