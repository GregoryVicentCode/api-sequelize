const express = require("express");
const morgan = require("morgan")

const router = require("../router/product.router")

const app = express();

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("This is Express");
});

app.use(express.json())
app.use("/api/v1", router)

module.exports = app;
