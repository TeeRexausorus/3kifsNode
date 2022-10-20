create table kif
(
    "userId"  text                            not null,
    kif       text                            not null,
    id        uuid default uuid_generate_v4() not null
        constraint kif_pk
            primary key,
    "dateKif" date default now(),
    username  text
);

alter table kif
    owner to postgres;
