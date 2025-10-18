create table if not exists public.products (
  id bigserial primary key,
  name_ar text not null,
  name_en text,
  slug text unique,
  price decimal(10,2) not null default 0,
  stock int not null default 0,
  light_need text,
  water_need text,
  description_ar text,
  description_en text,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);
create table if not exists public.orders (
  id bigserial primary key,
  order_code text unique,
  customer_name text not null,
  phone text not null,
  city text not null,
  district text,
  address text not null,
  notes text,
  payment_method text default 'COD',
  status text default 'pending',
  total decimal(10,2) not null default 0,
  created_at timestamptz default now()
);
create table if not exists public.order_items (
  id bigserial primary key,
  order_id bigint references public.orders(id) on delete cascade,
  product_id bigint references public.products(id),
  qty int not null default 1,
  price decimal(10,2) not null default 0
);
