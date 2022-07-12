const pool = require("./db");

class Controller {
    static select = async (packet) => {
        const users = await pool.query(
            "SELECT * FROM employees WHERE id = $1",
            [id]
        );
        return;
    };

    static login = async (packet) => {
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

    static change_channel = async (packet) => {
        var data;

        data = await pool.query("select * from channels where id = $1", [
            packet.channel_id,
        ]);

        if (data.rows[0].password != packet.password) {
            return null;
        }

        // else
        data = await pool.query(
            "update users set channel_id = $1 where id = $2 returning *",
            [packet.channel_id, packet.id]
        );

        data = await pool.query("select * from rooms where channel_id = $1", [
            packet.channel_id,
        ]);

        return data;
    };

    static request_userinfo = async (packet) => {
        var data;

        data = await pool.query("select * from rooms where channel_id = $1", [
            packet.channel_id,
        ]);

        return data;
    };

    static request_roominfo = async (packet) => {
        var data;

        data = await pool.query("select * from rooms where channel_id = $1", [
            packet.channel_id,
        ]);

        return data;
    };

    static create_room = async (packet) => {
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

    static enter_room = async (packet) => {
        var data;

        data = await pool.query(
            "insert into users_rooms values (default,$1,$2,$3) returning *",
            [packet.user_id, packet.room_id, false]
        );

        return data;
    };

    static ready = async (packet) => {
        var data;

        data = await pool.query(
            "update users_rooms set ready_state = $1 where user_id = $2 and room_id = $3 returning *",
            [packet.ready_status, packet.user_id, packet.room_id]
        );

        return data;
    };

    static exit_room = async (packet) => {
        var data;

        data = await pool.query(
            "delete from users_rooms where user_id = $1 and room_id = $2 returning *",
            [packet.user_id, packet.room_id]
        );

        return data;
    };

    static change_love = async (packet) => {
        var data;

        data = await pool.query(
            "update users set love = $1 where user_id = $2 returning *",
            [packet.love, packet.id]
        );

        return data;
    };

    static change_hate = async (packet) => {
        var data;

        data = await pool.query(
            "update users set hate = $1 where user_id = $2 returning *",
            [packet.hate, packet.id]
        );

        return data;
    };
}

const controller = new Controller();
module.exports = controller;
