const knex = require('../../db/conection');
const bcrypt = require('bcrypt');

const editUser = async (req, res) => {
    const { nome, email, senha, cpf, telefone } = req.body;
    const { usuario } = req;

    const user = await knex("usuarios").where("id", usuario.id).first();

    if (senha && senha !== user.senha) {
        const hash = await bcrypt.hash(senha, 10);
        const editedUser = await knex('usuarios')
            .update({ nome, email, senha: hash, cpf, telefone })
            .where('id', usuario.id)
            .returning('*');

        res.status(200).json(editedUser[0]);
    } else {
        const editedUser = await knex('usuarios')
            .update({ nome, email, cpf, telefone })
            .where('id', usuario.id)
            .returning('*');

        res.status(200).json(editedUser[0]);
    }
}

module.exports = { editUser };