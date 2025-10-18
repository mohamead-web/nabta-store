import React, { lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

/** غلاف خطأ لكل صفحة */
class PageBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error: any, info: any) {
    console.error('Route crashed:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ maxWidth: 920, margin: '40px auto', padding: 24, color: '#fff' }}>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>حدث خطأ في هذه الصفحة</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,.12)', padding: 12, borderRadius: 8 }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <div style={{ marginTop: 12 }}>
            <Link to="/" style={{ textDecoration: 'underline', color: '#c6ffe1' }}>الرجوع للصفحة الرئيسية</Link>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}

/** Fallback أثناء التحميل */
function Loading() {
  return (
    <div style={{ maxWidth: 920, margin: '40px auto', padding: 24, color: '#fff' }}>
      جاري التحميل…
    </div>
  );
}

/** safeLazy: استيراد كسول مع هاندل للأخطاء بدون أقواس زائدة */
function safeLazy<T extends React.ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  name: string
) {
  return lazy(async () => {
    try {
      return await loader();
    } catch (e: any) {
      console.error(`Failed to load page "${name}"`, e);
      const Fallback = (() => (
        <div style={{ maxWidth: 920, margin: '40px auto', padding: 24, color: '#fff' }}>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>تعذر تحميل صفحة: {name}</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,.12)', padding: 12, borderRadius: 8 }}>
            {String(e?.message || e)}
          </pre>
          <Link to="/" style={{ textDecoration: 'underline', color: '#c6ffe1' }}>
            الرجوع للصفحة الرئيسية
          </Link>
        </div>
      )) as unknown as T;
      return { default: Fallback };
    }
  });
}

/** عرّف الصفحات حسب مجلدك */
const Home         = safeLazy(() => import('./pages/Home'),           'Home');
const Products     = safeLazy(() => import('./pages/Products'),       'Products');
const Product      = safeLazy(() => import('./pages/ProductDetails'), 'ProductDetails');
const Checkout     = safeLazy(() => import('./pages/Checkout'),       'Checkout');
const OrderSuccess = safeLazy(() => import('./pages/OrderSuccess'),   'OrderSuccess');
const Contact      = safeLazy(() => import('./pages/Contact'),        'Contact');
const Policies     = safeLazy(() => import('./pages/Policies'),       'Policies');
const Admin        = safeLazy(() => import('./pages/Admin'),          'Admin');

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <PageBoundary>
              <Home />
            </PageBoundary>
          }
        />
        <Route
          path="/products"
          element={
            <PageBoundary>
              <Products />
            </PageBoundary>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PageBoundary>
              <Product />
            </PageBoundary>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageBoundary>
              <Checkout />
            </PageBoundary>
          }
        />
        <Route
          path="/order-success/:code"
          element={
            <PageBoundary>
              <OrderSuccess />
            </PageBoundary>
          }
        />
        <Route
          path="/contact"
          element={
            <PageBoundary>
              <Contact />
            </PageBoundary>
          }
        />
        <Route
          path="/policies"
          element={
            <PageBoundary>
              <Policies />
            </PageBoundary>
          }
        />
        <Route
          path="/admin"
          element={
            <PageBoundary>
              <Admin />
            </PageBoundary>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
