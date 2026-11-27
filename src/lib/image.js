/**
 * Serve images through the Netlify Image CDN so visitors get resized WebP
 * instead of full-resolution uploads. Site-relative paths (e.g. uploaded
 * screenshots served at /uploads/...) are transformed; data/blob URLs
 * (local previews in the dashboard) pass through untouched.
 */
export function cdn(src, width = 1200) {
  if (!src) return src
  if (!src.startsWith('/') || src.startsWith('//')) return src
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp&q=78`
}
