
import { useAppContext } from '../context/AppContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useAppContext();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm font-semibold"
    >
      {language === 'ar' ? 'EN' : 'ع'}
    </button>
  );
};

export default LanguageToggle;
