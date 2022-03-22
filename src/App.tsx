import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import routes from './config/routes';
import Header from './pages/layout/Header/index.tsx';
import Main from './pages/layout/Main';
import Page404 from './pages/Page404';
import { Route as AppRoute } from './types/Route'

function App() {

  const addRoute = (route: AppRoute) => (
    <Route key={route.key} path={route.path} component={route.component || Page404} exact />
  );

  return (
    <div className="App">
      <Header />
      <Router>
      <Switch>
        <Main>
        {routes.map((route: AppRoute) =>
                   addRoute(route)
                )}
        </Main>
        </Switch>
                </Router>
    </div>
  );
}

export default App;
