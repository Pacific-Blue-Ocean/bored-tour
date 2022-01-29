-- psql -d pacific -f database/schema-friends.sql

-- Connect to database
\c pacific

-- Drop tables
drop table if exists users cascade;
drop table if exists relationships cascade;

-- Create tables
create table users (
  id          bigserial not null primary key,
  full_name   varchar(50) not null,
  location_id bigserial not null
);

create table relationships (
  id                         bigserial not null primary key,
  from_user_id               bigserial not null,
  to_user_id                 bigserial not null,
  foreign key (from_user_id) references users(id),
  foreign key (to_user_id)   references users(id)
);

-- Populate users table
insert into users (full_name, location_id) values ('Andrew Lam', 1);
insert into users (full_name, location_id) values ('Catherine Chiu', 2);
insert into users (full_name, location_id) values ('Eric Baldwin', 3);
insert into users (full_name, location_id) values ('Fernanda Silva', 4);
insert into users (full_name, location_id) values ('James Song', 5);
insert into users (full_name, location_id) values ('Sean Welch', 6);
insert into users (full_name, location_id) values ('Yulan Rong', 7);

-- Populate relationships
insert into relationships (from_user_id, to_user_id) values (1, 2);
insert into relationships (from_user_id, to_user_id) values (2, 1);

insert into relationships (from_user_id, to_user_id) values (1, 4);
insert into relationships (from_user_id, to_user_id) values (4, 1);

insert into relationships (from_user_id, to_user_id) values (1, 6);
insert into relationships (from_user_id, to_user_id) values (6, 2);
