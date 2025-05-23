require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT;
const apiKey = process.env.SPOONACULAR_API_KEY;

app.use(cors());
app.use(express.json());

app.get("/api/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=3&sort=calories&apiKey=${apiKey}&addRecipeInformation=true`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({
      error: "Failed to fetch data from Spoonacular API",
      details: error.message,
    });
  }
});

app.get("/api/ingredients/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const apiUrl = `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${apiKey}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({
      error: "Failed to fetch data from Spoonacular API",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
