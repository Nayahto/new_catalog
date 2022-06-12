const filme = require("../models/Filmes")

let message = " ";

const getAll = async (req, res) => {
    try {
        const filmes = await filme.findAll();
        res.render("index", {
            filmes,
            filmesPut: null,
            filmesDel: null,
            message,
        });
    }
    catch (err) {
        res.status(500).send({ err: err.message })
    }
}

module.exports = {
    getAll,
}