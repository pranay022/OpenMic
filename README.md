# OpenMic - Anonymous Messaging Platform

**OpenMic** is a full-stack web application that allows users to receive anonymous messages and feedback from others. Built with modern web technologies, it features a secure user authentication system, email verification, and a sleek dashboard to manage messages.

## 🚀 Features

-   **User Authentication**: Secure sign-up and sign-in with NextAuth.js and bcrypt password hashing.
-   **Email Verification**: Account verification via email using Resend and React Email.
-   **Anonymous Messaging**: Custom feedback links (`/u/[username]`) for receiving anonymous messages.
-   **Dashboard Management**: A private dashboard to view, manage, and toggle receiving status for messages.
-   **Interactive UI**: Modern, responsive design using Tailwind CSS, Radix UI components, and Lucide icons.
-   **Message Carousel**: Landing page showcasing the app's utility with an interactive carousel.
-   **Validation & Security**: Robust input validation using Zod and React Hook Form.

## 🛠️ Technology Stack

-   **Frontend**: Next.js 14, React 18, Tailwind CSS, Radix UI, Lucide Icons
-   **Backend**: Next.js API Routes (Serverless)
-   **Database**: MongoDB with Mongoose
-   **Authentication**: NextAuth.js
-   **Email Service**: Resend (via @react-email/components)
-   **Form Handling**: React Hook Form, Zod
-   **Utilities**: Axios, Day.js, bcryptjs

## 📦 Project Structure

```text
src/
├── app/            # Next.js App Router (pages & API routes)
│   ├── (app)/      # Main application routes (dashboard, landing)
│   ├── (auth)/     # Authentication routes (sign-in, sign-up, verify)
│   ├── api/        # REST API endpoints
│   └── u/          # Public messaging pages ([username])
├── components/     # Reusable UI components (shadcn/ui)
├── context/        # React context providers
├── helpers/        # Utility helper functions (e.g., email sending)
├── lib/            # Configuration (db connection, next-auth)
├── model/          # Mongoose database models
├── schemas/        # Zod validation schemas
└── types/          # TypeScript definitions
```

## ⚙️ Getting Started

### 1. Prerequisites

-   Node.js (v18 or higher)
-   MongoDB (Local or Atlas instance)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd ama-app
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Running the App

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm start
```

## 📜 License

This project is licensed under the MIT License.
