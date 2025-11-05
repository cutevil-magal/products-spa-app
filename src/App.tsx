import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage/ProductDetailPage';
import { CreateProductPage } from './pages/CreateProductPage/CreateProductPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;