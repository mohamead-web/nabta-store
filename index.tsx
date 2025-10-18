import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

// صفحات الأدمن
import AdminLogin from './pages/AdminLogin';
import AdminOrders from './pages/AdminOrders';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AppProvider>
        <HashRouter>
          <Routes>
            {/* كل الموقع الحالي يبقى داخل App كما هو */}
            <Route path="/*" element={<App />} />

            {/* مسارات المشرف */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        </HashRouter>

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: 'bg-white/20 backdrop-blur-lg text-white border border-white/30',
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
          }}
        />
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>
);
