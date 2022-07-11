create table users
(
id serial primary key,
name varchar(30),
profile_image_url varchar(2048),
channel_id int,
love varchar(50),
hate varchar(50),
meal_period interval,
last_ate timestamp,
current_room int
);

create table rooms
(
id serial primary key,
name varchar(30),
menu varchar(50),
max_capacity int,
created_time timestamp,
complete boolean
);

alter table users
add constraint fk_current_room
foreign key (current_room)
references rooms (id)
on delete set null;

create table channels
(
id serial primary key,
name varchar(30),
maxcapacity int
);

alter table users
add constraint fk_channel_id
foreign key (channel_id)
references channels (id);


create table users_rooms
(
id serial primary key,
user_id int,
room_id int,
readystate boolean
);

alter table users_rooms
add constraint fk_user_id
foreign key (user_id)
references users (id);

alter table users_rooms
add constraint fk_room_id
foreign key (room_id)
references rooms (id)
on delete set null;