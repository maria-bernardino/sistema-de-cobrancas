const knex = require('../../db/conection');

async function editBilling(req, res) {
	const { descricao, status, valor, vencimento } = req.body;
	const { id } = req.params;

	try {
		const customerUpdate = await knex('cobrancas').where({ id }).first()
			.update({
				descricao,
				status,
				valor,
				vencimento
			})
		if (!customerUpdate) {
			return res.status(404).json({ "mensagem": "Não foi possivel realizar a edição" })
		}
		return res.status(201).json({ "mensagem": "Dados atualizados com sucesso" });

	} catch (error) {
		return res.status(500).json({ "mensagem": " Ocorreu um erro inesperado" + error.mensage })
	}

}

module.exports = { editBilling };