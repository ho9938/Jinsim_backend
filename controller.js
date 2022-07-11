const pool = require("./db");

class Controller {
    static select = async (packet) => {
        const users = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
        return
    }

    static login = async (packet) => {
        var data;

        data = await pool.query(
            "select * from users where id = $1",
            [packet.id]);

        if (data.rowCount == 1) return;

        // else
        data = await pool.query(
            "insert into users (id, name, profile_image_url) values ($1,$2,$3) returning *",
            [packet.id, packet.name, packet.profile_iamge_url]
        );

        return data.rowCount == 1;
    }

    static change_channel = async (packet) => {
        var data;

        data = await pool.query(
            "select * from channels where id = $1",
            [packet.channel_id]
        );

        if (data.rows[0].password != packet.password) {
            return null
        }

        // else
        data = await pool.query(
            "update users set channel_id = $1 where id = $2 returning *",
            [packet.channel_id, packet.id]
        );

        data = await pool.query(
            "select * from rooms where channel_id = $1",
            [packet.channel_id]
        )

        return data;
    }

    static request_roominfo = async (packet) => {
        var data;

        data = 

    }

    static create_room = async (packet) => {

    }

    static enter_room = async (packet) => {

    }

    static emotion = async (packet) => {

    }

    static request_kick = async (packet) => {

    }

    static ready = async (packet) => {

    }

    static change_like = async (packet) => {

    }

    static change_hate = async (packet) => {

    }

    static logout = async (packet) => {

    }

}

const controller = new Controller();
module.exports = controller;