import http from "node:http";



const server = http.createServer((req, res) => {

  res.writeHead(200, {

    "Content-Type": "application/json",

  });



  res.end(

    JSON.stringify({

      backend: "Backend-1gg",

      method: req.method,

      url: req.url,

      time: new Date().toISOString(),

    })

  );

});



server.listen(5001, () => {

  console.log("Backend-1 running on port 5001");

});