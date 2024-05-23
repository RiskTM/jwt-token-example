const express = require("express");
const {authenticateToken} = require("./middleware.js");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;
const ROOTPATH = process.env.ROOTPATH;

const loginRoute = require("./routes/login.js");
const tokenRoute = require("./routes/token.js");
const userRoute = require("./routes/user.js");
const apiRoute = require("./routes/api.js");

app.use(express.json());

app.use("/login", loginRoute);
app.use("/token", tokenRoute);
app.use("/user", userRoute);
app.use("/api", authenticateToken, apiRoute);

app.get("/", (req, res) => {
  res.sendFile(ROOTPATH + "views/index.html");
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
