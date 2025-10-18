
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Contact from './pages/Contact';
import Policies from './pages/Policies';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:code" element={<OrderSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
