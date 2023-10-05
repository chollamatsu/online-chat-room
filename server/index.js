const express = require('express');
const http = require('http');
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);// all connect with to client side they'll get their id.

    socket.on("join_room", (data) => {// pass data from client as the room id by the way the data is grabed from input form
        socket.join(data);
        console.log(`User with id: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);// to(data.room)-> emit data back to the same room
    })

    /* socket.on("play", ({ id, roomCode }) => {
        console.log(`play at ${id} to ${roomCode}`);
        socket.broadcast.to(roomCode).emit("updateGame", id);
      }); */

    socket.on("play", (data) => {
        console.log("data from play:", data)
        // console.log(`play at ${data.id} to ${socket.id}`);
        socket.broadcast.to(data.room).emit("updateGame", data);
    })
    socket.on("disconnect", ()=> {
        console.log(`user disconnected: ${socket.id}`);
    });
});

server.listen(3001, () => {
    //use port=3001 -> reac running on port 3001
    console.log("server is listening...")
})