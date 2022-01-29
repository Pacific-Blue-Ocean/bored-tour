import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from 'react-dom';

import App from './components/App.jsx';
import Friends from './components/friends';
import Events from './components/events';
import Interests from './components/interests';
import NotFound from './components/notfound';
import { Login } from './components/Login.jsx';

render(
  <BrowserRouter>
  <ChakraProvider>
  <Routes>
      <Route path="/" element={<App />} />
      <Route path="friends" element={<Friends />} />
      <Route path="events" element={<Events />} />
      <Route path="interests" element={<Interests />} />
      <Route path="login" element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </ChakraProvider>
  </BrowserRouter>
  , document.getElementById('app'));