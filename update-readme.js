const fs = require("fs");
const { execSync } = require("child_process");

// Read stats.json
const stats = JSON.parse(fs.readFileSync("stats.json", "utf8"));

const easy = stats.leetcode?.easy || 0;
const medium = stats.leetcode?.medium || 0;
const hard = stats.leetcode?.hard || 0;

const total = easy + medium + hard;

// Progress Bar Function
function bar(value, total, color) {
  const length = 10;
  const filled = Math.round((value / Math.max(total, 1)) * length);
  return color.repeat(filled) + "⬜".repeat(length - filled);
}

// Get latest uploaded folder from git
let latest = "N/A";

try {
  const files = execSync("git diff-tree --no-commit-id --name-only -r HEAD")
    .toString()
    .trim()
    .split("\n");

  const folder = files.find(
    (f) =>
      /^\d{4}-/.test(f) || // 0001-two-sum
      /^\d{3,5}-/.test(f)
  );

  if (folder) {
    latest = folder
      .split("/")[0]
      .replace(/^\d+-/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
} catch (e) {}

// Last Commit Date
let lastDate = "";

try {
  lastDate = execSync("git log -1 --format=%cd --date=short")
    .toString()
    .trim();
} catch (e) {}

const dashboard = `
## 📊 Upload Dashboard

🚀 **Total Uploaded:** **${total}**

🟢 **Easy (${easy})**

${bar(easy, total, "🟩")}

🟡 **Medium (${medium})**

${bar(medium, total, "🟨")}

🔴 **Hard (${hard})**

${bar(hard, total, "🟥")}

---

## 📈 Repository Overview

📂 Repository : **LeetCode Solutions**

🧩 Problems Uploaded : **${stats.leetcode.solved}**

🤖 Auto Synced using **LeetHub v2**

📅 Last Updated : **${lastDate}**

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

console.log("README updated successfully!");
