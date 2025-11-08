import { motion } from "motion/react";
import { Sparkles, Star, Gift } from "lucide-react";
import figurineImage from "figma:asset/28beed4105e7d599d27482eb520ab25026afdfb1.png";

export function FigurineShowcase() {
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
          {/* Left Side - Copy */}
          <motion.div
            className="space-y-6 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-lg">
              <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
              <span className="text-sm text-[#2d2d2d] font-medium">
                Bring Your Story to Life
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d]"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              More Than Just a Book.{" "}
              <span className="text-[#FF6B9D]">It's Playtime!</span>
            </h2>

            {/* Description */}
            <p
              className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              With our Full Playset, your child doesn't just read about their
              adventures—they live them! Each playset includes beautiful,
              handcrafted figurines that look just like your child and their
              story companions, turning every page into an interactive
              experience.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-4">
              {[
                {
                  icon: Gift,
                  text: "Premium quality figurines custom-made from photos",
                  color: "#FF6B9D",
                },
                {
                  icon: Sparkles,
                  text: "Durable, child-safe materials perfect for play",
                  color: "#8B4513",
                },
                {
                  icon: Star,
                  text: "Complete playset with accessories and scenery",
                  color: "#FFD700",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
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
                {/* Mint Green Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/5 backdrop-blur-xl group-hover:from-white/50 group-hover:via-white/30 group-hover:to-white/10 transition-all duration-300 border-t-2 border-t-white/60 border-x border-x-white/30 border-b border-b-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.1)]"></div>
                <span
                  className="relative text-lg text-[#0d4a3a] font-semibold"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Explore Playsets
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            className="relative md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#FF6B9D]/20 to-[#FF8AB5]/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#FFD700]/30 to-[#FFC700]/30 rounded-full blur-2xl"></div>

            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={figurineImage}
                alt="Personalized figurines of children"
                className="w-full h-auto"
              />
              
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Star */}
            <motion.div
              className="absolute -top-4 -left-4"
              animate={{
                y: [0, -10, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Star className="w-8 h-8 text-[#FFD700]" fill="#FFD700" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
