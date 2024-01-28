CREATE DATABASE softjobs;
\c softjobs;

CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password
VARCHAR(80) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );
