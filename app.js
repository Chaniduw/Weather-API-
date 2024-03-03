const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "9f6128e48634878d1755a31aebab5b86";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherHeading =
        "<h1 style='color: #333; text-align: center; margin-bottom: 20px; font-size: 36px; font-family: Arial, sans-serif;'>Weather is currently " +
        weatherDescription +
        "</h1>";
      const tempHeading =
        "<h2 style='color: #555; text-align: center; font-size: 24px; font-family: Arial, sans-serif;'>Temperature in " +
        query +
        " is " +
        temp +
        " degrees Celsius</h2>";
      const weatherIcon =
        "<img style='display: block; margin: 20px auto; width: 100px; height: 100px;' src=" +
        imageURL +
        ">";

      res.write(weatherHeading);
      res.write(tempHeading);
      res.write(weatherIcon);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
