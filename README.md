# 🏨 Kennah Property Management System

A modern, responsive property management application built with React 19, TypeScript, and Tailwind CSS. This application provides a comprehensive solution for managing properties with features like CRUD operations, search, filtering, and pagination.

## ✨ Features

- 🔐 **Authentication System** - Secure login with role-based access
- 🏠 **Property Management** - Create, read, update, and delete properties
- 🔍 **Advanced Search** - Search properties by title
- 🏷️ **Filtering** - Filter properties by type (Villa, House, Apartment, Studio)
- 📄 **Pagination** - Efficient data pagination for better performance
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Mobile-first approach with responsive layout
- 🖼️ **Lazy Loading** - Optimized image loading with error handling
- ⚡ **React 19** - Latest React features with lazy loading and Suspense
- 🎨 **Modern UI** - Beautiful interface using Tailwind CSS and shadcn/ui

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- JSON Server (for mock API)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kennah-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```

4. **Start the JSON Server (Required)**

   ```bash
   # Install json-server globally if not already installed
   npm install -g json-server

   # Start the mock API server
   json-server --watch server/db.json --port 4000
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
kennah-task/
├── public/                 # Static assets
│   ├── KENNAH_LOGO.png    # Application logo
│   └── vite.svg           # Vite logo
├── server/                # Mock API server
│   ├── db.json           # JSON database
│   └── README.md         # Server documentation
├── src/
│   ├── components/       # Reusable components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── LazyImage.tsx # Lazy loading image component
│   │   ├── Navbar.tsx   # Navigation component
│   │   ├── PropertyCard.tsx # Property display card
│   │   ├── PropertyForm.tsx # Property form component
│   │   ├── SearchBar.tsx # Search functionality
│   │   ├── FilterOption.tsx # Filter dropdown
│   │   └── Pagination.tsx # Pagination component
│   ├── context/         # React Context providers
│   │   ├── LoginContext.tsx # Authentication context
│   │   └── ThemeContext.tsx # Theme management
│   ├── pages/           # Page components
│   │   ├── Home.tsx     # Main dashboard
│   │   ├── Login.tsx    # Authentication page
│   │   ├── CreateProperty.tsx # Property creation
│   │   ├── EditProperty.tsx # Property editing
│   │   └── PropertyDetails.tsx # Property details view
│   ├── services/        # API services
│   │   ├── auth.ts      # Authentication service
│   │   └── property.ts  # Property management service
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🏗️ Architecture Overview

### Frontend Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Key Features Implementation

#### 🔐 Authentication

- Context-based authentication state management
- Local storage persistence
- Protected routes with automatic redirection

#### 🏠 Property Management

- CRUD operations for properties
- Form validation using Zod schemas
- Optimistic updates with React Query

#### 🔍 Search & Filtering

- Real-time search by property title
- Type-based filtering (Villa, House, Apartment, Studio)
- Combined search and filter functionality

#### 📄 Pagination

- Server-side pagination implementation
- Dynamic page size configuration
- Total count calculation for accurate pagination

#### 🌙 Theme System

- Dark/Light mode toggle
- CSS custom properties for theming
- Persistent theme preference

## ⚠️ Important Notes

### JSON Server Limitations

**Pagination Issue:**

- The pagination logic is correctly implemented in the frontend
- However, JSON Server always returns the first items regardless of the page parameter
- This is a known limitation of JSON Server's pagination implementation

**Search Limitation:**

- JSON Server doesn't support partial text search by default
- The search functionality requires the exact title match
- For production, consider using a proper backend with full-text search capabilities

**To use the deployed application:**

1. Clone the repository
2. Install dependencies: `npm install` then run the project `npm run dev` || use the deployed version `https://frontend-task-bdws.vercel.app/`
3. Start JSON Server: `json-server --watch server/db.json --port 4000`
4. Access the deployed application

## 🔧 Configuration

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:4000
```

## 🎨 UI Components

The application uses a custom design system built with:

- **Tailwind CSS** for styling
- **shadcn/ui** for base components
- **Lucide React** for icons
- **Custom color scheme** with primary green theme

## 🚀 Performance Optimizations

- **Lazy Loading** - Components and images load on demand
- **React Suspense** - Smooth loading states
- **Image Optimization** - Lazy image loading with error handling
- **Code Splitting** - Route-based code splitting
- **React Query** - Efficient caching and background updates

## 🔒 Security Features

- **Form Validation** - Client-side validation with Zod
- **Protected Routes** - Authentication-based route protection
- **Input Sanitization** - Proper input handling and validation

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Adaptive navigation (sidebar on desktop, hamburger menu on mobile)
- Flexible grid layouts
