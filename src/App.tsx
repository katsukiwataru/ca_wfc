import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './plugins/history';
import Home from './container/index';
import Series from './container/series';

const App: React.FC = () => {
  return (
    <>
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/series/:seriesId" component={Series} />
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
