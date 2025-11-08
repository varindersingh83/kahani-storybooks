import { useState } from "react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { ProductSelection } from "./ProductSelection";
import { UploadPersonalize } from "./UploadPersonalize";
import { ShippingCheckout } from "./ShippingCheckout";
import { OrderConfirmation } from "./OrderConfirmation";

interface CreateFlowProps {
  onBack: () => void;
}

export function CreateFlow({ onBack }: CreateFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStartCreating = () => {
    setCurrentStep(2);
  };

  const handleBackToIntro = () => {
    setCurrentStep(1);
  };

  const handleBackToProductSelection = () => {
    setCurrentStep(2);
  };

  const handleBackToUpload = () => {
    setCurrentStep(3);
  };

  const handleNextFromProductSelection = () => {
    setCurrentStep(3);
  };

  const handleNextFromUpload = () => {
    setCurrentStep(4);
  };

  const handleNextFromShipping = () => {
    setCurrentStep(5);
  };

  const handleReturnHome = () => {
    onBack(); // Return to landing page
  };

  // Show Order Confirmation screen (Step 5)
  if (currentStep === 5) {
    return (
      <OrderConfirmation 
        onReturnHome={handleReturnHome}
        orderNumber="#KHN1025"
        productName="Printed Book"
        customerEmail="your@email.com"
      />
    );
  }

  // Show Shipping & Checkout screen (Step 4)
  if (currentStep === 4) {
    return (
      <ShippingCheckout 
        onBack={handleBackToUpload}
        onNext={handleNextFromShipping}
      />
    );
  }

  // Show Upload & Personalize screen (Step 3)
  if (currentStep === 3) {
    return (
      <UploadPersonalize 
        onBack={handleBackToProductSelection}
        onNext={handleNextFromUpload}
      />
    );
  }

  // Show Product Selection screen (Step 2)
  if (currentStep === 2) {
    return (
      <ProductSelection 
        onBack={handleBackToIntro}
        onNext={handleNextFromProductSelection}
      />
    );
  }

  // Show Intro screen (Step 1)

  // Floating sparkles positions
  const sparkles = [
    { icon: Sparkles, top: "8%", left: "12%", delay: "0s", color: "#f9c5d5", size: "w-8 h-8" },
    { icon: Star, top: "15%", right: "15%", delay: "1.2s", color: "#e5d4f2", size: "w-6 h-6" },
    { icon: Sparkles, top: "75%", left: "8%", delay: "2s", color: "#fde4d9", size: "w-7 h-7" },
    { icon: Star, top: "82%", right: "10%", delay: "0.8s", color: "#d9f2e5", size: "w-5 h-5" },
    { icon: Sparkles, top: "45%", left: "18%", delay: "1.5s", color: "#f9e6df", size: "w-6 h-6" },
    { icon: Star, top: "25%", right: "22%", delay: "0.3s", color: "#f9c5d5", size: "w-5 h-5" },
    { icon: Sparkles, top: "65%", right: "18%", delay: "1.8s", color: "#e5d4f2", size: "w-7 h-7" },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Soft Pastel Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f3] via-[#f9e6df] to-[#fde4d9]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(91,75,68,0.03)_100%)]"></div>
      </div>

      {/* Floating Sparkles - Subtle ambient decoration */}
      {sparkles.map((sparkle, index) => {
        const Icon = sparkle.icon;
        return (
          <div
            key={index}
            className="hidden lg:block absolute animate-gentle-float opacity-20"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              right: sparkle.right,
              animationDelay: sparkle.delay,
              animationDuration: "5s",
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
        {/* Small Kahani Logo at Top */}
        <header className="pt-8 md:pt-10 text-center">
          <button
            onClick={onBack}
            className="text-2xl md:text-3xl tracking-wide text-[#5b4b44] hover:text-[#2d2d2d] transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
          >
            KAHANI
          </button>
        </header>

        {/* Main Content - Centered Vertically */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-3xl">
            {/* Main Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-10 md:p-14 lg:p-16 shadow-[0_20px_80px_rgba(91,75,68,0.12)] border border-white/80">
              {/* Sparkle icon accent */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f9c5d5]/40 via-[#e5d4f2]/40 to-[#d9f2e5]/40 blur-2xl scale-150"></div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#f9e6df] to-[#fde4d9] flex items-center justify-center border-2 border-white/60 shadow-lg">
                    <Sparkles
                      className="w-8 h-8 md:w-10 md:h-10 text-[#c9a89c]"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>

              {/* Heading */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-6 text-[#5b4b44] leading-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Turn your child into the hero of their own story.
              </h1>

              {/* Subheading */}
              <p
                className="text-base md:text-lg lg:text-xl text-center text-[#8b7b74] mb-10 leading-relaxed max-w-2xl mx-auto"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                }}
              >
                Upload a photo, personalize the story, and receive a magical book made just for them.
              </p>

              {/* Start Creating Button */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={handleStartCreating}
                  className="group relative px-10 md:px-12 lg:px-14 py-5 md:py-6 rounded-[24px] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(249,197,213,0.4)] hover:shadow-[0_12px_48px_rgba(249,197,213,0.6)]"
                >
                  {/* Mint Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                  
                  {/* Soft glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent opacity-100 group-hover:opacity-100 transition-all duration-300"></div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <span
                      className="text-lg md:text-xl lg:text-2xl text-[#5b4b44]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Start Creating
                    </span>
                    <ArrowRight
                      className="w-5 h-5 md:w-6 md:h-6 text-[#5b4b44] transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </div>
                </button>

                {/* Supporting text */}
                <p
                  className="text-sm md:text-base text-[#8b7b74]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Takes less than 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-15px) translateX(5px) rotate(5deg);
            opacity: 0.25;
          }
          50% {
            transform: translateY(-8px) translateX(-5px) rotate(-3deg);
            opacity: 0.15;
          }
          75% {
            transform: translateY(-12px) translateX(3px) rotate(2deg);
            opacity: 0.22;
          }
        }
        
        .animate-gentle-float {
          animation: gentle-float 5s ease-in-out infinite;
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
