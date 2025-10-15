# Size Chart Column Ordering

## Overview

The size chart table now automatically displays columns in the correct order based on the product type.

## How It Works

The system automatically detects the product type and shows columns in the appropriate order:

### For Jackets

**Order:** Chest → Shoulder → Back → Arm

The columns will display as:

- **Chest** (instead of "Chest")
- **Shoulder** (instead of "Shoulder")
- **Back** (instead of "Back")
- **Arm** (instead of "Sleeve")

### For Pants

**Order:** Waist → Rise → Inside Leg → Leg Opening

The columns will display as:

- **Waist** (instead of "Waist")
- **Rise** (instead of "Rise")
- **Inside Leg** (instead of "Inseam")
- **Leg Opening** (instead of "Hip")

## Product Type Detection

The system detects product types automatically by checking (in order of priority):

1. **Size chart metaobject `product_type` field** (e.g., "Jacket", "Pants") - **Most reliable**
2. Product tags containing "Jacket" or "Pants"
3. Product type field containing "Jacket" or "Pants"
4. Product title containing "Jacket" or "Pant"

**Examples:**

- A size chart with `product_type: "Pants"` will use pants column order (recommended method)
- A product tagged with "Jacket" will use jacket column order
- A product with type "Pants" will use pants column order
- A product titled "Wool Jacket" will use jacket column order

## Customization Options

### Option 1: Set Product Type in Size Chart Metaobject (Recommended)

The easiest and most reliable way is to set the `product_type` field when creating/editing your size chart:

- Set `Product Type` to "Jacket" for jacket size charts
- Set `Product Type` to "Pants" for pants size charts

This is already in your metaobject definition, so just make sure it's filled in!

### Option 2: Use Product Tags

Alternatively, add the appropriate tag to your products:

- Add tag `Jacket` for jackets
- Add tag `Pants` for pants

### Option 3: Manual Column Order

If you need a custom order for a specific product, you can override it in the code:

```liquid
{% render 'size-chart-table',
  size_chart: size_chart,
  column_order: 'chest,waist,shoulder,back'
%}
```

### Option 4: Add New Product Types

Edit `snippets/size-chart-table.liquid` to add more product types:

```liquid
# Add after line 15
assign shirt_order = 'chest,shoulder,sleeve,waist'

# Add in the detection logic (around line 24)
elsif product.tags contains 'shirt' or product.type contains 'Shirt'
  assign columns = shirt_order | split: ','
```

## Column Name Mapping

The system uses friendly names for measurements:

| Metafield Name | Display Name |
| -------------- | ------------ |
| chest          | Chest        |
| shoulder       | Shoulder     |
| back           | Back         |
| sleeve         | Arm          |
| waist          | Waist        |
| rise           | Rise         |
| inside_leg     | Inside Leg   |
| leg_opening    | Leg Opening  |

To change these display names, edit the `column_labels` variable in `snippets/size-chart-table.liquid` (line 9).

## Metaobject Field Names

Make sure your size chart metaobject has these field names:

- `sizes` - List of size names (S, M, L, etc.)
- `chest` - List of chest measurements (for jackets)
- `shoulder` - List of shoulder measurements (for jackets)
- `back` - List of back measurements (for jackets)
- `sleeve` - List of sleeve/arm measurements (for jackets)
- `waist` - List of waist measurements (for pants)
- `rise` - List of rise measurements (for pants)
- `inside_leg` - List of inside leg measurements (for pants)
- `leg_opening` - List of leg opening measurements (for pants)
- `unit` - Unit of measurement (e.g., "in" or "cm")
- `product_type` - Product type (e.g., "Jacket", "Pants")

## Troubleshooting

**Q: The columns aren't in the right order**

- Check that your product has the correct tag ("Jacket" or "Pants")
- Check that the product type or title contains the garment type
- Verify your size chart metaobject has the correct field names

**Q: A column isn't showing up**

- Make sure the metaobject field has data (not empty)
- Check that the field name matches exactly (case-sensitive)

**Q: I need a completely custom order**

- Use Option 2 above to manually specify the column order

## Files Modified

- `/snippets/size-chart-table.liquid` - New reusable size chart snippet
- `/sections/product.liquid` - Updated to use the new snippet (2 instances)
