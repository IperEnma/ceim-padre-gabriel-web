import fs from "node:fs";

const html = fs.readFileSync("resources/index.html", "utf8");
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error("No <style> block found");

const style = styleMatch[1];
const lines = style.split(/\r?\n/);
const styleStartFileLine = html.indexOf("<style>") + "<style>".length;
const styleFirstLine =
  html.slice(0, html.indexOf("<style>")).split(/\r?\n/).length + 1;

function fileLineToIndex(fileLine) {
  return fileLine - styleFirstLine;
}

function sliceFileLines(startFileLine, endFileLine) {
  return lines.slice(fileLineToIndex(startFileLine), fileLineToIndex(endFileLine)).join("\n");
}

const chunks = [
  { name: "nav-logo", start: 85, end: 108 },
  { name: "hero", start: 446, end: 679 },
  { name: "hero-responsive", start: 1362, end: 1454 },
  { name: "page-backgrounds", start: 1453, end: 1521 },
];

let out = fs.readFileSync("src/app/ceim.css", "utf8");
const marker = "/* ── HERO (from index.html) ── */";
if (out.includes(marker)) {
  out = out.slice(0, out.indexOf(marker)).trimEnd() + "\n";
}
{
  out += "\n\n" + marker + "\n";
  for (const c of chunks) {
    out += `\n/* ${c.name} */\n`;
    out += sliceFileLines(c.start, c.end);
    out += "\n";
  }
  out = out.replace(/\.libro-pagina/g, ".ceim-page");
  out = out.replace(/#pagina-inicio section/g, "#pagina-inicio .ceim-section");
  fs.writeFileSync("src/app/ceim.css", out);
  console.log("Wrote hero/nav/page CSS to ceim.css (style from file line", styleFirstLine + ")");
}
