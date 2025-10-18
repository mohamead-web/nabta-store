
# Nabta Store | متجر نبتة

This is a production-ready, Arabic-first e-commerce site for plants and flowers, featuring a Cash on Delivery (COD) payment system. It is built with Vite, React, TypeScript, and Supabase, and is designed for cloud-only deployment via Netlify.

## Features

-   **Arabic-First (RTL)**: The UI is designed for Right-to-Left languages, with an optional English (LTR) toggle.
-   **Fully Responsive**: Works seamlessly on desktop and mobile devices.
-   **PWA Ready**: Installable on mobile devices for an app-like experience.
-   **SEO Optimized**: Includes essential meta tags, `robots.txt`, and a `sitemap.xml`.
-   **Cash on Delivery (COD)**: Simple and straightforward checkout process.
-   **Secure**: Uses Supabase for the database with Row Level Security (RLS) enabled. No secrets are stored in the code.
-   **"Liquid Glass" UI**: Modern, elegant design with translucent and blurred elements.

## Tech Stack

-   **Frontend**: Vite, React 18, TypeScript, Tailwind CSS
-   **Backend/Database**: Supabase
-   **Deployment**: Netlify

## Quick Start & Deployment

This project is designed to be deployed directly from GitHub to Netlify without any local development steps required by the client.

### 1. Fork the Repository

Create a fork of this repository in your own GitHub account.

### 2. Set up Supabase

1.  Go to [Supabase](https://supabase.com/) and create a new project.
2.  Navigate to the **SQL Editor** in your Supabase project dashboard.
3.  Execute the SQL files in the `/supabase/sql` directory in the following order:
    1.  `schema.sql` (creates the tables)
    2.  `rls.sql` (enables and configures Row Level Security)
    3.  `seed.sql` (populates the store with sample products)
4.  Go to **Project Settings > API** and find your Project URL and `anon` public key. You will need these for the next step.

### 3. Deploy to Netlify

1.  Go to [Netlify](https://app.netlify.com/) and create a new site from an existing project.
2.  Connect your GitHub account and select the forked repository.
3.  Netlify will automatically detect the build settings from `netlify.toml`.
4.  Before deploying, go to **Site configuration > Environment variables** and add the following variables:

    -   `VITE_SUPABASE_URL`: Your Supabase project URL from the previous step.
    -   `VITE_SUPABASE_ANON_KEY`: Your Supabase `anon` public key.

5.  Click "Deploy site". Netlify will build and deploy your application.

## Managing the Store

-   **Products**: To add, edit, or remove products, go to the **Table Editor** in your Supabase dashboard and modify the `products` table.
-   **Orders**: New orders will appear in the `orders` and `order_items` tables. You can view and manage them directly from the Supabase dashboard.
-   **Policies & Contact Info**: To edit the text for the policies or contact pages, modify the content directly in the following files:
    -   `src/pages/Policies.tsx`
    -   `src/pages/Contact.tsx`

---

## Screencast of Functionality

*A short GIF showing the user flow: browsing products, adding an item to the cart, filling out the COD checkout form, receiving an order success message, and finally, the new order appearing in the Supabase `orders` table.*

![Nabta Store Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3BqZHY2dmd1N3Q1bHJma21zYWZubmE5Z3k2aXJjZDFsaHh2a3I2eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LpdlqTfpxA4s1wLh8/giphy.gif)

## نشر Netlify (سريع)
1) أضف متغيرات البيئة في Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2) اربط الريبو على Netlify واضغط Deploy (أو ادفع تغييرات للفرع الرئيسي).

## ترتيب SQL في Supabase
نفّذ هذه الملفات بالترتيب عبر SQL Editor:
1) `supabase/sql/schema.sql`
2) `supabase/sql/rls.sql`
3) `supabase/sql/seed.sql` (اختياري)

## السياسات والتواصل
- عدّل نصوص السياسات في صفحات `/policies`.
- حدّث بيانات التواصل (واتساب/هاتف/إيميل) في صفحة `/contact`.
