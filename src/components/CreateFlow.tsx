import { useState } from "react";
import { ProductSelection } from "./ProductSelection";
import { UploadPersonalize } from "./UploadPersonalize";
import { ShippingCheckout } from "./ShippingCheckout";
import { OrderConfirmation } from "./OrderConfirmation";
import { getProductName, getProductPrice } from "../lib/prices";
import { trackProductSelection, trackCheckoutStep } from "../lib/analytics";

interface CreateFlowProps {
  onBack: () => void;
}

interface OrderData {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
}

export function CreateFlow({ onBack }: CreateFlowProps) {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedProductId, setSelectedProductId] = useState<"digital" | "printed" | "playset">("printed");
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const handleBackToIntro = () => {
    onBack(); // Go back to home page
  };

  const handleBackToProductSelection = () => {
    setCurrentStep(2);
  };

  const handleBackToUpload = () => {
    setCurrentStep(3);
  };

  const handleNextFromProductSelection = (productId?: "digital" | "printed" | "playset") => {
    if (productId) {
      setSelectedProductId(productId);
      // Track product selection
      const productName = getProductName(productId);
      const productPrice = getProductPrice(productId);
      trackProductSelection(productId, productName, parseFloat(productPrice.replace('$', '')));
    }
    setCurrentStep(3);
    trackCheckoutStep(3, "upload_personalize");
  };

  const handleNextFromUpload = () => {
    setCurrentStep(4);
    trackCheckoutStep(4, "shipping_checkout");
  };

  const handleNextFromShipping = (orderInfo?: { orderNumber: string; customerEmail: string; customerName: string }) => {
    if (orderInfo) {
      setOrderData(orderInfo);
      trackCheckoutStep(5, "order_confirmation");
    }
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
        orderNumber={orderData?.orderNumber || `#KHN${Date.now().toString().slice(-6)}`}
        productName={getProductName(selectedProductId)}
        customerEmail={orderData?.customerEmail || "your@email.com"}
      />
    );
  }

  // Show Shipping & Checkout screen (Step 4)
  if (currentStep === 4) {
    return (
      <ShippingCheckout 
        onBack={handleBackToUpload}
        onNext={handleNextFromShipping}
        selectedProduct={{
          id: selectedProductId,
          name: getProductName(selectedProductId),
          price: getProductPrice(selectedProductId),
        }}
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

  // Show Product Selection screen (Step 2) - this is now the first screen
  return (
    <ProductSelection 
      onBack={handleBackToIntro}
      onNext={handleNextFromProductSelection}
    />
  );
}
