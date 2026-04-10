# 🎤 OpenMic - Anonymous Feedback & Messaging Platform

**OpenMic** is a high-end, full-stack web application designed for gathering honest, anonymous feedback. Built with a sleek, minimalist aesthetic, it provides users with a safe and premium environment to receive community insights through a private dashboard and a customized public sharing link.

## ✨ Key Features

-   **🎨 Premium Dark Aesthetic**: A sleek, zinc-and-emerald design system with glassmorphism and smooth micro-animations.
-   **🔐 Secure Authentication**: Integrated with NextAuth.js and bcrypt for industrial-strength security.
-   **👁️ Password Visibility Control**: Convenient Hide/Show toggle on login and registration fields.
-   **📧 Smart Verification**: Modern, dark-themed HTML verification emails with anti-clipping technology for Gmail.
-   **💬 Feed Expansion Modal**: Truncated message cards on the dashboard expand into a focused, high-contrast modal for deep reading.
-   **🔗 Custom Feedback Links**: Generate and share one-click anonymous feedback URLs (`/u/[username]`).
-   **🎛️ Toggle Acceptance**: Instantly enable or disable incoming feedback directly from your private dashboard.
-   **⚡ Ultra-Fast Search/Refresh**: Native Next.js server-side logic and optimized MongoDB queries for real-time responsiveness.

## 🛠️ Technology Stack

-   **Frontend**: Next.js 14, React 18, Tailwind CSS, Radix UI, Lucide Icons
-   **Backend**: Next.js API Routes (Serverless)
-   **Database**: MongoDB with Mongoose
-   **Authentication**: NextAuth.js
-   **Email Service**: Resend (via @react-email/components)
-   **Validation**: React Hook Form, Zod

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

## ☁️ Vercel Deployment

OpenMic is optimized for Vercel. 

1. Push your code to a GitHub/GitLab repository.
2. Link your repo to Vercel.
3. Ensure the **Node.js version** is set to 18.x or higher in the project settings.
4. Add all environment variables from your `.env` to the Vercel Dashboard.
5. Deploy with the standard `npm run build` command.

## 📜 License

This project is licensed under the MIT License.
