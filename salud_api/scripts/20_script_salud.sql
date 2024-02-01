
--
-- SALUD
-- Base de Datos: rmx_salud_2023
--

create table rmx_sld_centros (
  cnt_id serial primary key,
  cnt_red_id integer not null,
  cnt_codigo text not null,
  cnt_descripcion text not null,
  cnt_registrado timestamp DEFAULT now(),
  cnt_modificado timestamp,
  cnt_usr_id integer NOT NULL,
  cnt_estado text default 'A'
);
insert into rmx_sld_centros (cnt_red_id, cnt_codigo, cnt_descripcion, cnt_usr_id) values
(405, '100445', 'Hospital del Niño', 1);
-- ('CS02', 'C. de Salud San Jorge', 1),
-- ('CS03', 'C. de Salud Guadalquivir', 1),
-- ('CS04', 'C. de Salud San Luis', 1),
-- ('CS05', 'C. de Salud 15 de Noviembre', 1),
-- ('CS06', 'C. de Salud Nestor Paz', 1),
-- ('CS07', 'C. de Salud Avaroa', 1);


create table rmx_sld_especialidades (
  esp_id serial primary key,
  esp_codigo text not null,
  esp_descripcion text not null,
  esp_codigo_cuaderno text,
  esp_registrado timestamp DEFAULT now(),
  esp_modificado timestamp,
  esp_usr_id integer NOT NULL,
  esp_estado text default 'A'
);
insert into rmx_sld_especialidades (esp_codigo, esp_descripcion, esp_codigo_cuaderno, esp_usr_id) values
('MGE', 'Fisioterapia', 20, 1),
('TRM', 'Traumatología', 3, 1),
('CAR', 'Cardiología', 45, 1),
('PDT', 'Pediatria', 48, 1),
('OFT', 'Oftalmología', 47, 1),
('DRM', 'Dermatología', 7, 1),
('NFR', 'Nefrología', 43, 1),
('NEU', 'Neurología', 8, 1);


create table rmx_sld_consultorios (
  con_id serial primary key,
  con_cnt_id integer not null,
  con_codigo text not null,
  con_descripcion text not null,
  con_registrado timestamp DEFAULT now(),
  con_modificado timestamp,
  con_usr_id integer NOT NULL,
  con_estado text default 'A'
);
insert into rmx_sld_consultorios (con_cnt_id, con_codigo, con_descripcion, con_usr_id) values
(1, 'C01', 'Consultorio 01', 1),
(1, 'C02', 'Consultorio 02', 1),
(1, 'C03', 'Consultorio 03', 1),
(1, 'C04', 'Consultorio 04', 1),
(1, 'C05', 'Consultorio 05', 1),
(1, 'C06', 'Consultorio 06', 1),
(1, 'C07', 'Consultorio 07', 1),
(1, 'C08', 'Consultorio 08', 1),
(1, 'C09', 'Consultorio 09', 1),
(1, 'C10', 'Consultorio 10', 1);

-- (2, 'C-1', 'Consultorio 1', 1),
-- (2, 'C-2', 'Consultorio 2', 1),
-- (2, 'C-3', 'Consultorio 3', 1),
-- (2, 'C-4', 'Consultorio 4', 1),
-- (2, 'C-5', 'Consultorio 5', 1),
-- (2, 'C-6', 'Consultorio 6', 1),
-- (2, 'C-7', 'Consultorio 7', 1),
-- (2, 'C-8', 'Consultorio 8', 1),

-- (3, 'C-01', 'Consultorio 01', 1),
-- (3, 'C-02', 'Consultorio 02', 1),
-- (3, 'C-03', 'Consultorio 03', 1),
-- (3, 'C-04', 'Consultorio 04', 1),
-- (3, 'C-05', 'Consultorio 05', 1),
-- (3, 'C-06', 'Consultorio 06', 1),
-- (3, 'C-07', 'Consultorio 07', 1),
-- (3, 'C-08', 'Consultorio 08', 1),

-- (4, 'C1', 'Consultorio 1', 1),
-- (4, 'C2', 'Consultorio 1', 1),
-- (4, 'C3', 'Consultorio 1', 1),
-- (4, 'C4', 'Consultorio 1', 1),
-- (4, 'C5', 'Consultorio 1', 1),

-- (5, 'C-1', 'Consultorio 1', 1),
-- (5, 'C-2', 'Consultorio 1', 1),
-- (5, 'C-3', 'Consultorio 1', 1);


create table rmx_sld_doctores (
  doc_id serial primary key,
  doc_cnt_id integer not null,
  doc_esp_id integer not null,
  doc_data jsonb not null default '{}',
  doc_registrado timestamp DEFAULT now(),
  doc_modificado timestamp,
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
  pln_con_id integer not null,
  pln_data jsonb not null default '{}',
  pln_data_disponibles jsonb not null default '[]',
  pln_registrado timestamp DEFAULT now(),
  pln_modificado timestamp,
  pln_usr_id integer NOT NULL,
  pln_estado text default 'A' 
);
insert into rmx_sld_planificacion (pln_cnt_id, pln_esp_id, pln_doc_id, pln_con_id, pln_data, pln_data_disponibles, pln_usr_id) values
(1, 1, 1, 1, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-02", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', '[]', 1),
(1, 2, 2, 2, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-02", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', '[]', 1),
(1, 3, 3, 3, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-02", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', '[]', 1),
(1, 4, 4, 4, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-02", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', '[]', 1),
(1, 5, 5, 5, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-02", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', '[]', 1),
(1, 6, 6, 6, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-02", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', '[]', 1),
(1, 7, 7, 7, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-02", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', '[]', 1),
(1, 8, 8, 8, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-02", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', '[]', 1),
-- (3, 7, 7, 2, '{ "pln_fecha":"2023-12-18", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', 1),
-- (3, 8, 8, 3, '{ "pln_fecha":"2023-12-18", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5"}', 1);

(1, 1, 1, 1, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-03", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 2, 2, 2, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-03", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 3, 3, 3, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-03", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 4, 4, 4, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-03", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 5, 5, 5, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-03", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 6, 6, 6, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-03", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 7, 7, 7, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-03", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 8, 8, 8, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-03", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
-- (3, 7, 7, 2, '{ "pln_fecha":"2023-12-19", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', 1),
-- (3, 8, 8, 3, '{ "pln_fecha":"2023-12-19", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', 1),

(1, 1, 1, 1, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-04", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 2, 2, 2, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-04", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 3, 3, 3, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-04", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 4, 4, 4, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-04", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 5, 5, 5, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-04", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 6, 6, 6, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-04", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 7, 7, 7, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-04", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 8, 8, 8, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-04", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
-- (3, 7, 7, 2, '{ "pln_fecha":"2023-12-20", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
-- (3, 8, 8, 3, '{ "pln_fecha":"2023-12-20", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),

(1, 1, 1, 1, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-05", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 2, 2, 2, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-05", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 3, 3, 3, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-05", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 4, 4, 4, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-05", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 5, 5, 5, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-05", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 6, 6, 6, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-05", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 7, 7, 7, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-05", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 8, 8, 8, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-05", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
-- (3, 7, 7, 2, '{ "pln_fecha":"2023-12-21", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
-- (3, 8, 8, 3, '{ "pln_fecha":"2023-12-21", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),

(1, 1, 1, 1, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-06", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 2, 2, 2, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-06", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 3, 3, 3, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-06", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 4, 4, 4, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-06", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 5, 5, 5, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-06", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 6, 6, 6, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-06", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 7, 7, 7, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-06", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 8, 8, 8, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-06", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
-- (3, 7, 7, 2, '{ "pln_fecha":"2023-12-22", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
-- (3, 8, 8, 3, '{ "pln_fecha":"2023-12-22", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),

(1, 1, 1, 1, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-07", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 2, 2, 2, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-07", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 3, 3, 3, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-07", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 4, 4, 4, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-07", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 5, 5, 5, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-07", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 6, 6, 6, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-07", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 7, 7, 7, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-07", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
(1, 8, 8, 8, '{ "pln_duracion ":"20", "pln_fecha":"2024-01-07", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1);
-- (3, 7, 7, 2, '{ "pln_fecha":"2023-12-23", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1),
-- (3, 8, 8, 3, '{ "pln_fecha":"2023-12-23", "pln_horario_inicio":"08:00", "pln_horario_fin": "12:00", "pln_max_fichas":"10", "pln_max_virtuales":"5" }', '[]', 1);


create table rmx_sld_fichas (
  fch_id serial primary key,
  fch_cli_id integer not null,
  fch_pln_id integer not null,
  fch_nro_ficha text not null,
  fch_hora text null,
  fch_kdx_medico text not null,
  fch_tipo_atencion integer default 1,
  fch_fec_fin_referencia timestamp null,
  fch_nro_referencia text null,
  fch_registrado timestamp DEFAULT now(),
  fch_modificado timestamp,
  fch_usr_id integer NOT NULL,
  fch_estado text default 'P' 
);


--
-- PACIENTES
--
create table rmx_gral_tipos_cliente (
  tcli_id serial primary key,
  tcli_codigo text not null,
  tcli_descripcion text not null,
  tcli_registrado timestamp DEFAULT now(),
  tcli_modificado timestamp,
  tcli_usr_id integer NOT NULL,
  tcli_estado text default 'A'
);
insert into rmx_gral_tipos_cliente (tcli_codigo, tcli_descripcion, tcli_usr_id) values
('SUS', 'Paciente SUS', 1),
('CNV', 'Paciente con Covenio', 1),
('INS', 'Paciente Institucional', 1);


create table rmx_gral_clientes (
  cli_id serial primary key,
  cli_tcli_id integer NOT NULL,
  cli_data jsonb NOT NULL,
  cli_registrado timestamp DEFAULT now(),
  cli_modificado timestamp,
  cli_usr_id integer NOT NULL,
  cli_estado text default 'A'
);
insert into rmx_gral_clientes (cli_tcli_id, cli_data, cli_usr_id) values
( 1, '{"cli_fec_nac":"2015-06-13", "cli_nombres":"Jorge", "cli_paterno":"Paz", "cli_materno":"Soliz", "cli_nit":"1122334", "cli_telefono":"2204455", "cli_celular":"70133444", "cli_direccion":"Arenal #444", "cli_correo":"jorge@gmail.com", "cli_clave":"123456"}', 1),
( 2, '{"cli_fec_nac":"2015-07-14", "cli_nombres":"Maria", "cli_paterno":"Romero", "cli_materno":"Perez", "cli_nit":"2233445", "cli_telefono":"7730344", "cli_celular":"69709210", "cli_direccion":"Flores #123", "cli_correo":"maria@gmail.com", "cli_clave":"123456"}', 1),
( 2, '{"cli_fec_nac":"2015-08-15", "cli_provincia":"Murillo", "cli_nombres":"Luz", "cli_paterno":"Campero", "cli_materno":"Lopez", "cli_nit":"4455443", "cli_telefono":"6424245", "cli_celular":"67789898", "cli_direccion":"Sagarnaga #2222", "cli_correo":"luz@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-09-16", "cli_nombres":"Luis Miguel", "cli_paterno":"Zamora", "cli_materno":"Velez", "cli_nit":"5656567", "cli_telefono":"", "cli_celular":"70144222", "cli_direccion":"calle El Acre #199", "cli_correo":"luis@gmail.com", "cli_clave":"123456"}', 1),
( 2, '{"cli_fec_nac":"2016-10-17", "cli_nombres":"Rolando", "cli_paterno":"Lima", "cli_materno":"Poma", "cli_nit":"10566778", "cli_telefono":"223456", "cli_celular":"76856011", "cli_direccion":"Mendez #113", "cli_correo":"rolando@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-12-18", "cli_nombres":"Waldo", "cli_paterno":"Romero", "cli_materno":"Romero", "cli_nit":"3344556", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"waldo@gmail.com", "cli_clave":"123456"}', 1),

( 1, '{"cli_fec_nac":"2016-05-18", "cli_nombres":"Yolanda", "cli_paterno":"Serrano", "cli_materno":"Paz", "cli_nit":"1122334", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"yolanda@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-02-12", "cli_nombres":"Daniela", "cli_paterno":"Zegarra", "cli_materno":"Mayor", "cli_nit":"1033445", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"daniela@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-08-14", "cli_nombres":"Sara", "cli_paterno":"Anaya", "cli_materno":"Colque", "cli_nit":"10112233", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"sara@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-01-02", "cli_nombres":"Sandra", "cli_paterno":"Castro", "cli_materno":"Choque", "cli_nit":"10223344", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"sandra@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-04-05", "cli_nombres":"Carola", "cli_paterno":"Lopez", "cli_materno":"Jaramillo", "cli_nit":"10223434", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"carola@gmail.com", "cli_clave":"123456"}', 1),

( 1, '{"cli_fec_nac":"2016-03-18", "cli_nombres":"Angelica", "cli_paterno":"Bejarano", "cli_materno":"Torrez", "cli_nit":"10223545", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"angelica@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-06-13", "cli_nombres":"Carla", "cli_paterno":"Flores", "cli_materno":"Vargas", "cli_nit":"10213141", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"carla@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-11-11", "cli_nombres":"Natalia", "cli_paterno":"Mendoza", "cli_materno":"Bandera", "cli_nit":"10415161", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"natalia@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-10-19", "cli_nombres":"Paola", "cli_paterno":"Gomez", "cli_materno":"Quenaya", "cli_nit":"10121314", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"paola@gmail.com", "cli_clave":"123456"}', 1),
( 1, '{"cli_fec_nac":"2016-01-27", "cli_nombres":"Belen", "cli_paterno":"Apaza", "cli_materno":"Romero", "cli_nit":"10323334", "cli_telefono":"223456", "cli_celular":"78899000", "cli_direccion":"Lapachos #113", "cli_correo":"belen@gmail.com", "cli_clave":"123456"}', 1);

create table rmx_sld_parametros (
  par_id serial primary key,
  par_codigo text not null,
  par_descripcion text not null,
  par_categoria text not null,
  par_registrado timestamp DEFAULT now(),
  par_modificado timestamp,
  par_usr_id integer NOT NULL,
  par_estado text default 'A'
);
insert into rmx_sld_parametros (par_codigo, par_descripcion, par_categoria, par_usr_id) values
('CH', 'Chuquisaca', 'DPTO',  1);
('R1', 'Red', 'RED',  1);
('R2', 'Red', 'RED',  1);
('R3', 'Red', 'RED',  1);
('R3', 'Red', 'RED',  1);
('TP1', 'Tipo Red 1', 'TIPO RED',  1);
('TP2', 'Tipo Red 2', 'TIPO RED',  1);
('TP3', 'Tipo Red 3', 'TIPO RED',  1);
('SC', 'Sucre ', 'MUNICIPIOS',  1);
