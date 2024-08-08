# MyLittlePantry

A web application to track pantry items, manage shopping lists, and get recipe suggestions based on available pantry items.

## Features

- **Inventory Management:** Add, update, and remove pantry items with details like quantity, expiry date, and category.
- **Shopping List:** Manage a shopping list to keep track of items you need to buy.
- **Recipe Suggestions:** Get recipe ideas based on the items available in your pantry.
- **Gallery and Camera Integration:** Upload and display images captured using your browser's camera, powered by `react-camera-pro`.
- **Firebase Integration:** Store and retrieve pantry items and images from Firebase.

## Tech Stack

- **Frontend:** React, Next.js, Material-UI
- **Backend:** Firebase Firestore and Firebase Storage
- **API Integration:** Google Gemini API for recipe suggestions

## Video Demo
[Watch the demo on YouTube](https://youtu.be/_0AWt_-_kxg?si=mAOp4NvzZO2C8U9c)

## Setup and Installation
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Add your Firebase credentials and Gemini API key to the `.env.local` file.
4. Start the application with `npm run dev`.

## Deployment
The application is deployed on Vercel. Ensure that your environment variables are securely managed via the Vercel dashboard.

