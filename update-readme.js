const fs = require("fs");

// Read stats.json
const stats = JSON.parse(fs.readFileSync("stats.json", "utf8"));

const easy = stats.leetcode.easy || 0;
const medium = stats.leetcode.medium || 0;
const hard = stats.leetcode.hard || 0;

const total = easy + medium + hard;

// Latest uploaded problem
let latest = "N/A";

const hashes = stats.hashes || {};

const problems = Object.keys(hashes)
    .filter(name => name !== "README.md")
    .sort();

if (problems.length > 0) {
    latest = problems[problems.length - 1]
        .replace(/^0+\d+-/, "")
        .replace(/-/g, " ");
}

function progressBar(value, totalWidth = 20) {
    const filled = Math.round((value / Math.max(total, 1)) * totalWidth);
    return "█".repeat(filled) + "░".repeat(totalWidth - filled);
}

const dashboard = `

## 📊 Upload Dashboard

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 **Total Uploaded:** **${total}**

🟢 Easy

\`${progressBar(easy)}\` **${easy}**

🟡 Medium

\`${progressBar(medium)}\` **${medium}**

🔴 Hard

\`${progressBar(hard)}\` **${hard}**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 **Latest Upload**

✔ ${latest}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 Auto Synced using **LeetHub v2**

`;

let readme = fs.readFileSync("README.md", "utf8");

const start = "<!-- STATS_START -->";
const end = "<!-- STATS_END -->";

const regex = new RegExp(`${start}[\\s\\S]*${end}`);

readme = readme.replace(
    regex,
`${start}
${dashboard}
${end}`
);

fs.writeFileSync("README.md", readme);

console.log("README updated!");
