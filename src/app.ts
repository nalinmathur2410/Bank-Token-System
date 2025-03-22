import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

// Import Routes
import usersRouter from "./routes/users";
import indexRouter from "./routes/index";
import displayRouter, { setupDisplaySockets } from "./routes/display";
import officerRouter, { setupOfficerSockets } from "./routes/officer";
import agentRouter from "./routes/agent";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

setupOfficerSockets(io);
setupDisplaySockets(io);

app.use(
  session({
    secret: "your_secret_key", // 🔑 Change this in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/queue", // Your MongoDB connection
      collectionName: "sessions", // Where sessions will be stored
    }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);


// Store `io` inside `app` so routes can access it
(app as any).io = io;

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/queue")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/officer", officerRouter(io));
app.use("/agent", agentRouter(io));
app.use("/display", displayRouter(io));

// Error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("❌ Not Found");
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { io, server };
export default app;
