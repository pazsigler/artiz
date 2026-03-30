# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Artiz is an Israeli e-commerce platform for personalized gifts with live preview customization. Users select a product, enter custom text, see a real-time preview overlay, and purchase — all within ~60 seconds.

## Tech Stack

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui + Framer Motion
- **State:** Zustand
- **Forms:** React Hook Form + Zod validation
- **Backend:** Supabase (Postgres, Auth, Storage)
- **ORM:** Prisma
- **Payments:** Abstraction layer (Stripe / Israeli provider)
- **Email:** Resend
- **Hosting:** Vercel

## Commands

```bash
npm run dev          # Local dev server
npm run build        # Production build
npm run lint         # ESLint
npm run db:push      # Push Prisma schema to Supabase
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio
```

## Architecture

### Product Types

Two distinct product page layouts:
1. **Regular product** — standard images, description, add-to-cart
2. **Customizable product** (`is_customizable: true`) — includes the Customization Engine with live preview

### Customization Engine (Critical Path)

The core differentiator. Each customizable product has a `preview_config` JSON field that defines:
- Text overlay position (x, y), dimensions, max characters
- Available fonts, default font, text color, alignment

The live preview renders text over the product image in real-time using these config values. The preview must update on every keystroke with no perceptible lag.

### Data Flow: Customization → Order

1. User inputs text + selects font → stored as `customization_data` JSON
2. Live preview renders overlay on product image
3. On add-to-cart, a `preview_snapshot_url` is captured and stored with the order item
4. Order items reference both `customization_data` (for production) and `preview_snapshot_url` (for confirmation/history)

### Key Data Models

- **Product** — includes `is_customizable`, `customization_type`, `preview_config` (JSON)
- **Order** — links to user, contains status, shipping type, total
- **OrderItem** — links product + quantity + `customization_data` (JSON) + `preview_snapshot_url`

### Routing Structure (App Router)

```
/                    → Home (hero, event categories, featured products)
/category/[slug]     → Category grid with filters (type, price, customizable)
/product/[id]        → Product page (regular or customizable)
/cart                → Cart with preview thumbnails + coupons
/checkout            → User details, shipping/pickup, payment
/account             → Login, order history
```

### Shipping

- Nationwide delivery (Israel)
- Self-pickup option (Kiryat Shmona)

## Design Tokens

```
Primary text:    #384850
Secondary text:  #899398
Accent colors:   #f28db2, #cb8fb6, #b0d8a2, #c6e8f1, #a0d3a2,
                 #ecdea9, #e7965c, #f9c7c7, #fde480, #82acb4,
                 #d0c3df, #fdd093
```

## Language & Locale

- UI is in Hebrew (RTL layout)
- Currency: ILS (₪)
- Target audience: Israeli market (ages 18–55)

## Pricing Logic

- Base price per product (includes up to X characters)
- Addons: extra lines, additional positions, product add-ons — each with surcharge
