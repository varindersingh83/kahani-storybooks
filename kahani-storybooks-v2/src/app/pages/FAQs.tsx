import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
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
    answer: "Choose your book, personalize it, preview the final version, and click "Add to Cart." You can include optional extras like a toy character or gift packaging before checking out. Complete payment, and we'll handle printing and delivery from our production partner."
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

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-amber-50/20">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
              Kahani
            </Link>
            <Link
              to="/"
              className="text-gray-600 hover:text-rose-400 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

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
            {faqs.map((faq, index) => (
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