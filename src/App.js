import React from 'react';
import HomePage from './pages/HomePage';
import EventProvider from './context/EventProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  return (
    <EventProvider>
      <div id="App">
        <Header/>
        <main>
          <HomePage />
        </main>
        <Footer/>
      </div>
    </EventProvider>
  );
}

export default App;
