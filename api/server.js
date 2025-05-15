require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT;
const apiKey = process.env.SPOONACULAR_API_KEY;

if (!apiKey) {
  console.error("ERROR: SPOONACULAR_API_KEY is not set in .env file!");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.get("/api/search", async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Search query:", query);

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const apiUrl = `https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${apiKey}&includeNutrition=true`;

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

app.get("/api/ingredient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Ingredient ID:", id);

    if (!process.env.SPOONACULAR_API_KEY) {
      console.error("API key is missing");
      return res.status(500).json({
        error: "Server configuration error",
        details: "API key is not configured",
      });
    }

    const response = await axios.get(
      `https://api.spoonacular.com/food/ingredients/${id}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          amount: 100,
          unit: "g",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    res.status(500).json({
      error: "Failed to fetch ingredient details",
      details: error.message,
      apiError: error.response?.data,
    });
  }
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    details: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("Available endpoints:");
  console.log("- GET /api/search?query=<search-term>");
  console.log("- GET /api/ingredient/:id");
});
