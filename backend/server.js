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

const activePatients = new Map();
const typingPatients = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("active-patients-list", Array.from(activePatients.values()));
  socket.emit("typing-patients-list", Array.from(typingPatients.values()));

  socket.on("patient-active", (data) => {
    activePatients.set(socket.id, {
      socketId: socket.id,
      ...data
    });
    io.emit("active-patients-list", Array.from(activePatients.values()));
  });

  // submit
  socket.on("new-patient", (data) => {
    console.log("New patient:", data);
    io.emit("receive-patient", data);
  });

  // typing realtime
  socket.on("patient-typing", (data) => {
    typingPatients.set(socket.id, {
      socketId: socket.id,
      ...data
    });
    io.emit("typing-patients-list", Array.from(typingPatients.values()));
  });

  // stop typing
  socket.on("patient-stop-typing", () => {
    typingPatients.delete(socket.id);
    io.emit("typing-patients-list", Array.from(typingPatients.values()));
  });

  // step progress
  socket.on("patient-step", (data) => {
    socket.broadcast.emit("patient-step", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    activePatients.delete(socket.id);
    typingPatients.delete(socket.id);
    io.emit("active-patients-list", Array.from(activePatients.values()));
    io.emit("typing-patients-list", Array.from(typingPatients.values()));
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});