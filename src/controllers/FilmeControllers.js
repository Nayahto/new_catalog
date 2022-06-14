const Filme = require("../models/Filmes")

let message = " ";

const orderById = { order: [["id", "ASC"]] }

const Op = require("sequelize").Op

/*rota para todos os filmes*/
const getAll = async (req, res) => {
    try {
        const filme = await Filme.findAll();
        res.render("index", {
            filme,
            filmesPut: null,
            filmesDel: null,
            message,
            filmeSearch: []
        });
    }
    catch (err) {
        res.status(500).send({ err: err.message })
    }
}
/*rota pra selecionar os filmes por id */
const getById = async (req, res) => {
    try {
        const filme = await Filme.findByPk(req.params.id);


        res.render("detalhes", {
            filme,
            filmeSearch:[]
        });
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}

const criar = (req, res) => {
    try {
        res.render("criar", { message })

    } catch (err) {
        res.status(500).send({ err: err.message })
    }

}
/*rota para a cricao dos filmes */
const criacao = async (req, res) => {
    try {
        const filme = req.body;

        if (
            !filme.nome ||
            !filme.descricao ||
            !filme.imagem
        ) {
            message = "preencha todos os campos para cadastro"
            type = "danger";
            return res.redirect("/criar")
        }
        await Filme.create(filme)
        res.redirect("/")
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}

/*rota para encontrar o filme para edicao pelo id */
const editar1 = async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);

    if (!filme) {
        res.render("editar", {
            message: "filme nao encontrado"
        });
    }
    res.render("editar", {
        filme,
        message: "filme encontrado"
    })
}

/*rota para a edicao */
const editar = async (req, res) => {
    try {
        const filme = await Filme.findByPk(req.params.id);
        const { nome, descricao, imagem } = req.body

        filme.nome = nome;
        filme.descricao = descricao;
        filme.imagem = imagem;

        const filmeEditado = await filme.save();
        res.redirect("/")

    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}
/*rota para deleção do filme pelo id */
const deletar = async (req, res) => {
    try {
        await Filme.destroy({ where: { id: req.params.id } })
        message = "filme removido com sucesso"
        res.redirect("/")
    } catch (err) {
        res.status(500).send({ err: err.message })
    };
};

const pesquisa = async (req, res) => {
    try {
        const filme = await Filme.findAll({
            where: {
                nome: {
                    [Op.like]: `%${req.body.filme}%`,
                }
            },
            order: [["id", "ASC"]]
        }
        )
        if (filme.length == 0) {
            message = "filme nao encontrado"
            return res.redirect("/")
        }
        res.render("index", {
            filmes: [],
            message,
            filmesSearch: filme
        });
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}

module.exports = {
    getAll,
    getById,
    criar,
    criacao,
    editar,
    editar1,
    deletar,
    pesquisa
}