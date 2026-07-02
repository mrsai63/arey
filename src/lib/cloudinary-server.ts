import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary server-side SDK using environment variables
// Note: This file should only be imported on the server (e.g., in server functions, API endpoints, or server-only hooks)
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME || "dx3auutir",
  api_key: process.env.VITE_CLOUDINARY_API_KEY || "966458672559384",
  api_secret: process.env.CLOUDINARY_API_SECRET || "o8AFKbiprQtCLW9lAR9a8H16-WY",
  secure: true,
});

export { cloudinary };
