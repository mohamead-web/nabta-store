
import { type Product } from '../types';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, language, t } = useAppContext();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(t('تمت الإضافة للسلة!', 'Added to cart!'));
  };

  const name = language === 'ar' ? product.name_ar : (product.name_en || product.name_ar);
  const description = language === 'ar' ? product.description_ar : (product.description_en || product.description_ar);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-lg flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:border-white/30 transform hover:-translate-y-1">
      <Link to={`/product/${product.slug || product.id}`}>
        <img src={product.image_url || 'https://picsum.photos/400/300'} alt={name} className="w-full h-48 object-cover" loading="lazy" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.slug || product.id}`}>
            <h3 className="text-xl font-bold text-white mb-2 truncate">{name}</h3>
        </Link>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-extrabold text-emerald-400">{product.price.toFixed(2)} {t('ر.س', 'SAR')}</span>
          <button
            onClick={handleAddToCart}
            className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-500 transition-all duration-300 transform hover:scale-110 shadow-md"
            aria-label={t(`أضف ${name} للسلة`, `Add ${name} to cart`)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
