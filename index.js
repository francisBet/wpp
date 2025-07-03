import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Para __dirname funcionar em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos em ./public (nosso index.html)
app.use(express.static(path.join(__dirname, "public")));

app.get("/exec", (req, res) => {
  const command = req.query.cmd;
  if (!command) {
    return res.status(400).send("Missing 'cmd' query parameter.");
  }

  console.log(`Executing as root: ${command}`);
  exec(command, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
    let output = "";
    if (error) {
      console.error(`Error: ${error.message}`);
      output += `Error:\n${error.message}\n`;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      output += `Stderr:\n${stderr}\n`;
    }
    output += `Stdout:\n${stdout}`;
    res.type("text/plain").send(output);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} (root execution allowed)`);
});
