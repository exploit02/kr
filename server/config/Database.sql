CREATE DATABASE krishi;
CREATE SCHEMA masters;
CREATE SCHEMA users;
CREATE EXTENSION citext;

CREATE TABLE users.user_type(
id bigserial NOT NULL,
user_type citext NOT NULL,
create_time timestamp NOT NULL DEFAULT now(),
CONSTRAINT pk_user_type_id PRIMARY KEY (id),
CONSTRAINT unique_user_type UNIQUE (user_type)
);

INSERT INTO users.user_type(user_type) values('Super Admin');
INSERT INTO users.user_type(user_type) values('Admin');
INSERT INTO users.user_type(user_type) values('Chief Executive');
INSERT INTO users.user_type(user_type) values('Business Executive');
INSERT INTO users.user_type(user_type) values('Executive');
INSERT INTO users.user_type(user_type) values('End User');

CREATE TABLE users.users(
id bigserial NOT NULL,
fname citext NOT NULL,
user_type_id int8 NOT NULL,
created_by int8 NULL,
updated_by int8 NULL,
create_time timestamp NOT NULL DEFAULT now(),
update_time timestamp NOT NULL DEFAULT now(),
CONSTRAINT pk_users_id PRIMARY KEY (id),
CONSTRAINT fk_user_type_id FOREIGN KEY (user_type_id) REFERENCES users.user_type(id) ON UPDATE CASCADE ON DELETE CASCADE 
);

CREATE SEQUENCE masters.seq_country_id
INCREMENT BY 1
MINVALUE 1001
MAXVALUE 9223372036854775807
START 1001
CACHE 1
NO CYCLE;

CREATE TABLE masters.country(
id int8 NOT NULL DEFAULT nextval('masters.seq_country_id' :: regclass),
country_name varchar(256) NOT NULL,
is_active bool NOT NULL DEFAULT TRUE,
serviceable bool NOT NULL DEFAULT FALSE,
partially_serviceable bool NOT NULL DEFAULT FALSE,
created_by int8 NULL,
updated_by int8 NULL,
create_time timestamp NOT NULL DEFAULT now(),
update_time timestamp NOT NULL DEFAULT now(),
CONSTRAINT pk_country_id PRIMARY KEY (id),
CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE
); 

CREATE SEQUENCE users.seq_users_id
INCREMENT BY 1
MINVALUE 1201
MAXVALUE 9223372036854775807
START 1201
CACHE 1
NO CYCLE;

ALTER TABLE users.users
ALTER COLUMN id TYPE int8 USING id::int8;

ALTER TABLE users.users
ALTER COLUMN id SET DEFAULT nextval('users.seq_users_id' :: regclass);

INSERT INTO users.users(fname,user_type_id) values('sheuli',2);
INSERT INTO users.users(fname, user_type_id) VALUES('Mondal',2);

ALTER TABLE users.users
ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users.users(id) ON DELETE SET NULL;

ALTER TABLE users.users
ADD CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users.users(id) ON DELETE SET NULL;


CREATE SCHEMA splitsvilla;

CREATE TABLE splitsvilla.munch(
munch_id int8 NOT NULL,
crunchy varchar(128) NOT NULL,
CONSTRAINT fk_munch_id FOREIGN KEY (munch_id) REFERENCES users.users(id) ON DELETE CASCADE
);

CREATE TABLE splitsvilla.kitkat(
kitkat_id int8 NOT NULL,
crunchy varchar(128) NOT NULL,
CONSTRAINT fk_kitkat_id FOREIGN KEY (kitkat_id) REFERENCES users.users(id) ON DELETE CASCADE
);

----New added(1st july)------------------------------------------

ALTER TABLE users.users
ADD COLUMN lname citext NOT NULL,
ADD COLUMN uname citext NOT NULL,
ADD COLUMN email_id citext NOT NULL,
ADD COLUMN mobile_no varchar(16) NOT NULL,
ADD COLUMN gender citext NOT NULL,
ADD COLUMN doj timestamp NOT NULL,
ADD COLUMN dob timestamp NOT NULL,
ADD COLUMN supervisor_id int8 NULL,
ADD COLUMN super_type_id int8 NULL,
ADD CONSTRAINT unique_id UNIQUE (id, user_type_id),
ADD CONSTRAINT unique_uname UNIQUE (uname),
ADD CONSTRAINT fk_executive FOREIGN KEY (supervisor_id, super_type_id) REFERENCES users.users (id, user_type_id);


ALTER TABLE splitsvilla.munch
DROP CONSTRAINT fk_munch_id;

ALTER TABLE splitsvilla.munch
ADD CONSTRAINT fk_munch_id FOREIGN KEY (munch_id) REFERENCES users.users(id) ON DELETE CASCADE;

ALTER TABLE splitsvilla.kitkat
DROP CONSTRAINT fk_kitkat_id;

ALTER TABLE users.users
DROP CONSTRAINT fk_executive;

ALTER TABLE users.users
ADD CONSTRAINT fk_executive FOREIGN KEY (supervisor_id, super_type_id) REFERENCES users.users (id, user_type_id) ON UPDATE CASCADE;

ALTER TABLE users.users ALTER COLUMN email_id DROP NOT NULL;

------------New Added(4th july)---------------------------------------

CREATE SEQUENCE masters.seq_state_id
INCREMENT BY 1
MINVALUE 2001
MAXVALUE 9223372036854775807
START 2001
CACHE 1
NO CYCLE;


CREATE TABLE masters.state(
id int8 NOT NULL DEFAULT nextval('masters.seq_state_id' :: regclass),
state_name varchar(256) NOT NULL,
country_id int8 NOT NULL,
state_code varchar(256) NOT NULL,
is_active bool NOT NULL DEFAULT TRUE,
serviceable bool NOT NULL DEFAULT FALSE,
partially_serviceable bool NOT NULL DEFAULT FALSE,
created_by int8 NULL,
updated_by int8 NULL,
create_time timestamp NOT NULL DEFAULT now(),
update_time timestamp NOT NULL DEFAULT now(),
CONSTRAINT pk_state_id PRIMARY KEY (id),
CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES masters.country(id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE
);

----------------------------New added(5th july)----------------------------------------------------

CREATE SEQUENCE masters.seq_district_id
INCREMENT BY 1
MINVALUE 3010
MAXVALUE 9223372036854775807
START 3010
CACHE 1
NO CYCLE

CREATE TABLE masters.district(
id int8 NOT NULL DEFAULT nextval('masters.seq_district_id' :: regclass),
district_name varchar(256) NOT NULL,
district_code varchar(256) NOT NULL,
state_id int8 NOT NULL,
is_active bool NOT NULL DEFAULT TRUE,
serviceable bool NOT NULL DEFAULT FALSE,
partially_serviceable bool NOT NULL DEFAULT FALSE,
created_by int8 NULL,
updated_by int8 NULL,
create_time timestamp NOT NULL DEFAULT now(),
update_time timestamp NOT NULL DEFAULT now(),
CONSTRAINT pk_district_id PRIMARY KEY(id),
CONSTRAINT fk_state_id FOREIGN KEY (state_id) REFERENCES masters.state(id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE
);

--------------------------------------New added(9th july)---------------------------------------------
CREATE SEQUENCE masters.police_station_id
INCREMENT BY 1
MINVALUE 4111
MAXVALUE 9223372036854775807
START 4111
CACHE 1
NO CYCLE

CREATE TABLE masters.police_station(
id int8 NOT NULL DEFAULT nextval('masters.police_station_id' :: regclass),
police_station_name varchar(256) NOT NULL,
district_id int8 NOT NULL,
is_active bool NOT NULL DEFAULT TRUE,
serviceable bool NOT NULL DEFAULT FALSE,
partially_serviceable bool NOT NULL DEFAULT FALSE,
created_by int8 NULL,
updated_by int8 NULL,
create_time timestamp NOT NULL DEFAULT now(),
update_time timestamp NOT NULL DEFAULT now(),
CONSTRAINT pk_police_station_id PRIMARY KEY(id),
CONSTRAINT fk_district_id FOREIGN KEY (district_id) REFERENCES masters.district(id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE SEQUENCE masters.post_ofc_id
INCREMENT BY 1
MINVALUE 7800
MAXVALUE 9223372036854775807
START 7800
CACHE 1
NO CYCLE

CREATE TABLE masters.post_office(
id int8 NOT NULL DEFAULT nextval('masters.post_ofc_id' :: regclass),
post_ofc_name varchar(256) NOT NULL,
pin_number int8 NOT NULL,
policestation_id int8 NOT NULL,
is_active bool NOT NULL DEFAULT TRUE,
serviceable bool NOT NULL DEFAULT FALSE,
partially_serviceable bool NOT NULL DEFAULT FALSE,
created_by int8 NULL,
updated_by int8 NULL,
create_time timestamp NOT NULL DEFAULT now(),
update_time timestamp NOT NULL DEFAULT now(),
CONSTRAINT pk_post_office_id PRIMARY KEY(id),
CONSTRAINT unique_pin_number UNIQUE (pin_number),
CONSTRAINT fk_policestation_id FOREIGN KEY (policestation_id) REFERENCES masters.police_station(id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE SEQUENCE masters.village_id
INCREMENT BY 1
MINVALUE 8501
MAXVALUE 9223372036854775807
START 8501
CACHE 1
NO CYCLE

CREATE TABLE masters.village(
id int8 NOT NULL DEFAULT nextval('masters.village_id' :: regclass),
village_name varchar(256) NOT NULL,
post_ofc_id int8 NOT NULL,
is_active bool NOT NULL DEFAULT TRUE,
serviceable bool NOT NULL DEFAULT FALSE,
partially_serviceable bool NOT NULL DEFAULT FALSE,
created_by int8 NULL,
updated_by int8 NULL,
create_time timestamp NOT NULL DEFAULT now(),
update_time timestamp NOT NULL DEFAULT now(),
CONSTRAINT pk_village_id PRIMARY KEY(id),
CONSTRAINT fk_post_ofc_id FOREIGN KEY (post_ofc_id) REFERENCES masters.post_office(id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES users.users (id) ON UPDATE CASCADE ON DELETE CASCADE
);

----------------------------------29th july---------------------------------------------------------------------
ALTER TABLE masters.state
ADD CONSTRAINT unique_state_name UNIQUE (state_name);

ALTER TABLE masters.state
ADD CONSTRAINT unique_state_code UNIQUE (state_code);