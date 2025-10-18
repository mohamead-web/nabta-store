
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const { t } = useAppContext();

  return (
    <div className="flex items-center justify-center text-center min-h-[60vh]">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          {t('أهلاً بك في', 'Welcome to')} <span className="text-emerald-400">{t('نبتة', 'Nabta')}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10">
          {t('نُضفي على مساحاتك حياةً وجمالاً. اكتشف مجموعتنا المختارة من النباتات المنزلية والزهور النضرة.', 'Bringing life and beauty to your spaces. Discover our curated collection of houseplants and fresh flowers.')}
        </p>
        <Link 
          to="/products"
          className="bg-emerald-600 text-white text-xl font-bold py-4 px-10 rounded-lg hover:bg-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {t('تصفح المنتجات', 'Shop Now')}
        </Link>
      </div>
    </div>
  );
};

export default Home;
