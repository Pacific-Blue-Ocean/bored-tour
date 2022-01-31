-- psql -d pacific -f database/schema-users-event.sql

-- Connect to database
-- \c pacific

-- Drop tables
drop table if exists events_users cascade;

create table events_users (
  id           bigserial not null primary key,
  events_id    bigserial not null,
  user_id      bigserial not null
);

-- Populate relationships
insert into events_users (events_id, user_id) values (1, 2);
insert into events_users (events_id, user_id) values (1, 4);
insert into events_users (events_id, user_id) values (1, 6);

insert into events_users (events_id, user_id) values (2, 1);
insert into events_users (events_id, user_id) values (2, 2);
insert into events_users (events_id, user_id) values (2, 3);

insert into events_users (events_id, user_id) values (3, 3);
insert into events_users (events_id, user_id) values (3, 2);
insert into events_users (events_id, user_id) values (3, 4);
insert into events_users (events_id, user_id) values (3, 1);

insert into events_users (events_id, user_id) values (6, 4);
insert into events_users (events_id, user_id) values (6, 6);

insert into events_users (events_id, user_id) values (5, 2);
insert into events_users (events_id, user_id) values (5, 1);
insert into events_users (events_id, user_id) values (5, 6);


alter table events_users add constraint events_id_fkey foreign key (events_id) references events(id);
alter table events_users add constraint users_id_fkey foreign key (user_id) references users(id);
