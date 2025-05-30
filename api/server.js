import express from "express";
import axios from "axios";
import { saveSearch, getRecentSearches } from "./connectToDatabase.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
const apiKey = process.env.SPOONACULAR_API_KEY;

const numberOfRecipes = 3;

app.use(bodyParser.json(), cors());

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to the Food API");
});

app.get("/api/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${numberOfRecipes}&sort=calories&sortDirection=asc&apiKey=${apiKey}&addRecipeInformation=true&instructionsRequired=true`;

    const response = await axios.get(apiUrl);

    await saveSearch(query, response.data);

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

app.get("/api/recent-searches", async (req, res) => {
  try {
    const searches = await getRecentSearches();
    res.json(searches);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch recent searches",
      details: error.message,
    });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err.message);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
