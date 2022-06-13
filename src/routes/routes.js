const FilmeController = require("../controllers/FilmeControllers")

const routes = require("express").Router();

routes.get("/",FilmeController.getAll);

routes.get("/filmes/:id", FilmeController.getById);

module.exports = routes;