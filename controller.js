const pool = require("./db");

class Controller {
}

controller = new Controller();

controller.login = async (packet) => {
    var data;

    data = await pool.query("select * from users where id = $1", [
        packet.id,
    ]);

    if (data.rowCount == 1) return;

    // else
    data = await pool.query(
        "insert into users (id, name, profile_image_url) values ($1,$2,$3) returning *",
        [packet.id, packet.name, packet.profile_iamge_url]
    );

    return data;
};

controller.change_channel = async (packet) => {
    var data;

    data = await pool.query("select * from channels where id = $1", [
        packet.channel_to,
    ]);

    if (data.rows[0].password != packet.password) {
        return null;
    }

    // else
    data = await pool.query(
        "update users set channel_id = $1 where id = $2 returning *",
        [packet.channel_to, packet.user_id]
    );

    return data;
};

controller.request_userinfo = async (packet) => {
    var data;

    data = await pool.query("select * from users where id = $1", [
        packet.user_id,
    ]);

    return data;
};

controller.request_roominfo = async (packet) => {
    var data;

    data = await pool.query("select * from rooms where id = $1", [
        packet.room_id,
    ]);

    return data;
};

controller.request_users = async (packet) => {
    var data;

    data = await pool.query("select * from users where channel_id = $1", [
        packet.channel_id,
    ]);

    return data;
};

controller.request_rooms = async (packet) => {
    var data;

    data = await pool.query("select * from rooms where channel_id = $1", [
        packet.channel_id,
    ]);

    return data;
};

controller.create_room = async (packet) => {
    var data;

    data = await pool.query(
        "insert into rooms values (default,$1,$2,$3,$4,$5,$6) returning *",
        [
            packet.name,
            packet.menu,
            packet.max_capacity,
            packet.created_time,
            packet.complete,
            packet.channel_id,
        ]
    );

    return data;
};

controller.enter_room = async (packet) => {

    if (users_in_room({ room_id: packet.room_id }).rowCount
        > request_roominfo({ room_id: packet.room_id }).rows[0].max_capacity) {
        return null;
    }

    var data;

    data = await pool.query(
        "insert into users_rooms values (default,$1,$2,$3) returning *",
        [packet.user_id, packet.room_id, false]
    );

    return data;
};

controller.users_in_room = async (packet) => {
    var data;

    data = await pool.query(
        "select * from users join users_rooms on users.id = users_rooms.user_id where users_rooms.room_id = $1",
        [packet.room_id]
    );

    return data;
}

controller.ready = async (packet) => {
    var data;

    data = await pool.query(
        "update users_rooms set ready_state = $1 where user_id = $2 and room_id = $3 returning *",
        [packet.ready_status, packet.user_id, packet.room_id]
    );

    return data;
};

controller.exit_room = async (packet) => {
    var data;

    data = await pool.query(
        "delete from users_rooms where user_id = $1 and room_id = $2 returning *",
        [packet.user_id, packet.room_id]
    );

    return data;
};

controller.change_love = async (packet) => {
    var data;

    data = await pool.query(
        "update users set love = $1 where user_id = $2 returning *",
        [packet.love, packet.user_id]
    );

    return data;
};

controller.change_hate = async (packet) => {
    var data;

    data = await pool.query(
        "update users set hate = $1 where user_id = $2 returning *",
        [packet.hate, packet.user_id]
    );

    return data;
};

module.exports = controller;
