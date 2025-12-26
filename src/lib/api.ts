import { supabase } from './supabase';
import type { Order, ContactSubmission, GiveawayEntry } from './supabase';

// Generate unique order number
function generateOrderNumber(): string {
  const prefix = 'KHN';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Get current week identifier (YYYY-W##)
function getCurrentWeek(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
}

// Convert blob URL to File object
async function blobUrlToFile(blobUrl: string, filename: string): Promise<File> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

// Upload photos to Supabase Storage
export async function uploadPhotos(photos: Array<{ url: string; name: string }>): Promise<string[]> {
  const uploadedUrls: string[] = [];

  for (const photo of photos) {
    try {
      // Convert blob URL to File
      const file = await blobUrlToFile(photo.url, photo.name);
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `photos/${fileName}`;

      const { data, error } = await supabase.storage
        .from('photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading photo:', error);
        throw new Error(`Failed to upload photo: ${error.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrl);
    } catch (error) {
      console.error('Error processing photo:', error);
      throw error;
    }
  }

  return uploadedUrls;
}

// Save order
export async function saveOrder(orderData: {
  productType: string;
  childName?: string;
  childAge?: number;
  dedication?: string;
  photoUrls?: string[];
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    fullName: string;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}): Promise<Order> {
  const orderNumber = generateOrderNumber();

  const { data, error } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      product_type: orderData.productType,
      child_name: orderData.childName,
      child_age: orderData.childAge,
      dedication: orderData.dedication,
      photo_urls: orderData.photoUrls || [],
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      shipping_address: orderData.shippingAddress,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving order:', error);
    throw new Error(`Failed to save order: ${error.message}`);
  }

  return data;
}

// Save contact submission
export async function saveContactSubmission(
  name: string,
  email: string,
  message: string
): Promise<ContactSubmission> {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      name,
      email,
      message
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving contact submission:', error);
    throw new Error(`Failed to save contact submission: ${error.message}`);
  }

  return data;
}

// Save giveaway entry
export async function saveGiveawayEntry(
  name: string,
  email: string
): Promise<GiveawayEntry> {
  const week = getCurrentWeek();

  const { data, error } = await supabase
    .from('giveaway_entries')
    .insert({
      name,
      email,
      week
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving giveaway entry:', error);
    throw new Error(`Failed to save giveaway entry: ${error.message}`);
  }

  return data;
}

