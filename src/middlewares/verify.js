const yup = require('../utils/yup');
const knex = require('../db/conection');
const bcrypt = require('bcrypt');

const verifyFieldsEditUser = async (req, res, next) => {
  const schema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required(),
    senha: yup.string(),
    cpf: yup.string(),
    telefone: yup.string(),
  });

  try {
    await schema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }

  next();
};

const verifyEmailEditUser = async (req, res, next) => {
  const { email } = req.body;
  const { usuario } = req;

  try {
    const user = await knex('usuarios').where('id', usuario.id).first();

    if (email !== user.email) {
      const userEmail = await knex('usuarios').where('email', email).first();

      if (userEmail) {
        return res.status(400).json('E-mail já cadastrado.');
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

const verifyEmailCustomerEdit = async (req, res, next) => {
  const { email } = req.body;
  const { id } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'email é um campo obrigatório' });
  }

  try {
    const client = await knex('clientes').where('id', id).first();

    if (email !== client.email) {
      const clientEmail = await knex('clientes').where('email', email).first();

      if (clientEmail) {
        return res.status(400).json('E-mail já cadastrado.');
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  next();
};

const verifyCpfEditUser = async (req, res, next) => {
  const { cpf } = req.body;

  const { usuario } = req;

  try {
    if (cpf) {
      const cpfUserFound = await knex('usuarios')
        .where('cpf', '!=', usuario.cpf)
        .andWhere({ cpf })
        .first();

      if (cpfUserFound) {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

const verifyCpfCustomerEdit = async (req, res, next) => {
  const { cpf } = req.body;

  try {
    if (cpf) {
      const cpfCustomerFound = await knex('clientes').where('cpf', cpf).first();
      if (!cpfCustomerFound) {
        return res.status(401).json({ mensagem: 'Cpf ja possui cadastro para outro usuario' });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

const verifyEmailLogin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await knex('usuarios').where('email', email).first();

    if (!user) {
      return res.status(404).json('E-mail não encontrado');
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }

  next();
};

const verifyEmailSignup = async (req, res, next) => {
  const { email } = req.body;

  try {
    const userInfo = await knex('usuarios').where('email', email).first();

    if (userInfo) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

const verifyFieldsCustomer = async (req, res, next) => {
  const schemaCustomer = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().min(11).max(11).required(),
    telefone: yup.string().max(11).required(),
    cep: yup.string().max(8),
    logradouro: yup.string(),
    complemento: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string(),
  });

  try {
    await schemaCustomer.validate(req.body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

const verifyFieldsLogin = async (req, res, next) => {
  const schemaLogin = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required(),
  });

  try {
    await schemaLogin.validate(req.body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

const verifyFieldsSignup = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'email é um campo obrigatório.' });
  }

  const schemaSignUp = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required({ error: 'E-mail é um campo obrigatório.' }),
    senha: yup.string().required(),
  });

  try {
    await schemaSignUp.validate(req.body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

const verifyPassword = async (req, res, next) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'email é um campo obrigatório.' });
  }

  if (!senha) {
    return res.status(400).json({ error: 'senha é um campo obrigatório.' });
  }

  try {
    const user = await knex('usuarios').where('email', email).first();

    const bcryptPassword = await bcrypt.compare(senha, user.senha);

    if (!bcryptPassword) {
      return res.status(400).json('Email e senha não confere');
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

const verifyFieldsBilling = async (req, res, next) => {
  const schema = yup.object().shape({
    descricao: yup.string(),
    status: yup.string().required(),
    valor: yup.number().required(),
  });

  try {
    await schema.validate(req.body);
  } catch (error) {
    return res.status(400).json(error.message);
  }

  next();
};

module.exports = {
  verifyFieldsSignup,
  verifyFieldsLogin,
  verifyFieldsEditUser,
  verifyFieldsCustomer,
  verifyCpfEditUser,
  verifyEmailSignup,
  verifyPassword,
  verifyEmailLogin,
  verifyEmailEditUser,
  verifyCpfCustomerEdit,
  verifyEmailCustomerEdit,
  verifyFieldsBilling,
};
