import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    nav('/admin/orders');
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', direction:'rtl' }}>
      <h1 style={{ textAlign: 'center' }}>تسجيل دخول المشرف</h1>
      <form onSubmit={onSubmit} style={{ display:'grid', gap:12 }}>
        <input placeholder="البريد" type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="كلمة المرور" type="password" required value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div style={{ color:'crimson' }}>{err}</div>}
        <button disabled={loading}>{loading ? 'جارٍ الدخول…' : 'دخول'}</button>
      </form>
    </div>
  );
}
