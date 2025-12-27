/**
 * Analytics utility for tracking page views and events
 * Optimized for Vercel Analytics (primary) + GA4 (optional)
 */

import { track as vercelTrack } from '@vercel/analytics';

// Google Analytics 4 Measurement ID (optional)
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || "";

// Initialize Google Analytics 4 (if configured)
export const initGA4 = () => {
  if (!GA4_MEASUREMENT_ID || typeof window === "undefined") {
    return;
  }

  // Check if already initialized
  if (window.gtag) {
    return;
  }

  // Load gtag script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Track page view (Vercel tracks automatically, but we can enhance with custom data)
export const trackPageView = (page: string) => {
  const pagePath = `/${page === "home" ? "" : page}`;
  
  // Track for Vercel (automatic, but we can add custom context)
  vercelTrack('page_view', {
    page: pagePath,
    page_name: page,
  });

  // Track for GA4 (if configured)
  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag("config", GA4_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: `Kahani - ${page.charAt(0).toUpperCase() + page.slice(1)}`,
    });
  }
};

// Track button clicks (PRIMARY for marketing)
export const trackButtonClick = (buttonName: string, location?: string, metadata?: Record<string, any>) => {
  vercelTrack('button_click', {
    button_name: buttonName,
    location: location || window.location.pathname,
    ...metadata,
  });

  // Also track for GA4 if configured
  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag("event", "button_click", {
      button_name: buttonName,
      location: location || window.location.pathname,
      ...metadata,
    });
  }
};

// Track product selection (KEY for marketing)
export const trackProductSelection = (productId: string, productName: string, price: number) => {
  vercelTrack('product_selected', {
    product_id: productId,
    product_name: productName,
    price: price,
    currency: 'USD',
  });

  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag("event", "select_item", {
      items: [{
        item_id: productId,
        item_name: productName,
        price: price,
        quantity: 1,
      }],
    });
  }
};

// Track checkout step (funnel analysis)
export const trackCheckoutStep = (step: number, stepName: string) => {
  vercelTrack('checkout_step', {
    step_number: step,
    step_name: stepName,
  });

  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag("event", "checkout_progress", {
      checkout_step: step,
      checkout_step_name: stepName,
    });
  }
};

// Track form submissions
export const trackFormSubmit = (formName: string, metadata?: Record<string, any>) => {
  vercelTrack('form_submit', {
    form_name: formName,
    ...metadata,
  });

  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag("event", "form_submit", {
      form_name: formName,
      ...metadata,
    });
  }
};

// Track purchases (CONVERSION - most important for marketing)
export const trackPurchase = (transactionData: {
  transaction_id: string;
  value: number;
  currency?: string;
  product_id?: string;
  product_name?: string;
  items?: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>;
}) => {
  vercelTrack('purchase', {
    transaction_id: transactionData.transaction_id,
    value: transactionData.value,
    currency: transactionData.currency || "USD",
    product_id: transactionData.product_id,
    product_name: transactionData.product_name,
  });

  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag("event", "purchase", {
      transaction_id: transactionData.transaction_id,
      value: transactionData.value,
      currency: transactionData.currency || "USD",
      items: transactionData.items || [],
    });
  }
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  vercelTrack('social_click', {
    platform: platform,
  });

  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag("event", "social_click", {
      platform: platform,
    });
  }
};

// Track section views (scroll tracking)
export const trackSectionView = (sectionName: string) => {
  vercelTrack('section_view', {
    section_name: sectionName,
  });
};

// Generic event tracker
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  vercelTrack(eventName, eventParams || {});

  if (window.gtag && GA4_MEASUREMENT_ID) {
    window.gtag("event", eventName, eventParams || {});
  }
};

// TypeScript declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
