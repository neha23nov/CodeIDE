const express = require("express");
const router = express.Router();

router.post("/execute", async (req, res) => {
  const { language, code } = req.body;

  const languageMap = {
    python: "python",
    javascript: "javascript",
    c: "c",
    cpp: "cpp",
    java: "java",
    bash: "bash",
  };

  const filename =
    language === "python" ? "main.py" :
    language === "javascript" ? "main.js" :
    language === "java" ? "main.java" :
    language === "c" ? "main.c" :
    language === "cpp" ? "main.cpp" :
    language === "bash" ? "main.sh" : "main.txt";

  try {
    const response = await fetch(`https://glot.io/api/run/${languageMap[language]}/latest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        files: [{ name: filename, content: code }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Execution failed" });
  }
});

module.exports = router;