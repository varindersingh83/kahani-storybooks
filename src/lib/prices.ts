/**
 * Centralized price configuration for all products
 * Update prices here and they will be reflected across the entire application
 * 
 * NOTE: After updating prices here, also update src/public/schema.json to keep
 * SEO structured data in sync. Update the "price" field in the Product offers
 * and the FAQ answer text that mentions prices.
 */

export interface ProductPrice {
  id: "digital" | "printed" | "playset";
  name: string;
  displayPrice: string; // Formatted price with $ symbol (e.g., "$32.99")
  numericPrice: number; // Numeric price for calculations (e.g., 32.99)
}

export const PRODUCT_PRICES: Record<ProductPrice["id"], ProductPrice> = {
  digital: {
    id: "digital",
    name: "Digital Storybook PDF",
    displayPrice: "$9.99",
    numericPrice: 9.99,
  },
  printed: {
    id: "printed",
    name: "Printed Book",
    displayPrice: "$49",
    numericPrice: 49,
  },
  playset: {
    id: "playset",
    name: "Full Playset",
    displayPrice: "$89",
    numericPrice: 89,
  },
};

/**
 * Get formatted price string for a product
 */
export function getProductPrice(productId: ProductPrice["id"]): string {
  return PRODUCT_PRICES[productId]?.displayPrice || "$0.00";
}

/**
 * Get numeric price for a product
 */
export function getProductNumericPrice(productId: ProductPrice["id"]): number {
  return PRODUCT_PRICES[productId]?.numericPrice || 0;
}

/**
 * Get product name
 */
export function getProductName(productId: ProductPrice["id"]): string {
  return PRODUCT_PRICES[productId]?.name || "Unknown Product";
}

