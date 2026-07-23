import dotenv from "dotenv";

dotenv.config();

export function validateConfig(config) {
  const errors = [];

const port = Number(process.env.PORT);
console.log(port);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  errors.push("Port must be between 1 and 65535.");
}

  const algorithms = ["round-robin", "least-connections"];

  if (!algorithms.includes(config.algorithm)) {
    errors.push(
      `Invalid algorithm "${config.algorithm}".`
    );
  }

  if (!Array.isArray(config.targets) || config.targets.length === 0) {
    errors.push("At least one backend target is required.");
  }

  for (const target of config.targets) {
    try {
      new URL(target);
    } catch {
      errors.push(`Invalid target URL: ${target}`);
    }
  }

  if (errors.length > 0) {
    console.error("\n❌ Invalid configuration:\n");

    for (const error of errors) {
      console.error(`- ${error}`);
    }

    process.exit(1);
  }
}