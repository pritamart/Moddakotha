const express = require("express");
const app = express();
const dotenv = require("dotenv");
const body_parser = require("body-parser");
const cors = require("cors");
const db_connect = require("./utils/db");

// Load environment variables from .env file
dotenv.config();

app.use(body_parser.json())

if (process.env.mode === "production") {
  app.use(cors(
    {
      origin: "http://192.250.226.157:3000",
    }
  ))
} else {
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
}

app.use('/', require("./routes/authRoutes"));
app.use('/', require("./routes/newsRoute"));
app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.port;
db_connect();
app.listen(port, () => console.log(`Server is running ${port}!`));
