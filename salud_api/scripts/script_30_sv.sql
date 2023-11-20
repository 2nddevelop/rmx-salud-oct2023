
--
-- SALUD
-- Base de Datos: rmx_salud_2023
--

create table rmx_sld_sv (
  sv_id serial primary key,
  sv_cli_id integer not null,
  sv_fecha date not null,
  sv_data jsonb not null default '{}',
  sv_registrado timestamp without time zone NOT NULL DEFAULT now(),
  sv_modificado timestamp without time zone NOT NULL DEFAULT now(),
  sv_usr_id integer NOT NULL,
  sv_estado text default 'A' 
);
insert into rmx_sld_planificacion (sv_cli_id, sv_fecha, sv_data, sv_usr_id) values
(1, '2023-11-21', '{ "sv_talla":"1.80", 
  "sv_peso":"95", 
  "sv_temp_corporal":"36", 
  "sv_frec_cardiaca":"100", 
  "sv_frec_respiratoria":"20", 
  "sv_presion_arterial":"120/80", 
  "sv_sat_oxigeno":"90%", }', 1),
(2, '2023-11-21', '{ "sv_talla":"1.60", 
  "sv_peso":"65", 
  "sv_temp_corporal":"36", 
  "sv_frec_cardiaca":"60", 
  "sv_frec_respiratoria":"12", 
  "sv_presion_arterial":"90/60", 
  "sv_sat_oxigeno":"100%" }', 1);

