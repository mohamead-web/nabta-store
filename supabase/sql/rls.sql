alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "public read active products" on public.products;
create policy "public read active products"
on public.products for select
to anon
using (is_active = true);

drop policy if exists "public insert orders" on public.orders;
create policy "public insert orders"
on public.orders for insert
to anon
with check (true);

drop policy if exists "public insert order items" on public.order_items;
create policy "public insert order items"
on public.order_items for insert
to anon
with check (true);

drop policy if exists "deny select orders" on public.orders;
create policy "deny select orders"
on public.orders for select
to anon
using (false);

drop policy if exists "deny select order items" on public.order_items;
create policy "deny select order items"
on public.order_items for select
to anon
using (false);
