
import { useAppContext } from '../context/AppContext';

const Contact = () => {
    const { t } = useAppContext();
    const contactInfo = {
        whatsapp: 'https://wa.me/966000000000', // Replace with actual number
        phone: 'tel:+966000000000', // Replace with actual number
        email: 'mailto:support@nabta.store' // Replace with actual email
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">{t('تواصل معنا', 'Contact Us')}</h1>
            <p className="text-center text-lg text-gray-300 mb-12">{t('نسعد بخدمتكم! يمكنكم التواصل معنا عبر القنوات التالية.', 'We are happy to help! You can reach us through the following channels.')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* WhatsApp */}
                <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-card group">
                    <h2 className="text-2xl font-semibold text-white mb-2">{t('واتساب', 'WhatsApp')}</h2>
                    <p className="text-gray-400 mb-4">{t('للمحادثة الفورية', 'For instant chat')}</p>
                    <span className="font-bold text-emerald-400 group-hover:underline">{t('ابدأ المحادثة', 'Start Chat')}</span>
                </a>

                {/* Phone */}
                <a href={contactInfo.phone} className="contact-card group">
                    <h2 className="text-2xl font-semibold text-white mb-2">{t('الهاتف', 'Phone')}</h2>
                    <p className="text-gray-400 mb-4">{t('للاتصال المباشر', 'For direct calls')}</p>
                    <span className="font-bold text-emerald-400 group-hover:underline">{t('اتصل الآن', 'Call Now')}</span>
                </a>

                {/* Email */}
                <a href={contactInfo.email} className="contact-card group">
                    <h2 className="text-2xl font-semibold text-white mb-2">{t('البريد الإلكتروني', 'Email')}</h2>
                    <p className="text-gray-400 mb-4">{t('للاستفسارات العامة', 'For general inquiries')}</p>
                    <span className="font-bold text-emerald-400 group-hover:underline">{t('أرسل بريداً', 'Send Email')}</span>
                </a>
            </div>
        </div>
    );
};

const ContactPage = () => (
    <>
        <style>{`
            .contact-card {
                display: block;
                background-color: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 0.75rem;
                padding: 2rem;
                text-align: center;
                transition: all 0.3s ease;
            }
            .contact-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                border-color: rgba(255, 255, 255, 0.3);
            }
        `}</style>
        <Contact />
    </>
);

export default ContactPage;

