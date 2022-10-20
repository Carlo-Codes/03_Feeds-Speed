USE feedsspeeds_db;
SELECT * FROM tools;
select * from ChipLoad;
select * from feedsANDSpeeds;
select * from users;


Drop Table tools;
drop table ChipLoad;
drop table feedsANDSpeeds;
drop table users;

delete from chipload where id = 1;

insert into tools (Diameter, Flute_no) values(12, 1);
insert into ChipLoad(Material, user_id, 2mm, 4mm, 6mm, 8mm, 10mm, 12mm) values('Aluminium',1, 0.65, 0.11, 0.125, 0.165, 0.2, 0.25);
insert into users(email, pswd) values ('fdsjfsn@fsdkf.com', 'fdslfksk');

CREATE TABLE ChipLoad(
id int auto_increment,
user_id int,
Material varchar(255) NOT NULL,
2mm float NOT NULL,
4mm float NOT NULL,
6mm float NOT NULL,
8mm float NOT NULL,
10mm float NOT NULL,
12mm float NOT NULL,
constraint material_id primary key (id),
foreign key (user_id) references users (id)
);

CREATE TABLE Tools(
Diameter int NOT NULL,
Flute_no int NOT NULL,
constraint Tool_def Primary Key (Diameter, Flute_no)
);

Create table feedsANDspeeds(
id int auto_increment,
material_id int not null,
tool_diameter int not null,
tool_flutes int not null,
rpm int not null,
feed_rate int not null,
step_down int not null,
constraint FeedSpeedID primary Key (id),
foreign key (material_id) references Chipload (id) on delete cascade
);

create table users(
id int auto_increment not null,
email varchar(255) not null,
pswd varchar(255) not null,
primary key (id),
unique (email)
);

