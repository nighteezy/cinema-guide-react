import React from 'react';
import { Header } from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { RandomMovie } from './components/RandomMovie/RandomMovie';
import { Top10 } from './components/Top10/Top10';
import { Footer } from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <RandomMovie />
      <Top10 />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
