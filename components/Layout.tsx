
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { useAppContext } from '../context/AppContext';

const Layout = ({ children }: { children: ReactNode }) => {
    const { isCartOpen, toggleCart } = useAppContext();
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <Footer />
            <CartDrawer />
            {isCartOpen && <div onClick={toggleCart} className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"></div>}
        </div>
    );
};

export default Layout;
