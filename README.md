<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Classified Ads Web App (SMIT Assignment)

A modern, full-stack classified ads platform built with React, Vite, and Supabase. This project serves as a comprehensive, OLX-clone application featuring user authentication, ad posting, category browsing, search functionality, and a complete admin panel for management.

**Author:** Kamran Zafar

---

## ✨ Features

- **User Authentication**: Secure user signup, login, and session management powered by Supabase Auth.
- **Ad Management**: Users can post, view, and manage their ads.
- **Dynamic Categories**: Ads are organized into categories like Cars, Property, and Computers, fetched directly from the database.
- **Sponsored Ads System**:
  - Dedicated sections for sponsored content (Hero Carousel and a banner above the footer).
  - Admin can create and manage sponsored ads, including setting placement and activation status.
- **Advanced Search**: Users can search for ads by keywords and location.
- **Complete Admin Panel**:
  - **Dashboard**: At-a-glance view of total users, total ads, and pending ads.
  - **User Management**: View all users and manage their roles (promote to admin or demote to user).
  - **Ads Management**: Approve, reject, or delete user-posted ads.
  - **Sponsored Ads Management**: A dedicated interface to create, activate/deactivate, and set placements for sponsored ads.
- **Role-Based Access Control**:
  - Separate dashboards for regular users and admins.
  - Admin routes are protected and only accessible to users with the 'admin' role.

## 🚀 Tech Stack, Tools, and Libraries

This project leverages a variety of modern tools and libraries to deliver a robust and efficient development experience.

### Core Frameworks & Tools
- **Vite**: A next-generation frontend tooling that provides an extremely fast development server and a build process optimized for production.
- **React**: A JavaScript library for building user interfaces. It's the core of our component-based architecture.
- **Supabase**: An open-source Firebase alternative. We use it for:
    - **Database**: A PostgreSQL database for storing user data, ads, categories, etc.
    - **Authentication**: Manages user signup, login, and sessions.
    - **Storage**: Used for hosting user-uploaded images for ads and profiles.

### Routing
- **React Router DOM**: Handles all client-side routing, enabling navigation between different pages like the homepage, category pages, and ad details without full page reloads.

### Styling
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces. It's used for all styling in the project.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins. It's used under the hood by Vite to process Tailwind CSS.
- **Flowbite React**: An open-source library of UI components built with React and Tailwind CSS, used for creating UI elements like Modals, Dropdowns, and more.
- **tailwind-merge**: A utility function to intelligently merge Tailwind CSS classes without style conflicts.

### Utilities
- **React Icons**: Provides a vast collection of popular icon sets as React components. Used for all icons throughout the application.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`. Used to manage Supabase keys and other sensitive information.
- **ws**: A WebSocket library used by Vite's dev server for Hot Module Replacement (HMR).
- **http-proxy-3**: A library used by Vite to handle proxying requests during development.

### Development & Linting
- **ESLint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript, ensuring code quality and consistency.
- **Chokidar**: A fast file watcher used by Vite's dev server to detect file changes and trigger HMR.
- **esbuild**: An extremely fast JavaScript bundler and minifier, used by Vite for dependency pre-bundling and for production builds.
- **Rollup**: A module bundler for JavaScript, used by Vite for the final production build process.

## 📂 Folder Structure

The project follows a standard and organized structure for scalability and maintenance.

```
/
├── public/
│   └── assets/
│       └── logo.png
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── AdDetail/
│   │   │   └── AdDetail.jsx        # Displays a single ad's details
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.jsx    # Main dashboard for admin stats
│   │   │   ├── AdminPanel.jsx        # Layout and sidebar for the admin section
│   │   │   ├── AdsManagement.jsx     # Table to manage user-posted ads
│   │   │   ├── CreateSponsoredAd.jsx # Form to create new sponsored ads
│   │   │   ├── SponsoredAds.jsx      # Table to manage sponsored ads
│   │   │   └── UserManagement.jsx    # Table to manage user roles
│   │   ├── Ads/
│   │   │   └── PostAd.jsx            # Form for users to post a new ad
│   │   ├── Auth/
│   │   │   ├── UserDashboard.jsx     # Dashboard for logged-in users
│   │   │   ├── UserSignin.jsx        # Login form
│   │   │   └── UserSignup.jsx        # Signup form
│   │   ├── Categories/
│   │   │   ├── CategoryPage.jsx      # Displays all ads in a specific category
│   │   │   └── GeneralItemsSection.jsx # A section for general items on the homepage
│   │   ├── CategoryCarousel/
│   │   │   └── CategoryCarousel.jsx  # Carousels for different categories on the homepage
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── Hero/
│   │   │   ├── AdCard.jsx            # Card component to display a single ad
│   │   │   ├── Hero.jsx              # The main hero section on the homepage
│   │   │   └── PromoCarousel.jsx     # Carousel for sponsored ads in the hero section
│   │   ├── HomePage/
│   │   │   ├── AdBanner.jsx          # Sponsored ad banner above the footer
│   │   │   └── HomePage.jsx          # Main homepage component
│   │   └── Search/
│   │       └── SearchPage.jsx        # Displays search results
│   ├── data/
│   │   └── mockdata.js             # (Legacy) Mock data, being replaced by Supabase
│   ├── services/
│   │   ├── adService.js            # Functions for ad-related database operations
│   │   └── supabase.js             # Supabase client initialization
│   ├── App.jsx                     # Main application component with routing
│   ├── index.css                   # Global styles
│   └── main.jsx                    # Application entry point
├── .env                            # Environment variables (Supabase keys)
├── package.json
└── README.md
```

## 🔄 Workflow & Design

The application is designed with two primary user roles: **User** and **Admin**.

### User Workflow
1.  **Browse & Search**: Any visitor can browse the homepage, view ads in different categories, and use the search bar.
2.  **Authentication**: To post an ad, a user must sign up for an account and log in. The system uses Supabase for secure authentication.
3.  **Post Ad**: Once logged in, a user can navigate to the "Post Ad" page, fill in the details (title, description, price, category, location), upload an image, and submit the ad. By default, new ads have a `pending` status.
4.  **User Dashboard**: Users can access their personal dashboard to view their profile information and manage their posted ads.

### Admin Workflow
1.  **Admin Login**: The admin logs in using a dedicated admin account. The system checks the user's `role` from the `profiles` table in the database.
2.  **Redirection**: Upon successful login, the admin is redirected to `/admin`, which is a protected route. A regular user attempting to access this route will be denied.
3.  **Admin Panel**: The admin is presented with a dedicated panel with the following capabilities:
    - **Dashboard**: View key metrics like total users, total ads, and the number of ads pending approval.
    - **User Management**: View a list of all registered users and change their roles between `user` and `admin`.
    - **Ads Management**: View all user-posted ads. The admin can **Approve** (change status to `active`), **Reject** (change status to `rejected`), or **Delete** any ad.
    - **Sponsored Ads**:
        - View a list of all existing sponsored ads.
        - Click "Create New" to open a form for posting a new sponsored ad.
        - In the form, the admin can specify the title, description, image, target URL, and **Placement** (`Hero Carousel` or `Footer`).
        - The ad is then dynamically displayed in the selected placement on the homepage.

## 🛠️ Setup and Usage

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd my-classified-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Supabase:**
    - Create a new project on Supabase.
    - Go to the SQL Editor and run the queries from `schema.sql` to create your tables.
    - Go to `Settings` > `API` to find your Project URL and `anon` public key.

4.  **Configure Environment Variables:**
    - Create a `.env` file in the root of the project.
    - Add your Supabase credentials to the `.env` file:
      ```
      VITE_SUPABASE_URL=YOUR_SUPABASE_URL
      VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
      ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.
>>>>>>> 39bb685ea7cb9df8a35ae849cc92f28b5aa87da0
