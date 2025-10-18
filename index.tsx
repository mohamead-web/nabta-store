import React from 'react';
import ReactDOM from 'react-dom/client';

// ErrorBoundary تعرض أي خطأ على الشاشة بدل ما تبقى الصفحة فاضية
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error: any, info: any) {
    console.error('App crashed:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: '#fff', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: 22, marginBottom: 8 }}>حدث خطأ في التشغيل</h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: 'rgba(255,255,255,.12)', padding: 12, borderRadius: 8 }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <p style={{ opacity: .8, marginTop: 12 }}>افتح Console لو احتجنا التفاصيل.</p>
        </div>
      );
    }
    return this.props.children as any;
  }
}

// ✅ جرِّب أولًا أن نُثبت أن التركيب شغّال
// الخطوة 1: لو ظهرت عبارة "Mounted OK" فالمشكلة داخل App أو importاته.
// الخطوة 2: بدّل التعليقين أدناه لتُحمّل App الحقيقي.
const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <div style={{ padding: 24, color: '#fff', fontSize: 20 }}>✅ Mounted OK</div>

      {/* ====== بدّل السطرين التاليين بعد التأكد أن "Mounted OK" ظهرت ====== */}
      {/* 
      <AppBoot />
      */}
    </ErrorBoundary>
  </React.StrictMode>
);

/* لو أردت تجربة التطبيق الحقيقي: فعّل الكود أدناه بعد ما تتأكد أن "Mounted OK" تظهر */
//
// import { HashRouter } from 'react-router-dom';
// import App from './App';
// import { HelmetProvider } from 'react-helmet-async';
// import { AppProvider } from './context/AppContext';
// import { Toaster } from 'react-hot-toast';
//
// function AppBoot() {
//   return (
//     <HelmetProvider>
//       <AppProvider>
//         <HashRouter>
//           <App />
//         </HashRouter>
//         <Toaster
//           position="top-center"
//           reverseOrder={false}
//           toastOptions={{
//             className: 'bg-white/20 backdrop-blur-lg text-white border border-white/30',
//             style: {
//               background: 'rgba(255, 255, 255, 0.1)',
//               backdropFilter: 'blur(10px)',
//               color: '#fff',
//               border: '1px solid rgba(255, 255, 255, 0.2)',
//             },
//           }}
//         />
//       </AppProvider>
//     </HelmetProvider>
//   );
// }
