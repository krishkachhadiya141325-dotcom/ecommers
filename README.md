# Harmony Furniture Website

A static furniture storefront built with React, Tailwind CSS, and Babel (via CDN). The project is a frontend-only website with product browsing, shopping cart, checkout, contact, blog, authentication, and an admin panel.

## Project Structure

- `frontend/website/index.html`
  - Main HTML entry point
  - Loads React, ReactDOM, Babel, Tailwind CSS via CDNs
  - Contains global styles and the root React application
- `frontend/website/pages/`
  - `Admin.js` - Admin panel UI with dashboard, product management, orders view, and analytics
  - `Auth.js` - Login / registration page and role-based sign-in
  - `Blog.js` - Blog page layout and article cards
  - `Cart.js` - Shopping cart page with item quantity updates and checkout navigation
  - `Checkout.js` - Checkout page with billing, delivery, and order summary
  - `Contact.js` - Contact page and support information
  - `Home.js` - Home page hero, featured products, categories, and highlights
  - `Product.js` - Product detail page for viewing item information
  - `Shop.js` - Catalog page for browsing and filtering products
- Images:
  - `frontend/website/hero_room.png`
  - `frontend/website/bedroom.png`
  - `frontend/website/dining.png`
  - `frontend/website/sofa.png`

## Features

- Responsive furniture storefront UI
- Product catalog with cards, badges, pricing, and ratings
- Cart and quantity management
- Checkout form and order summary
- Contact and blog sections
- Login and registration interface
- Role-based access for `admin` and normal users
- Admin panel with dashboard, product management, and orders overview
- Tailwind CSS theme customization and custom design tokens

## Important Details

- The app uses inline React components and state inside `index.html` and separate component files in `pages/`.
- UI is styled with Tailwind CSS loaded from `https://cdn.tailwindcss.com`.
- React is loaded from CDN using React 18 UMD builds and Babel Standalone for JSX transformation.
- Product data is stored in `PRODUCTS_DATA` inside `index.html`.
- Authentication is simulated in `pages/Auth.js` with the following credential logic:
  - `admin123` logs in as `admin`
  - `shop123` logs in as `user`
  - Registration creates a new user session automatically after form validation
- Admin capabilities include:
  - Viewing revenue and order KPIs
  - Managing product list locally (add, edit, delete)
  - Viewing order history

## Pages and Routes

The app is a single-page React app managed by internal `page` state.

Main pages:
- `home`
- `shop`
- `product`
- `cart`
- `checkout`
- `contact`
- `blog`
- `auth`
- `admin`

## How to Run

### Option 1: Open directly
Open `frontend/website/index.html` in your browser.

### Option 2: Use a local server (recommended)
From the project root or `frontend/website` folder, run one of these commands:

- Using Python 3:
  ```bash
  python -m http.server 8000
  ```
- Using Node.js `http-server` or `serve`:
  ```bash
  npx serve frontend/website
  ```

Then open `http://localhost:8000` (or the URL shown by the server).

## Login Credentials

- Admin login: `admin123`
- User login: `shop123`

## Development Notes

- Edit existing page components in `frontend/website/pages/`.
- Add or replace images in `frontend/website/`.
- The project does not require build tools; it runs directly in the browser with CDN dependencies.

## Recommended Improvements

- Convert this app to a proper React project with a build system (`create-react-app`, Vite, Next.js, etc.)
- Add real backend authentication and API-backed product data
- Persist cart and user sessions with `localStorage` or a database
- Improve form validation and error handling
- Add product filtering and sorting in the shop page
