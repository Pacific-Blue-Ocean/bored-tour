-- Drop tables
drop table if exists events_users cascade;

create table events_users (
  id           bigserial not null primary key,
  events_id    bigserial not null,
  user_id      varchar(50) not null,
  UNIQUE (events_id, user_id)
);

-- Populate relationships
insert into events_users (events_id, user_id) values (1, 'chiuycatherine@gmail.com');
insert into events_users (events_id, user_id) values (1, 'fernanda.rodrigues.cdc@gmail.com');
insert into events_users (events_id, user_id) values (1, 'yulanrong123@gmail.com');

insert into events_users (events_id, user_id) values (2, 'alam1324@gmail.com');
insert into events_users (events_id, user_id) values (2, 'chiuycatherine@gmail.com');
insert into events_users (events_id, user_id) values (3, 'ericbaldwinn@gmail.com');

insert into events_users (events_id, user_id) values (3, 'ericbaldwinn@gmail.com');
insert into events_users (events_id, user_id) values (3, 'chiuycatherine@gmail.com');
insert into events_users (events_id, user_id) values (3, 'fernanda.rodrigues.cdc@gmail.com');
insert into events_users (events_id, user_id) values (3, 'alam1324@gmail.com');

insert into events_users (events_id, user_id) values (6, 'fernanda.rodrigues.cdc@gmail.com');
insert into events_users (events_id, user_id) values (6, 'yulanrong123@gmail.com');

insert into events_users (events_id, user_id) values (5, 'chiuycatherine@gmail.com');
insert into events_users (events_id, user_id) values (5, 'alam1324@gmail.com');
insert into events_users (events_id, user_id) values (5, 'yulanrong123@gmail.com');


alter table events_users add constraint events_id_fkey foreign key (events_id) references events(id);
alter table events_users add constraint users_id_fkey foreign key (user_id) references users(id);
