import { Camera, Sparkles, Gift, Image, Upload } from "lucide-react";
import { motion } from "motion/react";
import uploadImage from "figma:asset/9f08c189907bc232b9c2ac2539894b434c5b4d8f.png";
import toysImage from "figma:asset/28beed4105e7d599d27482eb520ab25026afdfb1.png";
import playsetBoxImage from "figma:asset/e15700d31350ac4824b5cc4829988f610ee9e48d.png";

export function HowItWorks() {
  const steps = [
    {
      icon: Camera,
      title: "Upload Photo",
      description: "Send us your child's favorite picture.",
      color: "from-[#FFB5D8]/30 to-[#FFB5D8]/10",
      iconColor: "#FF8FB8",
    },
    {
      icon: Sparkles,
      title: "We Craft",
      description: "Our artists turn it into a figurine and storybook.",
      color: "from-[#B5D8FF]/30 to-[#B5D8FF]/10",
      iconColor: "#8FB8FF",
    },
    {
      icon: Gift,
      title: "You Unbox Magic",
      description: "Receive your handcrafted keepsake.",
      color: "from-[#D8B5FF]/30 to-[#D8B5FF]/10",
      iconColor: "#B88FFF",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 px-6 md:px-12">
      {/* Background matches hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5EB] via-[#FFE5D9] to-[#E8D5F2]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.08)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-6 md:mb-8">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#2d2d2d] mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            How It Works
          </h2>
          <p
            className="text-lg md:text-xl lg:text-2xl text-[#5a4d4d]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
          >
            From one photo to a world of wonder.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative mt-16 md:mt-20">
          {/* Desktop Curved Connectors - Hidden on mobile */}
          <div className="hidden lg:block absolute top-[80px] left-0 right-0 h-[120px] pointer-events-none">
            {/* First connector */}
            <svg
              className="absolute left-[28%] top-0 w-[18%]"
              viewBox="0 0 200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 10 60 Q 100 20, 190 60"
                stroke="#d4c5d0"
                strokeWidth="2"
                strokeDasharray="6,6"
                fill="none"
              />
            </svg>

            {/* Second connector */}
            <svg
              className="absolute left-[54%] top-0 w-[18%]"
              viewBox="0 0 200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 10 60 Q 100 20, 190 60"
                stroke="#d4c5d0"
                strokeWidth="2"
                strokeDasharray="6,6"
                fill="none"
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  {/* Step Number */}
                  <div className="mb-6">
                    <span
                      className="text-5xl md:text-6xl text-[#3d2e2e]/30"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Circular Icon Card */}
                  <div className="relative mb-8 group">
                    <div
                      className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${step.color} backdrop-blur-sm border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] overflow-hidden`}
                    >
                      {index === 0 ? (
                        // Animated photo upload for first step
                        <div className="relative w-full h-full flex items-center justify-center p-3">
                          {/* Mini Upload Window */}
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2.5 w-full max-w-[110px]">
                            {/* Image Preview */}
                            <motion.div
                              className="relative rounded overflow-hidden mb-2"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                repeatDelay: 2.4,
                              }}
                            >
                              <img
                                src={uploadImage}
                                alt="Upload preview"
                                className="w-full h-14 object-cover"
                              />
                              
                              {/* Upload icon overlay */}
                              <motion.div
                                className="absolute inset-0 bg-black/20 flex items-center justify-center"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.3,
                                  repeat: Infinity,
                                  repeatDelay: 2.6,
                                }}
                              >
                                <Upload className="w-6 h-6 text-white" strokeWidth={2} />
                              </motion.div>
                            </motion.div>
                            
                            {/* Progress Bar */}
                            <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: step.iconColor }}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                  duration: 1.5,
                                  delay: 0.3,
                                  repeat: Infinity,
                                  repeatDelay: 1.5,
                                  ease: "easeOut",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : index === 1 ? (
                        // Animated toys being generated for second step
                        <div className="relative w-full h-full flex items-center justify-center bg-[#D4B89C] rounded-full">
                          {/* Magical sparkles appearing */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`,
                              }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ 
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360]
                              }}
                              transition={{
                                duration: 1.5,
                                delay: i * 0.2,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                              }}
                            >
                              <Sparkles 
                                className="w-3 h-3 md:w-4 md:h-4"
                                style={{ color: step.iconColor }}
                                fill={step.iconColor}
                              />
                            </motion.div>
                          ))}
                          
                          {/* Toys image fading in and scaling */}
                          <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 1.2,
                              delay: 0.5,
                              repeat: Infinity,
                              repeatDelay: 2.3,
                              ease: "easeOut",
                            }}
                          >
                            <img
                              src={toysImage}
                              alt="Generated toys"
                              className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-lg"
                            />
                          </motion.div>
                        </div>
                      ) : index === 2 ? (
                        // Playset box for third step
                        <div className="relative w-full h-full flex items-center justify-center bg-[#C9A88A] rounded-full p-2">
                          <img
                            src={playsetBoxImage}
                            alt="KAHANI Storybook Playset"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        // Regular icon for other steps
                        <Icon
                          className="w-12 h-12 md:w-16 md:h-16"
                          style={{ color: step.iconColor }}
                          strokeWidth={1.5}
                        />
                      )}
                    </div>

                    {/* Subtle glow behind card */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} blur-2xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3 max-w-xs">
                    <h3
                      className="text-xl md:text-2xl text-[#2d2d2d]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-base md:text-lg text-[#5a4d4d] leading-relaxed"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
