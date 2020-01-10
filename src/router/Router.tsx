import React from 'react';
import { Route, Switch } from 'react-router-dom';
import pages from './routes';

const Router = () => (
  <Switch>
    <Route exact path="/" component={pages.index} />
    <Route exact path="/series/:seriesId" component={pages.series} />
    <Route exact path="/story/:seriesId" component={pages.book} />
  </Switch>
);

export default Router;
