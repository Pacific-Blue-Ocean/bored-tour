-- Drop tables
drop table if exists events_users cascade;

create table events_users (
  id           bigserial not null primary key,
  events_id    bigserial not null,
  user_id      varchar(255) not null
);

-- Populate relationships
insert into events_users (events_id, user_id) values (1, 'b');
insert into events_users (events_id, user_id) values (1, 'd');
insert into events_users (events_id, user_id) values (1, 'f');

insert into events_users (events_id, user_id) values (2, 'ZGGHDq0y8HgM7Bj9v1OtwoT8TqD2');
insert into events_users (events_id, user_id) values (2, 'b');
insert into events_users (events_id, user_id) values (2, 'c');

insert into events_users (events_id, user_id) values (3, 'c');
insert into events_users (events_id, user_id) values (3, 'b');
insert into events_users (events_id, user_id) values (3, 'd');
insert into events_users (events_id, user_id) values (3, 'ZGGHDq0y8HgM7Bj9v1OtwoT8TqD2');

insert into events_users (events_id, user_id) values (6, 'd');
insert into events_users (events_id, user_id) values (6, 'f');

insert into events_users (events_id, user_id) values (5, 'b');
insert into events_users (events_id, user_id) values (5, 'ZGGHDq0y8HgM7Bj9v1OtwoT8TqD2');
insert into events_users (events_id, user_id) values (5, 'f');


alter table events_users add constraint events_id_fkey foreign key (events_id) references events(id);
alter table events_users add constraint users_id_fkey foreign key (user_id) references users(id);
