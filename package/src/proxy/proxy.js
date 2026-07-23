import http from "node:http";
import {
  incrementConnections,
  decrementConnections,
} from "../connections/connectionStore.js";
import { logError, logRequest } from "../logger/logger.js";

export function proxyRequest(req, res, target) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const url = new URL(target);

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    incrementConnections(target);

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);

      proxyRes.pipe(res);

      proxyRes.on("end", () => {
        decrementConnections(target);

        logRequest({
          method: req.method,
          url: req.url,
          target,
          statusCode: proxyRes.statusCode,
          duration: Date.now() - startTime,
        });

        resolve();
      });
    });

    proxyReq.on("error", (error) => {
      decrementConnections(target);

      logError({
        method: req.method,
        url: req.url,
        target,
        error,
      });

      reject(error);
    });

    req.pipe(proxyReq);
  });
}
