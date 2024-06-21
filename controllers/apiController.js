const path = require("path");
require("dotenv").config();

function api_landing_page(req, res) {
        res.sendFile(path.join(__dirname, "..", "views", "api_landing_page.html"));
}

function getName(req, res){
        res.send({name: "Samuel Thaler"});
}

function getAge(req, res){
        res.send({age: "22"});
}

module.exports = {getAge, getName, api_landing_page};