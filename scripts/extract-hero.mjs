import fs from "node:fs";

const html = fs.readFileSync("resources/index.html", "utf8");
const lines = html.split(/\r?\n/);

for (let i = 1713; i <= 1775; i++) {
  let l = lines[i - 1] ?? "";
  if (l.includes("base64,")) {
    l = l.replace(/src="data:image[^"]+"/, 'src="[BASE64]"');
  }
  console.log(`${i}|${l.slice(0, 220)}`);
}

const logoMatch = html.match(
  /<img class="nav-logo-img"\s+src="(data:image\/png;base64,[^"]+)"/,
);
if (logoMatch) {
  fs.writeFileSync("src/lib/ceim-logo.ts", `export const CEIM_LOGO_SRC = ${JSON.stringify(logoMatch[1])};\n`);
  console.log("\nWrote src/lib/ceim-logo.ts", logoMatch[1].length, "chars");
}
