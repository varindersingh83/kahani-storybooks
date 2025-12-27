import React, { useState } from "react";
import { Mail, BookOpen, Box, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { PRODUCT_PRICES, getProductPrice, getProductName } from "../lib/prices";

interface ProductSelectionProps {
  onBack: () => void;
  onNext: (selectedProductId?: "digital" | "printed" | "playset") => void;
}

type ProductType = "digital" | "printed" | "playset";

interface Product {
  id: ProductType;
  name: string;
  price: string;
  icon: typeof Mail;
  description: string;
  buttonStyle: "outline" | "filled";
}

export function ProductSelection({ onBack, onNext }: ProductSelectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  const products: Product[] = [
    {
      id: "printed",
      name: getProductName("printed"),
      price: getProductPrice("printed"),
      icon: BookOpen,
      description: "Hardcover edition with your child's name on the cover.",
      buttonStyle: "filled",
    },
    {
      id: "playset",
      name: getProductName("playset"),
      price: getProductPrice("playset"),
      icon: Box,
      description: "Includes book, collectible figurines, and a cardboard stage.",
      buttonStyle: "filled",
    },
  ];

  const handleSelectProduct = (productId: ProductType) => {
    setSelectedProduct(productId);
  };

  const handleNext = () => {
    if (selectedProduct) {
      onNext(selectedProduct);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Soft Pastel Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f3] via-[#f9e6df] to-[#fde4d9]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(91,75,68,0.03)_100%)]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Logo */}
        <header className="pt-8 md:pt-10 text-center">
          <div
            className="text-2xl md:text-3xl tracking-wide text-[#5b4b44]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
          >
            KAHANI
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-8 md:py-12">
          <div className="w-full max-w-6xl">
            {/* Heading */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-center mb-4 text-[#5b4b44]"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              }}
            >
              Choose Your Edition
            </h2>

            {/* Subheading */}
            <p
              className="text-base md:text-lg text-center text-[#8b7b74] mb-10 md:mb-12"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
              }}
            >
              Pick the version that fits your family best.
            </p>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {products.map((product) => {
                const Icon = product.icon;
                const isSelected = selectedProduct === product.id;

                return (
                  <div
                    key={product.id}
                    className={`
                      relative bg-white/90 backdrop-blur-xl rounded-[32px] p-8 transition-all duration-300 cursor-pointer flex flex-col
                      ${
                        isSelected
                          ? "shadow-[0_20px_80px_rgba(249,197,213,0.4)] border-2 border-[#fdded0] scale-[1.02]"
                          : "shadow-[0_10px_40px_rgba(91,75,68,0.08)] border-2 border-white/80 hover:shadow-[0_15px_60px_rgba(91,75,68,0.12)] hover:scale-[1.01]"
                      }
                    `}
                    onClick={() => handleSelectProduct(product.id)}
                  >
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#f9c5d5] to-[#f9b5c8] flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                      </div>
                    )}

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#f9e6df] to-[#fde4d9] flex items-center justify-center border-2 border-white/60 shadow-lg">
                        <Icon
                          className="w-8 h-8 md:w-10 md:h-10 text-[#c9a89c]"
                          strokeWidth={2}
                        />
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3
                      className="text-xl md:text-2xl text-center mb-2 text-[#5b4b44]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div
                      className="text-3xl md:text-4xl text-center mb-4 text-[#5b4b44]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {product.price}
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm md:text-base text-center text-[#8b7b74] mb-6 leading-relaxed flex-grow"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {product.description}
                    </p>

                    {/* Select Button */}
                    {product.buttonStyle === "outline" ? (
                      <button
                        className={`
                          group relative w-full px-6 py-3 rounded-full overflow-hidden transition-all duration-300
                          ${
                            isSelected
                              ? "shadow-[0_8px_32px_rgba(179,229,208,0.6)]"
                              : "shadow-[0_4px_16px_rgba(179,229,208,0.3)] hover:shadow-[0_8px_32px_rgba(179,229,208,0.5)]"
                          }
                        `}
                      >
                        {/* Mint Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                        
                        {/* Soft glow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>

                        <span
                          className="relative text-[#1a3d32]"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </span>
                      </button>
                    ) : (
                      <button
                        className={`
                          group relative w-full px-6 py-3 rounded-full overflow-hidden transition-all duration-300
                          ${
                            isSelected
                              ? "shadow-[0_8px_32px_rgba(179,229,208,0.6)]"
                              : "shadow-[0_4px_16px_rgba(179,229,208,0.3)] hover:shadow-[0_8px_32px_rgba(179,229,208,0.5)]"
                          }
                        `}
                      >
                        {/* Mint Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                        
                        {/* Soft glow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>

                        <span
                          className="relative text-[#1a3d32]"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Optional Footer Text */}
            <div className="text-center mb-8">
              <p
                className="text-sm md:text-base text-[#8b7b74]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                }}
              >
                Free personalization included. Ships in 1–2 weeks.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={onBack}
                className="group px-8 py-4 rounded-full border-2 border-[#e5d4e8] bg-white/50 hover:bg-white hover:border-[#d9c5e0] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft
                    className="w-5 h-5 text-[#8b7b74] transition-transform duration-300 group-hover:-translate-x-1"
                    strokeWidth={2.5}
                  />
                  <span
                    className="text-base md:text-lg text-[#5b4b44]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Back
                  </span>
                </div>
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={!selectedProduct}
                className={`
                  group relative px-10 py-4 rounded-full overflow-hidden transition-all duration-300 shadow-lg
                  ${
                    selectedProduct
                      ? "hover:scale-105 active:scale-95 hover:shadow-[0_12px_48px_rgba(249,197,213,0.6)] cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }
                `}
              >
                {/* Mint Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B3E5D0] to-[#7DFFAF]"></div>
                
                {/* Soft glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>

                <div className="relative flex items-center gap-3">
                  <span
                    className="text-base md:text-lg text-[#1a3d32]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Next
                  </span>
                  <ArrowRight
                    className={`w-5 h-5 text-[#1a3d32] ${
                      selectedProduct ? "transition-transform duration-300 group-hover:translate-x-1" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
