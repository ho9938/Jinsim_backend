create table channels
(
id varchar(30) primary key,
max_capacity int,
password int
);

create table users
(
id bigint primary key,
name varchar(30),
profile_image_url varchar(2048),
love varchar(50),
hate varchar(50),
meal_period interval,
last_ate timestamp,
room_id int,
channel_id varchar(30)
);

create table rooms
(
id serial primary key,
name varchar(30),
menu varchar(50),
max_capacity int,
created_time timestamp,
complete boolean,
channel_id varchar(30)
);

create table users_rooms
(
id serial primary key,
user_id bigint,
room_id int,
ready_state boolean
);

alter table users
add constraint fk_room_id
foreign key (room_id)
references rooms (id)
on delete set null;

alter table users
add constraint fk_channel_id
foreign key (channel_id)
references channels (id);

alter table rooms
add constraint fk_channel_id
foreign key (channel_id)
references channels (id);

alter table users_rooms
add constraint fk_user_id
foreign key (user_id)
references users (id);

alter table users_rooms
add constraint fk_room_id
foreign key (room_id)
references rooms (id)
on delete set null;

insert into channels values ('몰입캠프 1분반', 20, 1111);
insert into channels values ('몰입캠프 2분반', 20, 2222);
insert into channels values ('몰입캠프 3분반', 20, 3333);
insert into channels values ('몰입캠프 4분반', 20, 4444);

/*
drop table users_rooms;
drop table users;
drop table rooms;
drop table channels;
*/ 

