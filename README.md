# ☕ Bean & Brew — Artisan Coffee Shop App

> A modern, full-stack coffee shop web application built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Firebase Authentication**. Browse a curated catalog of single-origin beans, espresso blends, and brewing equipment — or sign in to add and manage your own products.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge&logo=vercel)](https://coffee-shop-app-two-navy.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.11-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)

---

## 🌐 Live Demo

**🔗 [https://coffee-shop-app-two-navy.vercel.app](https://coffee-shop-app-two-navy.vercel.app)**

---

## ✨ Features

### 🛍️ Public Features
- **Landing Page** — Hero section, feature highlights, featured blends, testimonials, and CTA banner
- **Product Catalog** — Browse 6 seeded products with search, category filter, and price range slider
- **Product Details** — Dynamic routing per product with images, ratings, and descriptions
- **About Page** — Company story and value propositions

### 🔐 Authentication
- **Email / Password** sign-up and sign-in
- **Google OAuth** sign-in (with automatic popup → redirect fallback for production reliability)
- **Persistent sessions** powered by Firebase Auth
- **Protected routes** — Add/Manage pages require authentication

### ⚙️ User Features (Authenticated)
- **Add Products** — Submit new coffee items with title, category, price, rating, description, and image
- **Manage Products** — View, inspect, and delete your submitted products from a table dashboard
- **User Dropdown** — Avatar menu with quick access to account actions and logout

### 🎨 UI / UX
- **Fully responsive** layout (mobile, tablet, desktop)
- **Custom amber/stone color palette** for a warm, coffee-shop aesthetic
- **Lucide React icons** throughout
- **Dropdown click-outside handling** for a polished experience
- **Client-side state persistence** via `localStorage`

---

## 🧰 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **Auth** | [Firebase Authentication](https://firebase.google.com/docs/auth) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Deployment** | [Vercel](https://vercel.com) |
| **Linting** | ESLint 9 + `eslint-config-next` |

---

## 📁 Project Structure

```
coffee-shop-app/
├── app/
│   ├── layout.tsx              # Root layout + AuthProvider wrapper
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Tailwind v4 entry
│   ├── about/page.tsx          # About page
│   ├── login/page.tsx          # Login / Register
│   └── items/
│       ├── page.tsx            # Product catalog + filters
│       ├── [id]/page.tsx       # Dynamic product details
│       ├── add/page.tsx        # Add product form (protected)
│       └── manage/page.tsx     # Manage products dashboard (protected)
├── context/
│   └── AuthContext.tsx         # Firebase auth provider + hooks
├── lib/
│   └── firebase.ts             # Firebase initialization
├── types/
│   └── coffee.ts               # Shared CoffeeItem interface
├── public/                     # Static assets
├── postcss.config.mjs          # Tailwind v4 PostCSS plugin
├── next.config.ts              # Next.js configuration
├── eslint.config.mjs           # ESLint flat config
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- **Node.js** `20.x` or `22.x`
- **npm** (bundled with Node) or **pnpm** / **yarn**
- A **Firebase project** with Authentication enabled

### 1. Clone the Repository

```bash
git clone https://github.com/Abidafi/coffee-shop-app.git
cd coffee-shop-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Where to find these:** Firebase Console → Project Settings → General → Your apps → SDK setup and configuration.

### 4. Enable Firebase Authentication

1. Go to **Firebase Console → Authentication → Sign-in method**
2. Enable **Email/Password**
3. Enable **Google**
4. Go to **Authentication → Settings → Authorized domains** and add:
   - `localhost` (for local dev)
   - `your-project.vercel.app` (for production)

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with **Turbopack** |
| `npm run build` | Create optimized production build |
| `npm run start` | Run production server locally |
| `npm run lint` | Run ESLint |

---

## 🌍 Deployment to Vercel

### One-Click Deploy

1. Push your code to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. **Add Environment Variables** in Vercel:
   - Project → **Settings** → **Environment Variables**
   - Add all 6 `NEXT_PUBLIC_FIREBASE_*` keys for **Production** and **Preview**
4. **Set Node version** (optional):
   - Project → **Settings** → **General** → **Node.js Version** → **22.x**
5. Vercel will auto-deploy on every push to `main`

### Post-Deploy Checklist

- [ ] Add `your-project.vercel.app` to Firebase **Authorized domains**
- [ ] Verify Google sign-in works in production
- [ ] Test all routes: `/`, `/items`, `/items/[id]`, `/about`, `/login`, `/items/add`, `/items/manage`

---

## 🔐 Security Notes

- ✅ Uses **Firebase Client SDK** with public API keys (safe by design — protected by Firebase Security Rules)
- ✅ No secrets in source code — all credentials via environment variables
- ✅ **CVE-2025-66478** (React Server Components RCE) patched via Next.js **15.1.11**
- ✅ ESLint configured with 0 warnings / 0 errors

---

## 🗺️ Roadmap

Potential future enhancements:

- [ ] **Firestore persistence** — replace `localStorage` with a real database so products sync across devices
- [ ] **Next.js `<Image>` optimization** — replace `<img>` tags for better LCP
- [ ] **Product editing** — extend the manage page with inline edit
- [ ] **Search with debounce** — improve search UX
- [ ] **Admin roles** — separate admin vs. customer accounts
- [ ] **Stripe checkout** — add a real payment flow
- [ ] **Order history** — track past purchases
- [ ] **Server Actions** — migrate product writes to server-side for better security

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Md. Abdur Rahman (Abidafi)**

- GitHub: [@Abidafi](https://github.com/Abidafi)
- Project: [coffee-shop-app](https://github.com/Abidafi/coffee-shop-app)
- Live Demo: [coffee-shop-app-two-navy.vercel.app](https://coffee-shop-app-two-navy.vercel.app)

---

## 🙏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Lucide Icons](https://lucide.dev)
- [Unsplash](https://unsplash.com) for product imagery
- [Vercel](https://vercel.com) for free, world-class hosting

---

<div align="center">

**☕ Brewed with passion, powered by Next.js**

If you found this project helpful, please give it a ⭐!

</div>
