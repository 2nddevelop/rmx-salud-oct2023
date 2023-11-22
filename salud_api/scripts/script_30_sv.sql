--
-- SALUD
-- Base de Datos: rmx_salud_2023
--

create table rmx_sld_historial (
  hc_id serial primary key,
  hc_cli_id integer not null,
  hc_codigo text not null,
  hc_registrado timestamp without time zone NOT NULL DEFAULT now(),
  hc_modificado timestamp without time zone NOT NULL DEFAULT now(),
  hc_usr_id integer NOT NULL,
  hc_estado text default 'A' 
);
insert into rmx_sld_historial (hc_cli_id, hc_codigo, hc_usr_id) values
(1, '20001121-SSO', 1),
(2, '20010111-TKO', 1),
(3, '19900515-GLO', 1),
(4, '20060308-NMO', 1),
(5, '20101113-ANO', 1),
(6, '20070125-DPO', 1);


create table rmx_sld_historial_det (
  hcd_id serial primary key,
  hcd_hc_id integer not null,
  hcd_fecha date not null,
  hcd_data_sv jsonb not null default '{}',
  hcd_data_consulta jsonb not null default '{}',
  hcd_data_recetario jsonb not null default '{}',
  hcd_registrado timestamp without time zone NOT NULL DEFAULT now(),
  hcd_modificado timestamp without time zone NOT NULL DEFAULT now(),
  hcd_usr_id integer NOT NULL,
  hcd_estado text default 'A' 
);
insert into rmx_sld_historial_det (hcd_hc_id, hcd_fecha, hcd_data_sv, hcd_data_consulta, hcd_data_recetario, hcd_usr_id) values
(1, '2023-11-21', '{ "sv_talla":"1.80", 
  "sv_peso":"95", 
  "sv_temp_corporal":"36", 
  "sv_frec_cardiaca":"100", 
  "sv_frec_respiratoria":"20", 
  "sv_presion_arterial":"120/80", 
  "sv_sat_oxigeno":"90%" }', '{}', '{}', 11),
(2, '2023-11-21', '{ "sv_talla":"1.60", 
  "sv_peso":"65", 
  "sv_temp_corporal":"36", 
  "sv_frec_cardiaca":"60", 
  "sv_frec_respiratoria":"12", 
  "sv_presion_arterial":"90/60", 
  "sv_sat_oxigeno":"100%" }', '{}', '{}', 11);
