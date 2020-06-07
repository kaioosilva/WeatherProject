const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({extended: true }));

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    const query = req.body.cityName
    const apiKey = "a7374b23e406034b5ccae30f06c1847";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + " &appid=" + apiKey +"e&units=" + unit;
    https.get(url, (response) => {
        console.log(response);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + description + "</p>")
            res.write("<h1>The temperature in " + query + " is " + temperature + " degrees Celcius</h1>");
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    });
})

    

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})