# Product Gallery Images

Store product detail gallery images here so they are served as static files by Vercel.

## Folder structure

Use one folder per product id from `/product/:id` route:

- `/public/products/1/1.webp`
- `/public/products/1/2.webp`
- `/public/products/1/3.webp`
- `/public/products/1/4.webp`
- `/public/products/1/5.webp`

Repeat for each product id (`2`, `3`, etc.).

## Performance rules

- Prefer `webp` (or `avif` if your export tool supports it).
- Target each detail image around `100-250 KB`.
- Keep dimensions around `1200px` wide max for product detail.
- Keep landing page cards on separate small thumbnails; do not reuse full-size detail images there.
