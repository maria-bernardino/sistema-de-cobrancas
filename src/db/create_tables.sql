create database desafio5

drop table if exists usuarios cascade;
create table usuarios(
  id serial primary key,
  nome varchar(150) not null,
  email varchar(150) not null unique,
  senha text,
  cpf varchar(11) unique default null,
  telefone varchar(15) default null 
);

drop table if exists clientes;
create table if not exists clientes(
  id serial primary key,
  nome text not null,
  email text not null,
  cpf varchar(11) not null,
  telefone varchar(11) not null,
  cep varchar(8),
  logradouro text,
  complemento text,
  bairro text,
  cidade text,
  estado text,
  usuario_id integer not null,
  foreign key (usuario_id) references usuarios (id)
);

drop table if exists cobrancas;
create table cobrancas(
  id serial primary key,
  cliente text not null,
  descricao text not null,
  status text not null,
  valor int not null,
  vencimento date not null,
  cliente_id int not null,
  foreign key (cliente_id) references clientes (id)
)