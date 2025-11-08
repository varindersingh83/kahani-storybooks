import { motion } from "motion/react";
import { Sparkles, Heart, BookOpen } from "lucide-react";
import customBookImage from "figma:asset/ee47916f98bc6af778424613ac53f81303757160.png";

export function CustomBookShowcase() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5EB] via-[#FFE5D9] to-[#E8D5F2]">
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.04)_100%)]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#8B4513]/20 to-[#A0522D]/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#E8D5F2]/30 to-[#D4A5F5]/30 rounded-full blur-2xl"></div>

            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={customBookImage}
                alt="Custom personalized storybook"
                className="w-full h-auto"
              />
              
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Sparkle */}
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-8 h-8 text-[#8B4513]" fill="#8B4513" />
            </motion.div>
          </motion.div>

          {/* Right Side - Copy */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-lg">
              <Heart className="w-4 h-4 text-[#FF6B9D]" fill="#FF6B9D" />
              <span className="text-sm text-[#2d2d2d] font-medium">
                Uniquely Crafted for Your Child
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d]"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Your Child's Photo.{" "}
              <span className="text-[#8B4513]">Their Story.</span>
            </h2>

            {/* Description */}
            <p
              className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Every KAHANI storybook is uniquely designed based on your child's
              photo. Watch their eyes light up as they discover themselves as
              the hero of their very own adventure—complete with personalized
              illustrations and a custom storyline that captures their magic.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-4">
              {[
                {
                  icon: BookOpen,
                  text: "AI-powered character generation from your photo",
                  color: "#8B4513",
                },
                {
                  icon: Sparkles,
                  text: "Pixar-inspired illustrations tailored to your child",
                  color: "#FF6B9D",
                },
                {
                  icon: Heart,
                  text: "Original story that celebrates their uniqueness",
                  color: "#D4A5F5",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                      border: `1px solid ${feature.color}60`,
                    }}
                  >
                    <feature.icon
                      className="w-5 h-5"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <p
                    className="text-base md:text-lg text-[#4a4a4a] pt-1.5"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl">
                {/* Mint Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/5 backdrop-blur-xl group-hover:from-white/50 group-hover:via-white/30 group-hover:to-white/10 transition-all duration-300 border-t-2 border-t-white/60 border-x border-x-white/30 border-b border-b-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.1)]"></div>
                <span
                  className="relative text-lg text-[#1a3d32] font-semibold"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  See It In Action
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
