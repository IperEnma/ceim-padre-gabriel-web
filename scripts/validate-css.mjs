import fs from "fs";

const css = fs.readFileSync("src/app/ceim.css", "utf8");
for (const name of ["inicio", "historia", "feriados", "galeria"]) {
  const key = `--ceim-${name}-art: url("`;
  const s = css.indexOf(key);
  if (s === -1) {
    console.log(name, "NOT FOUND");
    continue;
  }
  const urlStart = s + key.length;
  const urlEnd = css.indexOf('")', urlStart);
  if (urlEnd === -1) {
    console.log(name, "UNCLOSED STRING");
    const snippet = css.slice(urlStart, urlStart + 80);
    console.log("  start:", snippet);
    continue;
  }
  const body = css.slice(urlStart, urlEnd);
  const rawQuotes = (body.match(/(?<!\\)"/g) || []).length;
  console.log(name, "OK", "len", body.length, "rawQuotes", rawQuotes);
}
