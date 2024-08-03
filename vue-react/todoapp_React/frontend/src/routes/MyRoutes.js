import React from 'react';
import HomePage from '../pages/HomePage';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Page404 from '../pages/Page404';
import HeaderMenu from '../components/Utilities/HeaderMenu';

const pages = [
  { path: '/', exact: true, component: HomePage },
  { path: '*', component: Page404 },
];

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <HeaderMenu />
      <Routes>
        {pages.map(({ component, path }) => {
          const Component = component;
          return <Route key={path} element={<Component />} path={path} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
