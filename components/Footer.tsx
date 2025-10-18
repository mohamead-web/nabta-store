
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
    const { t } = useAppContext();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-black/20 border-t border-white/10 mt-12">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-start rtl:md:text-right">
                    <div>
                        <h3 className="font-bold text-xl text-white mb-4">{t('نبتة', 'Nabta')}</h3>
                        <p className="text-gray-400">{t('لمسة من الطبيعة لمنزلك.', 'A touch of nature for your home.')}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">{t('روابط سريعة', 'Quick Links')}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="text-gray-400 hover:text-white transition">{t('المنتجات', 'Products')}</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition">{t('تواصل معنا', 'Contact Us')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">{t('معلومات', 'Information')}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/policies" className="text-gray-400 hover:text-white transition">{t('سياسة الخصوصية', 'Privacy Policy')}</Link></li>
                            <li><Link to="/policies" className="text-gray-400 hover:text-white transition">{t('الشروط والأحكام', 'Terms & Conditions')}</Link></li>
                            <li><Link to="/policies" className="text-gray-400 hover:text-white transition">{t('سياسة الاسترجاع', 'Return Policy')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6 text-center text-gray-500">
                    <p>&copy; {year} {t('متجر نبتة. جميع الحقوق محفوظة.', 'Nabta Store. All rights reserved.')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
