# AI Humanizer Website

AI Humanizer is a web application that transforms AI-generated text into human-like content that can bypass AI detection tools. Built with Next.js, Tailwind CSS, and integrated with the Undetectable AI API.

## Features

- **Text Humanization**: Convert AI-generated text to human-like content
- **User Authentication**: Register and login functionality
- **Dashboard**: Track usage statistics and humanization history
- **Pricing Plans**: Free, Pro, and Business subscription options
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

## API Credentials

This project uses the Undetectable AI API for text humanization. The following credentials are configured:

- User ID: 79b84da7-bb2a-4e36-a135-e77e0f3e5144
- API Key: dd410c04-f157-4f4c-9e41-b7d125f2b339

**Note**: In a production environment, these should be stored as environment variables.

## Getting Started

1. Clone the repository

```bash
git clone <repository-url>
cd ai-humanizer
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Build and serve the static site

```bash
npm run build
npm run serve
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Deployment

This application is configured for static site generation, which allows it to be deployed to various hosting platforms.

### Netlify Deployment

1. Push your code to GitHub
2. Sign up or log in to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
6. Click "Deploy site"

### Vercel Deployment

1. Push your code to GitHub
2. Sign up or log in to [Vercel](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure project settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
6. Click "Deploy"

## Project Structure

```
/src
  /app                 # Next.js app directory
    /auth              # Authentication pages
      /login           # Login page
      /register        # Registration page
    /dashboard         # User dashboard
    /marketing         # Marketing pages
      /pricing         # Pricing page
      /contact         # Contact page
    page.tsx           # Home page with humanizer tool
  /components          # React components
    /ui                # UI components
    Humanizer.tsx      # Main humanizer component
  /lib                 # Utility functions
    undetectableAI.ts  # API integration with Undetectable AI
    utils.ts           # Helper functions
```

## Deployment

This application can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications.

```bash
npm run build
# or
yarn build
```

## Future Enhancements

- Implement Supabase authentication
- Add Stripe payment processing
- Create a history page for past humanizations
- Add user settings page
- Implement API rate limiting
