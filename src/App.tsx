import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Dinner from './Dinner';
import Footer from './Footer';

const App = () => {
  return (
    <Container className="Dinner" maxWidth="md">
      <h1>Dinner Bill</h1>
      <Dinner/>
      <Footer/>
    </Container>
  );
};

export default App;
