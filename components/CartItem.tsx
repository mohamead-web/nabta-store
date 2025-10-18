
import { useAppContext } from '../context/AppContext';
import { type CartItem } from '../types';

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart, language, t } = useAppContext();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };
  
  const name = language === 'ar' ? item.name_ar : (item.name_en || item.name_ar);

  return (
    <div className="flex items-start space-x-4 rtl:space-x-reverse bg-white/5 p-4 rounded-lg">
      <img src={item.image_url || 'https://picsum.photos/100'} alt={name} className="w-20 h-20 object-cover rounded-md" loading="lazy" />
      <div className="flex-grow">
        <h3 className="font-semibold text-white">{name}</h3>
        <p className="text-sm text-gray-400">{item.price.toFixed(2)} {t('ر.س', 'SAR')}</p>
        <div className="flex items-center mt-3">
          <div className="flex items-center border border-white/20 rounded-md">
            <button onClick={() => handleQuantityChange(item.quantity - 1)} className="px-3 py-1 text-lg text-gray-300 hover:bg-white/10">-</button>
            <span className="px-3 py-1 text-white">{item.quantity}</span>
            <button onClick={() => handleQuantityChange(item.quantity + 1)} className="px-3 py-1 text-lg text-gray-300 hover:bg-white/10">+</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between h-full">
         <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
         </button>
         <p className="font-bold text-white mt-auto">{(item.price * item.quantity).toFixed(2)} {t('ر.س', 'SAR')}</p>
      </div>
    </div>
  );
};

export default CartItemComponent;
