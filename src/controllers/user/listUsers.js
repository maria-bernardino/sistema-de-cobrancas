const knex = require('../../db/conection');

async function listUsers(req, res) {
    try {
        const usersArray = await knex('usuarios');

        return res.status(200).json(usersArray);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    listUsers
}
