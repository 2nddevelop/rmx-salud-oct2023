
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
(1, 1, '{ "doc_paterno":"Davalos", "doc_materno":"Flores", "doc_nombres":"Jose", "doc_ci":"10930841", 
"doc_celular":"70155777", "doc_dias":"Lunes y Jueves", "doc_horario_inicio":"02:00", "doc_horario_fin":"06:00" }', 1),
(1, 2, '{ "doc_paterno":"Rojas", "doc_materno":"Aliagan", "doc_nombres":"Armando", "doc_ci":"10930841", 
"doc_celular":"77055777", "doc_dias":"Lunes y Jueves", "doc_horario_inicio":"02:00", "doc_horario_fin":"06:00" }', 1),
(1, 3, '{ "doc_paterno":"Perez", "doc_materno":"Rios", "doc_nombres":"Leonardo", "doc_ci":"10930841", 
"doc_celular":"78855777", "doc_dias":"Lunes y Jueves", "doc_horario_inicio":"02:00", "doc_horario_fin":"06:00" }', 1),
(1, 4, '{ "doc_paterno":"Llanos", "doc_materno":"Jove", "doc_nombres":"Rolando", "doc_ci":"10930841", 
"doc_celular":"79155777", "doc_dias":"Lunes y Jueves", "doc_horario_inicio":"02:00", "doc_horario_fin":"06:00" }', 1),
(1, 5, '{ "doc_paterno":"Arce", "doc_materno":"Luna", "doc_nombres":"Narciso", "doc_ci":"10930841", 
"doc_celular":"73055777", "doc_dias":"Lunes y Jueves", "doc_horario_inicio":"02:00", "doc_horario_fin":"06:00" }', 1),
(1, 6, '{ "doc_paterno":"Rios", "doc_materno":"Dulon", "doc_nombres":"Luis", "doc_ci":"10930841", 
"doc_celular":"71855777", "doc_dias":"Lunes y Jueves", "doc_horario_inicio":"02:00", "doc_horario_fin":"06:00" }', 1),
(1, 7, '{ "doc_paterno":"Orcko", "doc_materno":"Arias", "doc_nombres":"Genaro", "doc_ci":"10930841", 
"doc_celular":"71855777", "doc_dias":"Lunes y Jueves", "doc_horario_inicio":"02:00", "doc_horario_fin":"06:00" }', 1),
(1, 8, '{ "doc_paterno":"Linera", "doc_materno":"Flores", "doc_nombres":"Carlos", "doc_ci":"10930841", 
"doc_celular":"70155777", "doc_dias":"Lunes y Jueves", "doc_horario_inicio":"02:00", "doc_horario_fin":"06:00" }', 1);


create table rmx_sld_planificacion (
  pln_id serial primary key,
  pln_cnt_id integer not null,
  pln_esp_id integer not null,
  pln_doc_id integer not null,
  pln_data jsonb not null default '{}',
  pln_registrado timestamp without time zone NOT NULL DEFAULT now(),
  pln_modificado timestamp without time zone NOT NULL DEFAULT now(),
  pln_usr_id integer NOT NULL,
  pln_estado text default 'A' 
);
insert into rmx_sld_planificacion (pln_cnt_id, pln_esp_id, pln_doc_id, pln_data, pln_usr_id) values
(1, 1, 1, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(1, 2, 2, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(1, 3, 3, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(1, 4, 4, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_max_fichas":"10" }', 1),
(2, 1, 1, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(2, 4, 4, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(2, 6, 6, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(3, 1, 1, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(3, 7, 7, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(3, 8, 8, '{ "pln_fecha":"2023-11-20", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),

(1, 1, 1, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(1, 2, 2, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(1, 3, 3, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(1, 4, 4, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_max_fichas":"10" }', 1),
(2, 1, 1, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(2, 4, 4, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(2, 6, 6, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(3, 1, 1, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(3, 7, 7, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(3, 8, 8, '{ "pln_fecha":"2023-11-21", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),

(1, 1, 1, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(1, 2, 2, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(1, 3, 3, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(1, 4, 4, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_max_fichas":"10" }', 1),
(2, 1, 1, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(2, 4, 4, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(2, 6, 6, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(3, 1, 1, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(3, 7, 7, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(3, 8, 8, '{ "pln_fecha":"2023-11-22", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1);

insert into rmx_sld_planificacion (pln_cnt_id, pln_esp_id, pln_doc_id, pln_data, pln_usr_id) values
(1, 1, 1, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(1, 2, 2, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(1, 3, 3, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(1, 4, 4, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_max_fichas":"10" }', 1),
(2, 1, 1, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(2, 4, 4, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(2, 6, 6, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(3, 1, 1, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(3, 7, 7, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(3, 8, 8, '{ "pln_fecha":"2023-11-23", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),

(1, 1, 1, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(1, 2, 2, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(1, 3, 3, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(1, 4, 4, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_max_fichas":"10" }', 1),
(2, 1, 1, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(2, 4, 4, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(2, 6, 6, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(3, 1, 1, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(3, 7, 7, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(3, 8, 8, '{ "pln_fecha":"2023-11-24", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),

(1, 1, 1, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(1, 2, 2, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(1, 3, 3, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(1, 4, 4, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 4", "pln_max_fichas":"10" }', 1),
(2, 1, 1, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(2, 4, 4, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(2, 6, 6, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1),
(3, 1, 1, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 1", "pln_max_fichas":"10" }', 1),
(3, 7, 7, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 2", "pln_max_fichas":"10" }', 1),
(3, 8, 8, '{ "pln_fecha":"2023-11-25", "pln_horario":"08-12", "pln_consultorio":"Consultorio 3", "pln_max_fichas":"10" }', 1);


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



--
--
--

create table rmx_gral_tipos_cliente (
  tcli_id serial primary key,
  tcli_codigo text not null,
  tcli_descripcion text not null,
  tcli_registrado timestamp without time zone NOT NULL DEFAULT now(),
  tcli_modificado timestamp without time zone NOT NULL DEFAULT now(),
  tcli_usr_id integer NOT NULL,
  tcli_estado text default 'A'
);
insert into rmx_gral_tipos_cliente (tcli_codigo, tcli_descripcion, tcli_usr_id) values
('CLR', 'Cliente Regular', 1),
('INS', 'Institucional', 1),
('OTR', 'Otro', 1);


create table rmx_gral_clientes (
  cli_id serial primary key,
  cli_tcli_id integer NOT NULL,
  cli_data jsonb NOT NULL,
  cli_registrado timestamp without time zone NOT NULL DEFAULT now(),
  cli_modificado timestamp without time zone NOT NULL DEFAULT now(),
  cli_usr_id integer NOT NULL,
  cli_estado text default 'A'
);
insert into rmx_gral_clientes (cli_tcli_id, cli_data, cli_usr_id) values
( 1, '{"cli_nombres":"Jorge", "cli_paterno":"Paz", "cli_materno":"Soliz", "cli_nit":"1122334", "cli_telefono":"224455", "cli_celular":"70133444", "cli_direccion":"Arenal #444", "cli_correo":"jorge@gmail.com", "cli_clave":"123456"}', 1),
( 2, '{"cli_nombres":"Maria", "cli_paterno":"Romero", "cli_materno":"Perez", "cli_nit":"2233445", "cli_telefono":"773344", "cli_celular":"69709210", "cli_direccion":"Flores #123", "cli_correo":"maria@gmail.com", "cli_clave":"123456"}', 1),
( 2, '{"cli_provincia":"Murillo", "cli_nombres":"Luz", "cli_paterno":"Campero", "cli_materno":"Lopez", "cli_nit":"4455443", "cli_telefono":"6424245", "cli_celular":"67789898", "cli_direccion":"Sagarnaga #2222", "cli_correo":"luz@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_nombres":"Luis Miguel", "cli_paterno":"Zamora", "cli_materno":"Velez", "cli_nit":"5656567", "cli_telefono":"", "cli_celular":"70144222", "cli_direccion":"calle El Acre #199", "cli_correo":"luis@gmail.com", "cli_clave":"123456"}', 1),
( 2, '{"cli_nombres":"Rolando", "cli_paterno":"Lima", "cli_materno":"Poma", "cli_nit":"5566778", "cli_telefono":"223456", "cli_celular":"76856011", "cli_direccion":"Mendez #113", "cli_correo":"rolando@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_nombres":"Waldo", "cli_paterno":"Romero", "cli_materno":"Romero", "cli_nit":"3344556", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"waldo@gmail.com", "cli_clave":"123456"}', 1);
