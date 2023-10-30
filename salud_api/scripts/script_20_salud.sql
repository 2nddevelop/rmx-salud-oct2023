
--
-- SALUD
-- Base de Datos: rmx_salud_2023
--

create table rmx_sld_centros (
  cnt_id serial primary key,
  cnt_codigo text not null,
  cnt_descripcion text not null,
  cnt_registrado timestamp without time zone NOT NULL DEFAULT now(),
  cnt_modificado timestamp without time zone NOT NULL DEFAULT now(),
  cnt_usr_id integer NOT NULL,
  cnt_estado text default 'A'
);
insert into rmx_sld_centros (cnt_codigo, cnt_descripcion, cnt_usr_id) values
('CS01', 'C. de Salud Palmarcito', 1),
('CS02', 'C. de Salud San Jorge', 1),
('CS03', 'C. de Salud Guadalquivir', 1),
('CS04', 'C. de Salud San Luis', 1),
('CS05', 'C. de Salud 15 de Noviembre', 1),
('CS06', 'C. de Salud Nestor Paz', 1),
('CS07', 'C. de Salud Avaroa', 1);


create table rmx_sld_especialidades (
  esp_id serial primary key,
  esp_codigo text not null,
  esp_descripcion text not null,
  esp_registrado timestamp without time zone NOT NULL DEFAULT now(),
  esp_modificado timestamp without time zone NOT NULL DEFAULT now(),
  esp_usr_id integer NOT NULL,
  esp_estado text default 'A'
);
insert into rmx_sld_especialidades (esp_codigo, esp_descripcion, esp_usr_id) values
('MGE', 'Medicina General', 1),
('TRM', 'Traumatología', 1),
('CAR', 'Cardiología', 1),
('PDT', 'Pediatria', 1),
('GNC', 'Ginecología', 1),
('OBS', 'Obstetrícia', 1),
('OFT', 'Oftalmología', 1),
('DRM', 'Dermatología', 1),
('NFR', 'Nefrología', 1),
('OTL', 'Otorrinolaringología', 1);


create table rmx_sld_planificacion (
  pln_id serial primary key,
  pln_cnt_id integer not null,
  pln_esp_id integer not null,
  pln_data jsonb not null default '{}',
  pln_registrado timestamp without time zone NOT NULL DEFAULT now(),
  pln_modificado timestamp without time zone NOT NULL DEFAULT now(),
  pln_usr_id integer NOT NULL,
  pln_estado text default 'A' 
);
insert into rmx_sld_planificacion (pln_cnt_id, pln_esp_id, pln_data, pln_usr_id) values
(1, 1, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Perez",    "pln_max_fichas":"10" }', 1),
(1, 2, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Pozos",    "pln_max_fichas":"10" }', 1),
(1, 3, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Villamor", "pln_max_fichas":"10" }', 1),
(1, 4, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_medico":"Dr. Lopez",    "pln_max_fichas":"10" }', 1),
(2, 1, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Aramayo",  "pln_max_fichas":"10" }', 1),
(2, 4, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Cazas",    "pln_max_fichas":"10" }', 1),
(2, 6, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Ramallo",  "pln_max_fichas":"10" }', 1),
(3, 1, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Paz",      "pln_max_fichas":"10" }', 1),
(3, 7, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Arduz",    "pln_max_fichas":"10" }', 1),
(3, 8, '{ "pln_fecha":"2022-06-15", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Leon",     "pln_max_fichas":"10" }', 1),

(1, 1, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Perez",    "pln_max_fichas":"10" }', 1),
(1, 2, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Pozos",    "pln_max_fichas":"10" }', 1),
(1, 3, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Villamor", "pln_max_fichas":"10" }', 1),
(1, 4, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_medico":"Dr. Lopez",    "pln_max_fichas":"10" }', 1),
(2, 1, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Aramayo",  "pln_max_fichas":"10" }', 1),
(2, 4, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Cazas",    "pln_max_fichas":"10" }', 1),
(2, 6, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Ramallo",  "pln_max_fichas":"10" }', 1),
(3, 1, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Paz",      "pln_max_fichas":"10" }', 1),
(3, 7, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Arduz",    "pln_max_fichas":"10" }', 1),
(3, 8, '{ "pln_fecha":"2022-06-16", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Leon",     "pln_max_fichas":"10" }', 1),

(1, 1, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Perez",    "pln_max_fichas":"10" }', 1),
(1, 2, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Pozos",    "pln_max_fichas":"10" }', 1),
(1, 3, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Villamor", "pln_max_fichas":"10" }', 1),
(1, 4, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_medico":"Dr. Lopez",    "pln_max_fichas":"10" }', 1),
(2, 1, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Aramayo",  "pln_max_fichas":"10" }', 1),
(2, 4, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Cazas",    "pln_max_fichas":"10" }', 1),
(2, 6, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Ramallo",  "pln_max_fichas":"10" }', 1),
(3, 1, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Paz",      "pln_max_fichas":"10" }', 1),
(3, 7, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Arduz",    "pln_max_fichas":"10" }', 1),
(3, 8, '{ "pln_fecha":"2022-06-17", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Leon",     "pln_max_fichas":"10" }', 1);

insert into rmx_sld_planificacion (pln_cnt_id, pln_esp_id, pln_data, pln_usr_id) values
(1, 1, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Perez",    "pln_max_fichas":"10" }', 1),
(1, 2, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Pozos",    "pln_max_fichas":"10" }', 1),
(1, 3, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Villamor", "pln_max_fichas":"10" }', 1),
(1, 4, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_medico":"Dr. Lopez",    "pln_max_fichas":"10" }', 1),
(2, 1, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Aramayo",  "pln_max_fichas":"10" }', 1),
(2, 4, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Cazas",    "pln_max_fichas":"10" }', 1),
(2, 6, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Ramallo",  "pln_max_fichas":"10" }', 1),
(3, 1, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Paz",      "pln_max_fichas":"10" }', 1),
(3, 7, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Arduz",    "pln_max_fichas":"10" }', 1),
(3, 8, '{ "pln_fecha":"2022-07-04", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Leon",     "pln_max_fichas":"10" }', 1),

(1, 1, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Perez",    "pln_max_fichas":"10" }', 1),
(1, 2, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Pozos",    "pln_max_fichas":"10" }', 1),
(1, 3, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Villamor", "pln_max_fichas":"10" }', 1),
(1, 4, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_medico":"Dr. Lopez",    "pln_max_fichas":"10" }', 1),
(2, 1, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Aramayo",  "pln_max_fichas":"10" }', 1),
(2, 4, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Cazas",    "pln_max_fichas":"10" }', 1),
(2, 6, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Ramallo",  "pln_max_fichas":"10" }', 1),
(3, 1, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Paz",      "pln_max_fichas":"10" }', 1),
(3, 7, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Arduz",    "pln_max_fichas":"10" }', 1),
(3, 8, '{ "pln_fecha":"2022-07-05", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Leon",     "pln_max_fichas":"10" }', 1),

(1, 1, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Perez",    "pln_max_fichas":"10" }', 1),
(1, 2, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Pozos",    "pln_max_fichas":"10" }', 1),
(1, 3, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Villamor", "pln_max_fichas":"10" }', 1),
(1, 4, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_medico":"Dr. Lopez",    "pln_max_fichas":"10" }', 1),
(2, 1, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Aramayo",  "pln_max_fichas":"10" }', 1),
(2, 4, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Cazas",    "pln_max_fichas":"10" }', 1),
(2, 6, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Ramallo",  "pln_max_fichas":"10" }', 1),
(3, 1, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_medico":"Dr. Paz",      "pln_max_fichas":"10" }', 1),
(3, 7, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_medico":"Dr. Arduz",    "pln_max_fichas":"10" }', 1),
(3, 8, '{ "pln_fecha":"2022-07-06", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_medico":"Dr. Leon",     "pln_max_fichas":"10" }', 1);

create table rmx_sld_fichas (
  fch_id serial primary key,
  fch_cli_id integer not null,
  fch_pln_id integer not null,
  fch_nro_ficha text not null,
  fch_kdx_medico text not null,
  fch_registrado timestamp without time zone NOT NULL DEFAULT now(),
  fch_modificado timestamp without time zone NOT NULL DEFAULT now(),
  fch_usr_id integer NOT NULL,
  fch_estado text default 'P' 
);
insert into rmx_sld_fichas (fch_cli_id, fch_pln_id, fch_nro_ficha, fch_kdx_medico, fch_usr_id) values
(1, 5, 'F-1', 'MER-19680709', 1);

create table rmx_sld_doctores (
  doc_id serial primary key,
  doc_cnt_id integer not null,
  doc_esp_id integer not null,
  doc_data jsonb not null default '{}',
  doc_registrado timestamp without time zone NOT NULL DEFAULT now(),
  doc_modificado timestamp without time zone NOT NULL DEFAULT now(),
  doc_usr_id integer NOT NULL,
  doc_estado text default 'A' 
);
insert into rmx_sld_doctores (doc_cnt_id, doc_esp_id, doc_data, doc_usr_id) values
(1, 1, '{ "doc_paterno":"Davalos", "doc_materno":"Flores", "doc_nombres":"Pepe", "doc_ci":"10930841", 
"doc_celular":"77755777", "doc_dias":"Lunes y Jueves", "doc_horario_inicio":"02:00", "doc_horario_fin":"06:00" }', 
1);

