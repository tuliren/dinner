import React from 'react';
import './App.css';
import Dinner from './Dinner';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <Container className="Dinner" maxWidth="md">
      <h1>Dinner Bill</h1>
      <Dinner/>
    </Container>
  );
};

export default App;
