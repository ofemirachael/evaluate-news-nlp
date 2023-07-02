var path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mockAPIResponse = require("./mockAPI.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;

console.log(`Your API key is ${process.env.API_KEY}`);
console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
  console.log("Example app listening on port 8082!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

const translateWord = async (test) => {
  console.log(
    `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=auto&url=${test.url}`
  );

  const response = await fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=auto&url=${test.url}`,
    {
      method: "POST",
    }
  );

  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error ", error);
  }
};

app.post("/translate", (req, res) => {
  const data = req.body;
  console.log(data);
  translateWord(data).then((result) => {
    res.send(result);
  });
});
