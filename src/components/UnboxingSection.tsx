import { motion } from "motion/react";
import image7 from "figma:asset/e15700d31350ac4824b5cc4829988f610ee9e48d.png";
import image6 from "figma:asset/dcff1f759535e69d17d234ee75eaa7f67d81642e.png";
import image5 from "figma:asset/412086e0a118ad82de531944e38918ee76551a50.png";

export function UnboxingSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5EB] via-[#FFE5D9] to-[#E8D5F2]">
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.04)_100%)]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#2d2d2d] mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            The <span className="text-[#8B4513]">Unboxing Experience</span>
          </h2>
        </motion.div>

        {/* Images Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Image 7 */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              src={image7}
              alt="KAHANI storybook playset box"
              className="w-full h-auto"
            />
            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
          </motion.div>

          {/* Image 6 */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={image6}
              alt="Unboxing KAHANI personalized storybook"
              className="w-full h-auto"
            />
            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
          </motion.div>

          {/* Image 5 */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src={image5}
              alt="KAHANI playset with figurines and backdrop"
              className="w-full h-auto"
            />
            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
          </motion.div>
        </div>

        {/* Copy Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p
            className="text-xl md:text-2xl text-[#4a4a4a] max-w-4xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Every KAHANI package is a gift wrapped in wonder—designed to spark
            joy from the very first moment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
