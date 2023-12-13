create table carros(

    id bigint not null auto_increment,
    nome varchar(100) not null,
    marca varchar(100) not null,
    cor varchar(100) not null,
    descricao varchar(1000) not null,
    anuncio_id bigint,
    

    primary key(id)
);