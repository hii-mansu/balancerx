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
      backend: "Backend-2",
      path: req.url,
    })
  );
}, 5000);


});

server.listen(5002, () => {
  console.log("Backend-2 running on port 5002");
});