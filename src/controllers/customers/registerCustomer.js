const knex = require('../../db/conection');

async function registerCustomer(req, res){
    const {usuario}=req;
    const {
        nome, 
        email, 
        cpf, 
        telefone, 
        cep, 
        logradouro, 
        complemento, 
        bairro, 
        cidade, 
        estado }=req.body;

    try {
        const emailCustomerFound=await knex('clientes')
        .where({email})
        .andWhere('usuario_id', usuario.id)
        .first();

        if(emailCustomerFound){
            return res.status(404).json({ 
                error: `O usuário de nome '${usuario.nome}' e E-mail '${usuario.email}', tentou cadastrar um E-mail já existente` 
            });
        }

        const cpfCustomerFound=await knex('clientes')
        .where({cpf})
        .andWhere('usuario_id', usuario.id)
        .first();

        if(cpfCustomerFound){
            return res.status(404).json({ 
                error: `O usuário de nome '${usuario.nome}' e E-mail '${usuario.email}', tentou cadastrar um CPF já existente`
            });
        }

        const cpfCustomerUnique=await knex('clientes')
        .where('email', '!=', email)
        .andWhere({cpf})
        .andWhere('usuario_id', '!=', usuario.id)
        .first();

        if(cpfCustomerUnique){
            return res.status(404).json({ 
                error: `Este CPF já foi cadastrado.`
            });
        }

        const customerInserted=await knex('clientes')
        .insert({
            nome,
            email,
            cpf,
            telefone,
            cep: cep??null,
            logradouro: logradouro??null,
            complemento: complemento??null,
            bairro: bairro??null,
            cidade: cidade??null,
            estado: estado??null,
            usuario_id: usuario.id
        }).returning('*');

        if(customerInserted.length===0){
            return res.status(404).json({error: 'Não foi possível cadastrar o cliente'});
        }

        return res.status(200).json(customerInserted[0]);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports={
    registerCustomer
}