-- psql -d pacific -f database/schema-friends.sql

-- Connect to database
\c pacific

-- Drop tables
drop table if exists relationships cascade;

create table relationships (
  id           bigserial not null primary key,
  from_user_id bigserial not null,
  to_user_id   bigserial not null
);

-- Populate relationships
insert into relationships (from_user_id, to_user_id) values (1, 2);
insert into relationships (from_user_id, to_user_id) values (2, 1);

insert into relationships (from_user_id, to_user_id) values (1, 4);
insert into relationships (from_user_id, to_user_id) values (4, 1);

insert into relationships (from_user_id, to_user_id) values (1, 6);
insert into relationships (from_user_id, to_user_id) values (6, 2);

ALTER TABLE relationships ADD CONSTRAINT from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES users(id);
ALTER TABLE relationships ADD CONSTRAINT to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES users(id);
