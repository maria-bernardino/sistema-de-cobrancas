create database projeto05;

drop table if exists usuarios;

drop table if exists clientes;

drop table if exists cobrancas;

create table if not exists usuarios(
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null,
  cpf varchar(11) unique,
  telefone varchar(11)
);

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

create table if not exists cobrancas(
  id serial primary key,
  cliente text not null,
  descricao text,
  status text not null,
  valor int not null,
  vencimento date not null,
  cliente_id int not null,
  foreign key (cliente_id) references clientes (id)
)