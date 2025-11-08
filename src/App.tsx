import { useState, useEffect } from "react";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { HowItWorks } from "./components/HowItWorks";
import { CustomBookShowcase } from "./components/CustomBookShowcase";
import { FigurineShowcase } from "./components/FigurineShowcase";
import { UnboxingSection } from "./components/UnboxingSection";
import { FAQ } from "./components/FAQ";
import { Testimonials } from "./components/Testimonials";
import { Giveaway } from "./components/Giveaway";
import { Footer } from "./components/Footer";
import { CreateFlow } from "./components/CreateFlow";
import { ContactUs } from "./components/ContactUs";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import beforeImage from "figma:asset/9f08c189907bc232b9c2ac2539894b434c5b4d8f.png";
import afterImage from "figma:asset/e02f688464fb6af4e9198a62d0926517c0dd83c2.png";

type Page = "home" | "create" | "contact" | "privacy";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Set page title and meta tags for SEO/AEO
  useEffect(() => {
    document.title =
      "Kahani - Personalized Children's Storybooks | From Photo to Storybook Magic";

    // Meta description for AI and search engines
    let metaDescription = document.querySelector(
      'meta[name="description"]',
    );
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    const descriptions = {
      home: "Transform your child's photo into a magical Pixar-inspired personalized storybook and figurine. Handcrafted with love. Digital PDF $9.99, Printed Book $49.99, Full Playset $179.99.",
      contact:
        "Contact Kahani Storybooks - Get in touch with us about personalized children's books and figurines. Email: team@vsnagra.com",
      privacy:
        "Kahani Privacy Policy - Learn how we protect your privacy and children's safety. We do not collect data from children under 13.",
      create:
        "Create your personalized Kahani storybook - Transform your child into a storybook character in 5 easy steps.",
    };

    metaDescription.setAttribute(
      "content",
      descriptions[currentPage] || descriptions.home,
    );

    // Open Graph and Twitter meta tags for social sharing and AI
    const updateMetaTag = (
      property: string,
      content: string,
      isOG = true,
    ) => {
      const attr = isOG ? "property" : "name";
      let tag = document.querySelector(
        `meta[${attr}="${property}"]`,
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateMetaTag(
      "og:title",
      "Kahani - Personalized Children's Storybooks",
    );
    updateMetaTag(
      "og:description",
      "Transform your child's photo into a magical Pixar-inspired personalized storybook. Handcrafted with love.",
    );
    updateMetaTag("og:type", "website");
    updateMetaTag(
      "og:url",
      "https://www.kahanistorybooks.com/",
    );
    updateMetaTag("twitter:card", "summary_large_image", false);
    updateMetaTag(
      "twitter:title",
      "Kahani - From Photo to Storybook Magic",
      false,
    );

    // Add JSON-LD structured data
    let scriptTag = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);

      // Fetch and inject schema.json
      fetch("/schema.json")
        .then((res) => res.json())
        .then((data) => {
          scriptTag.textContent = JSON.stringify(data);
        })
        .catch(() => {
          // Fallback basic schema if file doesn't load
          scriptTag.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Kahani Storybooks",
            description:
              "Personalized children's storybooks and figurines",
            url: "https://www.kahanistorybooks.com/",
          });
        });
    }
  }, [currentPage]);

  // Listen for navigation events from footer and other components
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const destination = customEvent.detail;
      if (destination === "privacy") {
        setCurrentPage("privacy");
      } else if (destination === "contact") {
        setCurrentPage("contact");
      } else if (destination === "home") {
        setCurrentPage("home");
      }
    };

    window.addEventListener("navigate", handleNavigate);
    return () =>
      window.removeEventListener("navigate", handleNavigate);
  }, []);

  // Route to different pages
  if (currentPage === "create") {
    return <CreateFlow onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "contact") {
    return <ContactUs onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "privacy") {
    return (
      <PrivacyPolicy onBack={() => setCurrentPage("home")} />
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Gradient Background with Vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5EB] via-[#FFE5D9] to-[#E8D5F2]">
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.08)_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Logo */}
        <header className="pt-8 md:pt-12 pb-6 md:pb-8 text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl tracking-wide text-[#2d2d2d]"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            KAHANI
          </h1>
        </header>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 pb-12">
          <div className="max-w-7xl w-full space-y-8 md:space-y-12">
            {/* Before-After Slider */}
            <div className="w-full max-w-5xl mx-auto">
              <div className="aspect-[16/10] md:aspect-[21/9] w-full">
                <BeforeAfterSlider
                  beforeImage={beforeImage}
                  afterImage={afterImage}
                  beforeAlt="Original child photo"
                  afterAlt="Personalized storybook and figurine"
                />
              </div>
            </div>

            {/* Headline */}
            <div className="text-center">
              <h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight whitespace-nowrap text-[#3d2e2e]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                Handcrafted with magic and love
              </h3>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <button
                onClick={() => setCurrentPage("create")}
                className="group relative px-8 md:px-10 py-4 md:py-5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl"
              >
                {/* Mint Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/5 backdrop-blur-xl group-hover:from-white/50 group-hover:via-white/30 group-hover:to-white/10 transition-all duration-300 border-t-2 border-t-white/60 border-x border-x-white/30 border-b border-b-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.1)]"></div>
                <span
                  className="relative text-lg md:text-xl text-[#1a3d32] font-semibold"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Create Yours
                </span>
              </button>

              <button className="group px-8 md:px-10 py-4 md:py-5 rounded-full bg-[#FFF8F0] border-2 border-gray-300/60 hover:border-gray-400/80 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                <span
                  className="text-lg md:text-xl text-[#2d2d2d] font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  How It Works
                </span>
              </button>
            </div>

            {/* Subtle Feature Highlight */}
            <div className="text-center pt-4"></div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Custom Book Showcase Section */}
      <CustomBookShowcase />

      {/* Figurine Showcase Section */}
      <FigurineShowcase />

      {/* Unboxing Section */}
      <UnboxingSection />

      {/* FAQ Section */}
      <FAQ />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Giveaway Section */}
      <Giveaway />

      {/* Footer */}
      <Footer />

      {/* Google Fonts */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}