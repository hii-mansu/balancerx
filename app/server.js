import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { checkAllTargets } from "./src/health/healthChecker.js";
import { validateConfig } from "./src/config/validateConfig.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;
let activeRequests = 0;

validateConfig(config);
const server = app.listen(PORT, async () => {
  console.log(`BalancerX running on PORT ${PORT}`);

  await checkAllTargets();

  setInterval(checkAllTargets, 5000);
});

server.on("request", (req, res) => {
  activeRequests++;

  res.on("finish", () => {
    activeRequests--;
  });
});

function gracefulShutdown(signal) {
  console.log(`\n${signal} received. Shutting down. Waiting for ${activeRequests} active request.`);

  const forceShutdown = setTimeout(() => {
    console.log("Forcefully shutting down...");
    process.exit(1);
  }, 10000);

  server.close(() => {
    clearTimeout(forceShutdown);
    console.log("Server closed successfully.");
    process.exit(0);
  });
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));