# VIVE CREDIT - Digital Lending Platform

## About The Project

**VIVE CREDIT** is a full-featured digital platform designed to modernize and automate the lending process for financial institutions. It provides a comprehensive solution that covers the entire loan lifecycle, from the initial client contact to the final repayment, enhancing efficiency for internal operators and delivering a seamless experience for applicants.

The platform digitizes the customer journey, allowing users to apply for loans, complete identity checks, and manage their accounts entirely online. For the lending institution, it offers powerful administrative tools to manage applications, assess risk, and oversee the entire loan portfolio.

### Core Workflows & Functionality

The application is built around several key modules that represent distinct stages of the lending process:

1.  **Onboarding:** A guided, multi-step process for new clients to register and create an account.
2.  **KYC (Know Your Customer):** An integrated workflow where applicants submit necessary personal information and upload identification documents. The system provides an interface for operators to review and approve these submissions.
3.  **AML (Anti-Money Laundering):** A backend controller and service to perform AML checks against internal or external watchlists, ensuring regulatory compliance.
4.  **Loan Application:** Clients can fill out and submit detailed credit applications, which are then routed to internal operators for review.
5.  **Document Management:** A secure system for uploading, storing, and accessing all client-related documents, such as ID cards, proof of income, and signed contracts. The backend uses `multer` to handle file uploads, and documents are served securely.
6.  **Contracting:** Generation of loan contracts based on approved application data. The platform facilitates the delivery and (in a future state) digital signing of these documents.
7.  **Admin & Operator Dashboards:** Role-specific dashboards provide internal users with the tools they need:
    *   **Operators** can view and process incoming applications, review KYC data, and manage client communications.
    *   **Administrators** have a higher-level view, with access to system settings, user management, and audit trails.
8.  **Servicing & Payments:** (Conceptual) Modules for managing active loans, tracking payment schedules (`scadentar`), and processing repayments.

---

## Tech Stack Explained

This project is built with a modern, type-safe, and scalable technology stack. The choice of technologies is aimed at ensuring maintainability, developer productivity, and a robust, secure final product.

### Frontend

-   **React (`v18`)**: The core library for building the dynamic and component-based user interface. Its hook-based architecture (`useState`, `useEffect`, etc.) is used for managing local component state.
-   **TypeScript**: Used across the entire frontend to enforce type safety. This is critical for a financial application to prevent common runtime errors and ensure that data structures (e.g., for clients, loans, applications) are consistent.
-   **Vite**: A next-generation build tool that provides an extremely fast development server with Hot Module Replacement (HMR) and optimized production builds.
-   **Redux Toolkit**: The official, opinionated toolset for efficient Redux development. It's used for centralized state management, handling the global application state such as the logged-in user's information (`authSlice`), client data (`userSlice`), and notifications.
-   **React Router (`v7`):** Manages all client-side routing and navigation. It is used to create protected routes (`ProtectedRoute`) that ensure only authenticated users can access certain parts of the application, and to differentiate between layouts for different user roles (e.g., `AdminLayout`, `ClientLayout`).
-   **Tailwind CSS**: A utility-first CSS framework used for all styling. It allows for rapid development of a custom, modern, and responsive design.
-   **Shadcn/UI & Headless UI**: A collection of re-usable UI components built on top of Tailwind CSS and Radix UI primitives. This provides accessible and style-agnostic components like inputs, buttons, tables, and modals, which are customized to fit the project's design system.
-   **React Hook Form & Zod**: Used together for powerful and declarative form management and validation. Zod defines the validation schemas, which are then used by React Hook Form to handle user input and provide real-time feedback.

### Backend

-   **Node.js**: The JavaScript runtime used to build the server-side application. Its non-blocking, event-driven architecture is well-suited for building fast and scalable APIs.
-   **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is used to define the REST API routes, controllers, and middleware.
-   **TypeScript**: Just like the frontend, TypeScript is used on the backend to provide strong typing for API controllers, services, and data models, ensuring code quality and reliability.
-   **CORS**: A Node.js package used as Express middleware to enable Cross-Origin Resource Sharing. This is essential to allow the frontend application (running on a different port/domain) to securely make requests to the backend API.
-   **Multer**: A Node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files. In this project, it powers the document upload functionality for KYC and contract management.

---

## Project Structure

This project follows a monorepo pattern, with the frontend and backend codebases co-located in the same repository for easier management.

-   **/backend**: The Node.js and Express API.
-   **/src**: The React frontend application.
-   **/public**: Static assets, including documents for serving.

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v18 or later)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

### 1. Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Start the development server (runs on http://localhost:3000)
npm run dev
```

### 2. Frontend Setup

```bash
# 1. In a new terminal, navigate to the project root
# (If in /backend, use `cd ..`)

# 2. Install dependencies
npm install

# 3. Start the development server (runs on http://localhost:5173)
npm run dev
```

The application will be accessible at `http://localhost:5173`.
