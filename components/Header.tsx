
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const { toggleCart, cartCount, t } = useAppContext();

  return (
    <header className="sticky top-0 z-30 bg-black/20 backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-3xl font-bold text-white transition-transform hover:scale-105">
            {t('نبتة', 'Nabta')}
          </Link>
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-300">{t('المنتجات', 'Products')}</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">{t('تواصل معنا', 'Contact Us')}</Link>
            <Link to="/policies" className="text-gray-300 hover:text-white transition-colors duration-300">{t('السياسات', 'Policies')}</Link>
          </nav>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageToggle />
            <button onClick={toggleCart} className="relative text-gray-300 hover:text-white transition-colors duration-300 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 rtl:right-auto rtl:left-0 block h-5 w-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
