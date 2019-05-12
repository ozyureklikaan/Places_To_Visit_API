const express = require('express'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();

const yerlerRoutes = require('./routes/yerlerRoutes');

//boylerplayed ?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/single_page/homepage.html"));
});

app.use("/api/yerler", yerlerRoutes);

const server = app.listen(port, () => {
    console.log("Server has been launched %d th port", port);
});