/**
 * main.ts - ai-excited-01 entry for make.fun
 *
 * Copies the bundled image `entry.png` (sitting next to this file) into the
 * output directory as `entry.png`. The output directory is
 * process.env.MAKEFUN_OUTPUT_DIR when set and non-empty, otherwise /output.
 *
 * The program is deterministic: it performs a byte-for-byte copy of a fixed
 * source file with no timestamps, no randomness and no network access, so two
 * runs produce identical output bytes.
 *
 * Safety checks:
 *   - the source file must exist,
 *   - the source file must not be empty and must start with the 8-byte PNG
 *     signature,
 *   - the written file must not be empty and its size must equal the source
 *     size, i.e. every byte was copied exactly.
 *
 * Node standard library only (node:fs, node:path).
 */

const fs = require("node:fs");
const path = require("node:path");

const PNG_SIGNATURE: Buffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function resolveOutputDir(): string {
  const configured: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
  if (configured !== undefined && configured.trim() !== "") {
    return configured;
  }
  return "/output";
}

function main(): void {
  const sourcePath: string = path.join(__dirname, "entry.png");
  const outputDir: string = resolveOutputDir();
  const targetPath: string = path.join(outputDir, "entry.png");

  if (!fs.existsSync(sourcePath)) {
    throw new Error(
      "Source image is missing: " + sourcePath + " (entry.png must sit next to main.ts)"
    );
  }

  const sourceBytes: Buffer = fs.readFileSync(sourcePath);
  const sourceSize: number = sourceBytes.length;

  if (sourceSize === 0) {
    throw new Error("Source image is empty: " + sourcePath);
  }

  if (sourceSize < 8) {
    throw new Error("Source image is too small to be a PNG: " + sourcePath);
  }

  if (!sourceBytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("Source image is not a PNG (bad signature): " + sourcePath);
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(targetPath, sourceBytes);

  const writtenSize: number = fs.statSync(targetPath).size;
  if (writtenSize === 0) {
    throw new Error("Written image is empty: " + targetPath);
  }
  if (writtenSize !== sourceSize) {
    throw new Error(
      "Written image size " + writtenSize + " does not match source size " + sourceSize
    );
  }

  process.stdout.write(
    "Wrote " + targetPath + " (" + writtenSize + " bytes) from " + sourcePath + "\n"
  );
}

main();
process.exitCode = 0;
