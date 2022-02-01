-- psql -d pacific -f database/schema-events-categories.sql

-- Connect to database
-- \c pacific

-- Drop tables
drop table if exists events_categories cascade;

create table events_categories (
  id                bigserial not null primary key,
  events_id         bigserial not null,
  preference_id      bigserial not null
);

-- Populate relationships
insert into events_categories (events_id, preference_id) values (1, 14);

insert into events_categories (events_id, preference_id) values (2, 13);
insert into events_categories (events_id, preference_id) values (2, 14);

insert into events_categories (events_id, preference_id) values (3, 17);

insert into events_categories (events_id, preference_id) values (4, 16);
insert into events_categories (events_id, preference_id) values (4, 18);
insert into events_categories (events_id, preference_id) values (4, 19);

insert into events_categories (events_id, preference_id) values (5, 14);
insert into events_categories (events_id, preference_id) values (5, 1);

insert into events_categories (events_id, preference_id) values (6, 11);
insert into events_categories (events_id, preference_id) values (6, 3);

insert into events_categories (events_id, preference_id) values (7, 9);
insert into events_categories (events_id, preference_id) values (7, 7);
insert into events_categories (events_id, preference_id) values (7, 4);

insert into events_categories (events_id, preference_id) values (8, 16);
insert into events_categories (events_id, preference_id) values (8, 1);

alter table events_categories add constraint events_id_fkey foreign key (events_id) references events(id);
alter table events_categories add constraint preference_id_fkey foreign key (preference_id) references preferences(id);
