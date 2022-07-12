const axios = require("axios");

const login = async (req, res) => {
    console.log(req.body);
    const { ACCESS_TOKEN } = req.body;
    let kakao_response;
    try {
        const url = "https://kapi.kakao.com/v2/user/me";
        const Header = {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        kakao_response = await axios.get(url, Header);
    } catch (e) {
        console.log("액시오스 에러");
        console.log(e);

        const response = {
            result: "fail",
            error: "토큰 에러",
        };

        res.send(response);
        return;
    }
    try {
        const { data } = kakao_response;
        const { id, properties } = data;
        const { nickname } = properties;
        const response = {
            result: "success",
            data: data,
        };
        console.log(response);
        res.send(response);
    } catch (e) {
        console.log(e);
        let msg = "";
        if (typeof e === "string") {
            msg = e;
        } else if (e instanceof Error) {
            msg = e.message;
        }
        const response = {
            result: "fail",
            error: msg,
        };

        res.send(response);
    }
};

module.exports = login;
