import { useState } from "react";
import { ProductSelection } from "./ProductSelection";
import { UploadPersonalize } from "./UploadPersonalize";
import { ShippingCheckout } from "./ShippingCheckout";
import { OrderConfirmation } from "./OrderConfirmation";

interface CreateFlowProps {
  onBack: () => void;
}

interface OrderData {
  productType: string | null;
  productName: string | null;
  personalization: {
    childName?: string;
    childAge?: number;
    dedication?: string;
    photoUrls?: string[];
  } | null;
}

export function CreateFlow({ onBack }: CreateFlowProps) {
  const [currentStep, setCurrentStep] = useState(2);
  const [orderData, setOrderData] = useState<OrderData>({
    productType: null,
    productName: null,
    personalization: null,
  });
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");

  const handleBackToIntro = () => {
    onBack(); // Go back to home page
  };

  const handleBackToProductSelection = () => {
    setCurrentStep(2);
  };

  const handleBackToUpload = () => {
    setCurrentStep(3);
  };

  const handleNextFromProductSelection = (productType: string, productName: string) => {
    setOrderData(prev => ({
      ...prev,
      productType,
      productName,
    }));
    setCurrentStep(3);
  };

  const handleNextFromUpload = (personalization: {
    childName: string;
    childAge: number;
    dedication?: string;
    photoUrls: string[];
  }) => {
    setOrderData(prev => ({
      ...prev,
      personalization,
    }));
    setCurrentStep(4);
  };

  const handleNextFromShipping = (orderNum: string, email: string) => {
    setOrderNumber(orderNum);
    setCustomerEmail(email);
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
        orderNumber={orderNumber}
        productName={orderData.productName || "Printed Book"}
        customerEmail={customerEmail}
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
          id: orderData.productType || "printed",
          name: orderData.productName || "Printed Book",
          price: orderData.productType === "playset" ? "$35.99" : "$32.99",
        }}
        personalizationData={orderData.personalization}
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
