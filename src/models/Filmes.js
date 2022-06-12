const { Sequelize } = require("sequelize");

const database = require("../database/db");

const Filme = database.sequelize.define("filme",
{
    id:
    {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNULL: false,
        primaryKey: true,
    },
    nome:
    {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao:
    {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagem:
    {
        type: Sequelize.STRING,
        allowNull: false,
    }
},
{
    freezeTableName: true,
    timestamps: false,
    createAt: false,
    updateAt: false

}
);

module.exports = Filme;