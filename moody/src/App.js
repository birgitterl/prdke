import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/auth/LandingPage';
import Routes from './components/routing/Routes';
import { LOGOUT } from './actions/types';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Header from './components/layout/Header';
import { Container } from 'react-bootstrap';

const App = () => {
  useEffect(() => {
    // check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route component={Routes} />
          </Switch>
        </Container>
      </main>
    </Router>
  );
};

export default App;
