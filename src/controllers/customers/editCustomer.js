const knex = require('../../db/conection');

async function editCustomer(req, res) {
	const {
		nome,
		email,
		telefone,
		cpf,
		cep,
		endereco,
		complemento,
		bairro,
		cidade,
		estado } = req.body;
	const { id } = req.params;

	try {
		const updateCustomer = await knex('clientes').where({ id })
			.update({
				nome,
				email,
				telefone,
				cep,
				cpf,
				endereco,
				complemento,
				bairro,
				cidade,
				estado
			})

		if (!updateCustomer) {
			return res.status(404).json({ error: "Dados do cliente nao foram atualizados" })
		}
		return res.status(200).json({ "mensagem": "Dados atualizados com sucesso" })

	} catch (error) {
		return res.status(500).json({ "mensagem": " Ocorreu um erro inesperado" + error.mensage })
	}
}

module.exports = { editCustomer }