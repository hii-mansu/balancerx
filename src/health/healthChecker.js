import { config } from "../config/config.js";
import { setHealth } from "./healthStore.js";

export async function checkTarget(target) {
  try {
    const response = await fetch(`${target}/health`);

    setHealth(target, response.ok);

    console.log(
      `[Health] ${target} -> ${response.ok ? "Healthy" : "Unhealthy"}`
    );
  } catch (error) {
    setHealth(target, false);

    console.log(`[Health] ${target} -> Unhealthy`);
  }
}

export async function checkAllTargets() {
  await Promise.all(config.targets.map((target) => checkTarget(target)));
}