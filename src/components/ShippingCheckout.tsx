import { useState } from "react";
import { ArrowLeft, CreditCard, Lock, Mail, BookOpen, Box } from "lucide-react";
import { getProductPrice, getProductName, PRODUCT_PRICES } from "../lib/prices";
import { sendSlackNotification } from "../lib/notifications";

interface ShippingCheckoutProps {
  onBack: () => void;
  onNext: (orderInfo?: { orderNumber: string; customerEmail: string; customerName: string }) => void;
  selectedProduct?: {
    id: "digital" | "printed" | "playset";
    name: string;
    price: string;
  };
}

export function ShippingCheckout({ onBack, onNext, selectedProduct }: ShippingCheckoutProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  // Use provided product or default to Printed Book
  const productId = selectedProduct?.id || "printed";
  const product = selectedProduct || {
    id: productId,
    name: getProductName(productId),
    price: getProductPrice(productId),
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProceedToPayment = async () => {
    console.log("💳 Proceeding to payment...", formData);
    
    // Generate order number
    const orderNumber = `#KHN${Date.now().toString().slice(-6)}`;
    console.log("📝 Generated order number:", orderNumber);
    
    // Prepare shipping address
    const shippingAddress = [
      formData.addressLine1,
      formData.addressLine2,
      `${formData.city}, ${formData.state} ${formData.zipCode}`,
      formData.country
    ].filter(Boolean).join(', ');
    
    // Send Slack notification (non-blocking)
    console.log("🚀 Attempting to send Slack notification...");
    sendSlackNotification({
      orderNumber,
      customerName: formData.fullName,
      customerEmail: formData.email,
      productName: product.name,
      productPrice: product.price,
      shippingAddress
    }).catch(error => {
      // Error already logged in the function, just continue
      console.error('⚠️ Notification error (non-blocking):', error);
    });
    
    // Pass order data to next step
    onNext({
      orderNumber,
      customerEmail: formData.email,
      customerName: formData.fullName
    });
  };

  const canProceed =
    formData.fullName &&
    formData.email &&
    formData.addressLine1 &&
    formData.city &&
    formData.state &&
    formData.zipCode &&
    formData.country;

  // Get product icon
  const getProductIcon = () => {
    if (product.id === "digital") return Mail;
    if (product.id === "playset") return Box;
    return BookOpen;
  };

  const ProductIcon = getProductIcon();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Soft Pastel Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f3] via-[#f9e6df] to-[#fde4d9]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(91,75,68,0.03)_100%)]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Logo and Progress */}
        <header className="pt-8 md:pt-10 text-center">
          <div
            className="text-2xl md:text-3xl tracking-wide text-[#5b4b44] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
          >
            KAHANI
          </div>
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2">
            <div className="text-sm text-[#8b7b74]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Step 4 of 5
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-start justify-center px-6 md:px-12 py-8 md:py-12">
          <div className="w-full max-w-7xl">
            {/* Heading */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-center mb-4 text-[#5b4b44]"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              Shipping & Checkout
            </h2>

            {/* Subheading */}
            <p
              className="text-base md:text-lg text-center text-[#8b7b74] mb-10 md:mb-12"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
              }}
            >
              Almost done! Tell us where to send your Kahani.
            </p>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-8">
              {/* Left Column - Form Card */}
              <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-8 md:p-10 shadow-[0_20px_80px_rgba(91,75,68,0.12)] border border-white/80">
                <h3
                  className="text-xl md:text-2xl mb-6 text-[#5b4b44]"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Shipping Information
                </h3>

                {/* Form Fields */}
                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm md:text-base text-[#5b4b44] mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      className="w-full px-5 py-3 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm md:text-base text-[#5b4b44] mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-5 py-3 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    />
                  </div>

                  {/* Address Line 1 */}
                  <div>
                    <label
                      htmlFor="addressLine1"
                      className="block text-sm md:text-base text-[#5b4b44] mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      className="w-full px-5 py-3 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div>
                    <label
                      htmlFor="addressLine2"
                      className="block text-sm md:text-base text-[#5b4b44] mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Address Line 2 <span className="text-[#c9b5af]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      placeholder="Apt, suite, etc."
                      className="w-full px-5 py-3 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    />
                  </div>

                  {/* City, State, ZIP - Grid Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* City */}
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="city"
                        className="block text-sm md:text-base text-[#5b4b44] mb-2"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-5 py-3 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      />
                    </div>

                    {/* State */}
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="state"
                        className="block text-sm md:text-base text-[#5b4b44] mb-2"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className="w-full px-5 py-3 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      />
                    </div>

                    {/* ZIP */}
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="zipCode"
                        className="block text-sm md:text-base text-[#5b4b44] mb-2"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="ZIP"
                        className="w-full px-5 py-3 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] placeholder:text-[#c9b5af] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm md:text-base text-[#5b4b44] mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8] text-[#5b4b44] focus:border-[#f9c5d5] focus:bg-white transition-all duration-200 outline-none"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="mt-8 pt-8 border-t-2 border-[#e5d4e8]">
                  <h3
                    className="text-xl md:text-2xl mb-4 text-[#5b4b44]"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Payment
                  </h3>

                  {/* Payment Placeholder */}
                  <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-[#fdf6f3]/50 border-2 border-[#e5d4e8]">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f9e6df] to-[#fde4d9] flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-[#c9a89c]" strokeWidth={2} />
                    </div>
                    <div>
                      <p
                        className="text-sm md:text-base text-[#5b4b44]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        Secure Checkout
                      </p>
                      <p
                        className="text-xs md:text-sm text-[#8b7b74]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        Stripe or PayPal integration
                      </p>
                    </div>
                  </div>

                  {/* Proceed to Payment Button */}
                  <button
                    onClick={handleProceedToPayment}
                    disabled={!canProceed}
                    className={`
                      group relative w-full px-10 py-4 rounded-[24px] overflow-hidden transition-all duration-300 shadow-lg mb-4
                      ${
                        canProceed
                          ? "hover:scale-[1.02] active:scale-95 hover:shadow-[0_12px_48px_rgba(249,197,213,0.6)] cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      }
                    `}
                  >
                    {/* Mint Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                    
                    {/* Soft glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>

                    <span
                      className="relative text-lg md:text-xl text-[#1a3d32]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Proceed to Payment
                    </span>
                  </button>

                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-2 text-[#8b7b74]">
                    <Lock className="w-4 h-4" strokeWidth={2} />
                    <p
                      className="text-xs md:text-sm"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Secure and encrypted checkout
                    </p>
                  </div>
                </div>

                {/* Back Button */}
                <div className="mt-6">
                  <button
                    onClick={onBack}
                    className="group px-6 py-3 rounded-full border-2 border-[#e5d4e8] bg-white/50 hover:bg-white hover:border-[#d9c5e0] transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowLeft
                        className="w-5 h-5 text-[#8b7b74] transition-transform duration-300 group-hover:-translate-x-1"
                        strokeWidth={2.5}
                      />
                      <span
                        className="text-base text-[#5b4b44]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        Back
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Column - Order Summary Card */}
              <div className="bg-[#f9e6df]/90 backdrop-blur-xl rounded-[32px] p-8 md:p-10 shadow-[0_20px_80px_rgba(91,75,68,0.12)] border border-[#fde4d9] h-fit lg:sticky lg:top-8">
                <h3
                  className="text-xl md:text-2xl mb-6 text-[#5b4b44]"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Your Selection
                </h3>

                {/* Product Item */}
                <div className="flex items-start gap-4 mb-6 p-4 rounded-2xl bg-white/50">
                  {/* Product Icon/Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#f9e6df] to-[#fde4d9] flex items-center justify-center border-2 border-white/60 shadow-md flex-shrink-0">
                    <ProductIcon className="w-8 h-8 text-[#c9a89c]" strokeWidth={2} />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h4
                      className="text-base md:text-lg text-[#5b4b44] mb-1"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {product.name}
                    </h4>
                    <p
                      className="text-xl md:text-2xl text-[#5b4b44]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {product.price}
                    </p>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3 mb-6 p-4 rounded-2xl bg-white/30">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#d9f2e5] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#5DE0A1]"></div>
                    </div>
                    <p
                      className="text-sm md:text-base text-[#5b4b44]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Includes free personalization
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#d9f2e5] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#5DE0A1]"></div>
                    </div>
                    <p
                      className="text-sm md:text-base text-[#5b4b44]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      Delivery in 1–2 weeks
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-6 border-t-2 border-[#fde4d9] mb-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg md:text-xl text-[#5b4b44]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Total
                    </span>
                    <span
                      className="text-2xl md:text-3xl text-[#5b4b44]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {product.price}
                    </span>
                  </div>
                </div>

                {/* Edit Selection Link */}
                <button
                  onClick={onBack}
                  className="text-sm md:text-base text-[#8b7b74] hover:text-[#5b4b44] transition-colors duration-200 underline"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Edit Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
