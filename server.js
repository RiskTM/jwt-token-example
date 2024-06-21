const express = require("express");
const {token_middleware} = require("./middleware/token_middleware");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

const loginRoute = require("./routes/login.js");
const logoutRoute = require("./routes/logout.js");
const userRoute = require("./routes/user.js");
const apiRoute = require("./routes/api.js");

app.use(express.json());

app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/user", userRoute);
app.use("/api", token_middleware, apiRoute);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
