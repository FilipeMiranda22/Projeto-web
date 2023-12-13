create table anuncios(

    id bigint not null auto_increment,
    titulo varchar(100) not null,
    descricao varchar(500) not null,
    anunciante_id bigint not null,
    carro_id bigint,
    valor float not null,
    logradouro varchar(100) not null,
    bairro varchar(100) not null,
    cep varchar(9) not null,
    complemento varchar(100),
    numero varchar(20),
    uf char(2) not null,
    cidade varchar(100) not null,

    primary key(id),
    foreign key (anunciante_id) references usuarios (id),
    foreign key (carro_id) references carros (id)

);