const FilmeController = require("../controllers/FilmeControllers")

const routes = require("express").Router();

routes.get("/",FilmeController.getAll);

module.exports = routes;