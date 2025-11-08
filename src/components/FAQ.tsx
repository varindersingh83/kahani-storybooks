import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      id: "item-1",
      question: "Who is Kahani Storybooks?",
      answer:
        "Kahani creates personalized storybooks and toys that celebrate every child's imagination. Each book is made to include your child's name, likeness, and story, making them the hero of their own adventure. We combine storytelling, design, and technology to build keepsakes that families treasure for years.",
    },
    {
      id: "item-2",
      question: "How do I make a personalized book?",
      answer:
        "Pick a story from our growing collection and add your child's name, choose how they look, and write your own dedication. Our system customizes the story instantly so you can preview every page before ordering. Once confirmed, we print your book on premium paper and ship it straight to your door.",
    },
    {
      id: "item-3",
      question: "How do I place an order with Kahani?",
      answer:
        "Choose your book, personalize it, preview the final version, and click \"Add to Cart.\" You can include optional extras like a toy character or gift packaging before checking out. Complete payment, and we'll handle printing and delivery from our production partner.",
    },
    {
      id: "item-4",
      question: "How much are Kahani books?",
      answer:
        "Prices vary by book type and format. Softcover, hardcover, and collector editions are all available. Shipping rates depend on destination and speed. We also run limited offers and seasonal discounts, so check our pricing page for current deals.",
    },
    {
      id: "item-5",
      question: "Why are your books such special gifts?",
      answer:
        "Every Kahani book is made for one reader only. Seeing their own name and face in a story makes children light up with joy and connection. It's a thoughtful, creative gift that parents, grandparents, and friends love to give.",
    },
    {
      id: "item-6",
      question: "Where is Kahani based?",
      answer:
        "Kahani Storybooks operates globally, with production partners in India and Thailand. Our stories can be created and ordered online from anywhere in the world, and we deliver to most countries.",
    },
    {
      id: "item-7",
      question: "How do I contact Kahani?",
      answer:
        "Our support team is here to help with orders, personalization, or shipping questions. Email us at support@kahanistorybooks.com or use the Contact Form on our website. We respond Monday through Friday and answer every message personally.",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F0] via-[#FFE5D9] to-[#F5E6FF]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-8 h-8 text-[#8B6F47]" />
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d]"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <p
            className="text-lg md:text-xl text-[#5d4e4e] max-w-2xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Everything you need to know about creating your personalized Kahani storybook
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/40 p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-[#8B6F47]/20 last:border-0"
              >
                <AccordionTrigger
                  className="text-left py-4 hover:no-underline group"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span className="text-lg md:text-xl text-[#2d2d2d] group-hover:text-[#8B6F47] transition-colors">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2">
                  <p
                    className="text-base md:text-lg text-[#5d4e4e] leading-relaxed"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-10">
          <p
            className="text-base md:text-lg text-[#5d4e4e] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Still have questions?
          </p>
          <button
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("navigate", { detail: "contact" })
              );
            }}
            className="group relative px-6 py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-xl"
          >
            {/* Mint Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/5 backdrop-blur-xl group-hover:from-white/50 group-hover:via-white/30 group-hover:to-white/10 transition-all duration-300 border-t-2 border-t-white/60 border-x border-x-white/30 border-b border-b-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.1)]"></div>
            <span
              className="relative text-base md:text-lg text-[#1a3d32]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contact Us
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
