import express from "express";
import http from "http";
import logger from "morgan";
import httpError from "http-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const app = express();
dotenv.config();
const port = process.env.PORT;

const server = http.createServer(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// routes

app.get("/", (req, res) => {
  res.send("<h1>heyy from express.</h1>");
});

app.use((req, res, next) => {
  next(httpError(404, "route not found!"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "internal server error",
  });
});

server.listen(port, () => {
  console.log(`app listening at port: ${port}`);
});
