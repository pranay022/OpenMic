# 🎤 OpenMic - Anonymous Feedback & Messaging Platform

**OpenMic** is a high-end, full-stack web application designed for gathering honest, anonymous feedback. Built with a sleek, minimalist aesthetic, it provides users with a safe and premium environment to receive community insights through a private dashboard and a customized public sharing link.

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
