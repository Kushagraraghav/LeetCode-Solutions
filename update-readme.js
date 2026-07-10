const fs = require("fs");

const stats = JSON.parse(fs.readFileSync("stats.json", "utf8"));

const total =
  stats.easy + stats.medium + stats.hard;

const section = `
## 📊 GitHub Upload Stats

| Difficulty | Count |
|------------|------:|
| 🟢 Easy | ${stats.easy} |
| 🟡 Medium | ${stats.medium} |
| 🔴 Hard | ${stats.hard} |
| **Total Uploaded** | **${total}** |

_Last Updated Automatically_
`;

let readme = fs.readFileSync("README.md", "utf8");

const start = "<!-- STATS_START -->";
const end = "<!-- STATS_END -->";

const regex = new RegExp(
  `${start}[\\s\\S]*${end}`
);

readme = readme.replace(
  regex,
  `${start}\n${section}\n${end}`
);

fs.writeFileSync("README.md", readme);
