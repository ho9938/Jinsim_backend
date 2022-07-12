const pool = require("./db");

class Router {
    static select = async (data, table, condition) => {
        try {
            if (condition == null) {
                const result = await pool.query(
                    "select $1 from $2", [data, table]);
            }
            else {
                const result = await pool.query(
                    "select $1 from $2 where $3 = $4", [data, table, condition.key, condition.value]);
            }
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static insert = async (table, values) => {
        try {
            if (table == "users") {
                const result = await pool.query(
                    "insert into $1 values ($2, $3, $4, $5, $6, $
                    , [table, values.id, values.name, values.profile_image_url,
                        values.channel_id, values.love, values.hate, values.meal_period,
                        values.last_ate, values.current_room]);
            }
            else if (table == "")
                return result;
        } catch (error) {
            console.log(error);
        }
    }

    static update = async (table, change, condition) => {
        try {
            const result = await pool.query(
                "update $1 set $2 where $3 returning *", [table, change, condition]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static delete = async (table, condition) => {
        try {
            const result = await pool.query(
                "delete $1 where $2 returning *", [table, condition]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

const router = new Router();
module.exports = router;