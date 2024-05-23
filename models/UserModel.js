const {getClient} = require("./connect.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

const db_user = process.env.PG_DB_USER;

const addUser = async (username, password) => {
        const client = await getClient();
        const hashedPassword = await bcrypt.hash(password, 10);
        client.query(`Insert into ${db_user} (username, password) Values (${username}, ${hashedPassword})`)    
        .catch(err => {
                console.log("Insert Error occured");
                console.log(err)
        });
}
      
const deleteUser = async (username) => {
        const client = await getClient();
        await client.query(`Delete from ${db_user} where username like ${username}`)
        .catch(err => {
                console.log("Delete Error occured")
                console.log(err)
        });
        client.end();
}

const getPasswordForUsername = async (username) => {
        const client = await getClient();
        const res = await client.query(`Select password from ${db_user} where username like ${username}`);
        client.end();
        if(res.rows.length !== 0){
                return res.rows[0].password;
        }
        return null;
}

module.exports = {deleteUser, addUser, getPasswordForUsername}