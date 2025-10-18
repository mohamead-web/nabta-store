
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const OrderSuccess = () => {
  const { code } = useParams();
  const { t } = useAppContext();

  return (
    <div className="text-center min-h-[60vh] flex flex-col items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-12 shadow-lg max-w-2xl mx-auto">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500 mb-6">
          <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">{t('شكراً لك!', 'Thank You!')}</h1>
        <p className="text-lg text-gray-300 mb-6">{t('تم استلام طلبك بنجاح. سنتواصل معك قريباً لتأكيد تفاصيل التوصيل.', 'Your order has been placed successfully. We will contact you shortly to confirm delivery details.')}</p>
        <div className="bg-black/20 border border-dashed border-white/30 rounded-lg p-4 mb-8">
          <p className="text-gray-400 mb-2">{t('رقم طلبك هو:', 'Your order code is:')}</p>
          <p className="text-3xl font-mono font-bold text-emerald-400 tracking-widest">{code}</p>
        </div>
        <Link 
          to="/products"
          className="bg-emerald-600 text-white text-lg font-bold py-3 px-8 rounded-lg hover:bg-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {t('متابعة التسوق', 'Continue Shopping')}
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
