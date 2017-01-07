var express = require("express");
app = express();

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

app.use("/js", express.static(__dirname + "/static/js"));

app.listen(5000);
