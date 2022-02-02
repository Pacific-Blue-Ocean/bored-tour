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

alter table relationships add constraint from_user_id_fkey foreign key (from_user_id) references users(id);
alter table relationships add constraint to_user_id_fkey foreign key (to_user_id) references users(id);
