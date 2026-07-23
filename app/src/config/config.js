import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { validateConfig } from "./validateConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, "../../config.yaml");

const configFile = fs.readFileSync(configPath, "utf8");

export const config = YAML.parse(configFile);

validateConfig(config);