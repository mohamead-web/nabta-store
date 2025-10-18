
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { type Product } from '../types';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
const nameText = language === 'ar'
  ? product?.name_ar
  : (product?.name_en || product?.name_ar);
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, t, language } = useAppContext();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`) // Allow fetching by slug or ID
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        setError(t('لم يتم العثور على المنتج.', 'Product not found.'));
      } else {
        setProduct(data as Product);
      }
      setLoading(false);
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${t('تمت إضافة', 'Added')} ${quantity} ${t('x', 'x')} ${nameText} ${t('للسلة!', 'to cart!')}`);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-400 text-2xl">{error}</p>;
  if (!product) return null;

  const name = language === 'ar' ? product.name_ar : (product.name_en || product.name_ar);
  const description = language === 'ar' ? product.description_ar : (product.description_en || product.description_ar);

  return (
    <div className="product-details-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-lg">
        <img src={product.image_url || 'https://picsum.photos/800/600'} alt={name} className="w-full h-auto object-cover" />
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white">{name}</h1>
        <p className="text-4xl font-extrabold text-emerald-400">{product.price.toFixed(2)} {t('ر.س', 'SAR')}</p>
        <p className="text-gray-300 leading-relaxed text-lg">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-center my-4">
            <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-400">{t('احتياج الضوء', 'Light Need')}</p>
                <p className="text-white font-bold text-lg">{product.light_need || 'N/A'}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-400">{t('احتياج الماء', 'Water Need')}</p>
                <p className="text-white font-bold text-lg">{product.water_need || 'N/A'}</p>
            </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-white/20 rounded-lg">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-5 py-3 text-xl text-gray-300 hover:bg-white/10">-</button>
            <span className="px-5 py-3 text-white font-bold text-lg">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="px-5 py-3 text-xl text-gray-300 hover:bg-white/10">+</button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-grow bg-emerald-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('أضف إلى السلة', 'Add to Cart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;