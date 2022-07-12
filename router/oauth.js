const express = require("express");
const axios = require("axios");
const qs = require("qs");
const login = require("../util/login");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.post("/kakao/login", jsonParser, (req, res) => {
    console.log("Login request");
    login(req, res);
});

router.get("/kakao/login", (req, res) => {
    const empty_html = `
      <html>
      <head></head>
      <body>
      </body>
      </html>
    `;
    res.send(empty_html);
});

router.get("/kakao/logout", (req, res) => {
    console.log("Logout request");
    const html = `
      <html>
      <head></head>
      <body>
        <script>
            window.ReactNativeWebView.postMessage("Logout")
        </script>
      </body>
      </html>
    `;

    res.send(html);
});

module.exports = router;
