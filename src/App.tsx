import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './plugins/history';
import Header from './components/header';
const Home = lazy(() => import('./container/index'));
const Series = lazy(() => import('./container/series'));
const Book = lazy(() => import('./container/book'));

const App: React.FC = () => {
  return (
    <>
      <div>
        <Router history={history}>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/series/:seriesId" component={Series} />
              <Route exact path="/story/:seriesId" component={Book} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </>
  );
};

export default App;
