-- psql -d pacific -f database/schema-friends.sql

-- Connect to database
\c pacific

-- Drop tables
drop table if exists users;
drop table if exists relationships;

-- Create tables
create table users (
  id        bigserial not null primary key,
  full_name varchar(50) not null
);

create table relationships (
  id                         bigserial not null primary key,
  from_user_id               bigserial not null,
  to_user_id                 bigserial not null,
  foreign key (from_user_id) references users(id),
  foreign key (to_user_id)   references users(id)
);

-- Populate users table
insert into users (full_name) values ('Andrew Lam');
insert into users (full_name) values ('Catherine Chiu');
insert into users (full_name) values ('Eric Baldwin');
insert into users (full_name) values ('Fernanda Silva');
insert into users (full_name) values ('James Song');
insert into users (full_name) values ('Sean Welch');
insert into users (full_name) values ('Yulan Rong');

-- Populate relationships
insert into relationships (from_user_id, to_user_id) values (1, 2);
insert into relationships (from_user_id, to_user_id) values (1, 4);
insert into relationships (from_user_id, to_user_id) values (1, 6);
