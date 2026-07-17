import { selectTarget } from "../selector/selectTarget.js";
import { proxyRequest } from "../proxy/proxy.js";

export function requestHandler(req, res) {
  const target = selectTarget();
   console.log(`${req.method} ${req.url} -> ${target}`);

  proxyRequest(req, res, target);
}