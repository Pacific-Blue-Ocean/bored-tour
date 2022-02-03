-- Drop tables
drop table if exists users cascade;

-- Create tables
create table users (
  id                    varchar(255) not null primary key,
  full_name             varchar(50) not null,
  email                 varchar(50) not null,
  has_completed_survey  boolean default false,
  location_id           bigserial not null
);

-- Foreign key
alter table users add constraint user_location_fk foreign key (location_id) references locations(id);

-- Populate users table
insert into users (id, full_name, email, location_id) values ('ZGGHDq0y8HgM7Bj9v1OtwoT8TqD2', 'Andrew Lam', 'andrew@test.com', 1);
insert into users (id, full_name, email, location_id) values ('b', 'Catherine Chiu', 'cat@test.com', 2);
insert into users (id, full_name, email, location_id) values ('c', 'Eric Baldwin', 'eric@test.com', 3);
insert into users (id, full_name, email, location_id) values ('d', 'Fernanda Silva', 'nanda@test.com', 4);
insert into users (id, full_name, email, location_id) values ('e', 'Sean Welch', 'sean@test.com', 2);
insert into users (id, full_name, email, location_id) values ('f', 'Yulan Rong', 'yulan@test.com', 3);

-- Update users rows and update user 4 with a location preference.
update users set location_id = 1 where id = 'd'; -- Update user Fernanda with the location San Francisco
