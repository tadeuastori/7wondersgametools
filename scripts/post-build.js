const fs = require("fs-extra");
const path = require("path");

const envFolders = ["alfatest", "betatest", "prod"];

async function moveBuildFiles(env) {
  const browserPath = path.join("docs", env, "browser");
  const targetPath = path.join("docs", env);

  if (await fs.pathExists(browserPath)) {
    console.log(`📦 Movendo build da pasta ${env}...`);
    try {
      await fs.copy(browserPath, targetPath);
      await fs.remove(browserPath);
      await fs.remove(path.join(targetPath, "prerendered-routes.json"));
      await fs.remove(path.join(targetPath, "3rdpartylicenses.txt"));
      console.log(`✅ Build movido para ${targetPath}`);
    } catch (err) {
      console.error(`❌ Erro ao mover arquivos de ${env}:`, err);
    }
  } else {
    console.log(`⚠️ Pasta ${browserPath} não encontrada. Ignorando...`);
  }
}

(async () => {
  console.log("🚀 Iniciando pós-build...");

  for (const env of envFolders) {
    await moveBuildFiles(env);
  }

  // Remove dist (se existir)
  if (await fs.pathExists("dist")) {
    console.log("🧹 Removendo pasta dist...");
    await fs.remove("dist");
  }

  console.log("🎉 Pós-build finalizado!");
})();
