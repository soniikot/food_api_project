import sqlite3 from "sqlite3";

const sql3 = sqlite3.verbose();

const connected = (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
    return;
  }
  console.log("Connected to database");
};

const DB = new sql3.Database(
  "./api/pastSearch.db",
  sql3.OPEN_READWRITE,
  connected
);

let sql = `CREATE TABLE IF NOT EXISTS past_searches(
    search_id INTEGER PRIMARY KEY,
    search_query TEXT NOT NULL,
    search_data TEXT NOT NULL,
    search_date TEXT DEFAULT CURRENT_TIMESTAMP
)`;

DB.run(sql, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table created successfully");
  }
});

export const saveSearch = (query, data) => {
  return new Promise((resolve, reject) => {
    if (!query || !data) {
      reject(new Error("Query and data are required"));
      return;
    }

    try {
      const jsonData = JSON.stringify(data);
      const sql = `INSERT INTO past_searches (search_query, search_data) VALUES (?, ?)`;
      DB.run(sql, [query, jsonData], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    } catch (error) {
      reject(new Error("Failed to stringify search data: " + error.message));
    }
  });
};

export const getRecentSearches = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT search_id, search_query, search_date FROM past_searches ORDER BY search_date DESC LIMIT 5`;
    DB.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
