import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
  accentColor: string;
  ringColor: string;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "The storybook captures my daughter's personality so beautifully. It's like watching her come alive in a magical world.",
      name: "Laura Bennett",
      role: "Mom to Emma",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMG1vdGhlciUyMHBvcnRyYWl0fGVufDF8fHx8MTczOTQxMTA5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      accentColor: "from-[#D8B5FF]/20 to-[#D8B5FF]/5",
      ringColor: "ring-[#D8B5FF]/40",
    },
    {
      quote: "We ordered this for our son's 5th birthday and he hasn't stopped talking about it. The figurine is so detailed and the story made him cry happy tears!",
      name: "Jennifer Collins",
      role: "Mom to Liam",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwZmF0aGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzM5NDExMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      accentColor: "from-[#FFB5D8]/20 to-[#FFB5D8]/5",
      ringColor: "ring-[#FFB5D8]/40",
    },
    {
      quote: "This is more than a gift — it's a memory we'll treasure forever. The quality is incredible and the craftsmanship is evident.",
      name: "Rebecca Turner",
      role: "Mom to Noah",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlcmZ1bCUyMHBhcmVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTczOTQxMTA5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      accentColor: "from-[#B5D8FF]/20 to-[#B5D8FF]/5",
      ringColor: "ring-[#B5D8FF]/40",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 px-6 md:px-12 overflow-hidden">
      {/* Background - Soft cream to pastel gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF7F2] via-[#F5EDE8] to-[#EDE1D4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.04)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#2d2d2d] mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          >
            Why Parents Love Kahani
          </h2>
          <p
            className="text-lg md:text-xl lg:text-2xl text-[#5a4d4d]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
          >
            Real families. Real magic.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-center">
          {testimonials.map((testimonial, index) => {
            const isCenterCard = index === 1;
            
            return (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  isCenterCard 
                    ? "lg:scale-110 lg:z-20" 
                    : "lg:opacity-60 lg:scale-95 hover:lg:opacity-80 hover:lg:scale-100"
                }`}
              >
                {/* Glow Effect - Only on center card */}
                {isCenterCard && (
                  <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-[#FFD6E8]/30 via-[#D4C5FF]/30 to-[#B5E7FF]/30 blur-3xl -z-10 rounded-[32px]"></div>
                )}

                {/* Card */}
                <div
                  className={`relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-[24px] p-8 md:p-10 ${
                    isCenterCard
                      ? "shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-2 border-white/60"
                      : "shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white/50"
                  }`}
                >
                  {/* Decorative Quotation Mark */}
                  <div className="mb-6">
                    <svg
                      width="48"
                      height="40"
                      viewBox="0 0 48 40"
                      fill="none"
                      className="opacity-20"
                    >
                      <path
                        d="M0 20C0 8.954 8.954 0 20 0v8c-6.627 0-12 5.373-12 12v4h12v16H0V20zm28 0C28 8.954 36.954 0 48 0v8c-6.627 0-12 5.373-12 12v4h12v16H28V20z"
                        fill="#2d2d2d"
                      />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <p
                    className="text-base md:text-lg text-[#3d2e2e] mb-8 leading-relaxed"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {testimonial.quote}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar with pastel ring */}
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${testimonial.accentColor} blur-md -z-10`}
                      ></div>
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full ring-4 ${testimonial.ringColor} overflow-hidden bg-white`}
                      >
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Name and Role */}
                    <div>
                      <h4
                        className="text-lg md:text-xl text-[#2d2d2d] mb-1"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        className="text-sm md:text-base text-[#5a4d4d]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
