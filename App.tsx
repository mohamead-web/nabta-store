import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Box({children}:{children:React.ReactNode}) {
  return (
    <div style={{
      maxWidth: 920, margin: '40px auto', padding: 24,
      background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)',
      borderRadius: 16, color: '#fff', fontFamily: 'system-ui, sans-serif'
    }}>
      {children}
    </div>
  );
}

function Home() {
  return (
    <Box>
      <h1 style={{fontSize: 26, marginBottom: 8}}>تشخيص نبتة ✅</h1>
      <p style={{opacity:.85, marginBottom: 16}}>
        لو أنت شايف الصفحة دي فالتطبيق ركب بنجاح. المشكلة كانت في أحد المكونات/الاستيرادات.
      </p>
      <ul style={{lineHeight: '2'}}>
        <li><Link to="/" style={{textDecoration:'underline', color:'#c6ffe1'}}>الصفحة الرئيسية</Link></li>
        <li><a href="#/products" style={{textDecoration:'underline', color:'#c6ffe1'}}>صفحة المنتجات (رابطك الحالي)</a></li>
        <li><a href="#/admin" style={{textDecoration:'underline', color:'#c6ffe1'}}>صفحة الأدمن</a></li>
      </ul>
    </Box>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<Home/>} />
    </Routes>
  );
}
