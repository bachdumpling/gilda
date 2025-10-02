# Product Tabs Setup Guide

This guide explains how to set up the custom metafields in Shopify for the product tabs (Info, Materials, Care).

## What are Metafields?

Metafields allow you to add custom fields to your products beyond the standard fields like title, description, and price. We're using them to store the content for the Materials and Care tabs.

## Steps to Set Up Metafields in Shopify Admin

### 1. Navigate to Metafield Settings

1. Go to your Shopify Admin
2. Click on **Settings** (bottom left)
3. Click on **Custom data**
4. Click on **Products**

### 2. Add "Materials" Metafield

1. Click **Add definition**
2. Fill in the following details:

   - **Name**: `Materials`
   - **Namespace and key**:
     - Namespace: `custom`
     - Key: `materials` (this will auto-generate)
   - **Description** (optional): "Product materials and fabric composition"
   - **Type**: Select **Multi-line text** or **Rich text** (Rich text allows formatting)
   - **Validations** (optional): Leave as default
   - **Access**: Check **Storefront access** (important!)

3. Click **Save**

### 3. Add "Care" Metafield

1. Click **Add definition** again
2. Fill in the following details:

   - **Name**: `Care`
   - **Namespace and key**:
     - Namespace: `custom`
     - Key: `care` (this will auto-generate)
   - **Description** (optional): "Care instructions for the product"
   - **Type**: Select **Multi-line text** or **Rich text** (Rich text allows formatting)
   - **Validations** (optional): Leave as default
   - **Access**: Check **Storefront access** (important!)

3. Click **Save**

### 4. Optional: Add "Info" Metafield

The "Info" tab currently uses the product description by default. If you want a separate field for info:

1. Click **Add definition**
2. Fill in the following details:

   - **Name**: `Info`
   - **Namespace and key**:
     - Namespace: `custom`
     - Key: `info`
   - **Description** (optional): "Additional product information"
   - **Type**: Select **Multi-line text** or **Rich text**
   - **Access**: Check **Storefront access** (important!)

3. Click **Save**

## How to Add Content to Your Products

### For Existing Products

1. Go to **Products** in Shopify Admin
2. Click on any product
3. Scroll down to the **Metafields** section (near the bottom)
4. You'll now see the fields you created:
   - Materials
   - Care
   - Info (if you added it)
5. Fill in the content for each field
6. Click **Save**

### For New Products

When creating a new product, you'll see the metafield sections automatically appear at the bottom of the product form.

## Example Content

### Materials Tab

```
100% organic cotton
Pre-washed and pre-shrunk
Heavyweight fabric (12oz)
Garment dyed for a soft, lived-in feel
```

### Care Tab

```
Machine wash cold with like colors
Tumble dry low or hang dry
Do not bleach
Iron on low heat if needed
Dry clean if preferred
```

## Verifying the Setup

1. Add content to at least one product's metafields
2. Save the product
3. View the product on your storefront
4. Click through the tabs (Info, Materials, Care) to verify the content displays correctly

## Troubleshooting

### Content Not Showing?

- **Check Storefront Access**: Make sure you enabled "Storefront access" for each metafield
- **Check Namespace**: Ensure the namespace is exactly `custom`
- **Check Keys**: Ensure the keys are exactly `materials` and `care` (lowercase, no spaces)
- **Clear Cache**: Try clearing your browser cache or viewing in an incognito window

### Need to Edit Metafield Definitions?

1. Go to **Settings** > **Custom data** > **Products**
2. Click on the metafield definition you want to edit
3. Make your changes
4. Click **Save**

## Alternative: Using Product Description

If you prefer not to use metafields, you can:

- Use the main product description for the "Info" tab
- The Materials and Care tabs will show placeholder text
- You can edit the placeholder text in `sections/product.liquid` lines 91 and 102

## Need Help?

If you need assistance setting this up, Shopify has detailed documentation:

- [Shopify Metafields Documentation](https://help.shopify.com/en/manual/custom-data/metafields)
- [Adding metafield definitions](https://help.shopify.com/en/manual/custom-data/metafields/metafield-definitions)
