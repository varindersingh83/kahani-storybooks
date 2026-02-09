import { motion } from 'motion/react';
import { ChevronDown, ChevronLeft, Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Footer, Header, LoginModal, useCart } from '../App';
import { getProductDetails } from '../data/productDetails';
import { getProductGallery } from '../data/productImages';

export default function ProductDetailPage() {
  const { cartItems } = useCart();
  const { id } = useParams();
  const productId = Number(id) || 1;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [sourceIndexByImage, setSourceIndexByImage] = useState<Record<number, number>>({});

  const productImages = getProductGallery(productId);
  const productContent = getProductDetails(productId);
  const productDescription = `${productContent.description} Personalized with your child's details, each book is created to feel unique and meaningful. Designed as a keepsake, it is made to be read, shared, and treasured for years.`;

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setSourceIndexByImage({});
  }, [productId]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  const getImageSrc = (index: number) => {
    const image = productImages[index];
    if (!image) {
      return '';
    }
    const sourceIndex = sourceIndexByImage[index] ?? 0;
    return image.sources[Math.min(sourceIndex, image.sources.length - 1)];
  };

  const markFallback = (index: number) => {
    setSourceIndexByImage((prev) => {
      const current = prev[index] ?? 0;
      const maxSourceIndex = Math.max((productImages[index]?.sources.length ?? 1) - 1, 0);
      if (current >= maxSourceIndex) {
        return prev;
      }
      return { ...prev, [index]: current + 1 };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-amber-50/20">
      <Header isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} cartItemCount={cartItemCount} />

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50/60 via-peach-50/50 to-amber-50/40 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <motion.img
                key={`${productId}-${selectedImage}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={getImageSrc(selectedImage)}
                onError={() => markFallback(selectedImage)}
                alt="Product main view"
                className="w-full h-auto object-cover"
                loading={selectedImage === 0 ? 'eager' : 'lazy'}
                decoding="async"
                width={1200}
                height={1200}
              />
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {productImages.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  whileHover={{ scale: 1.03 }}
                  className={`w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx
                    ? 'border-rose-400 shadow-md'
                    : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  aria-label={`Select product image ${idx + 1}`}
                >
                  <img
                    src={getImageSrc(idx)}
                    onError={() => markFallback(idx)}
                    alt={`Product view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={128}
                    height={128}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="mb-4">{productContent.title}</h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                {productDescription}
              </p>

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

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-gray-400 line-through text-lg">$55.00</span>
                <span className="text-3xl font-semibold text-gray-900">$43.99</span>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium">
                  Save 20%
                </span>
              </div>
            </div>

            <Link to="/personalize" className="block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-amber-400 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Personalize
              </motion.button>
            </Link>

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

        <div className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-rose-50/60 via-peach-50/50 to-amber-50/40 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">How others personalized their stories</p>
          <h2 className="mb-8">Adored by<br />millions worldwide</h2>
          <div className="flex items-center justify-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200" alt="Happy customer" className="w-full h-full object-cover" loading="lazy" decoding="async" width={200} height={200} />
            </div>
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl transform rotate-6">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" alt="Personalized book" className="w-full h-full object-cover" loading="lazy" decoding="async" width={400} height={400} />
            </div>
          </div>
        </div>

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

      <Footer />
    </div>
  );
}
