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

-- auto-generated definition
create table kif_user
(
    userid   text,
    username text,
    id       uuid    default uuid_generate_v4() not null,
    notify   boolean default false
);

create unique index kif_user_username_uindex
    on kif_user (username);

create unique index kif_user_userid_uindex
    on kif_user (userid);

alter table kif_user
    owner to postgres;

alter table kif
    owner to postgres;
