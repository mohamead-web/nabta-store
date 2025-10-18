import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import GlassField from '../components/GlassField';
import { useNavigate } from 'react-router-dom';

/**
 * نحاول قراءة السلة من:
 * 1) window.__NABTA_CART (لو عندك سياق يعرّفها)
 * 2) localStorage بعدة مفاتيح شائعة
 */
function readCartSafe(): Array<{ id: number; product_id?: number; qty: number; price: number; name_ar?: string; name_en?: string }> {
  try {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.__NABTA_CART) return window.__NABTA_CART;
  } catch {}
  const keys = ['nabta_cart', 'cart', 'basket'];
  for (const k of keys) {
    try {
      const s = localStorage.getItem(k);
      if (s) {
        const v = JSON.parse(s);
        if (Array.isArray(v)) return v;
        if (v?.items && Array.isArray(v.items)) return v.items;
      }
    } catch {}
  }
  return [];
}

function clearCartSafe() {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.__NABTA_CLEAR_CART) {
    try { /* @ts-ignore */ window.__NABTA_CLEAR_CART(); } catch {}
  }
  const keys = ['nabta_cart', 'cart', 'basket'];
  for (const k of keys) {
    try { localStorage.removeItem(k); } catch {}
  }
}

function makeOrderCode() {
  const year = new Date().getFullYear();
  const r = Math.floor(100000 + Math.random() * 900000);
  return `NAB-${year}-${r}`;
}

export default function Checkout() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    city: '',
    district: '',
    address: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const cart = useMemo(() => readCartSafe(), []);
  const total = useMemo(() => cart.reduce((s, it) => s + (Number(it.price) * Number(it.qty || 1)), 0), [cart]);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      toast('السلة فارغة — أضِف منتجات أولًا', { icon: '🧺' });
    }
  }, [cart]);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }));
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) { toast.error('السلة فارغة'); return; }

    // تحقّق بسيط للحقول الأساسية
    if (!form.customer_name || !form.phone || !form.city || !form.address) {
      toast.error('أكمل الحقول المطلوبة: الاسم، الهاتف، المدينة، العنوان');
      return;
    }

    setSubmitting(true);

    // نعيد المحاولة لو صار تصادم على order_code (unique)
    let attempts = 0;
    let order_code = makeOrderCode();
    let order_id: number | null = null;
    let lastError: any = null;

    while (attempts < 3 && !order_id) {
      attempts++;
      const { data: orderData, error: orderErr } = await supabase
        .from('orders')
        .insert([{
          order_code,
          customer_name: form.customer_name,
          phone: form.phone,
          city: form.city,
          district: form.district || null,
          address: form.address,
          notes: form.notes || null,
          payment_method: 'COD',
          status: 'pending',
          total: Number(total.toFixed(2))
        }])
        .select('id')
        .single();

      if (orderErr) {
        // لو unique violation على order_code، نولّد كود جديد ونعيد
        const msg = String(orderErr.message || '');
        if (msg.toLowerCase().includes('unique')) {
          order_code = makeOrderCode();
          continue;
        }
        lastError = orderErr;
        break;
      }
      order_id = orderData?.id ?? null;
    }

    if (!order_id) {
      setSubmitting(false);
      console.error(lastError);
      toast.error('حدث خطأ أثناء إتمام الطلب. حاول لاحقًا.');
      return;
    }

    // تحضير عناصر الطلب
    const itemsPayload = cart.map(it => ({
      order_id,
      product_id: it.product_id ?? it.id,
      qty: Number(it.qty || 1),
      price: Number(it.price || 0)
    }));

    const { error: itemsErr } = await supabase.from('order_items').insert(itemsPayload);
    if (itemsErr) {
      setSubmitting(false);
      console.error(itemsErr);
      toast.error('تعذّر حفظ عناصر الطلب. حاول لاحقًا.');
      return;
    }

    clearCartSafe();
    setSubmitting(false);
    toast.success('تم تسجيل الطلب بنجاح ✅');
    nav(`/order-success/${encodeURIComponent(order_code)}`);
  };

  return (
    <div className="container" style={{maxWidth: 900, margin: '24px auto', padding: '0 12px', direction: 'rtl'}}>
      <h1 className="page-title" style={{marginBottom: 16}}>الدفع عند الاستلام (COD)</h1>

      {/* ملخص السلة */}
      <div className="glass-card" style={{padding: 16, marginBottom: 16, borderRadius: 16}}>
        <h2 style={{marginBottom: 8}}>ملخص السلة</h2>
        {cart.length === 0 ? (
          <div>سلتك فارغة</div>
        ) : (
          <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
            {cart.map((it, i) => (
              <li key={i} style={{display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 8, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.12)'}}>
                <span style={{opacity: .9}}>
                  {it.name_ar || it.name_en || `منتج #${it.product_id ?? it.id}`}
                </span>
                <span>× {it.qty}</span>
                <span>{Number(it.price).toFixed(2)} ر.س</span>
              </li>
            ))}
            <li style={{display:'flex', justifyContent:'space-between', paddingTop: 10, fontWeight: 600}}>
              <span>الإجمالي</span>
              <span>{total.toFixed(2)} ر.س</span>
            </li>
          </ul>
        )}
      </div>

      {/* نموذج البيانات */}
      <form onSubmit={submitOrder} className="glass-card" style={{padding: 16, borderRadius: 16}}>
        <div className="checkout-grid" style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
          <GlassField label="الاسم الكامل *" value={form.customer_name} onChange={onChange('customer_name')} required />
          <GlassField label="الهاتف *" value={form.phone} onChange={onChange('phone')} required inputMode="tel" />
          <GlassField label="المدينة *" value={form.city} onChange={onChange('city')} required />
          <GlassField label="الحي" value={form.district} onChange={onChange('district')} />
        </div>
        <div style={{marginTop: 12}}>
          <GlassField label="العنوان التفصيلي *" value={form.address} onChange={onChange('address')} required textArea />
        </div>
        <div style={{marginTop: 12}}>
          <GlassField label="ملاحظات" value={form.notes} onChange={onChange('notes')} textArea />
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 16}}>
          <div style={{opacity:.8}}>طريقة الدفع: <strong>الدفع عند الاستلام</strong></div>
          <button
            type="submit"
            disabled={submitting || cart.length === 0}
            className="btn-glass"
            style={{
              padding: '12px 20px',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.08))',
              color: '#0B3C24',
              fontWeight: 700,
              cursor: 'pointer',
              transform: submitting ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform .15s ease, box-shadow .2s ease',
              boxShadow: '0 8px 24px rgba(15,87,49,.18)'
            }}
          >
            {submitting ? 'جارٍ الإرسال…' : 'تأكيد الطلب'}
          </button>
        </div>
      </form>
    </div>
  );
}
