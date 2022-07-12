const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 443;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const controller = require("./controller");
const { getPackedSettings } = require("http2");
const { request } = require("http");

app.use(bodyParser.json());
app.use(cors());
app.use("/oauth", require("./router/oauth"));
// app.use("/", route);

//connectDB();

io.on("connection", (socket) => {
    // event when connection received
    console.log("socket connection complete");

    socket.on("change_channel", async (packet, callback) => {
        // packet {user_id, channel_from, channel_to, password}
        const data = await controller.change_channel(packet);

        if (data != null && data.rowCount == 1) {
            if (packet.channel_from != null) {
                io.to(packet.channel_from).emit("change_channel", request_users({
                    channel_id: packet.channel_from
                }));
            }
            io.to(packet.channel_to).emit("change_channel", request_users({
                channel_id: packet.channel_to
            }));
            callback(true);
        }
        else {
            console.log("change_channel failed");
            console.log(data)
            callback(false);
        }
    });

    socket.on('request_userinfo', async (packet, callback) => {
        // packet {user_id}
        const data = await controller.request_userinfo(packet);

        if (data.rowCount == 1) {
            callback(data.rows[0]);
        }
        else {
            console.log("request_userinfo failed");
            console.log(data)
            callback(null);
        }
    });

    socket.on("request_users", async (packet, callback) => {
        // packet {channel_id}
        const data = await controller.request_users(packet);

        callback({
            rowCount: data.rowCount,
            rows: data.rows
        });
    });

    socket.on("request_rooms", async (packet, callback) => {
        // packet {channel_id}
        const data = await controller.request_rooms(packet);

        callback({
            rowCount: data.rowCount,
            rows: data.rows
        });
    });

    socket.on("create_room", async (packet, callback) => {
        // packet {name, menu, max_capacity, create_time, complete, channel_id}
        const data = await controller.create_room(packet);

        if (data.rowCount == 1) {
            io.to(packet.channel_id).emit("create_room", request_rooms({
                channel_id: packet.channel_id
            }));
            callback(true);
        }
        else {
            console.log("change_channel failed");
            console.log(data)
            callback(false);
        }
    });

    socket.on("enter_room", async (packet, callback) => {
        // packet {room_id}

        const data = await controller.enter_room(packet);

        if (data != null && data.rowCount == 1) {
            io.to(packet.room_id).emit("enter_room", users_in_room({
                room_id: packet.room_id
            }));
            callback(true);
        }
        else {
            console.log("enter_room failed");
            console.log(data)
            callback(false);
        }
    });

    socket.on("emotion", async (packet, callback) => {
        // packet {user_id, room_id, emotion}

        io.to(room_id).emit("emotion", packet);
    });

    socket.on("request_kick", async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on("ready", async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on("change_love", async (packet, callback) => {
        // packet {user_id, channel_id, love}
        const data = await controller.change_channel(packet);

        if (data != null && data.rowCount == 1) {
            callback(true);
        }
        else {
            console.log("change_love failed");
            console.log(data)
            callback(false);
        }
    });

    socket.on("change_hate", async (packet, callback) => {
        callback(await controller.change_channel(packet));
    });

    socket.on("logout", async (packet, callback) => {
        callback(controller.change_channel(packet));
    });
});

server.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
});
