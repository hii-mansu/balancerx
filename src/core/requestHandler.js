import { selectTarget } from "../selector/selectTarget.js";
import { proxyRequest } from "../proxy/proxy.js";
import { getHealthyTargets } from "../health/healthStore.js";
import { config } from "../config/config.js";

export async function requestHandler(req, res) {
  const canRetry = ["GET", "HEAD", "OPTIONS"].includes(req.method);
  const availableTargets = [...getHealthyTargets(config.targets)];

  if (!availableTargets.length) {
    return res
      .writeHead(503, {
        "Content-Type": "application/json",
      })
      .end(
        JSON.stringify({
          success: false,
          message: "No healthy backend servers available.",
        }),
      );
  }

  while (availableTargets.length > 0) {
    const target = selectTarget(availableTargets);

    try {
      await proxyRequest(req, res, target);
      return;
    } catch (error) {
  console.error(`Proxy failed for ${target}:`, error.message);

  const index = availableTargets.indexOf(target);
  availableTargets.splice(index, 1);

  if (!canRetry) {
    break;
  }
}
  }

  return res
    .writeHead(502, {
      "Content-Type": "application/json",
    })
    .end(
      JSON.stringify({
        success: false,
        message: "All backend servers failed.",
      }),
    );
}