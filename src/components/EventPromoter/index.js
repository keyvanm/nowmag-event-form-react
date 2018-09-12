import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import axios from 'axios';

import PromotePage from './PromotePage';


function joinPath(match, path) {
  return `${match.path}${path}`;
}


class EventPromoter extends Component {
  render() {
    const { match } = this.props;
    // console.log(match);
    return (
      <div>
        <Switch>
          <Redirect exact path={match.path} to={joinPath(match, "promote/")} />
          <Route path={joinPath(match, "promote/")} component={PromotePage} />
          {/* <Route path="checkout" component={PromotePage} /> */}
          {/* <Route path="done" component={PromotePage} /> */}
          {/* <Route path="/events/{:eventUUID}" component={EventPromoter}/> */}
        </Switch>
      </div>
    );
  }
}

export default EventPromoter;
