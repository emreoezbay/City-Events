import { Container } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
//import routes from './config/routes';
import Home from './pages/Home';
import Header from './pages/layout/Header/index.tsx';
import Main from './pages/layout/Main';
import ManageEvents from './pages/ManageEvents';
import Page404 from './pages/Page404';
//import { Route as AppRoute } from './types/Route';

function App() {
  /*const addRoute = (route: AppRoute) => (
    <Route key={route.key} path={route.path} component={route.component || Page404} exact />
  );*/

  return (
    <div className="App">
      <Router>
        <Header />
        <Main>
          <Container maxWidth="sm">
            <Routes>
              <Route element={<Page404 />} />
              <Route path="/" element={<Home />} />
              <Route path="/manage" element={<ManageEvents />} />
            </Routes>
          </Container>
        </Main>
      </Router>
    </div>
  );
}

export default App;
