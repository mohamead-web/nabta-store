
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { type Product } from '../types';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useAppContext();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        setError(t('حدث خطأ أثناء جلب المنتجات.', 'Failed to fetch products.'));
      } else {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.name_en && product.name_en.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, searchTerm]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8 text-center">{t('منتجاتنا', 'Our Products')}</h1>
      
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('ابحث عن نبتة...', 'Search for a plant...')}
          className="w-full px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
        />
      </div>

      {loading && <Loader />}
      {error && <p className="text-center text-red-400">{error}</p>}
      
      {!loading && !error && (
        filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-xl mt-12">{t('لم يتم العثور على منتجات.', 'No products found.')}</p>
        )
      )}
    </div>
  );
};

export default Products;
