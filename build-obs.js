const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");

// 1. Membaca file asli dari folder src
const filePath = "./src/apps.js";
const fileCode = fs.readFileSync(filePath, "utf8");

// 2. Melakukan proses pengaburan tingkat tinggi
const obfuscationResult = JavaScriptObfuscator.obfuscate(fileCode, {
  compact: true,
  controlFlowFlattening: true,
  deadCodeInjection: true,
  stringArray: true,
  splitStrings: true,
});

// 3. Menyimpan hasil acak otomatis ke folder produksi (assets/js/apps.js)
fs.writeFileSync(
  "./assets/js/apps.js",
  obfuscationResult.getObfuscatedCode(),
  "utf8",
);
console.log("✅ Berhasil mengamankan apps.js ke folder produksi!");
