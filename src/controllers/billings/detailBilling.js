const knex = require('../../db/conection');

const detailBilling = async (req, res) => {
    const { id } = req.params;

    try {
        const billing = await knex('cobrancas').where('id', id).first();

        res.status(200).json({
            id: billing.id,
            cliente: billing.cliente,
            descricao: billing.descricao,
            status: billing.status,
            valor: billing.valor,
            vencimento: billing.vencimento
        })
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = { detailBilling };