const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 443;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const controller = require("./controller")

app.use(bodyParser.json());
app.use(cors());
// app.use("/", route);

//connectDB();

io.on('connection', (socket) => { // event when connection received
    console.log("socket connection complete");

    socket.on('login', async (packet, callback) => {
        callback(await controller.login(packet));
    });

    socket.on('change_channel', async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on('request_roominfo', async (packet, callback) => {
        callback(await controller.request_roominfo(packet));
    });

    socket.on('create_room', async (packet, callback) => {
        callback(await controller.create_room(packet));
        io.emit('create_room', request_roominfo(packet));
    });

    socket.on('enter_room', async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on('emotion', async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on('request_kick', async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on('ready', async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on('change_like', async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on('change_hate', async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on('logout', async (packet, callback) => {
        callback(controller.change_channel(packet));
    });
});

server.listen(PORT, () => {
    console.log('server is listening on port ' + PORT);
})