import { useState } from "react";
import { saveContactSubmission } from "../lib/api";

interface ContactUsProps {
  onBack: () => void;
}

export function ContactUs({ onBack }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveContactSubmission(
        formData.name,
        formData.email,
        formData.message
      );
      
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5EDE8] via-[#F0E5DC] to-[#EDE1D4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-6 py-12 md:py-16">
        {/* Logo */}
        <header className="mb-12 md:mb-16">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl tracking-wide text-[#2d2d2d]"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            KAHANI
          </h1>
        </header>

        {/* Card Container */}
        <div className="w-full max-w-xl bg-[#FFF8F5]/80 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-8 md:p-12">
          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl text-center mb-4 text-[#2d2d2d]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            Contact Us
          </h2>

          {/* Subtext */}
          <p
            className="text-center text-[#5a4d4d] mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
            }}
          >
            Email us at{" "}
            <a
              href="mailto:team@vsnagra.com"
              className="text-[#A0522D] hover:underline"
            >
              team@vsnagra.com
            </a>{" "}
            or use the form below.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-[#3d2e2e]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E5D5C5] text-[#2d2d2d] placeholder-[#9d8f8f] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 focus:border-[#8B4513] transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-[#3d2e2e]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E5D5C5] text-[#2d2d2d] placeholder-[#9d8f8f] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 focus:border-[#8B4513] transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-[#3d2e2e]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="How can we help?"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#E5D5C5] text-[#2d2d2d] placeholder-[#9d8f8f] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 focus:border-[#8B4513] transition-all resize-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              {/* Send Button */}
              <button
                type="submit"
                disabled={isSubmitted || isSubmitting}
                className="group relative w-full sm:w-auto px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Mint Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/5 backdrop-blur-xl group-hover:from-white/50 group-hover:via-white/30 group-hover:to-white/10 transition-all duration-300 border-t-2 border-t-white/60 border-x border-x-white/30 border-b border-b-white/10"></div>
                <span
                  className="relative text-[#1a3d32]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {isSubmitted ? "Message Sent! ✓" : "Send Message"}
                </span>
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent border-0 hover:underline transition-all text-[#3d2e2e]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}
              >
                Back to Home
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <footer className="mt-12 text-center">
          <p
            className="text-sm text-[#7a6d6d]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
            }}
          >
            <button
              onClick={() => {
                // This will be handled by parent component routing
                window.dispatchEvent(new CustomEvent("navigate", { detail: "privacy" }));
              }}
              className="hover:text-[#A0522D] transition-colors"
            >
              Privacy Policy
            </button>
            {" · "}
            <span className="text-[#A0522D]">Contact</span>
          </p>
        </footer>
      </div>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
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
