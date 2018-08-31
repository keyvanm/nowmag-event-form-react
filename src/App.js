import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import EventWizard from './components/EventWizard'

import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <EventWizard />
      </Container>
    );
  }
}

export default App;
