const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketio(server);

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Render the index page
app.get("/", (req, res) => {
  res.render("index");
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/Public/CSS/style.css", (req, res) => {
  res.set("Content-Type", "text/css");
  res.sendFile(__dirname + "/Public/CSS/style.css");
});

app.get("/Public/JS/Script.js", (req, res) => {
  res.set("Content-Type", "text/js");
  res.sendFile(__dirname + "/Public/JS/Script.js");
});
