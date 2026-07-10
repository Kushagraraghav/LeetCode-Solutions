const fs = require("fs");

const stats = JSON.parse(fs.readFileSync("stats.json", "utf8"));

const easy = stats.leetcode.easy || 0;
const medium = stats.leetcode.medium || 0;
const hard = stats.leetcode.hard || 0;
const solved = stats.leetcode.solved || (easy + medium + hard);

function bar(value, total, color) {
    const length = 10;
    const filled = Math.round((value / Math.max(total, 1)) * length);
    return color.repeat(filled) + "⬜".repeat(length - filled);
}

// Last Updated
const lastDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
});

// Recent Problems (last 5 by problem number)
const recent = Object.keys(stats.leetcode.shas)
    .filter(key => /^\d/.test(key))
    .sort((a, b) => {
        const na = parseInt(a.split("-")[0]);
        const nb = parseInt(b.split("-")[0]);
        return nb - na;
    })
    .slice(0, 5)
    .map(problem => {
        return problem
            .replace(/^\d+-/, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());
    });

const dashboard = `

## 📊 Upload Dashboard

🚀 **Total Uploaded:** **${solved}**

🟢 **Easy (${easy})**

${bar(easy, solved, "🟩")}

🟡 **Medium (${medium})**

${bar(medium, solved, "🟨")}

🔴 **Hard (${hard})**

${bar(hard, solved, "🟥")}

---

## 📚 Recently Solved

${recent.map(p => `✔ ${p}`).join("\n")}

---

## 📈 Repository Overview

📂 Repository : **LeetCode Solutions**

🧩 Problems Uploaded : **${solved}**

📅 Last Updated : **${lastDate}**

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

console.log("README Updated Successfully!");
