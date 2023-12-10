--
-- SALUD
-- Base de Datos: rmx_salud_2023
--


create table rmx_sld_historiales (
  hc_id serial primary key,
  hc_cli_id integer not null,
  hc_codigo text not null,
  hc_registrado timestamp without time zone NOT NULL DEFAULT now(),
  hc_modificado timestamp without time zone NOT NULL DEFAULT now(),
  hc_usr_id integer NOT NULL,
  hc_estado text default 'A' 
);
insert into rmx_sld_historiales (hc_cli_id, hc_codigo, hc_usr_id) values
-- (1, 1, '20001121-SSO', 1),
-- (2, 2, '20010111-TKO', 1),
-- (3, 3, '19900515-GLO', 1),
-- (4, 4, '20060308-NMO', 1),
-- (5, 5, '20101113-ANO', 1);


create table rmx_sld_historiales_det (
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
-- insert into rmx_sld_historiales_det (hcd_hc_id, hcd_fecha, hcd_data_sv, hcd_data_consulta, hcd_data_recetario, hcd_usr_id) values
-- (1, '2023-11-21', '{ "sv_talla":"1.80", 
--   "sv_peso":"95", 
--   "sv_temp_corporal":"36", 
--   "sv_frec_cardiaca":"100", 
--   "sv_frec_respiratoria":"20", 
--   "sv_presion_arterial":"120/80", 
--   "sv_sat_oxigeno":"90%" }', '{}', '{}', 11),
-- (2, '2023-11-21', '{ "sv_talla":"1.60", 
--   "sv_peso":"65", 
--   "sv_temp_corporal":"36", 
--   "sv_frec_cardiaca":"60", 
--   "sv_frec_respiratoria":"12", 
--   "sv_presion_arterial":"90/60", 
--   "sv_sat_oxigeno":"100%" }', 
--   '{"cns_mt_con": "111", 
--     "cns_exm_fsc": "222", 
--     "cns_est_nut": "333", 
--     "cns_dia_des": "444", 
--     "cns_dia_cie": "555", 
--     "cns_ttm": "666", 
--     "cns_obv": "777"}', '{}', 11);
-- 
-- insert into rmx_sld_historiales_det (hcd_hc_id, hcd_fecha, hcd_data_sv, hcd_data_consulta, hcd_data_recetario, hcd_usr_id) values
-- (2, '2023-12-01', '{ "sv_talla":"1.60", 
--   "sv_peso":"65", 
--   "sv_temp_corporal":"36", 
--   "sv_frec_cardiaca":"60", 
--   "sv_frec_respiratoria":"12", 
--   "sv_presion_arterial":"90/60", 
--   "sv_sat_oxigeno":"100%" }', 
--   '{"cns_mt_con": "111", 
--     "cns_exm_fsc": "222", 
--     "cns_est_nut": "333", 
--     "cns_dia_des": "444", 
--     "cns_dia_cie": "555", 
--     "cns_ttm": "666", 
--     "cns_obv": "777"}', '{}', 11);
--
--