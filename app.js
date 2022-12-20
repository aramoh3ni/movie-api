const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world Root");
    res.end();
  }

  if (req.url === "/api/books") {
    res.write(
      JSON.stringify([{ id: 1, title: "How to Become Node Developer." }])
    );

    res.end();
  }
});

// server.addListener('connection', (socket) => {
//     console.log("New Connection...");
// })

server.listen(3000);

console.log("Listen on port 3000");
