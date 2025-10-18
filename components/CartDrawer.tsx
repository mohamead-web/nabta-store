
import { useAppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import CartItemComponent from './CartItem';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart, cartTotal, cartCount, t } = useAppContext();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <div
      className={`drawer fixed top-0 h-full w-[360px] max-w-full bg-gray-900/50 backdrop-blur-xl border-s border-white/20 shadow-2xl z-50 transition-transform duration-500 ease-in-out
      ${isCartOpen ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'} 
      ltr:right-0 rtl:left-0`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-semibold text-white">{t('سلتي', 'My Cart')} ({cartCount})</h2>
          <button onClick={toggleCart} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {cart.length > 0 ? (
          <>
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.map(item => (
                <CartItemComponent key={item.id} item={item} />
              ))}
            </div>

            <div className="p-6 border-t border-white/10">
              <div className="flex justify-between items-center text-lg font-medium text-gray-300 mb-4">
                <span>{t('المجموع', 'Total')}</span>
                <span className="font-bold text-white text-xl">
                  {cartTotal.toFixed(2)} {t('ر.س', 'SAR')}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-emerald-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t('إتمام الطلب', 'Checkout')}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-xl text-gray-400 mb-4">{t('سلتك فارغة!', 'Your cart is empty!')}</p>
            <Link
              to="/products"
              onClick={toggleCart}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-500 transition-colors"
            >
              {t('اكتشف المنتجات', 'Discover Products')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
