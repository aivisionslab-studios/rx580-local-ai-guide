import fs from 'fs';

async function convertImage() {
  const source = 'src/assets/images/og_image_1781278115790.jpg';
  const target = 'public/og-image.png';

  console.log('[OG Image Auto-Converter] Checking image sources...');
  
  if (!fs.existsSync(source)) {
    console.log(`[OG Image Auto-Converter] Source image not found at ${source}. Skipping conversion.`);
    return;
  }

  try {
    const { Jimp } = await import('jimp');
    const image = await Jimp.read(source);
    await image.write(target);
    console.log(`[OG Image Auto-Converter] Successfully converted ${source} to ${target} (real PNG)!`);
  } catch (error) {
    console.warn('\n[OG Image Auto-Converter] WARNING: Could not auto-convert OG Image.');
    console.warn('Reason:', error.message || error);
    console.warn('To fix this, please run "npm install" on your terminal to install dependencies (including "jimp").');
    console.warn('Continuing build using existing files...\n');
  }
}

convertImage();
