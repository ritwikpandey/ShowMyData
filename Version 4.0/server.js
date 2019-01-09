const express = require('express');
const app = express();
var port = process.env.PORT || 7000

app.use(express.static(__dirname +"/build"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("*", function (req, res) {
    
  res.sendFile(__dirname + "/build/index.html");
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} or http://127.0.0.1:${port}`);
});

