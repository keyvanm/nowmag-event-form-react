import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import PromotePage from './PromotePage';
import Done from './Done';


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
          <Route path={joinPath(match, "done/")} component={Done} />
        </Switch>
      </div>
    );
  }
}

export default EventPromoter;
