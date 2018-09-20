import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router';

import EventWizard from './components/EventWizard'
import EventPromoter from './components/EventPromoter'

import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route path="/events/add/" component={EventWizard} />
          <Route path="/events/:eventUUID/" component={EventPromoter}/>
        </Switch>
      </Container>
    );
  }
}

export default App;
