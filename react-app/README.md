# Live React App

This is the React version of the Live web-application, refactored from Next.js to a standalone React SPA.

## Features

- **Product Catalog**: Browse products by categories with filtering and search
- **Shopping Cart**: Add products to cart and manage orders
- **User Authentication**: Sign in/up and user profile management
- **Wishlist**: Save favorite products
- **Reviews**: Read and write product reviews
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **React Helmet Async** - Document head management
- **Axios** - HTTP client
- **SCSS** - Styling with Sass
- **Bootstrap 5** - UI framework
- **Material-UI** - Additional UI components

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd react-app
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update environment variables in `.env`:
```env
VITE_BACKEND_URL=http://localhost:5000
```

5. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/     # Reusable UI components
├── features/       # Feature-specific components
├── hooks/          # Custom React hooks
├── pages/          # Page components for routing
├── store/          # Redux store and slices
├── styles/         # SCSS styles
├── utils/          # Utility functions
├── App.jsx         # Main App component
└── main.jsx        # Entry point
```

## Routing

The app uses React Router for client-side routing:

- `/` - Home page with categories
- `/products/:categoryPath/:filtersStr?` - Product listing
- `/product/:productSlug/:productId/:activeTab?` - Product details
- `/auth/signin` - Sign in page
- `/user/*` - User profile pages
- `/info/*` - Information pages

## Migration from Next.js

This app was refactored from Next.js to React with the following changes:

### Removed Next.js Dependencies
- `next`
- `next-auth`
- `next-redux-wrapper`

### Added React Dependencies
- `react-router-dom` for routing
- `react-helmet-async` for meta tags
- `vite` for build tooling

### Key Changes
1. **Routing**: File-based routing → React Router
2. **Data Fetching**: `getServerSideProps`/`getStaticProps` → `useEffect` with API calls
3. **Meta Tags**: `next/head` → `react-helmet-async`
4. **Dynamic Imports**: `next/dynamic` → `React.lazy`
5. **Images**: `next/image` → standard `<img>` tags
6. **Authentication**: NextAuth → Custom auth (to be implemented)

## Authentication

⚠️ **Note**: The authentication system needs to be implemented as NextAuth was removed. 

Consider implementing:
- JWT-based authentication
- Auth0, Firebase Auth, or similar service
- Custom backend authentication

## Deployment

1. Build the app:
```bash
npm run build
```

2. The built files will be in the `dist/` directory
3. Deploy the static files to any web server (Netlify, Vercel, Apache, Nginx)

## Environment Variables

- `VITE_BACKEND_URL` - Backend API URL
- `VITE_APP_ENV` - Application environment

## Contributing

1. Follow the existing code style
2. Run tests and linting before committing
3. Use conventional commit messages

## License

MIT License
