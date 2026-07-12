import http from "node:http";

export function proxyRequest(req, res, target) {
  const url = new URL(target);

  const options = {
    hostname: url.hostname,
    port: url.port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);

    proxyRes.pipe(res);
  });

  proxyReq.on("error", (error) => {
    console.error(error);

    res.writeHead(502, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        success: false,
        message: "Bad Gateway",
      })
    );
  });

  req.pipe(proxyReq);
}