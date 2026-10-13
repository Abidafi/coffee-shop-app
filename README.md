# Bean & Brew - Next.js Coffee Shop Application

A polished e-commerce and catalog application built using **Next.js (App Router)** and **Firebase Authentication**.

## 🚀 Key Features
1. **Landing Page (`/`)**: Features 7 distinct sections including a sticky responsive navbar, hero banner, interactive feature cards, popular product highlights, promotional banners, customer testimonials, and footer links. Logged-in users gain access to a quick dropdown profile menu.
2. **Items Catalog (`/items`)**: Fully searchable product grid with dual-field filtering (Category & Maximum Price), displaying static and locally persisted items.
3. **Item Details (`/items/[id]`)**: Dynamic routing page displaying full product specifications, descriptions, ratings, and back navigation.
4. **About Page (`/about`)**: Company background story and core values.
5. **Firebase Authentication (`/login`)**: Full email/password login/register as well as Google popup authentication supported via React Context API.
6. **Protected Pages**: 
   - Add Items (`/items/add`): Protected form allowing authenticated users to publish new products with instant UI validation.
   - Manage Items (`/items/manage`): Clean tabular dashboard to review, inspect, or delete products.

## 🛠️ Setup & Installation
1. Clone the repository and install dependencies:
   ```bash
   git clone <repository-url>
   cd coffee-shop-app
   npm install