import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Paths from './Paths';
import Main from './Main';
import AboutPage from './About';
import DogPage from './Dogs';
import ItemPage from './Items';

const AppRoutes = () => (
  <Routes>
    <Route path={Paths.main} element={<Main />} />
    <Route path={Paths.item} element={<ItemPage />} />
    <Route path={Paths.about} element={<AboutPage />} />
    <Route path={Paths.dog} element={<DogPage />} />
    <Route path={Paths.other} element={<Navigate replace to={Paths.defaultRoute} />} />
  </Routes>
);

export default AppRoutes;
