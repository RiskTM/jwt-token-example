require("dotenv").config();

const ROOTPATH = process.env.ROOTPATH;


function api_landing_page(req, res) {
        res.sendFile(ROOTPATH + "views/api_landing_page.html");
        res.sendStatus(200);
}

function getName(req, res){
        res.send({name: "Samuel Thaler"});
        res.sendStatus(200);
}

function getAge(req, res){
        res.send({age: "22"});
        res.send(200);
}

module.exports = {getAge, getName, api_landing_page};