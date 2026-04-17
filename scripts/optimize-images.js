import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath, ext);
  const outputDir = path.dirname(filePath);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Generate responsive sizes for mobile
    const sizes = [320, 640, 960, 1280];
    const formats = ['webp', 'avif'];

    for (const size of sizes) {
      const resizedImage = image.clone().resize(size, null, {
        fit: 'inside',
        withoutEnlargement: true
      });

      for (const format of formats) {
        const outputPath = path.join(outputDir, `${fileName}-${size}.${format}`);
        await resizedImage[format]({ quality: format === 'avif' ? 60 : 80 })
          .toFile(outputPath);
      }
    }

    // Generate original size in next-gen formats
    for (const format of formats) {
      await image[format]({ quality: format === 'avif' ? 60 : 80 })
        .toFile(path.join(outputDir, `${fileName}.${format}`));
    }

    console.log(`Optimized ${filePath}`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
      await optimizeImage(filePath);
    }
  }
}

// Run the optimization
processDirectory(PUBLIC_DIR)
  .then(() => console.log('Image optimization complete'))
  .catch(console.error); 