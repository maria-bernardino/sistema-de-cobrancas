const knex = require('../../db/conection');

const detailCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await knex('clientes').where('id', id).first();

        if (!customer) {
            return res.status(400).json('Cliente não encontrado')
        }

        const { id: idCostumer, usuario_id, ...costumerInfo } = customer;
        res.status(200).json(costumerInfo);
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = { detailCustomer };