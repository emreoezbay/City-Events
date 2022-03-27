import { Container } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Main from './pages/layout/Main';
import Page404 from './pages/Page404';

function App() {
  return (
    <div className="App">
      <Router>
        {/*<Header />*/}
        <Main>
          <Container maxWidth="sm">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<Page404 />} />
            </Routes>
          </Container>
        </Main>
      </Router>
    </div>
  );
}

export default App;
