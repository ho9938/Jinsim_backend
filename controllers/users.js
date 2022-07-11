const pool = require("../db");

class UsersController {
    static getAllUsers = async (packet) => {
        const users = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
        return
    }
}

socket.on('login', async (packet, callback) => {
    console.log(packet);
    try {
        const { id } = packet;
        const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);

        console.table(employee.rows[0]);
        callback(employee.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})