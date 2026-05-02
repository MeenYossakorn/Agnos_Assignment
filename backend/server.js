const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("new-patient", (data) => {
    console.log("New patient:", data);

    
    io.emit("receive-patient", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});