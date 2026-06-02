import fs from "node:fs";

const html = fs.readFileSync("resources/index.html", "utf8");
const lines = html.split(/\r?\n/);

function dump(start, end) {
  for (let i = start; i <= end; i++) {
    let l = lines[i - 1] ?? "";
    if (l.includes("base64,")) l = l.replace(/src="[^"]+"/, 'src="[BASE64]"');
    console.log(`${i}|${l}`);
  }
}

console.log("=== HISTORIA ===");
dump(1774, 1832);
console.log("\n=== MVV ===");
dump(1833, 1917);
