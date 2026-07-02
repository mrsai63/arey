import { Cloudinary } from "@cloudinary/url-gen";

// Initialize Cloudinary instance for client-side usage (generating URLs, transformations, etc.)
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dx3auutir",
  },
});
