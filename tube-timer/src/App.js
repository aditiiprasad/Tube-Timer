// src/App.js
import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import Instruction from './components/Instruction';


function App() {
  return (
    <div className="App">
      <Header />
      <Instruction/>
      <Body />
      <Footer />
    </div>
  );
}

export default App;
