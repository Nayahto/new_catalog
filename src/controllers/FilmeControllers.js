const Filme = require("../models/Filmes")

let message = " ";

const getAll = async (req, res) => {
    try {
        const filme = await Filme.findAll();
        res.render("index", {
            filme,
            filmesPut: null,
            filmesDel: null,
            message,
        });
    }
    catch (err) {
        res.status(500).send({ err: err.message })
    }
}

const getById = async (req,res) =>{
    try {
        const filme = await Filme.findByPK(req.params.id);
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}
module.exports = {
    getAll,
    getById
}