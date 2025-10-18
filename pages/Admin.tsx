import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 16,
  padding: 20,
  color: '#fff',
};

export default function Admin() {
  const [input, setInput] = useState('');
  const [ok, setOk] = useState<boolean>(() => {
    return localStorage.getItem('nabta_admin_ok') === '1';
  });

  const ADMIN = (import.meta as any).env?.VITE_ADMIN_PASS || '';

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ADMIN) {
      alert('VITE_ADMIN_PASS غير مُعرّف في متغيرات البيئة على Netlify.');
      return;
    }
    if (input === ADMIN) {
      localStorage.setItem('nabta_admin_ok', '1');
      setOk(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: 24, color: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '32px auto' }}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>لوحة المشرف (مؤقتة)</h1>

        {!ok ? (
          <div style={glass}>
            <p style={{ marginBottom: 12 }}>
              هذه صفحة إدارة مؤقتة لحين بناء لوحة كاملة. للدخول استخدم كلمة المرور المؤقتة
              في <code>VITE_ADMIN_PASS</code>.
            </p>
            <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
              <input
                type="password"
                placeholder="أدخل كلمة مرور المشرف"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,.25)',
                  background: 'rgba(0,0,0,.25)',
                  color: '#fff',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 16px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,.25)',
                  background: 'rgba(255,255,255,.08)',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                دخول
              </button>
            </form>
            {!ADMIN && (
              <p style={{ marginTop: 10, color: '#ffd7d7' }}>
                ⚠️ لم تُحدد قيمة <code>VITE_ADMIN_PASS</code> في Netlify → Site settings → Environment variables.
              </p>
            )}
          </div>
        ) : (
          <div style={glass}>
            <h2 style={{ marginTop: 0, marginBottom: 8 }}>مرحبًا بك 👋</h2>
            <p style={{ marginBottom: 12 }}>
              هذه لوحة بسيطة مؤقتًا. إدارة الطلبات تتم الآن من Supabase Table Editor حسب المواصفات.
            </p>
            <ul style={{ lineHeight: 1.9 }}>
              <li>
                <strong>الطلبات:</strong> جدول <code>public.orders</code>
              </li>
              <li>
                <strong>بنود الطلب:</strong> جدول <code>public.order_items</code>
              </li>
              <li>
                <strong>المنتجات:</strong> جدول <code>public.products</code>
              </li>
            </ul>
            <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                href="https://app.supabase.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,.25)',
                  background: 'rgba(255,255,255,.08)',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                فتح Supabase
              </a>
              <Link
                to="/products"
                style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,.25)',
                  background: 'rgba(255,255,255,.08)',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                الذهاب لصفحة المنتجات
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('nabta_admin_ok');
                  setOk(false);
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,.25)',
                  background: 'rgba(255,255,255,.08)',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
