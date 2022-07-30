const { compareAsc } = require('date-fns');
const knex = require('../../db/conection');

const deleteBilling = async (req, res) => {
    const { id } = req.params;

    const billing = await knex('cobrancas').where('id', id).first();

    const dueDate = new Date(billing.vencimento);
    const currentDate = new Date();

    const result = compareAsc(currentDate, dueDate);

    if (billing.status !== 'pendente' || result === 1) {
        return res.status(400).json("Cobrança não pôde ser excluída");
    }

    await knex('cobrancas').where('id', id).delete().returning('*');

    res.status(200).json(`Cobrança de id ${id} foi excluída`);
}

module.exports = { deleteBilling };