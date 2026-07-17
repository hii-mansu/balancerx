import http from "node:http";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200);
    return res.end("OK");
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      backend: "Backend-2",
      method: req.method,
      url: req.url,
      time: new Date().toISOString(),
    })
  );
});

server.listen(5002, () => {
  console.log("Backend-2 running on port 5002");
});