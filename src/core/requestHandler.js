import { selectTarget } from "../selector/selectTarget.js";
import { proxyRequest } from "../proxy/proxy.js";

export function requestHandler(req, res) {
  const target = selectTarget();

  proxyRequest(req, res, target);
}