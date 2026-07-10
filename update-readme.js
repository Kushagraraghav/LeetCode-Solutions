const fs = require("fs");

const stats = JSON.parse(fs.readFileSync("stats.json", "utf8"));

const easy = stats.leetcode.easy;
const medium = stats.leetcode.medium;
const hard = stats.leetcode.hard;

const total = easy + medium + hard;

const section = `
## 📊 GitHub Upload Stats

| Difficulty | Count |
|------------|------:|
| 🟢 Easy | ${easy} |
| 🟡 Medium | ${medium} |
| 🔴 Hard | ${hard} |
| **Total Uploaded** | **${total}** |

_Last Updated Automatically_
`;

let readme = fs.readFileSync("README.md", "utf8");

const start = "<!-- STATS_START -->";
const end = "<!-- STATS_END -->";

const regex = new RegExp(`${start}[\\s\\S]*${end}`);

readme = readme.replace(
    regex,
`${start}

${section}

${end}`
);

fs.writeFileSync("README.md", readme);

console.log("README Updated Successfully!");
