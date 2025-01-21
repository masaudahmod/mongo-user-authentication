import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { origin } from "./constant.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin,
  })
);

app.use(cookieParser());

import { errorHandler } from "./middleware/errorHandler.middleware.js";
import userRouter from "./route/user.route.js";

app.use("/api/v1", userRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found! 404" });
});

export { app };
