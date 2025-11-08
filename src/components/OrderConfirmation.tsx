import { Sparkles, Star, Package, ArrowRight, Mail } from "lucide-react";

interface OrderConfirmationProps {
  onReturnHome: () => void;
  orderNumber?: string;
  productName?: string;
  customerEmail?: string;
}

export function OrderConfirmation({ 
  onReturnHome,
  orderNumber = "#KHN1025",
  productName = "Printed Book",
  customerEmail = "your@email.com"
}: OrderConfirmationProps) {
  // Floating confetti/sparkles positions
  const sparkles = [
    { icon: Sparkles, top: "5%", left: "8%", delay: "0s", color: "#f9c5d5", size: "w-6 h-6", duration: "4s" },
    { icon: Star, top: "12%", right: "12%", delay: "0.8s", color: "#e5d4f2", size: "w-5 h-5", duration: "5s" },
    { icon: Sparkles, top: "18%", left: "15%", delay: "1.5s", color: "#fde4d9", size: "w-7 h-7", duration: "4.5s" },
    { icon: Star, top: "78%", left: "10%", delay: "0.3s", color: "#d9f2e5", size: "w-6 h-6", duration: "5.5s" },
    { icon: Sparkles, top: "85%", right: "15%", delay: "1.2s", color: "#f9c5d5", size: "w-5 h-5", duration: "4s" },
    { icon: Star, top: "25%", right: "18%", delay: "2s", color: "#fde4d9", size: "w-6 h-6", duration: "5s" },
    { icon: Sparkles, top: "68%", right: "8%", delay: "0.6s", color: "#e5d4f2", size: "w-7 h-7", duration: "4.5s" },
    { icon: Star, top: "40%", left: "5%", delay: "1.8s", color: "#d9f2e5", size: "w-5 h-5", duration: "5.5s" },
    { icon: Sparkles, top: "55%", right: "20%", delay: "0.9s", color: "#f9c5d5", size: "w-6 h-6", duration: "4s" },
    { icon: Star, top: "32%", left: "22%", delay: "1.4s", color: "#fde4d9", size: "w-5 h-5", duration: "5s" },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Soft Pastel Background with Radial Light */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f3] via-[#f9e6df] to-[#fde4d9]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,transparent_50%,rgba(91,75,68,0.03)_100%)]"></div>
      </div>

      {/* Floating Sparkles/Confetti - Subtle celebration */}
      {sparkles.map((sparkle, index) => {
        const Icon = sparkle.icon;
        return (
          <div
            key={index}
            className="hidden md:block absolute animate-float-gentle opacity-30"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              right: sparkle.right,
              animationDelay: sparkle.delay,
              animationDuration: sparkle.duration,
            }}
          >
            <Icon
              className={sparkle.size}
              style={{ color: sparkle.color }}
              strokeWidth={1.5}
            />
          </div>
        );
      })}

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Small Kahani Logo Watermark */}
        <header className="pt-8 md:pt-10 text-center">
          <div
            className="text-xl md:text-2xl tracking-wide text-[#8b7b74] opacity-60"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
          >
            KAHANI
          </div>
        </header>

        {/* Main Content - Centered Vertically */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-3xl">
            {/* Main Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-10 md:p-14 lg:p-16 shadow-[0_30px_100px_rgba(91,75,68,0.15)] border border-white/90">
              {/* Success Illustration Area */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f9c5d5]/40 via-[#e5d4f2]/40 to-[#d9f2e5]/40 blur-3xl scale-150 animate-pulse-slow"></div>
                  
                  {/* Main Icon Container */}
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#f9e6df] to-[#fde4d9] flex items-center justify-center border-2 border-white/60 shadow-xl">
                    <Package
                      className="w-12 h-12 md:w-14 md:h-14 text-[#c9a89c]"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Orbiting Sparkles */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#f9c5d5] to-[#f9b5c8] flex items-center justify-center shadow-lg animate-bounce-slow">
                    <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#e5d4f2] to-[#d9c5e0] flex items-center justify-center shadow-lg animate-bounce-slow" style={{ animationDelay: "0.5s" }}>
                    <Star className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Heading */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl text-center mb-4 text-[#5b4b44] leading-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Your Kahani is being crafted!
              </h1>

              {/* Subheading */}
              <p
                className="text-base md:text-lg lg:text-xl text-center text-[#8b7b74] mb-10 leading-relaxed max-w-2xl mx-auto"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                }}
              >
                We've received your order and our artists are beginning to bring your story to life.
              </p>

              {/* Order Details Block */}
              <div className="bg-gradient-to-br from-[#f9e6df]/50 to-[#fde4d9]/50 rounded-[24px] p-6 md:p-8 mb-8 border border-[#fde4d9]">
                <div className="space-y-4">
                  {/* Order Number */}
                  <div className="flex items-center justify-between py-2 border-b border-[#fde4d9]/50">
                    <span
                      className="text-sm md:text-base text-[#8b7b74]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      Order Number
                    </span>
                    <span
                      className="text-base md:text-lg text-[#5b4b44]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {orderNumber}
                    </span>
                  </div>

                  {/* Edition Selected */}
                  <div className="flex items-center justify-between py-2 border-b border-[#fde4d9]/50">
                    <span
                      className="text-sm md:text-base text-[#8b7b74]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      Edition Selected
                    </span>
                    <span
                      className="text-base md:text-lg text-[#5b4b44]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {productName}
                    </span>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="flex items-center justify-between py-2 border-b border-[#fde4d9]/50">
                    <span
                      className="text-sm md:text-base text-[#8b7b74]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      Estimated Delivery
                    </span>
                    <span
                      className="text-base md:text-lg text-[#5b4b44]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      1–2 weeks
                    </span>
                  </div>

                  {/* Email Confirmation */}
                  <div className="pt-2">
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/50">
                      <Mail className="w-5 h-5 text-[#c9a89c] flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <p
                        className="text-sm md:text-base text-[#8b7b74]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        A confirmation email has been sent to{" "}
                        <span className="text-[#5b4b44] font-medium">{customerEmail}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Button - Return Home */}
              <div className="flex flex-col items-center space-y-4 mb-6">
                <button
                  onClick={onReturnHome}
                  className="group relative px-12 md:px-14 py-5 md:py-6 rounded-[24px] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(249,197,213,0.4)] hover:shadow-[0_12px_48px_rgba(249,197,213,0.6)] w-full md:w-auto"
                >
                  {/* Mint Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                  
                  {/* Soft glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>

                  <div className="relative flex items-center justify-center gap-3">
                    <span
                      className="text-lg md:text-xl lg:text-2xl text-[#1a3d32]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Return Home
                    </span>
                    <ArrowRight
                      className="w-5 h-5 md:w-6 md:h-6 text-[#1a3d32] transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </div>
                </button>

                {/* Secondary Link - Track Order */}
                <button
                  className="text-sm md:text-base text-[#8b7b74] hover:text-[#5b4b44] transition-colors duration-200 underline"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Track Order
                </button>
              </div>

              {/* Thank You Message */}
              <div className="text-center pt-6 border-t border-[#e5d4e8]">
                <p
                  className="text-sm md:text-base text-[#8b7b74] italic"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Thank you for bringing a little more magic into the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(8deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-10px) translateX(-8px) rotate(-5deg);
            opacity: 0.25;
          }
          75% {
            transform: translateY(-15px) translateX(5px) rotate(3deg);
            opacity: 0.35;
          }
        }
        
        .animate-float-gentle {
          animation: float-gentle 5s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
