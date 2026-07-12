import { config } from "../config/config.js";

export function selectTarget() {
  return config.targets[0];
}