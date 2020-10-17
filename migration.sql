create table users (
    id uuid primary key not null,
    username varchar(35) not null,
    email varchar(254) not null,
    password char(60) not null,
    unique(email)
);