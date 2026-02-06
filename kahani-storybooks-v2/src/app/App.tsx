import { motion, useScroll, useTransform, useMotionValue } from 'motion/react';
import { Star, Shield, Heart, Truck, ShoppingBag, User, Sparkles, ChevronLeft, ChevronRight, ChevronDown, Instagram, Facebook, Mail, Music, X, Upload, Info, Check } from 'lucide-react';
import { useRef, useState, useEffect, MouseEvent, ReactNode, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import { createHashRouter, RouterProvider, Link, useNavigate } from 'react-router-dom';


// Hero carousel images (local assets)
import hero1 from '../assets/images/hero-section/1.webp';
import hero2 from '../assets/images/hero-section/2.webp';
import hero3 from '../assets/images/hero-section/3.webp';
import hero4 from '../assets/images/hero-section/4.webp';
import hero5 from '../assets/images/hero-section/5.webp';

// Best Sellers images
import bs1 from '../assets/images/best-sellers-section/1AP.webp';
import bs2 from '../assets/images/best-sellers-section/1CM.webp';
import bs3 from '../assets/images/best-sellers-section/1M.webp';
import bs4 from '../assets/images/best-sellers-section/2M.webp';
import bs5 from '../assets/images/best-sellers-section/3AP.webp';
import bs6 from '../assets/images/best-sellers-section/3P.webp';

// Figurines images
import fig1 from '../assets/images/figurines-section/1F.webp';
import fig2 from '../assets/images/figurines-section/2F.webp';
import fig3 from '../assets/images/figurines-section/3F.webp';
import fig4 from '../assets/images/figurines-section/4F - Copy.webp';
import fig5 from '../assets/images/figurines-section/5F.webp';
import fig6 from '../assets/images/figurines-section/6F.webp';

// Pick Your Style images
import style1 from '../assets/images/pick-your-style-section/1P.webp';
import style2 from '../assets/images/pick-your-style-section/2P.webp';
import style3 from '../assets/images/pick-your-style-section/3P.webp';
import style4 from '../assets/images/pick-your-style-section/4P.webp';

// Refined & Sophisticated images
import refined1 from '../assets/images/refined-sophisticated-section/1M.webp';
import refined2 from '../assets/images/refined-sophisticated-section/2M.webp';
import refined3 from '../assets/images/refined-sophisticated-section/3M.webp';

// Vibrant & Playful images
import vibrant1 from '../assets/images/vibrant-playful-section/1P.webp';
import vibrant2 from '../assets/images/vibrant-playful-section/2P.webp';
import vibrant3 from '../assets/images/vibrant-playful-section/3P.webp';

// Handcrafted with Love images
import handcrafted1 from '../assets/images/handcrafted-with-love-section/1AP.webp';
import handcrafted2 from '../assets/images/handcrafted-with-love-section/2AP.webp';
import handcrafted3 from '../assets/images/handcrafted-with-love-section/3AP.webp';

// Bold & Heroic images
import bold1 from '../assets/images/bold-heroic-section/1CM.webp';
import bold2 from '../assets/images/bold-heroic-section/2CM.webp';
import bold3 from '../assets/images/bold-heroic-section/3CM.webp';


// Cart Context
interface CartItem {
  id: number;
  title: string;
  image: string;
  customizations: {
    childName: string;
    age: string;
    pages: string;
    character: string;
  };
  quantity: number;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Component: LoginModal
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // In a real application, this would redirect to OAuth provider
    console.log(`Logging in with ${provider}`);
    // Simulate successful login
    onLogin();
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" />
      </motion.div>

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-rose-400 via-pink-400 to-amber-400 px-8 py-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl text-white mb-2">Sign in or Sign up</h2>
          <p className="text-white/90 text-sm">Create an account or sign in to save your favorites</p>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-4">
          {/* Google Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </motion.button>

          {/* Facebook Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('facebook')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#1877F2] hover:bg-[#0C63D4] text-white transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="font-medium">Continue with Facebook</span>
          </motion.button>

          {/* Divider with text */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Secure & Private</span>
            </div>
          </div>

          {/* Privacy note */}
          <p className="text-center text-xs text-gray-500 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            We'll never post anything without your permission.
          </p>
        </div>
      </motion.div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

// Component: Header
interface HeaderProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  cartItemCount?: number;
}

const Header = ({ isLoggedIn = false, onLoginClick = () => { }, cartItemCount = 0 }: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.95)']
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 2px 8px rgba(0,0,0,0.04)', '0 4px 16px rgba(0,0,0,0.08)']
  );

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundColor: headerBg,
        boxShadow: headerShadow,
      }}
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/60"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center shadow-lg"
              style={{
                boxShadow: '0 4px 12px rgba(251,113,133,0.3), 0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              <span className="text-white text-lg">✨</span>
            </motion.div>
            <span className="text-xl text-gray-900">KAHANI</span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Books', 'Figurines', 'Gift Set'].map((item, index) => {
              const scrollToSection = (e: React.MouseEvent) => {
                e.preventDefault();
                const sectionId = item === 'Gift Set' ? 'best-sellers' : item.toLowerCase().replace(' ', '-');
                const element = document.getElementById(sectionId);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              };

              return (
                <motion.button
                  key={item}
                  onClick={scrollToSection}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                  className="text-gray-600 hover:text-rose-400 transition-all duration-200 relative group"
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-amber-400 group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Heart Icon - Wishlist */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!isLoggedIn) {
                  onLoginClick();
                } else {
                  // Navigate to wishlist or show wishlist modal
                  console.log('Opening wishlist...');
                }
              }}
              className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group shadow-md hover:shadow-lg border border-gray-100/50"
            >
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-rose-400 transition-colors duration-200" />
            </motion.button>

            {/* User Icon */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!isLoggedIn) {
                  onLoginClick();
                } else {
                  // Navigate to account or show account dropdown
                  console.log('Opening account...');
                }
              }}
              className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group shadow-md hover:shadow-lg border border-gray-100/50"
            >
              <User className="w-5 h-5 text-gray-600 group-hover:text-amber-400 transition-colors duration-200" />
            </motion.button>

            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group shadow-md hover:shadow-lg border border-gray-100/50"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-rose-400 transition-colors duration-200" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white text-xs flex items-center justify-center shadow-md"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

// Component: Hero
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yMidground = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yForeground = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative overflow-hidden min-h-[60vh] flex items-center">
      {/* Background Layer with Gradient */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 bg-gradient-to-b from-sky-100/40 via-rose-50/30 to-amber-50/40"
      >
        {/* Animated clouds */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-40 h-20 bg-white/50 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 10, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] w-32 h-16 bg-white/40 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[60%] w-36 h-18 bg-white/45 rounded-full blur-xl"
        />

        {/* Floating sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i * 0.5) * 20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${15 + i * 10}%`,
              top: `${25 + (i % 4) * 15}%`,
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-300/60" />
          </motion.div>
        ))}

        {/* Floating Rectangles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`rect-${i}`}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.cos(i * 1.2) * 30, 0],
              rotate: [0, 180, 360],
              opacity: [0.15, 0.4, 0.15]
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            className="absolute bg-gradient-to-br from-rose-300/30 to-pink-300/30 rounded-lg"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
            }}
          />
        ))}

        {/* Confetti particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`confetti-${i}`}
            animate={{
              y: [0, -80 - i * 10, 0],
              x: [0, Math.sin(i * 0.8) * 40, 0],
              rotate: [0, 360 + i * 45, 720],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 5 + i * 0.6,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
          >
            <div
              className="w-2 h-3 rounded-sm"
              style={{
                background: i % 3 === 0
                  ? 'linear-gradient(135deg, rgba(251, 113, 133, 0.6), rgba(252, 165, 165, 0.6))'
                  : i % 3 === 1
                    ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.6), rgba(253, 224, 71, 0.6))'
                    : 'linear-gradient(135deg, rgba(196, 181, 253, 0.6), rgba(221, 214, 254, 0.6))'
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Mid-layer animated shapes */}
      <motion.div
        style={{ y: yMidground }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-[20%] w-32 h-32 bg-gradient-to-br from-rose-300/30 to-pink-300/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-[25%] w-40 h-40 bg-gradient-to-br from-amber-300/30 to-yellow-300/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.08, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-[70%] w-36 h-36 bg-gradient-to-br from-sky-300/25 to-blue-300/25 rounded-full blur-xl"
        />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ y: yForeground, scale, opacity }}
        className="relative z-10 w-full"
      >
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-6 md:pt-8 md:pb-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 60 }}
              className="text-5xl lg:text-7xl text-gray-900 leading-tight"
            >
              Gifts That Tell
              <br />
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                Their Story
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 60 }}
              className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto pb-4"
            >
              Personalized books and handcrafted figurines designed to create magical moments.
              Each piece is lovingly made to celebrate the unique child in your life.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Ambient light orbs - larger and more prominent */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-rose-300/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-300/15 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-300/10 rounded-full blur-3xl -z-10" />
    </section>
  );
};

// Component: DecorativeElements
const DecorativeElements = () => {
  return (
    <>
      {/* Floating hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 10, 0],
            rotate: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
          className="absolute text-rose-300/40 pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
            fontSize: `${12 + i * 2}px`
          }}
        >
          ♥
        </motion.div>
      ))}
    </>
  );
};

// Component: DioramaStage
interface DioramaStageProps {
  children: ReactNode;
  className?: string;
}

const DioramaStage = ({ children, className = '' }: DioramaStageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.7]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        style={{ y, opacity }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

// Component: ProductCard
interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  category: 'book' | 'figurine';
  delay?: number;
}

const ProductCard = ({ id, image, title, description, price, category, delay = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      image,
      customizations: {
        childName: 'Default Child', // Placeholder
        age: '3-4', // Placeholder
        pages: '20', // Placeholder
        character: 'Default Character', // Placeholder
      },
      quantity: 1,
      price: parseFloat(price.replace('$', '')),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Platform shadow */}
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.3 : 0.15,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-gray-400 rounded-full blur-xl"
      />

      {/* Main card */}
      <motion.div
        animate={{
          y: isHovered ? -20 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]"
      >
        {/* Image Container */}
        <div
          className="relative aspect-square overflow-hidden bg-gradient-to-br from-rose-50/60 via-peach-50/50 to-amber-50/40"
          style={{ transform: 'translateZ(20px)' }}
        >
          <motion.img
            src={image}
            alt={title}
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover"
          />

          {/* Favorite Button */}
          <motion.button
            animate={{
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 hover:bg-white transition-transform"
          >
            <Heart className="w-5 h-5 text-rose-400" />
          </motion.button>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-4 py-1.5 rounded-full text-xs backdrop-blur-md bg-white/70 text-gray-700 border border-white/50 shadow-sm">
              {category === 'book' ? 'Personalized Book' : 'Handcrafted Figurine'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3 bg-white relative min-h-[180px] flex flex-col">
          <h3 className="text-gray-900 transition-colors duration-300 group-hover:text-rose-500 relative flex items-center justify-between">
            <span>{title}</span>
            <span className="text-rose-500 font-medium">{price}</span>
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 relative">
            {description}
          </p>
          <div className="flex items-center justify-center pt-2 relative mt-auto">
            <Link to="/product/1">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 text-white text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-rose-200/50"
              >
                Personalize
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Component: CarouselSection
interface CarouselItem {
  id: number;
  image: string;
  title: string;
  category: string;
  price: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    image: hero1,
    title: 'The Adventure Begins',
    category: 'Personalized Book',
    price: '$32',
  },
  {
    id: 2,
    image: hero2,
    title: 'Woodland Friends & Story',
    category: 'Book + Figurine Set',
    price: '$68',
  },
  {
    id: 3,
    image: hero3,
    title: 'Bedtime Tales Collection',
    category: 'Personalized Book',
    price: '$36',
  },
  {
    id: 4,
    image: hero4,
    title: 'My Magical Journey',
    category: 'Personalized Book',
    price: '$34',
  },
  {
    id: 5,
    image: hero5,
    title: 'Hero Character Collection',
    category: 'Handcrafted Figurine',
    price: '$48',
  }
];

const CarouselSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    } else {
      setCurrentIndex((prev) => Math.min(carouselItems.length - 1, prev + 1));
    }
  };

  const getItemPosition = (index: number) => {
    return index - currentIndex;
  };

  return (
    <section
      id="books"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-gradient-to-b from-rose-50/20 via-amber-50/15 to-peach-50/20"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-100/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('left')}
              disabled={currentIndex === 0}
              className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl bg-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border border-gray-100"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('right')}
              disabled={currentIndex >= carouselItems.length - 1}
              className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl bg-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border border-gray-100"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>

            <div className="overflow-visible px-4 md:px-20">
              <div className="relative h-[420px] md:h-[480px] flex items-end justify-center">
                {carouselItems.map((item, index) => {
                  const position = getItemPosition(index);
                  const isCenter = position === 0;
                  const isVisible = position >= -1 && position <= 1;

                  if (!isVisible) return null;

                  const scale = isCenter ? 1 : 0.85;
                  const xOffset = position * 280;
                  const zIndex = isCenter ? 20 : 10 - Math.abs(position);
                  const opacity = isCenter ? 1 : 0.6;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{
                        opacity: isVisible ? opacity : 0,
                        scale: scale,
                        x: xOffset,
                        y: 0,
                        transition: {
                          duration: 0.8,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="absolute w-[280px] md:w-[320px]"
                      style={{
                        zIndex,
                        perspective: '1000px',
                        pointerEvents: isCenter ? 'auto' : 'none'
                      }}
                    >
                      <motion.div
                        animate={{
                          opacity: hoveredIndex === index && isCenter ? 0.18 : isCenter ? 0.14 : 0.06,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-gradient-to-b from-gray-900/40 to-transparent rounded-[100%] blur-2xl"
                      />

                      <motion.div
                        animate={{
                          y: hoveredIndex === index && isCenter ? -12 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative bg-white rounded-2xl overflow-hidden"
                        style={{
                          transformStyle: 'preserve-3d',
                          boxShadow: isCenter
                            ? '0 16px 48px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.08)'
                            : '0 8px 24px rgba(0,0,0,0.08), 0 3px 8px rgba(0,0,0,0.04)'
                        }}
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-rose-50/40 via-peach-50/30 to-amber-50/25">
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            animate={{
                              scale: hoveredIndex === index && isCenter ? 1.03 : 1
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />

                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full text-xs backdrop-blur-sm bg-white/80 text-gray-700 border border-white/60 shadow-sm">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 space-y-2 bg-white">
                          <h3 className="text-gray-900 line-clamp-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xl text-gray-900">
                              {item.price}
                            </span>
                            {isCenter && (
                              <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  const bestSellerSection = document.getElementById('best-sellers');
                                  if (bestSellerSection) {
                                    bestSellerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }
                                }}
                                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 text-white text-sm shadow-md transition-shadow duration-300 hover:shadow-lg"
                              >
                                View
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {carouselItems.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.15 }}
                  animate={{
                    scale: index === currentIndex ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-rose-400 to-amber-400'
                    : 'w-2 bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Data
const products = [
  {
    id: 1,
    image: bs1,
    title: 'The Adventure Begins',
    description: 'A magical journey where your child becomes the hero of their own story',
    price: '$32',
    category: 'book' as const,
  },
  {
    id: 2,
    image: bs2,
    title: 'Woodland Friends Set',
    description: 'Handcrafted wooden figurines that spark imagination and gentle play',
    price: '$48',
    category: 'figurine' as const,
  },
  {
    id: 3,
    image: bs3,
    title: 'Bedtime Tales Collection',
    description: 'Soothing stories personalized with your little one\'s name and favorite things',
    price: '$36',
    category: 'book' as const,
  },
  {
    id: 4,
    image: bs4,
    title: 'Safari Explorer Set',
    description: 'Beautifully crafted animal figurines made from sustainable wood',
    price: '$52',
    category: 'figurine' as const,
  },
  {
    id: 5,
    image: bs5,
    title: 'Birthday Dreams',
    description: 'A celebration story that makes their special day even more memorable',
    price: '$34',
    category: 'book' as const,
  },
  {
    id: 6,
    image: bs6,
    title: 'Character Collection',
    description: 'Minimalist wooden figures that inspire creative storytelling',
    price: '$44',
    category: 'figurine' as const,
  },
];

// Figurines-only products
const figurines = [
  {
    id: 1,
    image: fig1,
    title: 'Woodland Friends Set',
    description: 'Handcrafted wooden figurines that spark imagination and gentle play',
    price: '$48',
    category: 'figurine' as const,
  },
  {
    id: 2,
    image: fig2,
    title: 'Safari Explorer Set',
    description: 'Beautifully crafted animal figurines made from sustainable wood',
    price: '$52',
    category: 'figurine' as const,
  },
  {
    id: 3,
    image: fig3,
    title: 'Character Collection',
    description: 'Minimalist wooden figures that inspire creative storytelling',
    price: '$44',
    category: 'figurine' as const,
  },
  {
    id: 4,
    image: fig4,
    title: 'Artisan Animal Friends',
    description: 'Timeless wooden companions that become cherished keepsakes',
    price: '$56',
    category: 'figurine' as const,
  },
  {
    id: 5,
    image: fig5,
    title: 'Handcrafted Heroes',
    description: 'Each piece lovingly shaped to inspire hours of imaginative adventures',
    price: '$50',
    category: 'figurine' as const,
  },
  {
    id: 6,
    image: fig6,
    title: 'Nature\'s Treasures',
    description: 'Artisan-crafted wooden creatures from sustainable forests',
    price: '$54',
    category: 'figurine' as const,
  },
];

const features = [
  {
    icon: Star,
    title: '1/2 - 1 Year',
    description: 'Board books for tiny hands',
  },
  {
    icon: Shield,
    title: '1 - 2 Years',
    description: 'Board books with interactive stories & toys',
  },
  {
    icon: Heart,
    title: '2 - 3 Years',
    description: 'Adventure & imaginative play',
  },
  {
    icon: Truck,
    title: '3 - 4 Years',
    description: 'Chapter stories & characters',
  },
];

// Component: Footer
const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    // If we're not on home page, navigate home first
    if (window.location.hash !== '#/') {
      window.location.href = '/#/';
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-rose-50/30 border-t border-gray-200 py-16 mt-20 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">✨</span>
              </div>
              <span className="text-xl text-gray-900">KAHANI</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Creating magical moments with personalized books and handcrafted figurines.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('books')} className="text-gray-600 hover:text-rose-400 transition-colors">
                  Personalized Books
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('figurines')} className="text-gray-600 hover:text-rose-400 transition-colors">
                  Figurines
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('best-sellers')} className="text-gray-600 hover:text-rose-400 transition-colors">
                  Gift Sets
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('best-sellers')} className="text-gray-600 hover:text-rose-400 transition-colors">
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-gray-600 hover:text-rose-400 transition-colors">Blog</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-rose-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-rose-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-gray-600 hover:text-rose-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-gray-900 mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-rose-400 transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-rose-400 transition-colors">TikTok</a></li>
              <li><a href="#" className="text-gray-600 hover:text-rose-400 transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-rose-400 transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2026 KAHANI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Landing Page Component
function LandingPage() {
  const { cartItems } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Login state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white relative overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-sky-50/50 via-rose-50/30 to-amber-50/40 pointer-events-none" />

      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <DecorativeElements />
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      <Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} cartItemCount={cartItemCount} />
      <Hero />
      <CarouselSection />

      {/* Features Section */}
      <DioramaStage className="py-12 pb-8">
        <section className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-200/20 via-rose-200/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl text-gray-900 mb-4">Shop by Age</h2>
              <p className="text-gray-600">Perfect gifts for every milestone</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 40, rotateX: -20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      y: -12,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="relative group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center space-y-4 border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] min-h-[240px] flex flex-col"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center shadow-lg"
                      >
                        <span className="text-3xl font-bold text-rose-400">{index + 1}</span>
                      </motion.div>
                      <h3 className="text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </DioramaStage>

      {/* Product Gallery */}
      <DioramaStage className="py-12 pb-8">
        <section id="best-sellers" className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-rose-300/15 via-pink-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-20"
            >
              <h2 className="text-5xl text-gray-900">Best Sellers</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our most loved stories and characters, treasured by families everywhere.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </div>
        </section>
      </DioramaStage>

      {/* Figurines Section */}
      <DioramaStage className="py-12 pb-8">
        <section id="figurines" className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 via-rose-50/15 to-white pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-20"
            >
              <h2 className="text-5xl text-gray-900">Handcrafted Figurines</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Artisan-made wooden companions designed to inspire imagination and become treasured keepsakes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {figurines.map((figurine, index) => (
                <ProductCard
                  key={figurine.id}
                  {...figurine}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </div>
        </section>
      </DioramaStage>

      {/* Pick Your Style Section */}
      <DioramaStage className="py-12 pb-8">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-gray-50/30 to-white pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl text-gray-900 mb-4">Pick Your Style</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Every child's story deserves its own artistic voice. Choose the style that speaks to your little one's imagination.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Modern Minimalist */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-gradient-to-br from-slate-100 via-gray-50 to-white rounded-3xl overflow-hidden shadow-xl border border-gray-200/50">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <motion.img
                      src={style1}
                      alt="Modern Minimalist"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white text-3xl mb-2">Modern Minimalist</h3>
                      <p className="text-white/90 text-sm">Clean lines, sophisticated design, and timeless elegance</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Posh & Refined</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-gray-400"
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Pixar Magic */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-gradient-to-br from-sky-100 via-purple-50 to-pink-50 rounded-3xl overflow-hidden shadow-xl border border-purple-200/50">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <motion.img
                      src={style2}
                      alt="Pixar Magic"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-500/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white text-3xl mb-2">Pixar Magic</h3>
                      <p className="text-white/90 text-sm">Vibrant colors, playful characters, and boundless joy</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-600">Disney-Inspired</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-purple-400"
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Artisan Painted */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 rounded-3xl overflow-hidden shadow-xl border border-teal-200/50">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <motion.img
                      src={style3}
                      alt="Artisan Painted"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 via-teal-500/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white text-3xl mb-2">Artisan Painted</h3>
                      <p className="text-white/90 text-sm">Hand-painted watercolors with artistic charm and soul</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-teal-600">Handcrafted Beauty</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-teal-400"
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Comic Adventure */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-gradient-to-br from-red-100 via-orange-50 to-yellow-50 rounded-3xl overflow-hidden shadow-xl border border-red-200/50">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <motion.img
                      src={style4}
                      alt="Comic Adventure"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-red-500/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white text-3xl mb-2">Comic Adventure</h3>
                      <p className="text-white/90 text-sm">Bold graphics, dynamic action, and superhero excitement</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-red-600">Graphic Novel Style</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-red-400"
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </DioramaStage>

      {/* Modern Minimalist Best Sellers */}
      <DioramaStage className="py-12 pb-8">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-gray-50/40 to-white pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-slate-300/20 via-gray-200/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-20"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm mb-4">
                Modern Minimalist
              </div>
              <h2 className="text-5xl text-gray-900">Refined & Sophisticated</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Elegant designs with clean lines for the modern family.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  id: 101,
                  image: refined1,
                  title: 'The Quiet Garden',
                  description: 'A serene journey through minimalist landscapes',
                  price: '$38',
                  category: 'book' as const,
                },
                {
                  id: 102,
                  image: refined2,
                  title: 'Shapes & Shadows',
                  description: 'Geometric elegance meets storytelling',
                  price: '$34',
                  category: 'book' as const,
                },
                {
                  id: 103,
                  image: refined3,
                  title: 'Nordic Collection',
                  description: 'Scandinavian-inspired wooden figures',
                  price: '$56',
                  category: 'figurine' as const,
                },
              ].map((product, index) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </div>
        </section>
      </DioramaStage>

      {/* Pixar Magic Best Sellers */}
      <DioramaStage className="py-12 pb-8">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50/60 via-pink-50/40 to-sky-50/30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-300/20 via-pink-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-20"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm mb-4">
                Pixar Magic
              </div>
              <h2 className="text-5xl text-gray-900">Vibrant & Playful</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Bursting with color and joy, inspired by beloved animation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  id: 201,
                  image: vibrant1,
                  title: 'Rainbow Adventures',
                  description: 'Colorful characters embark on magical quests',
                  price: '$36',
                  category: 'book' as const,
                },
                {
                  id: 202,
                  image: vibrant2,
                  title: 'Happy Town Tales',
                  description: 'Joyful stories in a world of endless wonder',
                  price: '$34',
                  category: 'book' as const,
                },
                {
                  id: 203,
                  image: vibrant3,
                  title: 'Friendship Squad',
                  description: 'Playful character figurines that inspire friendship',
                  price: '$52',
                  category: 'figurine' as const,
                },
              ].map((product, index) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </div>
        </section>
      </DioramaStage>

      {/* Artisan Painted Best Sellers */}
      <DioramaStage className="py-12 pb-8">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-50/60 via-emerald-50/40 to-green-50/30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-teal-300/20 via-emerald-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-20"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 text-sm mb-4">
                Artisan Painted
              </div>
              <h2 className="text-5xl text-gray-900">Handcrafted with Love</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Each piece painted by hand with watercolor artistry and care.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  id: 301,
                  image: handcrafted1,
                  title: 'Meadow Dreams',
                  description: 'Soft watercolor illustrations of nature\'s beauty',
                  price: '$42',
                  category: 'book' as const,
                },
                {
                  id: 302,
                  image: handcrafted2,
                  title: 'Forest Whispers',
                  description: 'Delicate hand-painted woodland tales',
                  price: '$40',
                  category: 'book' as const,
                },
                {
                  id: 303,
                  image: handcrafted3,
                  title: 'Garden Friends',
                  description: 'Hand-painted wooden creatures with artistic charm',
                  price: '$58',
                  category: 'figurine' as const,
                },
              ].map((product, index) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </div>
        </section>
      </DioramaStage>

      {/* Comic Adventure Best Sellers */}
      <DioramaStage className="py-12 pb-8">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/60 via-orange-50/40 to-yellow-50/30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-red-300/20 via-orange-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-20"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-sm mb-4">
                Comic Adventure
              </div>
              <h2 className="text-5xl text-gray-900">Bold & Heroic</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Dynamic action and superhero excitement in every page.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  id: 401,
                  image: bold1,
                  title: 'Super Kid Origins',
                  description: 'Your child becomes the ultimate superhero',
                  price: '$36',
                  category: 'book' as const,
                },
                {
                  id: 402,
                  image: bold2,
                  title: 'Power Heroes',
                  description: 'Bold graphic novel adventures with your name',
                  price: '$38',
                  category: 'book' as const,
                },
                {
                  id: 403,
                  image: bold3,
                  title: 'Action Squad',
                  description: 'Dynamic hero figurines ready for adventure',
                  price: '$54',
                  category: 'figurine' as const,
                },
              ].map((product, index) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </div>
        </section>
      </DioramaStage>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component: FAQsPage
interface FAQItem {
  question: string;
  answer: string;
}

const faqsData: FAQItem[] = [
  {
    question: "Who is Kahani Storybooks?",
    answer: "Kahani creates personalized storybooks and toys that celebrate every child's imagination. Each book is made to include your child's name, likeness, and story, making them the hero of their own adventure. We combine storytelling, design, and technology to build keepsakes that families treasure for years."
  },
  {
    question: "How do I make a personalized book?",
    answer: "Pick a story from our growing collection and add your child's name, choose how they look, and write your own dedication. Our system customizes the story instantly so you can preview every page before ordering. Once confirmed, we print your book on premium paper and ship it straight to your door."
  },
  {
    question: "How do I place an order with Kahani?",
    answer: "Choose your book, personalize it, preview the final version, and click \"Add to Cart.\" You can include optional extras like a toy character or gift packaging before checking out. Complete payment, and we'll handle printing and delivery from our production partner."
  },
  {
    question: "How much are Kahani books?",
    answer: "Prices vary by book type and format. Softcover, hardcover, and collector editions are all available. Shipping rates depend on destination and speed. We also run limited offers and seasonal discounts, so check our pricing page for current deals."
  },
  {
    question: "Why are your books such special gifts?",
    answer: "Every Kahani book is made for one reader only. Seeing their own name and face in a story makes children light up with joy and connection. It's a thoughtful, creative gift that parents, grandparents, and friends love to give."
  },
  {
    question: "Where is Kahani based?",
    answer: "Kahani Storybooks operates globally, with production partners in India and Thailand. Our stories can be created and ordered online from anywhere in the world, and we deliver to most countries."
  },
  {
    question: "How do I contact Kahani?",
    answer: "Our support team is here to help with orders, personalization, or shipping questions. Email us at support@kahanistorybooks.com or use the Contact Form on our website. We respond Monday through Friday and answer every message personally."
  }
];

const FAQAccordion = ({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) => {
  return (
    <motion.div
      className="border-b border-gray-200 last:border-0"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-start justify-between text-left hover:bg-gray-50 transition-colors px-4"
      >
        <span className="text-lg font-medium text-gray-900 pr-8">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="pb-6 px-4 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

function FAQsPage() {
  const { cartItems } = useCart();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Login state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-amber-50/20">
      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Header */}
      <Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} cartItemCount={cartItemCount} />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Kahani Storybooks. Can't find what you're looking for?
              <a href="mailto:support@kahanistorybooks.com" className="text-rose-400 hover:text-rose-500 ml-1">Contact us</a>.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {faqsData.map((faq, index) => (
              <FAQAccordion
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Our support team is here to help you create the perfect personalized storybook for your child.
              </p>
              <a
                href="mailto:support@kahanistorybooks.com"
                className="inline-block bg-gradient-to-r from-rose-400 to-amber-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Component: ContactUsPage
const ContactUsPage = () => {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Login state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-amber-50/30">
      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Header */}
      <Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} cartItemCount={cartItemCount} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl mb-6">
              Get in <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg text-gray-600">
              Have a question about our personalized books or handcrafted figurines? We'd love to hear from you. Our team is here to help make your gift-giving experience magical.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
            >
              <h2 className="text-2xl md:text-3xl mb-6">Send us a message</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl mb-2">Thank you for reaching out!</h3>
                  <p className="text-gray-600">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Question</option>
                      <option value="personalization">Personalization Help</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="product">Product Information</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-rose-400 to-amber-400 text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  We're here to help you create magical moments with personalized gifts. Reach out through any of these channels.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600 text-sm mb-2">We typically respond within 24 hours</p>
                      <a href="mailto:support@kahanistorybooks.com" className="text-rose-400 hover:text-rose-500">
                        support@kahanistorybooks.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                      <p className="text-gray-600 text-sm">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Global Reach</h3>
                      <p className="text-gray-600 text-sm">We ship worldwide from our production facilities in India and Thailand</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl p-6">
                <h3 className="font-medium text-gray-900 mb-4">Follow Us</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stay updated with our latest stories and special offers
                </p>
                <div className="flex gap-3">
                  {[
                    { name: 'Instagram', icon: Instagram },
                    {
                      name: 'TikTok',
                      icon: () => (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      )
                    },
                    { name: 'Facebook', icon: Facebook },
                    { name: 'Newsletter', icon: Mail, link: '/blog#newsletter' },
                  ].map((social) => (
                    social.link ? (
                      <Link
                        key={social.name}
                        to={social.link}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                          title={social.name}
                        >
                          {typeof social.icon === 'function' ? (
                            <social.icon />
                          ) : (
                            <social.icon className="w-5 h-5 text-gray-700" />
                          )}
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.a
                        key={social.name}
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                        title={social.name}
                      >
                        {typeof social.icon === 'function' ? (
                          <social.icon />
                        ) : (
                          <social.icon className="w-5 h-5 text-gray-700" />
                        )}
                      </motion.a>
                    )
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component: PrivacyPolicyPage
function PrivacyPolicyPage() {
  const { cartItems } = useCart();
  // Login state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-amber-50/20">
      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Header */}
      <Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} cartItemCount={cartItemCount} />

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <h1 className="text-3xl md:text-4xl mb-2">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: October 1, 2025</p>

            <div className="prose prose-gray max-w-none space-y-8">
              {/* Who We Are */}
              <div>
                <h2 className="text-2xl mb-3">Who We Are</h2>
                <p className="text-gray-700 leading-relaxed">
                  We are Kahani Storybooks ("Kahani", "we", "us"). We create personalized children's storybook experiences. This policy explains how we handle your information across our website and services.
                </p>
              </div>

              {/* What We Collect */}
              <div>
                <h2 className="text-2xl mb-3">What We Collect</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may collect information you provide directly (such as your email address when you join our waitlist or contact us) and limited technical information (such as IP address and basic device data) to keep our website secure and functional.
                </p>
              </div>

              {/* How We Use It */}
              <div>
                <h2 className="text-2xl mb-3">How We Use It</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use your information to operate and improve our website and services, respond to inquiries, provide updates about product availability, and comply with legal obligations.
                </p>
              </div>

              {/* Retention */}
              <div>
                <h2 className="text-2xl mb-3">Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We keep information only as long as necessary for the purposes described above, and delete or anonymize it when it is no longer needed, unless we are required by law to retain it.
                </p>
              </div>

              {/* Sharing */}
              <div>
                <h2 className="text-2xl mb-3">Sharing</h2>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell your personal information. We may share limited data with service providers who help us operate our website (for example, form processing), subject to appropriate safeguards.
                </p>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="text-2xl mb-3">Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website is intended for parents and guardians. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us so we can delete it.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-2xl mb-3">Contact</h2>
                <p className="text-gray-700 leading-relaxed">
                  Questions or requests? Email us at{' '}
                  <a href="mailto:support@kahanistorybooks.com" className="text-rose-400 hover:text-rose-500 underline">
                    support@kahanistorybooks.com
                  </a>
                </p>
              </div>
            </div>

            {/* Back to Home Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-500 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component: BlogPage
function BlogPage() {
  const { cartItems } = useCart();
  // Login state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const blogPosts = [
    {
      id: 1,
      title: "5 Reasons Personalized Books Make the Perfect Gift",
      excerpt: "Discover why personalized storybooks create lasting memories and become cherished keepsakes for children of all ages.",
      date: "January 15, 2026",
      category: "Gift Ideas",
      image: "📚",
    },
    {
      id: 2,
      title: "How to Choose the Right Story for Your Child's Age",
      excerpt: "A comprehensive guide to selecting age-appropriate personalized books that will engage and delight your little ones.",
      date: "January 10, 2026",
      category: "Parenting Tips",
      image: "🎯",
    },
    {
      id: 3,
      title: "The Magic Behind Our Handcrafted Figurines",
      excerpt: "Take a peek behind the scenes at our artisan workshops where each figurine is lovingly crafted by hand.",
      date: "January 5, 2026",
      category: "Behind the Scenes",
      image: "✨",
    },
    {
      id: 4,
      title: "Creating Reading Rituals: Bedtime Stories That Bond",
      excerpt: "Learn how personalized books can transform bedtime into a magical bonding experience for you and your child.",
      date: "December 28, 2025",
      category: "Reading Tips",
      image: "🌙",
    },
    {
      id: 5,
      title: "Customer Spotlight: Maya's Adventure Journey",
      excerpt: "Meet Maya and her family who've been collecting our personalized books since she was born. Her story will warm your heart!",
      date: "December 20, 2025",
      category: "Customer Stories",
      image: "💖",
    },
    {
      id: 6,
      title: "The Art of Personalization: What Makes Each Book Unique",
      excerpt: "Explore the detailed process of how we customize each book to make your child the hero of their own story.",
      date: "December 15, 2025",
      category: "Our Process",
      image: "🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-amber-50/20">
      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Header */}
      <Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl mb-4">Stories & Insights</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tips, inspiration, and heartwarming tales from the Little Tales community
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                {/* Image/Emoji Header */}
                <div className="h-48 bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-rose-400 bg-rose-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>

                  <h2 className="text-xl mb-3 group-hover:text-rose-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-rose-400 font-medium text-sm group-hover:gap-3 transition-all">
                    Read More
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Subscribe Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-8 md:p-12 text-center"
          >
            <div id="newsletter" className="max-w-2xl mx-auto">
              <h2 className="text-3xl mb-4">Never Miss a Story</h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest updates, parenting tips, and exclusive offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-rose-400 to-amber-400 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component: ProductDetailPage
function ProductDetailPage() {
  const { cartItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAge, setSelectedAge] = useState('0-12 months old');
  const [selectedPages, setSelectedPages] = useState('36 Pages');
  const [selectedCharacters, setSelectedCharacters] = useState('Girl');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Product images
  const productImages = [
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
    'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800',
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
  ];

  const customizationOptions = {
    age: ['0-12 months old', '1-2 years old', '3-4 years old', '5-6 years old'],
    pages: ['24 Pages', '36 Pages', '48 Pages'],
    characters: ['Girl', 'Boy'],
  };

  const faqs = [
    { question: 'How is this book personalized for my child?', answer: 'The book is customized with your child\'s name, photo, and characteristics you provide. Each page is uniquely crafted to tell their story.' },
    { question: 'What if I need to make changes after personalizing?', answer: 'You can edit your personalization details anytime before we start printing. Once printing begins, changes may not be possible.' },
    { question: 'Size & Quality', answer: 'Our books are premium quality, measuring 8.5" x 11" with thick, durable pages and vibrant, fade-resistant printing.' },
  ];

  const reviews = [
    { name: 'Su', rating: 5, text: 'I am mad, absolutely, I\'ll buy this gift, all pregnant mother! I beessed.. I...' },
    { name: 'RiRi2003', rating: 5, text: 'Whyy short! I love it!!!' },
    { name: 'Diana', rating: 4, text: 'Really was stop about empathy and tenderness plus your daughter is the main character, so it\'s really special' },
    { name: 'Ellen Ardo', rating: 5, text: 'My daughter! And absolutely loves princesses and she could seeing herself as a geal. Great idea for a present, very special' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-amber-50/20">
      {/* Header */}
      <Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} cartItemCount={cartItemCount} />

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          isSignUp={false}
        />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <div className="flex gap-4">
              {/* Thumbnail Gallery */}
              <div className="flex flex-col gap-3">
                {productImages.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    whileHover={{ scale: 1.05 }}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx
                      ? 'border-rose-400 shadow-md'
                      : 'border-gray-200 opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50/60 via-peach-50/50 to-amber-50/40 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={productImages[selectedImage]}
                  alt="Product main view"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Product Title & Description */}
            <div>
              <h1 className="mb-4">Princess Girl, the One We All Needed</h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                When kindness calls—even the smallest acts can change everything. In this enchanting personalized tale, a Princess helps a suffering girl through kindness, bravery, and heart-discovery. Each page weaves your hero's picture and their strength, sharing the way, we come face to face with our compassion and our brightest magic of all.
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <span>Preview available before ordering</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Top-Sold nationally, calculate, and staff-fav!</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-gray-400 line-through text-lg">$55.00</span>
                <span className="text-3xl font-semibold text-gray-900">$43.99</span>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium">
                  Save 20%
                </span>
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              {/* Age Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <div className="grid grid-cols-2 gap-2">
                  {customizationOptions.age.map((age) => (
                    <motion.button
                      key={age}
                      onClick={() => setSelectedAge(age)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${selectedAge === age
                        ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                      {age}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Pages Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
                <div className="grid grid-cols-3 gap-2">
                  {customizationOptions.pages.map((pages) => (
                    <motion.button
                      key={pages}
                      onClick={() => setSelectedPages(pages)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${selectedPages === pages
                        ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                      {pages}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Characters Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Characters</label>
                <div className="grid grid-cols-2 gap-2">
                  {customizationOptions.characters.map((character) => (
                    <motion.button
                      key={character}
                      onClick={() => setSelectedCharacters(character)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${selectedCharacters === character
                        ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                    >
                      {character}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Personalize Button */}
            <Link to="/personalize" className="block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Personalize
              </motion.button>
            </Link>

            {/* Payment Icons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded">VISA</div>
              <div className="px-3 py-1.5 bg-white border border-gray-300 text-xs font-semibold rounded">mastercard</div>
              <div className="px-3 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded flex items-center gap-1">
                <ShoppingBag className="w-3 h-3" />
              </div>
              <div className="px-3 py-1.5 bg-white border border-gray-300 text-xs font-semibold rounded flex items-center gap-1">
                <span className="text-blue-600">V</span>
              </div>
              <div className="px-3 py-1.5 bg-blue-700 text-white text-xs font-semibold rounded">VISA</div>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-3 pt-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: expandedFaq === idx ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 py-4 bg-gray-50 text-sm text-gray-600 leading-relaxed border-t border-gray-200">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl font-semibold">Rated 4.8 out of 5</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900">{review.name}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Adored by millions worldwide */}
        <div className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-rose-50/60 via-peach-50/50 to-amber-50/40 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">How others personalized their stories</p>
          <h2 className="mb-8">Adored by<br />millions worldwide</h2>
          <div className="flex items-center justify-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200" alt="Happy customer" className="w-full h-full object-cover" />
            </div>
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl transform rotate-6">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" alt="Personalized book" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-16">
          <h2 className="text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {[
              'How do I place an order?',
              'Do you ship for studios?',
              'Can I get a refund for my order?',
              'How long does shipping take?',
              'Will I have to pay duties or extra fees?',
              'What if I\'m not happy with my order?',
              'How can I reach Customer support?',
              'What languages are your books available in?'
            ].map((question, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium text-gray-700">{question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component: PersonalizationPage
function PersonalizationPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedBook, setSelectedBook] = useState<number | null>(1);
  const [childInfo, setChildInfo] = useState({
    name: '',
    age: '',
    gender: '',
    language: 'English',
    photo: null as File | null,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showPhotoInfo, setShowPhotoInfo] = useState(false);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const steps = [
    { number: 1, name: 'Book', label: 'Choose Your Book' },
    { number: 2, name: 'Child Info', label: 'Tell Us About Your Child' },
    { number: 3, name: 'Preview', label: 'Preview & Order' },
  ];

  const bookOptions = [
    {
      id: 1,
      title: 'The Adventure Begins',
      description: 'An exciting journey filled with wonder and discovery',
      image: 'https://images.unsplash.com/photo-1631694161067-1d81ffa44e6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjBwZXJzb25hbGl6ZWQlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzY5NTc2MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$32',
    },
    {
      id: 2,
      title: 'Magical Dreams',
      description: 'A bedtime story that sparks imagination',
      image: 'https://images.unsplash.com/photo-1663052983967-1d3b8a032f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yeWJvb2slMjBmYWlyeSUyMHRhbGUlMjBtYWdpY2FsfGVufDF8fHx8MTc2OTU3NjA4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$32',
    },
    {
      id: 3,
      title: 'Bedtime Tales',
      description: 'Soothing stories for peaceful nights',
      image: 'https://images.unsplash.com/photo-1758612897112-ddf6bb6a455f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJlZHRpbWUlMjBzdG9yeSUyMGJvb2t8ZW58MXx8fHwxNzY5NDc4ODk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$36',
    },
    {
      id: 4,
      title: 'Space Explorer',
      description: 'Blast off on an intergalactic adventure',
      image: 'https://images.unsplash.com/photo-1579388654549-1f4e8c79b5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc3BhY2UlMjBhZHZlbnR1cmUlMjBib29rfGVufDF8fHx8MTc2OTU3NjA5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      price: '$34',
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContinue = () => {
    if (currentStep === 2) {
      // Navigate to preview page
      navigate('/preview-book');
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setChildInfo({ ...childInfo, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const canContinue = () => {
    if (currentStep === 1) return selectedBook !== null;
    if (currentStep === 2) return childInfo.name && childInfo.age;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Header */}
      <Header cartItemCount={cartItemCount} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: currentStep === step.number ? 1.1 : 1,
                      backgroundColor: currentStep >= step.number
                        ? 'rgb(251, 113, 133)'
                        : 'rgb(229, 231, 235)',
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium mb-2 shadow-md"
                  >
                    {step.number}
                  </motion.div>
                  <span className={`text-sm font-medium ${currentStep >= step.number ? 'text-rose-400' : 'text-gray-400'}`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 md:w-24 h-1 mx-4 rounded transition-colors duration-300 ${currentStep > step.number ? 'bg-rose-400' : 'bg-gray-200'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Book Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl md:text-4xl text-center mb-4">Choose Your Book</h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Select the perfect story for your little one. Each book is personalized with your child's name and details.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {bookOptions.map((book) => (
                  <motion.div
                    key={book.id}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedBook(book.id)}
                    className={`relative cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${selectedBook === book.id
                      ? 'ring-4 ring-rose-400 shadow-2xl'
                      : 'hover:shadow-xl'
                      }`}
                  >
                    {selectedBook === book.id && (
                      <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-rose-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-rose-50 to-amber-50">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-medium text-gray-900">{book.title}</h3>
                        <span className="text-rose-500 font-medium">{book.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">{book.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Child Info */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl md:text-4xl text-center mb-12">Start Personalisation</h2>

              <div className="max-w-4xl mx-auto space-y-8">
                {/* Photo Upload Section with Tips */}
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-dashed border-rose-200 rounded-2xl p-8">
                  {/* Tips Section */}
                  <div className="mb-8">
                    <h3 className="text-center font-medium text-gray-900 mb-6 tracking-wide">PHOTO TIPS</h3>
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      {/* Bad Examples */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-200">
                          <img
                            src="https://images.unsplash.com/photo-1768395581314-2424ad22faf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwY2xvc2UlMjB1cCUyMGZhY2V8ZW58MXx8fHwxNzY5Njg3MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Bad example"
                            className="w-full h-full object-cover filter brightness-50"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-md">
                            <X className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-200">
                          <img
                            src="https://images.unsplash.com/photo-1754639488181-7eae9f6c06e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2RkbGVyJTIwcG9ydHJhaXQlMjBvdXRkb29yJTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc2OTY4NzE3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Bad example"
                            className="w-full h-full object-cover filter brightness-75 saturate-150"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-md">
                            <X className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-200">
                          <img
                            src="https://images.unsplash.com/photo-1761891950273-2e8237c33e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwcG9ydHJhaXQlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY5Njg3MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Bad example"
                            className="w-full h-full object-cover filter brightness-90 sepia"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-md">
                            <X className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {/* Good Examples */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-200">
                          <img
                            src="https://images.unsplash.com/photo-1768395581314-2424ad22faf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwY2xvc2UlMjB1cCUyMGZhY2V8ZW58MXx8fHwxNzY5Njg3MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Good example"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-200">
                          <img
                            src="https://images.unsplash.com/photo-1754639488181-7eae9f6c06e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2RkbGVyJTIwcG9ydHJhaXQlMjBvdXRkb29yJTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc2OTY4NzE3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Good example"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-200">
                          <img
                            src="https://images.unsplash.com/photo-1761891950273-2e8237c33e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwcG9ydHJhaXQlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY5Njg3MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Good example"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upload Section */}
                  <div className="border-t-2 border-dashed border-rose-200 pt-8">
                    <h3 className="text-center font-medium text-gray-900 mb-6">
                      Upload a photo of your child
                    </h3>

                    <div className="flex flex-col items-center">
                      <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <label htmlFor="photo-upload">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-12 py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-xl font-medium cursor-pointer shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                        >
                          <Upload className="w-5 h-5" />
                          Choose Image
                        </motion.div>
                      </label>

                      {photoPreview && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-6"
                        >
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                        </motion.div>
                      )}

                      <button
                        onClick={() => setShowPhotoInfo(!showPhotoInfo)}
                        className="mt-6 flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                        <span className="text-sm">Photo Formats and Dimensions Information</span>
                      </button>

                      {showPhotoInfo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 p-4 bg-white/80 rounded-xl text-sm text-gray-600 border border-rose-100"
                        >
                          <ul className="space-y-2">
                            <li>• Accepted formats: JPG, PNG, HEIC</li>
                            <li>• Minimum resolution: 800x800 pixels</li>
                            <li>• Maximum file size: 10MB</li>
                            <li>• Clear, well-lit photos work best</li>
                            <li>• Face should be clearly visible</li>
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Language
                      </label>
                      <select
                        value={childInfo.language}
                        onChange={(e) => setChildInfo({ ...childInfo, language: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                        }}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>

                    {/* Name and Age Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Child's Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Child's first name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={childInfo.name}
                            onChange={(e) => {
                              if (e.target.value.length <= 25) {
                                setChildInfo({ ...childInfo, name: e.target.value });
                              }
                            }}
                            placeholder=""
                            maxLength={25}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                            {childInfo.name.length}/25
                          </span>
                        </div>
                      </div>

                      {/* Child's Age */}
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Child's age
                        </label>
                        <input
                          type="text"
                          value={childInfo.age}
                          onChange={(e) => setChildInfo({ ...childInfo, age: e.target.value })}
                          placeholder=""
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl md:text-4xl text-center mb-4">Preview Your Book</h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Here's how your personalized book will look!
              </p>

              <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-4xl mb-4">
                      {bookOptions.find(b => b.id === selectedBook)?.title}
                    </h3>
                    <p className="text-2xl text-gray-600">Starring: {childInfo.name || 'Your Child'}</p>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-medium mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Book:</span>
                      <span>{bookOptions.find(b => b.id === selectedBook)?.title}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Child's Name:</span>
                      <span>{childInfo.name}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Age Group:</span>
                      <span>{childInfo.age}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-medium text-lg">
                      <span>Total:</span>
                      <span className="text-rose-500">
                        {bookOptions.find(b => b.id === selectedBook)?.price}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between max-w-4xl mx-auto mt-12">
          {currentStep === 2 ? (
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-all"
              >
                Back
              </motion.button>
            </Link>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-all"
            >
              Back
            </motion.button>
          )}

          {currentStep < 3 ? (
            <motion.button
              whileHover={{ scale: canContinue() ? 1.05 : 1 }}
              whileTap={{ scale: canContinue() ? 0.95 : 1 }}
              onClick={handleContinue}
              disabled={!canContinue()}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${canContinue()
                ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              Preview Book
            </motion.button>
          ) : (
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-all"
              >
                Continue Shopping
              </motion.button>
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component: CartPage
function CartPage() {
  const { cartItems, updateQuantity: updateCartQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    updateCartQuantity(id, newQuantity);
  };

  const removeItem = (id: number) => {
    removeFromCart(id);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Header */}
      <Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} cartItemCount={cartItemCount} />

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          isSignUp={false}
        />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-rose-400" />
            </div>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some magical books to get started!</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-32 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-rose-100 to-amber-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">{item.title}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><span className="font-medium">Child's Name:</span> {item.customizations.childName}</p>
                              <p><span className="font-medium">Age:</span> {item.customizations.age}</p>
                              <p><span className="font-medium">Pages:</span> {item.customizations.pages}</p>
                              <p><span className="font-medium">Character:</span> {item.customizations.character}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-rose-500 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-rose-500 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-md p-6 sticky top-24"
              >
                <h2 className="text-2xl font-serif text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium shadow-lg hover:shadow-xl transition-all mb-4"
                >
                  Proceed to Checkout
                </motion.button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-rose-300 hover:text-rose-500 transition-all"
                >
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield className="w-5 h-5 text-rose-400" />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck className="w-5 h-5 text-rose-400" />
                      <span>Free Shipping on Orders $50+</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Heart className="w-5 h-5 text-rose-400" />
                      <span>Satisfaction Guaranteed</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Component: BookPreviewPage
function BookPreviewPage() {
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Mock book pages data
  const bookPages = [
    {
      id: 1,
      leftPage: {
        image: 'https://images.unsplash.com/photo-1579539447503-ec82f0aab843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHN0b3J5Ym9vayUyMGlsbHVzdHJhdGlvbiUyMG1hZ2ljYWx8ZW58MXx8fHwxNzY5NzU4MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: 'Once upon a time, in a magical land far away...'
      },
      rightPage: {
        image: 'https://images.unsplash.com/photo-1649750291589-8812197b698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjBjb2xvcmZ1bCUyMGZhbnRhc3l8ZW58MXx8fHwxNzY5NzU4MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: 'There lived a brave young hero named [Child\'s Name]...'
      }
    },
    {
      id: 2,
      leftPage: {
        image: 'https://images.unsplash.com/photo-1683221043536-33e88d0ebff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWlyeSUyMHRhbGUlMjBib29rJTIwaWxsdXN0cmF0aW9uJTIwZm9yZXN0fGVufDF8fHx8MTc2OTc1ODMwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: '[Child\'s Name] embarked on an incredible journey...'
      },
      rightPage: {
        image: 'https://images.unsplash.com/photo-1768142206948-fbbb321aac4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yeWJvb2slMjBpbGx1c3RyYXRpb24lMjBhZHZlbnR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3Njk3NTgzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: 'Through enchanted forests and over sparkling mountains...'
      }
    },
    {
      id: 3,
      leftPage: {
        image: 'https://images.unsplash.com/photo-1625043094257-b6c1b573210f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjBpbGx1c3RyYXRpb24lMjBmcmllbmRzaGlwfGVufDF8fHx8MTc2OTc1ODMwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: 'Meeting wonderful friends along the way...'
      },
      rightPage: {
        image: 'https://images.unsplash.com/photo-1588690474606-de363a32b788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwYm9vayUyMHdhdGVyY29sb3IlMjBhcnR8ZW58MXx8fHwxNzY5NzU4MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: 'Each one teaching [Child\'s Name] something special...'
      }
    },
    {
      id: 4,
      leftPage: {
        image: 'https://images.unsplash.com/photo-1625043094257-b6c1b573210f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yeWJvb2slMjBpbGx1c3RyYXRpb24lMjBoYXBweSUyMGVuZGluZ3xlbnwxfHx8fDE3Njk3NTgzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: 'And after many exciting adventures...'
      },
      rightPage: {
        image: 'https://images.unsplash.com/photo-1579539447503-ec82f0aab843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHN0b3J5JTIwd2hpbXNpY2FsJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2OTc1ODMwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: '[Child\'s Name] returned home, forever changed by the journey. The End.'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50 to-orange-50">
      {/* Header */}
      <Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} cartItemCount={cartItemCount} />

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          isSignUp={false}
        />
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/personalize')}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Personalization</span>
          </button>
        </div>
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">
            Your Personalized Book Preview
          </h2>
          <p className="text-gray-600">
            Preview how your child's name will appear in this magical adventure
          </p>
        </div>

        {/* Book Pages */}
        <div className="space-y-8">
          {bookPages.map((spread, index) => (
            <motion.div
              key={spread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Page Number */}
              <div className="bg-gradient-to-r from-rose-100 to-amber-100 px-6 py-3 border-b border-gray-200">
                <p className="text-sm text-gray-700 font-medium">
                  Pages {index * 2 + 1}-{index * 2 + 2}
                </p>
              </div>

              {/* Page Spread */}
              <div className="grid md:grid-cols-2">
                {/* Left Page */}
                <div className="p-8 border-r border-gray-200">
                  <div className="aspect-[4/3] mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-rose-50 to-amber-50">
                    <img
                      src={spread.leftPage.image}
                      alt={`Page ${index * 2 + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-700 text-center italic leading-relaxed">
                    {spread.leftPage.text}
                  </p>
                </div>

                {/* Right Page */}
                <div className="p-8">
                  <div className="aspect-[4/3] mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-amber-50 to-rose-50">
                    <img
                      src={spread.rightPage.image}
                      alt={`Page ${index * 2 + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-700 text-center italic leading-relaxed">
                    {spread.rightPage.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/personalize')}
            className="px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 transition-all"
          >
            Edit Personalization
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              addToCart({
                id: Date.now(),
                title: "The Adventure Begins",
                image: "https://images.unsplash.com/photo-1631694161067-1d81ffa44e6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjBwZXJzb25hbGl6ZWQlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzY5NTc2MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
                customizations: {
                  childName: "Emma",
                  age: "5 years",
                  pages: "36 Pages",
                  character: "Princess",
                },
                quantity: 1,
                price: 32.00,
              });
              navigate('/cart');
            }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Add to Cart - $32.00
          </motion.button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-rose-100">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-rose-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900 mb-2">About Your Personalized Book</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This is a preview of how your child's name will appear throughout the story.
                The final printed book will feature high-quality illustrations and premium paper stock.
                Each book is printed on-demand to ensure your personalization is perfect.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Router Configuration
const router = createHashRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/faqs",
    element: <FAQsPage />,
  },
  {
    path: "/contact",
    element: <ContactUsPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/personalize",
    element: <PersonalizationPage />,
  },
  {
    path: "/preview-book",
    element: <BookPreviewPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

// Wrapper component for each page to provide cart context
function PageWrapper({ children }: { children: ReactNode }) {
  const { cartItems } = useCart();
  return <>{children}</>;
}

// Main App Component with Routing
export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}