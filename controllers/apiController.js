require("dotenv").config();

const ROOTPATH = process.env.ROOTPATH;


function api_landing_page(req, res) {
        res.sendFile(ROOTPATH + "views/api_landing_page.html")
}

function getName(req, res){
        res.send({name: "Samuel Thaler"});
}

function getAge(req, res){
        res.send({age: "22"});
}

module.exports = {getAge, getName, api_landing_page};