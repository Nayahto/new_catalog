require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const routes = require ("./src/routes/routes")

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(port, () => console.log(`servidor rodando em http://localhost:${port}`));