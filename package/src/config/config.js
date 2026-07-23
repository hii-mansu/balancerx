import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configFile = fs.readFileSync(
  path.join(__dirname, "config.yaml"),
  "utf8"
);

export const config = YAML.parse(configFile);