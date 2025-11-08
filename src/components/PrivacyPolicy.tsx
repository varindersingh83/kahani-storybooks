interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
        <div className="w-full max-w-3xl bg-[#FFF8F5]/80 backdrop-blur-sm rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-8 md:p-12 mb-12">
          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl text-center mb-2 text-[#2d2d2d]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            Privacy Policy
          </h2>

          {/* Last Updated */}
          <p
            className="text-center text-[#7a6d6d] mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
            }}
          >
            Last updated: October 1, 2025
          </p>

          {/* Content Sections */}
          <div className="space-y-6 text-[#3d2e2e]">
            {/* Who We Are */}
            <section>
              <h3
                className="mb-3 text-[#2d2d2d]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Who We Are
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                We are Kahani Storybooks ("Kahani", "we", "us"). We create
                personalized children's storybook experiences. This policy
                explains how we handle your information across our website and
                services.
              </p>
            </section>

            {/* What We Collect */}
            <section>
              <h3
                className="mb-3 text-[#2d2d2d]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                What We Collect
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                We may collect information you provide directly (such as your
                email address when you join our waitlist or contact us) and
                limited technical information (such as IP address and basic
                device data) to keep our website secure and functional.
              </p>
            </section>

            {/* How We Use It */}
            <section>
              <h3
                className="mb-3 text-[#2d2d2d]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                How We Use It
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                We use your information to operate and improve our website and
                services, respond to inquiries, provide updates about product
                availability, and comply with legal obligations.
              </p>
            </section>

            {/* Retention */}
            <section>
              <h3
                className="mb-3 text-[#2d2d2d]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Retention
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                We keep information only as long as necessary for the purposes
                described above, and delete or anonymize it when it is no longer
                needed, unless we are required by law to retain it.
              </p>
            </section>

            {/* Sharing */}
            <section>
              <h3
                className="mb-3 text-[#2d2d2d]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Sharing
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                We do not sell your personal information. We may share limited
                data with service providers who help us operate our website (for
                example, form processing), subject to appropriate safeguards.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h3
                className="mb-3 text-[#2d2d2d]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Children's Privacy
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                Our website is intended for parents and guardians. We do not
                knowingly collect personal information from children under 13. If
                you believe a child has provided us personal information, please
                contact us so we can delete it.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h3
                className="mb-3 text-[#2d2d2d]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Contact
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                Questions or requests? Email us at{" "}
                <a
                  href="mailto:team@vsnagra.com"
                  className="text-[#A0522D] hover:underline"
                >
                  team@vsnagra.com
                </a>
                .
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-10 text-center">
            <button
              onClick={onBack}
              className="px-8 py-3.5 rounded-full bg-white/60 border border-[#E5D5C5] hover:bg-white/80 hover:border-[#8B4513]/40 transition-all text-[#3d2e2e]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <footer className="text-center">
          <p
            className="text-sm text-[#7a6d6d]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
            }}
          >
            <span className="text-[#A0522D]">Privacy Policy</span>
            {" · "}
            <button
              onClick={() => {
                // This will be handled by parent component routing
                window.dispatchEvent(new CustomEvent("navigate", { detail: "contact" }));
              }}
              className="hover:text-[#A0522D] transition-colors"
            >
              Contact
            </button>
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
