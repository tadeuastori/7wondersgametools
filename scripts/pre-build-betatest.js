import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

function bumpVersion(version) {
  const parts = version.split(".").map(Number);
  parts[2]++;
  return parts.join(".");
}

pkg.betaTestVersion = bumpVersion(pkg.betaTestVersion || "0.0.0");

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");

console.log(`betaTestVersion atualizado para ${pkg.betaTestVersion}`);
