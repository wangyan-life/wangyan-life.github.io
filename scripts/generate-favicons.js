#!/usr/bin/env node
/*
  generate-favicons.js
  Generate multi-size favicon files from public/favicon.png
  Outputs:
    - public/favicon-16x16.png
    - public/favicon-32x32.png
    - public/apple-touch-icon.png (180x180)
    - public/favicon.ico (contains 16x16,32x32,48x48)

  Usage: node ./scripts/generate-favicons.js
*/
import fs from "fs";
import path from "path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const PUBLIC = path.join(process.cwd(), "public");
const SRC = path.join(PUBLIC, "favicon.png");

async function ensureSource() {
  if (!fs.existsSync(SRC)) {
    console.error("Source favicon.png not found in public/. Please place your source image at public/favicon.png");
    process.exit(1);
  }
}

async function writePng(outputPath, size) {
  await sharp(SRC)
    .resize(size, size, { fit: "cover" })
    .png({ quality: 100 })
    .toFile(outputPath);
  console.log(`wrote ${outputPath}`);
}

async function main() {
  await ensureSource();

  const out16 = path.join(PUBLIC, "favicon-16x16.png");
  const out32 = path.join(PUBLIC, "favicon-32x32.png");
  const out48 = path.join(PUBLIC, "favicon-48x48.png");
  const outApple = path.join(PUBLIC, "apple-touch-icon.png");
  const outIco = path.join(PUBLIC, "favicon.ico");

  try {
    await writePng(out16, 16);
    await writePng(out32, 32);
    await writePng(out48, 48);
    await writePng(outApple, 180);

    // create ICO from PNGs (png-to-ico expects buffers of PNG)
    const buffers = await Promise.all([
      fs.promises.readFile(out16),
      fs.promises.readFile(out32),
      fs.promises.readFile(out48),
    ]);

    const icoBuf = await pngToIco(buffers);
    await fs.promises.writeFile(outIco, icoBuf);
    console.log(`wrote ${outIco}`);

    console.log("Favicons generated successfully.");
  } catch (err) {
    console.error("Error generating favicons:", err);
    process.exit(2);
  }
}

main();
