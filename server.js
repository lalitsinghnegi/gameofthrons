const app = require("./app.js");

let server = app.listen(3000, function () {
  console.log("server started...");
});

//ser timeout to 10 min
server.timeout = 600000;
