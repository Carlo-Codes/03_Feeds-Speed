USE feedsspeeds_db;
SELECT * FROM tools;
select * from ChipLoad;


Drop Table tools;
drop table ChipLoad;

insert into tools (Diameter, Flute_no) values(12, 1);
insert into ChipLoad(Material, 2mm, 4mm, 6mm, 8mm, 10mm, 12mm) values('Aluminium', 0.65, 0.11, 0.125, 0.165, 0, 0);

CREATE TABLE ChipLoad(
Material varchar(255) NOT NULL,
2mm float NOT NULL,
4mm float NOT NULL,
6mm float NOT NULL,
8mm float NOT NULL,
10mm float NOT NULL,
12mm float NOT NULL,
UNIQUE(Material)
);

CREATE TABLE Tools(
Diameter int NOT NULL,
Flute_no int NOT NULL,
constraint Tool_def Primary Key (Diameter, Flute_no)
);
