// Central place to:
// Use middlewares
// Attach routes
const express = require('express');
const authRoutes = require('./routes/auth.routes');//these are comes from express router as object
const taskRoutes = require("./routes/task.routes");
const testRoutes = require("./routes/test.routes");
const {getMe} = require("./controllers/auth.controller");//here getMe is made to function ,import from controller as object to get current user details
const cors = require('cors');
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.get("/test", (req, res) => res.send("Server is alive!"));
// Enable CORS for all routes
const cors = require('cors');

app.use(cors({
  origin: [
    "http://localhost:5173", // Keep this for local development
    "https://task-master-ruby-nine.vercel.app", // Add your Vercel production URL
    "https://task-master-git-main-sptpasus04-4116s-projects.vercel.app" // Add the specific one from your error
  ],
  credentials: true
}));
// Use authentication routes
app.use('/api/auth', authRoutes);//prefix all auth routes with /api/auth
// Use task routes
app.use("/api/tasks", taskRoutes);
// Use test routes
app.use("/api/test", testRoutes);
// Route to get current user details
app.get('/api/me', getMe);
module.exports = app;
