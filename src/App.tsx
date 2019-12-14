import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './plugins/history';
import Home from './container/index';
import Series from './container/series';
import Book from './container/book';
import Header from './components/header';

const App: React.FC = () => {
  return (
    <>
      <div>
        <Header />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/series/:seriesId" component={Series} />
            <Route exact path="/story/:seriesId" component={Book} />
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
