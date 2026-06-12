import fs from "fs";
import path from "path";
import { ogImageBase64 } from "./og-image-base64.js";

// Helper to write a base64 string to a binary file and ensure directories exist
function writeBinary(destPath, base64Data) {
  try {
    const parentDir = path.dirname(destPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(destPath, buffer);
    console.log(`[Self-Healing] Successfully restored uncorrupted binary image: ${destPath} (${buffer.length} bytes)`);
  } catch (error) {
    console.error(`[Self-Healing] Error restoring binary image to ${destPath}:`, error);
  }
}

// 1. Restore to public directory
writeBinary("public/og-image.png", ogImageBase64);

// 2. Also restore directly to dist directory as a safe fallback for builds/deploys
writeBinary("dist/og-image.png", ogImageBase64);
