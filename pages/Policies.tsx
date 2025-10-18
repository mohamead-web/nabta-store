
import { useAppContext } from '../context/AppContext';

const PolicySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-12">
        <h2 className="text-3xl font-bold text-emerald-400 mb-4 pb-2 border-b-2 border-emerald-400/30">{title}</h2>
        <div className="space-y-4 text-gray-300 leading-relaxed">
            {children}
        </div>
    </div>
);

const Policies = () => {
    const { t } = useAppContext();

    return (
        <div className="max-w-4xl mx-auto bg-white/5 p-8 md:p-12 rounded-xl border border-white/10">
            <h1 className="text-4xl font-bold text-white mb-10 text-center">{t('السياسات والأحكام', 'Policies & Terms')}</h1>
            
            <PolicySection title={t('سياسة الخصوصية', 'Privacy Policy')}>
                <p>{t('نحن في متجر نبتة نلتزم بحماية خصوصيتك. عند قيامك بطلب، نقوم بجمع معلوماتك الشخصية مثل الاسم، رقم الهاتف، والعنوان. تُستخدم هذه المعلومات فقط لغرض وحيد وهو إتمام عملية الطلب وتوصيله إليك. نحن لا نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية. يتم الاحتفاظ ببيانات الطلب لأغراض سجلاتنا الداخلية وقد نستخدم رقم هاتفك للتواصل بشأن طلبك.', 'At Nabta Store, we are committed to protecting your privacy. When you place an order, we collect your personal information such as name, phone number, and address. This information is used for the sole purpose of processing and delivering your order. We do not share your data with any third parties for marketing purposes. Order data is retained for our internal records, and we may use your phone number to contact you regarding your order.')}</p>
            </PolicySection>

            <PolicySection title={t('الشروط والأحكام', 'Terms & Conditions')}>
                <p>{t('عند الطلب من متجر نبتة، فإنك توافق على شروطنا. جميع الطلبات تتم بنظام الدفع عند الاستلام (COD). سيتم التواصل معك لتأكيد الطلب قبل إرساله. نتوقع منك توفير معلومات دقيقة للتوصيل. نحتفظ بالحق في إلغاء أي طلب في حالة عدم التمكن من تأكيده مع العميل.', 'By ordering from Nabta Store, you agree to our terms. All orders are processed via Cash on Delivery (COD). You will be contacted to confirm your order before it is dispatched. We expect you to provide accurate delivery information. We reserve the right to cancel any order if we are unable to confirm it with the customer.')}</p>
                <p>{t('نعمل على توصيل الطلبات في أسرع وقت ممكن ضمن المدن المحددة. قد تختلف مدة التوصيل بناءً على العنوان وجدول التوصيل.', 'We strive to deliver orders as quickly as possible within the specified cities. Delivery times may vary based on the address and delivery schedule.')}</p>
            </PolicySection>

            <PolicySection title={t('سياسة الاسترجاع والاستبدال', 'Returns & Refunds Policy')}>
                <p>{t('نظراً لطبيعة منتجاتنا (النباتات الحية)، فإننا لا نقبل الاسترجاع أو الاستبدال إلا في حالة وصول المنتج تالفاً بشكل واضح. إذا استلمت منتجاً تالفاً، يرجى التواصل معنا فوراً خلال 24 ساعة من الاستلام مع إرفاق صورة للمنتج. سنقوم بمراجعة الحالة وترتيب إرسال بديل أو استرجاع المبلغ حسب الحالة.', 'Due to the nature of our products (live plants), we do not accept returns or exchanges unless the product arrives clearly damaged. If you receive a damaged product, please contact us immediately within 24 hours of receipt with a photo of the item. We will review the case and arrange for a replacement to be sent or issue a refund, depending on the situation.')}</p>
            </PolicySection>
        </div>
    );
};

export default Policies;
