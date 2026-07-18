import { selectTarget } from "../selector/selectTarget.js";
import { proxyRequest } from "../proxy/proxy.js";

export function requestHandler(req, res) {
  const target = selectTarget();

  if (!target) {
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

  proxyRequest(req, res, target);
}
