
export interface Product {
  id: number;
  name_ar: string;
  name_en?: string;
  slug?: string;
  price: number;
  stock: number;
  light_need?: string;
  water_need?: string;
  description_ar?: string;
  description_en?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id?: number;
  order_code?: string;
  customer_name: string;
  phone: string;
  city: string;
  district?: string;
  address: string;
  notes?: string;
  payment_method?: 'COD';
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
}

export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  qty: number;
  price: number;
}
