-- psql -d pacific -f database/schema-users.sql

-- Connect to database
\c pacific

-- Drop tables
drop table if exists users cascade;

-- Create tables
create table users (
  id          bigserial not null primary key,
  full_name   varchar(50) not null,
  location_id bigserial not null
);

-- Foreign key
alter table users add constraint user_location_fk foreign key (location_id) references locations(id);

-- Populate users table
insert into users (full_name, location_id) values ('Andrew Lam', 1);
insert into users (full_name, location_id) values ('Catherine Chiu', 2);
insert into users (full_name, location_id) values ('Eric Baldwin', 3);
insert into users (full_name, location_id) values ('Fernanda Silva', 4);
insert into users (full_name, location_id) values ('James Song', 1);
insert into users (full_name, location_id) values ('Sean Welch', 2);
insert into users (full_name, location_id) values ('Yulan Rong', 3);

-- Update users rows and update user 4 with a location preference.
update users set location_id = 1 where id = 4; -- Update user Feranda with the location San Francisco
