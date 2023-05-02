import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Paths from './Paths';
import Main from './Main';
import AboutPage from './About';
import DogPage from './Dogs';
import ItemPage from './Items';
import ItemDetailsPage from './ItemDetails';
import ItemAddPage from './ItemAdd';
import SalePage from './Sales';

const AppRoutes = () => (
  <Routes>
    <Route path={Paths.main} element={<Main />} />
    <Route path={Paths.item} element={<ItemPage />} />
    <Route path={Paths.item_id} element={<ItemDetailsPage />} />
    <Route path={Paths.item_add} element={<ItemAddPage />} />
    <Route path={Paths.sale} element={<SalePage />} />
    <Route path={Paths.about} element={<AboutPage />} />
    <Route path={Paths.dog} element={<DogPage />} />
    {/* <Route path={Paths.other} element={<Navigate replace to={Paths.defaultRoute} />} /> */}
  </Routes>
);

export default AppRoutes;
