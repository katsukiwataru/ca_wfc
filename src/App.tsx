import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import history from './plugins/history';
import Header from './components/header';
import Route from './router';

const App: React.FC = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Route />
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
