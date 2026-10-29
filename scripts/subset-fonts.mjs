import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";

const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "fonts") continue;
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(path);
    else if (/\.(tsx?|css|md)$/.test(entry.name)) files.push(path);
  }
}
walk(".");

const chars = new Set();
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const char of text) {
    if (char.trim() && char.charCodeAt(0) > 127) chars.add(char);
  }
}
for (const char of "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.+-_/:'.,!?;()&") {
  chars.add(char);
}

const text = [...chars].join("");
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
};

async function fetchWeight(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl, { headers })).text();
  const match = css.match(/url\(([^)]+)\)/);
  if (!match) throw new Error(`No font URL for ${family} ${weight}`);
  const bytes = Buffer.from(await (await fetch(match[1], { headers })).arrayBuffer());
  return bytes;
}

mkdirSync("app/fonts", { recursive: true });
const jobs = [
  ["Instrument+Sans", "400", "app/fonts/sans-400.woff2"],
  ["Instrument+Sans", "500", "app/fonts/sans-500.woff2"],
];

for (const [family, weight, dest] of jobs) {
  const bytes = await fetchWeight(family, weight);
  writeFileSync(dest, bytes);
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  console.log(`${dest} ${bytes.length} ${hash}`);
}
