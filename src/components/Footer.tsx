import { Sparkles, Instagram } from "lucide-react";
import { trackSocialClick } from "../lib/analytics";

export function Footer() {
  return (
    <footer className="relative w-full py-16 md:py-20 lg:py-24 px-6 md:px-12 overflow-hidden">
      {/* Background - Warm cream gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF7F2] via-[#F5EDE8] to-[#EDE1D4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.04)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8 md:mb-12">
          {/* Left: Copyright */}
          <div className="text-center md:text-left order-3 md:order-1">
            <p
              className="text-sm md:text-base text-[#3A2E24] uppercase tracking-[0.1em]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              © 2025 Kahani
            </p>
          </div>

          {/* Center: Logo with symbol */}
          <div className="flex flex-col items-center space-y-6 order-1 md:order-2">
            {/* Sparkle Icon above logo */}
            <div className="relative">
              {/* Soft glow behind sparkle */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E5B7FF]/40 via-[#FFD6E8]/40 to-[#B3E5D0]/40 blur-2xl scale-150 opacity-50"></div>
              <Sparkles
                className="w-8 h-8 md:w-10 md:h-10 text-[#B88FFF] relative"
                strokeWidth={1.5}
              />
            </div>

            {/* KAHANI Logo */}
            <div className="relative">
              {/* Subtle vignette glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E5B7FF]/20 via-transparent to-[#B3E5D0]/20 blur-3xl scale-150 -z-10"></div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl tracking-wide text-[#2A1E16]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                KAHANI
              </h2>
            </div>

            {/* Tagline */}
            <p
              className="text-sm md:text-base text-[#5a4d4d] max-w-xs text-center"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              Stories handcrafted with magic and love.
            </p>
          </div>

          {/* Right: Social Icons */}
          <div className="flex justify-center md:justify-end items-center gap-6 order-2 md:order-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/kahanistorybooks"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackSocialClick("instagram");
              }}
              className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFB5D8]/20 to-[#FFB5D8]/10 border border-[#FFB5D8]/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-[#FFB5D8]/30 hover:to-[#FFB5D8]/20"
              aria-label="Instagram"
            >
              <Instagram
                className="w-5 h-5 md:w-6 md:h-6 text-[#B88FFF] transition-colors group-hover:text-[#FF8FB8]"
                strokeWidth={1.5}
              />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@kahanistorybooks"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackSocialClick("tiktok");
              }}
              className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#B5D8FF]/20 to-[#B5D8FF]/10 border border-[#B5D8FF]/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-[#B5D8FF]/30 hover:to-[#B5D8FF]/20"
              aria-label="TikTok"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#B88FFF] transition-colors group-hover:text-[#8FB8FF]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom: Privacy & Contact Links */}
        <div className="text-center pt-8 border-t border-[#E5D5C5]/50">
          <p
            className="text-sm text-[#7a6d6d]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
            }}
          >
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("navigate", { detail: "privacy" }));
              }}
              className="hover:text-[#5DE0A1] transition-colors"
            >
              Privacy Policy
            </button>
            {" · "}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("navigate", { detail: "contact" }));
              }}
              className="hover:text-[#5DE0A1] transition-colors"
            >
              Contact
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
