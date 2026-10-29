# KANNA 🏺

**KANNA** is a modern e-commerce storefront for handcrafted pots, ceramic vases, planters, and botanical home decor. Built with the [Next.js](https://nextjs.org) App Router for fast page loads, seamless browsing, and optimized visual storytelling.

---

## Features

- **Curated Product Catalog:** Browse pots, vases, and planters with filtering by material (terracotta, stoneware, ceramic), size, drainage, and indoor/outdoor use.
- **Detailed Product Views:** High-resolution galleries, exact dimensions, plant-pairing suggestions, and care instructions.
- **Cart & Checkout Flow:** Persistent shopping cart with real-time inventory checks and secure checkout integration.
- **Performance Optimized:** Automatic image optimization via `next/image` and typography powered by `next/font` ([Geist](https://vercel.com/font)).
- **Responsive Design:** Mobile-first layout tailored for visual discovery across all devices.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript / JavaScript
- **Styling:** Tailwind CSS *(update if using CSS Modules or Styled Components)*
- **Font:** Geist Sans & Geist Mono via `next/font`
- **Deployment:** [Vercel](https://vercel.com)

---

## Getting Started

### Prerequisites

Ensure you have **Node.js 18.17+** installed on your machine.

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/kanna.git](https://github.com/your-username/kanna.git)
cd kanna
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory and add your configuration keys:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add your CMS, Database, or Payment Gateway keys below (e.g., Stripe, Shopify, Sanity)
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the storefront. The page auto-updates as you edit files in the `app/` directory.

---

## Project Structure

```text
├── app/                  # Next.js App Router pages and layouts
│   ├── products/         # Product listing and individual vase/pot pages
│   ├── collections/      # Curated botanical & ceramic collections
│   ├── cart/             # Shopping cart view and checkout flow
│   ├── layout.tsx        # Root layout and global font configuration
│   └── page.tsx          # KANNA homepage / featured lookbook
├── components/           # Reusable UI components (ProductCard, Navbar, CartDrawer)
├── lib/                  # API clients, utility functions, and data fetchers
└── public/               # Static assets, brand logos, and product placeholders
```

---

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server at `localhost:3000` |
| `npm run build` | Builds the application for production |
| `npm run start` | Runs the built production server |
| `npm run lint` | Runs ESLint to catch code quality and formatting issues |

---

## Deployment

The storefront is optimized for deployment on the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Import the project into Vercel.
3. Add your environment variables in the Vercel dashboard.
4. Deploy—every push to `main` will automatically trigger a production build.

---

## License

All rights reserved © KANNA.