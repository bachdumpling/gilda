# SEO and Favicon Management Guide

## Overview

This guide explains how to manage SEO and favicon settings for your Gilda Shopify theme.

## 1. Theme Settings (Global Configuration)

Navigate to **Online Store > Themes > Customize > Theme settings > Favicon & SEO**

### Favicon

- **Upload**: Upload a square PNG file (recommended: 32x32px or 180x180px)
- **Format**: PNG format with transparent background works best
- **Auto-generated**: Shopify will create multiple sizes for different devices

### Social Sharing Image

- **Size**: 1200x630px (Facebook/Twitter recommended)
- **Format**: JPG or PNG
- **Purpose**: Default image shown when pages are shared on social media
- **Fallback**: Used when individual pages don't have their own featured image

### SEO Defaults

- **Site Name**: Override your shop name for SEO (optional)
- **Default Description**: Fallback meta description (max 155 characters)

---

## 2. Page-Level SEO

### For Products

In **Admin > Products > [Product Name]**:

- **Title**: Keep it under 60 characters
- **Description**: First 155 characters appear in search results
- **Images**: First image used for social sharing
- **URL Handle**: Keep it clean and descriptive

### For Collections

In **Admin > Products > Collections > [Collection Name]**:

- **Title**: Descriptive and keyword-rich
- **Description**: First 155 characters for meta description
- **Image**: Used for social sharing

### For Pages

In **Admin > Online Store > Pages > [Page Name]**:

- **Title**: Appears in browser tab and search results
- **Content**: First paragraph often used for meta description
- **SEO Preview**: Check the preview section at the bottom

### For Blog Posts

In **Admin > Online Store > Blog posts > [Article Name]**:

- **Title**: Engaging and under 60 characters
- **Excerpt**: Used as meta description
- **Featured Image**: Used for social sharing

---

## 3. Technical SEO Features

### Automatically Generated

The theme automatically generates:

- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD) for products
- ✅ Canonical URLs
- ✅ Proper title tags with site name
- ✅ Responsive meta viewport
- ✅ Language attribute

### Meta Tags Structure

Located in: `snippets/meta-tags.liquid`

```liquid
<!-- Core Meta Tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="...">

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:site_name" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:image" content="...">

<!-- Product-Specific -->
<script type="application/ld+json">
  { /* Product structured data */ }
</script>
```

---

## 4. Best Practices

### Title Tag Guidelines

- **Homepage**: "Site Name - Brief Description"
- **Product**: "Product Name - Site Name"
- **Collection**: "Collection Name - Site Name"
- **Blog Post**: "Article Title - Site Name"
- **Length**: 50-60 characters (avoid truncation)

### Meta Description Guidelines

- **Length**: 150-160 characters
- **Content**: Compelling summary with main keywords
- **Unique**: Every page should have a unique description
- **Action**: Include a call-to-action when appropriate

### Image Guidelines

- **Social Sharing**: 1200x630px (1.91:1 ratio)
- **Favicon**: 180x180px square PNG
- **Alt Text**: Always provide descriptive alt text
- **File Size**: Optimize images (under 200KB for social)

### URL Structure

- **Clean**: Use hyphens, not underscores
- **Descriptive**: Include relevant keywords
- **Short**: Avoid overly long URLs
- **Consistent**: Follow a logical hierarchy

---

## 5. Testing Your SEO

### Tools to Test

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **Google Rich Results Test**: https://search.google.com/test/rich-results
4. **Schema Markup Validator**: https://validator.schema.org/

### What to Test

- [ ] Favicon appears correctly on all devices
- [ ] Title tags are under 60 characters
- [ ] Meta descriptions are 150-160 characters
- [ ] Social sharing images display correctly (1200x630px)
- [ ] All pages have unique titles and descriptions
- [ ] Product structured data validates correctly
- [ ] Twitter Cards render properly
- [ ] Open Graph tags work on Facebook

---

## 6. Common SEO Tasks

### Adding a New Product

1. Write a unique, descriptive title
2. Add detailed description (first 155 chars are crucial)
3. Upload high-quality images (first image for social)
4. Set proper product type and tags
5. Review URL handle for clarity

### Adding a New Blog Post

1. Write an SEO-friendly title
2. Add engaging excerpt (meta description)
3. Upload featured image (1200x630px)
4. Add relevant tags
5. Preview social sharing appearance

### Updating Global SEO Settings

1. Navigate to Theme Settings > Favicon & SEO
2. Upload new favicon (32x32px or 180x180px PNG)
3. Set default social sharing image (1200x630px)
4. Update default meta description
5. Save changes and test

---

## 7. Advanced: Customizing Meta Tags

To customize meta tags further, edit:

- `snippets/meta-tags.liquid` - Main meta tag logic
- `layout/theme.liquid` - Where meta tags are rendered
- `config/settings_schema.json` - Add new SEO settings

### Example: Adding Instagram Meta Tag

```liquid
{%- if settings.instagram_handle != blank -%}
  <meta
    property="instagram:username"
    content="{{ settings.instagram_handle }}"
  >
{%- endif -%}
```

---

## 8. Shopify-Specific SEO

### Automatic Features

Shopify automatically handles:

- Sitemap generation (`/sitemap.xml`)
- Robots.txt file (`/robots.txt`)
- Canonical URLs
- SSL certificates (HTTPS)
- Mobile-friendly pages

### Shopify Admin SEO

You can edit SEO settings in:

- **Products**: Search engine listing preview
- **Collections**: Search engine listing preview
- **Pages**: Search engine listing preview
- **Blog Posts**: Search engine listing preview

---

## 9. Monitoring Performance

### Key Metrics

- **Google Search Console**: Track search visibility
- **Page Speed Insights**: Monitor load times
- **Google Analytics**: Track traffic sources
- **Social Analytics**: Monitor social sharing

### Regular Tasks

- [ ] Monthly: Review Google Search Console
- [ ] Quarterly: Update product descriptions
- [ ] Quarterly: Refresh blog content
- [ ] Annually: Audit all meta descriptions

---

## 10. Troubleshooting

### Favicon Not Showing

1. Clear browser cache
2. Check file format (should be PNG)
3. Re-upload favicon in Theme Settings
4. Test in incognito mode

### Social Sharing Image Not Working

1. Image should be 1200x630px
2. File size under 1MB
3. Use JPG or PNG format
4. Test with Facebook Debugger
5. Clear Facebook's cache

### Meta Description Not Appearing

1. Check if page has custom description
2. Verify default description in Theme Settings
3. Keep under 160 characters
4. Use plain text (no HTML)

---

## Support

For more help:

- Shopify Help Center: https://help.shopify.com/
- Theme Documentation: See README.md
- SEO Apps: Consider Shopify App Store for advanced SEO tools
