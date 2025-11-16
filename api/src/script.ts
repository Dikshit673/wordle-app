import {
  english50,
  english55,
  english60,
} from "wordlist-js";
import { writeFileSync } from "fs";
import path from "path";

const allWords = new Set<string>([
  ...english50,
  ...english55,
  ...english60,
]);

// filter lengths 3–8
const wordMap: Record<string, string[]> = {};

for (let len = 4; len <= 8; len++) {
  wordMap[len] = Array.from(allWords).map((w) => w.toLowerCase()).filter((w) => /^[a-z]+$/.test(w)).filter((w) => w.length === len);
}

const outfile = path.join(process.cwd(), "wordMap.json");

writeFileSync(outfile, JSON.stringify(wordMap, null, 2));

console.log("Generated:", outfile);
