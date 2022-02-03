-- Drop tables
drop table if exists preferences_steps cascade;
drop table if exists preferences cascade;
drop table if exists users_preferences cascade;
drop type if exists stepType;

-- Create tables
create type stepType AS ENUM ('options', 'location');

create table preferences_steps (
  id             bigserial not null primary key,
  label          varchar(50) not null,
  question       varchar(50) not null,
  showingOrder   integer not null,
  type           stepType
);

create table preferences (
  id                     bigserial not null primary key,
  preference_step_id     bigint not null,
  parent_preference_id   bigint null,
  label                  varchar(50) not null,
  description            varchar(255) null,
  foreign key (preference_step_id) references preferences_steps(id),
  foreign key (parent_preference_id) references preferences(id)
);

create table users_preferences (
  user_id        varchar(50) not null,
  preferences_id bigserial not null,
  foreign key (user_id) references users(id),
  foreign key (preferences_id) references preferences(id)
);

-- Populate preferences_steps table
insert into preferences_steps
  (label, question, showingOrder, type)
values
  ('About Me', 'What best describes you?', 1, 'options'), -- id 1
  ('My Interests', 'What type of activities are you interested on?', 2, 'options'), -- id 2
  ('My Location', 'Where would you like to go out?', 3, 'location'); -- id 3

-- -- Populate preferences table
insert into preferences
  (preference_step_id, parent_preference_id, label, description)
values
  (1, null, 'Students', 'Teens in the summer or college students looking for a weekend activity with friends'), -- id 1
  (1, null, 'Young Adults',  'People at a new city or those looking to spice up their day to day'), -- id 2
  (1, null, 'Empty Nesters', 'Parents who no longer have the responsibility of kids and want a new hobby'), -- id 3
  (2, null, 'Outdoor - Active',   null), -- id 4
  (2, 4, 'Sports leagues and/or places to play', null), -- id 5
  (2, 4, 'Play parks (trampoline parks or laser tag etc.)', null), -- id 6
  (2, null, 'Health/Wellness', null), -- id 7
  (2, 7, 'Massage', null), -- id 8
  (2, 7, 'Yoga', null), -- id 9
  (2, 7, 'Gym', null), -- id 10
  (2, 7, 'Earwax removal', null), -- id 11
  (2, null, 'Outdoor - Social', null), -- id 12
  (2, 12, 'Bars/Happy Hours ', null), -- id 13
  (2, 12, 'Local events ', null), -- id 14
  (2, 12, 'Concerts ', null), -- id 15
  (2, null, 'Online ', null), -- id 16
  (2, 16, 'Tournaments ', null), -- id 17
  (2, 16, 'Video game suggestions ', null), -- id 18
  (2, 16, 'Twitch.Youtube streams ', null); -- id 19


-- Populate users_preferences table
insert into users_preferences
  (user_id, preferences_id)
values
  ('fernanda.rodrigues.cdc@gmail.com', 1),
  ('fernanda.rodrigues.cdc@gmail.com', 9),
  ('fernanda.rodrigues.cdc@gmail.com', 16);

-- Update users rows and update user 4 with a location preference.
-- As per PR feedback this will be implemented on a different schema.
-- alter table users add location_id bigint not null;
-- alter table users add constraint user_location_fk foreign key (location_id) references locations(id);
-- UPDATE users SET location_id = 1 WHERE id = 4; -- Update user Feranda with the location San Francisco
