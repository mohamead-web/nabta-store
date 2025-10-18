
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import { type Order, type OrderItem } from '../types';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, cartTotal, clearCart, t, language } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    city: 'الرياض',
    address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  
  const cities = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 'أبها'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error(t('سلتك فارغة!', 'Your cart is empty!'));
      return;
    }
    setLoading(true);

    const order_code = `NAB-${new Date().getFullYear()}-${Math.random().toString().slice(2, 8)}`;
    
    const orderData: Omit<Order, 'id'> = {
      ...formData,
      total: cartTotal,
      order_code,
      payment_method: 'COD',
      status: 'pending'
    };

    try {
      // 1. Insert order and get its ID
      const { data: newOrder, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select('id')
        .single();

      if (orderError || !newOrder) {
        throw orderError || new Error('Failed to create order.');
      }
      
      const order_id = newOrder.id;

      // 2. Prepare and insert order items
      const orderItemsData: Omit<OrderItem, 'id'>[] = cart.map(item => ({
        order_id: order_id,
        product_id: item.id,
        qty: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItemsData);

      if (itemsError) {
        // Attempt to delete the orphaned order if items fail
        await supabase.from('orders').delete().eq('id', order_id);
        throw itemsError;
      }
      
      toast.success(t('تم استلام طلبك بنجاح!', 'Your order has been placed successfully!'));
      clearCart();
      navigate(`/order-success/${order_code}`);

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(t('حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى.', 'An error occurred during checkout. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8 text-center">{t('إتمام الطلب', 'Checkout')}</h1>
      <div className="checkout-grid grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-6">{t('معلومات التوصيل', 'Delivery Information')}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="customer_name" className="block text-sm font-medium text-gray-300 mb-2">{t('الاسم الكامل', 'Full Name')}</label>
              <input type="text" id="customer_name" name="customer_name" required value={formData.customer_name} onChange={handleInputChange} className="w-full input-style" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">{t('رقم الجوال', 'Phone Number')}</label>
              <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full input-style" dir="ltr" />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">{t('المدينة', 'City')}</label>
              <select id="city" name="city" required value={formData.city} onChange={handleInputChange} className="w-full input-style">
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">{t('العنوان بالتفصيل', 'Detailed Address')}</label>
              <input type="text" id="address" name="address" required value={formData.address} onChange={handleInputChange} className="w-full input-style" />
            </div>
             <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">{t('ملاحظات (اختياري)', 'Notes (Optional)')}</label>
              <textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleInputChange} className="w-full input-style"></textarea>
            </div>
            <button type="submit" disabled={loading || cart.length === 0} className="w-full bg-emerald-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed">
              {loading ? t('جاري التأكيد...', 'Confirming...') : t('تأكيد الطلب (الدفع عند الاستلام)', 'Confirm Order (COD)')}
            </button>
          </form>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white mb-6">{t('ملخص الطلب', 'Order Summary')}</h2>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-lg space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={item.image_url} alt={item.name_ar} className="w-16 h-16 rounded-md object-cover" />
                  <div>
                    <p className="font-semibold text-white">{language === 'ar' ? item.name_ar : (item.name_en || item.name_ar)}</p>
                    <p className="text-sm text-gray-400">{item.quantity} x {item.price.toFixed(2)} {t('ر.س', 'SAR')}</p>
                  </div>
                </div>
                <p className="font-bold text-white">{(item.quantity * item.price).toFixed(2)} {t('ر.س', 'SAR')}</p>
              </div>
            ))}
            <div className="border-t border-white/20 my-4"></div>
            <div className="flex justify-between items-center text-xl font-bold">
              <p className="text-gray-300">{t('المجموع النهائي', 'Total')}</p>
              <p className="text-emerald-400">{cartTotal.toFixed(2)} {t('ر.س', 'SAR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this style to your global styles or a style tag if needed
const CheckoutStyles = () => (
  <style>{`
    .input-style {
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      transition: all 0.2s;
    }
    .input-style:focus {
      outline: none;
      box-shadow: 0 0 0 2px #10b981;
    }
  `}</style>
);

const CheckoutPage = () => (
  <>
    <CheckoutStyles />
    <Checkout />
  </>
);

export default CheckoutPage;
