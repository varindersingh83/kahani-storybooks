export interface ProductGalleryImage {
  sources: string[];
}

const fallbackImages = [
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
  'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
];

// Configure gallery size per product id.
const productImageCount: Record<number, number> = {
  403: 8,
};

// Optional per-product overrides if file names differ from 1.webp..N.webp
const overrideImagePaths: Record<number, string[]> = {};

export function getProductGallery(productId: number): ProductGalleryImage[] {
  const override = overrideImagePaths[productId];
  const imageCount = productImageCount[productId] ?? 5;
  const lastFallback = fallbackImages[fallbackImages.length - 1];

  return Array.from({ length: imageCount }).map((_, index) => {
    const fallback = fallbackImages[index] ?? lastFallback;
    const overridePath = override?.[index];
    const defaultBase = `/products/${productId}/${index + 1}`;
    const sources = overridePath
      ? [overridePath, fallback]
      : [
          `${defaultBase}.webp`,
          `${defaultBase}.jpg`,
          `${defaultBase}.jpeg`,
          `${defaultBase}.png`,
          fallback,
        ];

    return { sources };
  });
}
