import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

type Order = {
  id: number;
  order_code: string | null;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  status: string;
  total: number;
  created_at: string;
};

export default function AdminOrders() {
  const nav = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) { nav('/admin'); return; }

      const { data, error } = await supabase
        .from('orders')
        .select('id, order_code, customer_name, phone, city, address, status, total, created_at')
        .order('created_at', { ascending: false });

      if (error) setErr(error.message);
      else setOrders(data || []);
      setLoading(false);
    })();
  }, [nav]);

  const setStatus = async (id: number, status: string) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (error) alert(error.message);
    else setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    nav('/admin');
  };

  if (loading) return <p style={{textAlign:'center'}}>جارٍ التحميل…</p>;
  if (err) return <p style={{color:'crimson', textAlign:'center'}}>خطأ: {err}</p>;

  return (
    <div style={{ maxWidth:1000, margin:'20px auto', direction:'rtl' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1>لوحة الطلبات</h1>
        <button onClick={logout}>تسجيل خروج</button>
      </div>
      <table width="100%" cellPadding={8} style={{ background:'#0f57311a', borderRadius:12 }}>
        <thead>
          <tr>
            <th>الكود</th><th>العميل</th><th>هاتف</th><th>مدينة</th><th>الإجمالي</th><th>الحالة</th><th>تاريخ</th><th>إجراء</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.order_code}</td>
              <td>{o.customer_name}</td>
              <td>{o.phone}</td>
              <td>{o.city}</td>
              <td>{o.total?.toFixed(2)}</td>
              <td>{o.status}</td>
              <td>{new Date(o.created_at).toLocaleString('ar')}</td>
              <td>
                <select value={o.status} onChange={e => setStatus(o.id, e.target.value)}>
                  <option value="pending">قيد المعالجة</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="shipped">تم الشحن</option>
                  <option value="delivered">تم التوصيل</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan={8} style={{textAlign:'center'}}>لا توجد طلبات بعد</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
