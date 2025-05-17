const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));
app.use("/assets", express.static("assets"));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("tap", (data) => {
        io.emit("displayTap", data); // Broadcast event to all connected clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});