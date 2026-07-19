import http from "node:http";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    return setTimeout(() => {
      res.writeHead(200);
      res.end("OK");
    }, 1000);
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  setTimeout(() => {
      res.end(
    JSON.stringify({
      backend: "Backend-1",
      method: req.method,
      url: req.url,
      time: new Date().toISOString(),
    })
  );
}, 5000);


});

server.listen(5001, () => {
  console.log("Backend-1 running on port 5001");
});