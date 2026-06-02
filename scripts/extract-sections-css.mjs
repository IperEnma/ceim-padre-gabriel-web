import fs from "node:fs";

const html = fs.readFileSync("resources/index.html", "utf8");
const style = html.match(/<style>([\s\S]*?)<\/style>/)[1];
const lines = style.split(/\r?\n/);
const styleFirstLine = html.slice(0, html.indexOf("<style>")).split(/\r?\n/).length + 1;

function sliceFileLines(start, end) {
  return lines.slice(start - styleFirstLine, end - styleFirstLine).join("\n");
}

const marker = "/* ── SECTIONS (from index.html) ── */";
let out = fs.readFileSync("src/app/ceim.css", "utf8");
if (out.includes(marker)) {
  out = out.slice(0, out.indexOf(marker)).trimEnd();
}
out += `\n\n${marker}\n`;
out += sliceFileLines(408, 812);
out += "\n";
out += sliceFileLines(1524, 1685);
fs.writeFileSync("src/app/ceim.css", out);
console.log("Appended section CSS");
