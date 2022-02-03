drop table if exists locations_types cascade;
drop table if exists locations cascade;

create table locations_types (
  id    bigserial not null primary key,
  label varchar(255) null
);

create table locations (
  id                bigserial not null primary key,
  location_type_id  bigserial not null,
  label             varchar(255) null,
  foreign key (location_type_id) references locations_types(id)
);

-- Populate locations_types table
insert into locations_types
  (label)
values
  ('City'), -- id 1
  ('Region'); -- id 2

-- Populate locations table
insert into locations
  (location_type_id, label)
values
  (1, 'San Francisco'), -- id 1
  (1, 'Los Angeles'), -- id 2
  (1, 'New York'), -- id 3
  (2, 'Bay Area'); -- id 4
