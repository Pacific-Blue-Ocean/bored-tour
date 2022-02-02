-- Drop tables
drop table if exists events cascade;

create table events (
  id          bigserial not null primary key,
  title       text not null,
  details     varchar(255) not null,
  description text,
  date        date not null,
  start_time  time not null,
  event_length_minutes int not null,
  mainPhoto text,
  digital boolean,
  online_address text,
  address_line_1 VARCHAR(255),
  address_state VARCHAR(20) ,
  address_zip VARCHAR(5) ,
  price int
);

create table photos (
  id bigserial not null primary key,
  thumb_url text not null,
  url text not null
);

insert into
  events (
    title,
    details,
    description,
    date,
    start_time,
    event_length_minutes,
    mainPhoto,
    digital,
    online_address,
    address_line_1,
    address_state,
    address_zip,
    price
  )
values
  (
    'Andrews Birthday Party',
    'Join us for Andrews Birthday',
    'Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo.',
    '2022-04-01',
    '19:30:10',
    '30',
    'https://berkscountyliving.com/downloads/18196/download/iStock-918933880.jpg?cb=1155e4a7652ab617e102986ad35ab972',
    'false',
    '',
    '123 Main Street',
    'CA',
    '94107',
    '50'
  );

insert into
  events (
    title,
    details,
    description,
    date,
    start_time,
    event_length_minutes,
    mainPhoto,
    digital,
    online_address,
    address_line_1,
    address_state,
    address_zip,
    price
  )
values
  (
    'Hack Reactor Alum Networking Event',
    'Come Meet fellow HR members',
    'Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo.',
    '2022-03-07',
    '12:30:10',
    '90',
    'https://imageio.forbes.com/specials-images/dam/imageserve/479653273/960x0.jpg?fit=bounds&format=jpg&width=960',
    'false',
    '',
    '2675 Geary Blvd',
    'CA',
    '94118',
    '120'
  );

insert into
   events (
    title,
    details,
    description,
    date,
    start_time,
    event_length_minutes,
    mainPhoto,
    digital,
    online_address,
    address_line_1,
    address_state,
    address_zip,
    price
  )
values
  (
    'Pizza Tasting Contest',
    'Like pizza? This is for you.',
    'Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo.',
    '2022-2-17',
    '16:30:10',
    '20',
    'https://img.sfist.com/2019/03/caseys-pizza-sf-1.jpg',
    'false',
    '',
    '2263 Sacramento Street',
    'CA',
    '94115',
    '15'
  );

insert into
    events (
    title,
    details,
    description,
    date,
    start_time,
    event_length_minutes,
    mainPhoto,
    digital,
    online_address,
    price
  )
values
  (
    'Pokemon Twitch Stream',
    'Online event for those who like pocket monsters. ',
    'Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo.',
    '2022-4-23',
    '08:30:10',
    '120',
    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/120540528/original/bf5e866a13321269fa485cf423038158ae586320/create-a-stream-overlay-for-your-needs.jpg',
    'true',
    'http://twitch.com/test',
    '3000'
  );

insert into
    events (
    title,
    details,
    description,
    date,
    start_time,
    event_length_minutes,
    mainPhoto,
    digital,
    online_address,
    address_line_1,
    address_state,
    address_zip,
    price
  )
values
  (
    'React Bootcamp',
    'Learn the best JS framework out there.',
    'Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo.',
    '2022-3-05',
    '09:30:10',
    '240',
    'https://reactjs.org/logo-og.png',
    'false',
    '',
    '44 Tahema Street',
    'CA',
    '94105',
    '17000'
  );

  insert into
    events (
    title,
    details,
    description,
    date,
    start_time,
    event_length_minutes,
    mainPhoto,
    digital,
    online_address,
    address_line_1,
    address_state,
    address_zip,
    price
  )
values
  (
    'Rick Astley Dance Training',
    'This course will never give you up.',
    'Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo.',
    '2022-6-09',
    '09:30:10',
    '60',
    'https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png?w=1024',
    'false',
    '',
    '774 Emerson St ',
    'CA',
    '94301',
    '420'
  );

    insert into
    events (
    title,
    details,
    description,
    date,
    start_time,
    event_length_minutes,
    mainPhoto,
    digital,
    online_address,
    address_line_1,
    address_state,
    address_zip,
    price
  )
values
  (
    'Billionaire Yoga Retreat',
    'Relax and enjoy while tweeting about altcoins.',
    'Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo.',
    '2022-4-20',
    '10:30:10',
    '360',
    'https://mostlyamelie.com/wp-content/uploads/2019/05/IMG_0059.jpg',
    'false',
    '',
    '100 Century Center ',
    'CA',
    '95112',
    '7500'
  );


    insert into
    events (
    title,
    details,
    description,
    date,
    start_time,
    event_length_minutes,
    mainPhoto,
    digital,
    online_address,
    price
  )
values
  (
    'How to Make Youtube Videos',
    'Want to be an influencer? Start here.',
    'Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo.',
    '2022-4-20',
    '10:30:10',
    '360',
    'https://i.ytimg.com/vi/ZBDSNy4Yn9Q/maxresdefault.jpg',
    'true',
    'https://www.youtube.com/',
    '5'
  );