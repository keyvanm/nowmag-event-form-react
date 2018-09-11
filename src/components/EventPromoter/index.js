import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

function joinPath(match, path) {
  return `${match.path}${path}`
}


class EventPromoter extends Component {
  render() {
    const { match } = this.props;
    console.log(match);
    return (
      <Switch>
        <Redirect exact path={match.path} to={joinPath(match, "promote/")} />
        <Route path={joinPath(match, "promote/")} render={props => <h1>Promote your event</h1>} />
        {/* <Route path="checkout" component={PromotePage} /> */}
        {/* <Route path="done" component={PromotePage} /> */}
        {/* <Route path="/events/{:eventUUID}" component={EventPromoter}/> */}
      </Switch>
    );
  }
}

export default EventPromoter;
