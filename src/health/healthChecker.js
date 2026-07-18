import { config } from "../config/config.js";
import { setHealth } from "./healthStore.js";

export async function checkTarget(target) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, config.healthCheck.timeout);

  try {
    const response = await fetch(`${target}/health`, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    setHealth(target, response.ok);

    console.log(
      `[Health] ${target} -> ${response.ok ? "Healthy" : "Unhealthy"}`
    );
  } catch {
    clearTimeout(timeout);

    setHealth(target, false);

    console.log(`[Health] ${target} -> Unhealthy`);
  }
}

export async function checkAllTargets() {
  await Promise.all(config.targets.map(checkTarget));
}