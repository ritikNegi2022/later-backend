import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// import routes
import Router from "./routes/routes.js";

// routes declaration
app.use("/api/vi", Router);

export { app };
