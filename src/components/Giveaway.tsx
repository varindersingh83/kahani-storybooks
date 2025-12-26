import { Gift, Sparkles, Star } from "lucide-react";
import { useState } from "react";

export function Giveaway() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setEmail("");
      }, 3000);
    }, 1000);
  };

  // Floating confetti positions
  const confetti = [
    { icon: Sparkles, top: "10%", left: "15%", delay: "0s", color: "#FFB5D8" },
    { icon: Star, top: "25%", right: "20%", delay: "1s", color: "#B5D8FF" },
    { icon: Sparkles, top: "60%", left: "10%", delay: "2s", color: "#D8B5FF" },
    { icon: Star, top: "75%", right: "12%", delay: "0.5s", color: "#FFD6B5" },
    { icon: Sparkles, top: "40%", left: "25%", delay: "1.5s", color: "#B5FFD8" },
    { icon: Star, top: "85%", left: "18%", delay: "0.8s", color: "#FFB5D8" },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 px-6 md:px-12 overflow-hidden">
      {/* Background - Cream to Lavender Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF7F2] via-[#F5E5F7] to-[#E5B7FF]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Illustration & Text */}
          <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Floating Confetti */}
            {confetti.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="hidden lg:block absolute animate-float opacity-40"
                  style={{
                    top: item.top,
                    left: item.left,
                    right: item.right,
                    animationDelay: item.delay,
                    animationDuration: "4s",
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: item.color }}
                    strokeWidth={2}
                  />
                </div>
              );
            })}

            {/* Gift Box Illustration */}
            <div className="relative">
              {/* Glow behind gift */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD6E8]/40 via-[#D4C5FF]/40 to-[#B5E7FF]/40 blur-3xl rounded-full scale-150"></div>
              
              {/* Gift Icon with decorative elements */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB5D8]/20 via-[#D8B5FF]/20 to-[#B5D8FF]/20 rounded-[32px] backdrop-blur-sm border-2 border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.1)] flex items-center justify-center rotate-3 transition-transform duration-300 hover:rotate-6 hover:scale-105">
                  <Gift
                    className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-[#B88FFF]"
                    strokeWidth={1.5}
                  />
                </div>
                
                {/* Decorative sparkles around gift */}
                <Sparkles
                  className="absolute -top-4 -right-4 w-10 h-10 text-[#FFB5D8] animate-pulse"
                  strokeWidth={2}
                />
                <Star
                  className="absolute -bottom-2 -left-2 w-8 h-8 text-[#B5D8FF] animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4 max-w-lg">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#2A1E16]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Win a Magical Storybook
              </h2>
              <p
                className="text-lg md:text-xl lg:text-2xl text-[#5a4d4d]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Every week, one child's photo becomes a story.
              </p>
            </div>
          </div>

          {/* Right Side - Form Card */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* White Card */}
              <div className="bg-white/90 backdrop-blur-xl rounded-[24px] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/60">
                {isSubmitted ? (
                  // Success State
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#B3E5D0] to-[#7DFFAF] rounded-full flex items-center justify-center">
                      <Star className="w-8 h-8 text-white" fill="white" />
                    </div>
                    <h3
                      className="text-2xl text-[#2A1E16]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      You're In!
                    </h3>
                    <p
                      className="text-base text-[#5a4d4d]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      Good luck! We'll announce the winner on Friday.
                    </p>
                  </div>
                ) : (
                  // Form
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm text-[#2A1E16]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F8F8F8] border border-gray-200 text-[#2A1E16] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B3E5D0]/50 focus:border-[#B3E5D0] transition-all"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm text-[#2A1E16]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F8F8F8] border border-gray-200 text-[#2A1E16] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B3E5D0]/50 focus:border-[#B3E5D0] transition-all"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {/* Mint Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/5 opacity-100 group-hover:opacity-100 transition-all duration-300 border-t-2 border-t-white/60 border-x border-x-white/30 border-b border-b-white/10"></div>
                      <span
                        className="relative text-lg text-[#1a3d32]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {isSubmitting ? "Entering..." : "Enter the Giveaway"}
                      </span>
                    </button>

                    {/* Winner Announcement Text */}
                    <p
                      className="text-center text-sm text-[#5a4d4d] pt-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      Winner announced every Friday.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
