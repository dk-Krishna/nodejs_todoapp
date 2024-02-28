import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import cors from "cors";

// importing environtment variable
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const app = express();

// Importing & Using Routes
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// using middlewares
app.use(bodyParser.urlencoded({ extended: false })); // for using req.body in form
app.use(express.json()); // for using req.body in postman
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);

export default app;

// using error middleware
app.use(errorMiddleware);

// AT time of deployement we don't need to enter following in package.json file
// "start": "set NODE_ENV=Production&& node ./server.js",
// "dev": "set NODE_ENV=Development&& nodemon ./server.js"
