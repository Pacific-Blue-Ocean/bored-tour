-- Drop tables
drop table if exists users cascade;

-- Create tables
create table users (
  id                    varchar(50) not null primary key,
  email                 varchar(50) not null,
  full_name             varchar(50) not null,
  has_completed_survey  boolean default false,
  location_id           bigserial not null
);

-- Foreign key
alter table users add constraint user_location_fk foreign key (location_id) references locations(id);

-- Populate users table
insert into users (id, email, full_name, location_id) values ('alam1324@gmail.com', 'alam1324@gmail.com', 'Andrew Lam', 1);
insert into users (id, email, full_name, location_id) values ('chiuycatherine@gmail.com', 'chiuycatherine@gmail.com', 'Catherine Chiu', 2);
insert into users (id, email, full_name, location_id) values ('ericbaldwinn@gmail.com', 'ericbaldwinn@gmail.com', 'Eric Baldwin', 3);
insert into users (id, email, full_name, location_id) values ('fernanda.rodrigues.cdc@gmail.com', 'fernanda.rodrigues.cdc@gmail.com', 'Fernanda Silva', 4);
insert into users (id, email, full_name, location_id) values ('sean.welch@me.com', 'sean.welch@me.com', 'Sean Welch', 2);
insert into users (id, email, full_name, location_id) values ('yulanrong123@gmail.com', 'yulanrong123@gmail.com', 'Yulan Rong', 3);
insert into users (id, email, full_name, location_id) values ('test@test.com', 'test@test.com', 'Test 0', 1);
insert into users (id, email, full_name, location_id) values ('test1@test.com', 'test1@test.com', 'Test 1', 1);
insert into users (id, email, full_name, location_id) values ('test2@test.com', 'test2@test.com', 'Test 2', 1);
insert into users (id, email, full_name, location_id) values ('test3@test.com', 'test3@test.com', 'Test 3', 1);

-- Update users rows and update user 4 with a location preference.
update users set location_id = 1 where id = 'fernanda.rodrigues.cdc@gmail.com'; -- Update user Fernanda with the location San Francisco
