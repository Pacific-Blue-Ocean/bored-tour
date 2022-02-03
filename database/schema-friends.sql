-- Drop tables
drop table if exists relationships cascade;

create table relationships (
  id           bigserial not null primary key,
  from_user_id varchar(50) not null,
  to_user_id   varchar(50) not null
);

alter table relationships add constraint from_user_id_fkey foreign key (from_user_id) references users(id);
alter table relationships add constraint to_user_id_fkey foreign key (to_user_id) references users(id);
