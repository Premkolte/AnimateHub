import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TemplatesPage from './TemplatesPage';
import Portfolio from './Portfolio';
import ProductPage from './Product';
import Blog from './Blog';

const TemplatesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TemplatesPage />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="blog" element={<Blog />} />
    </Routes>
  );
};

export default TemplatesRoutes;
