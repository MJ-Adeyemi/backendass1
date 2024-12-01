const express = require("express");
const bodyParser = require("body-parser");
const { toWords } = require("number-to-words");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.use(bodyParser.json());

app.post("/number-to-words", (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number") {
    return res.status(400).json({
      error: "Invalid input. Please send a number in the request body.",
    });
  }

  try {
    const words = toWords(number);
    res.status(200).json({
      number,
      words,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while converting the number to words.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});