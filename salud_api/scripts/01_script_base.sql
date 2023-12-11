-- Script base
CREATE TABLE base_usuarios (
  usr_id serial PRIMARY KEY,
  usr_cnt_id integer NOT NULL,    -- centro de salud de pertenencia
  usr_nombres text NOT NULL,
  usr_primer_apellido text NOT NULL,
  usr_segundo_apellido text NOT null,
  usr_direccion text NOT NULL,
  usr_celular text NOT NULL,  
  usr_email text NOT NULL,
  usr_clave text NOT NULL,
  usr_lat text NOT NULL,
  usr_lng text NOT NULL,
  usr_registrado timestamp NOT NULL DEFAULT now(),
  usr_actualizado timestamp,
  usr_usr_id integer NOT NULL, 
  usr_estado text NOT NULL DEFAULT 'A'
);
INSERT INTO base_usuarios (usr_cnt_id, usr_nombres, 
  usr_primer_apellido, usr_segundo_apellido, usr_direccion, usr_celular, usr_email, 
  usr_clave, usr_lat, usr_lng, usr_usr_id, usr_estado) VALUES 
  (1, 'Admin', 'Admin', 'Admin', 'Av Villa El Carmen, Calle 11, No. 100', '5917089699', 'rome@gmail.com', 
  crypt('123456', gen_salt('bf')), '-24,77777777', '-24,77777777', 11, 'A');


CREATE TABLE base_roles (
  rol_id serial PRIMARY KEY,
  rol_codigo text NOT NULL,
  rol_descripcion text NOT NULL,
  rol_registrado timestamp NOT NULL DEFAULT now(),
  rol_actualizado timestamp,
  rol_usr_id text NOT NULL, 
  rol_estado text NOT NULL DEFAULT 'A'
);
INSERT INTO base_roles (rol_codigo, rol_descripcion, rol_usr_id, rol_estado) VALUES 
  ('Admin', 'Admin', 11, 'A');


CREATE TABLE base_usuarios_roles (
  urol_id serial PRIMARY KEY,
  urol_usuario_id integer NOT NULL,
  urol_rol_id integer NOT NULL,
  urol_registrado timestamp NOT NULL DEFAULT now(),
  urol_actualizado timestamp,
  urol_usr_id integer NOT NULL, 
  urol_estado text NOT NULL DEFAULT 'A',
  FOREIGN KEY (urol_usr_id) REFERENCES base_usuarios(usr_id),
  FOREIGN KEY (urol_rol_id) REFERENCES base_roles(rol_id)
);
INSERT INTO base_usuarios_roles (urol_usuario_id, urol_rol_id, urol_usr_id, urol_estado) VALUES 
  (1, 1, 1, 'A');


-- INFORMATIVOS
CREATE TABLE base_avisos (
  avi_id serial PRIMARY KEY,
  avi_titulo text NOT NULL,
  avi_contenido text NOT NULL,
  avi_registrado timestamp NOT NULL DEFAULT now(),
  avi_actualizado timestamp,
  avi_usr_id text not NULL, 
  avi_estado text NOT NULL DEFAULT 'A'
);
INSERT INTO base_avisos (avi_titulo, avi_contenido, avi_usr_id, avi_estado) VALUES 
  ('Titulo 1', 'Contenido 1 contenido 1 contenido 1 contenido 1 contenido 1.', 11, 'A');


CREATE TABLE base_noticias (
  nt_id serial PRIMARY KEY,
  nt_titulo text NOT NULL,
  nt_contenido text NOT NULL,
  nt_registrado timestamp NOT NULL DEFAULT now(),
  nt_actualizado timestamp,
  nt_usr_id text not NULL, 
  nt_estado text NOT NULL DEFAULT 'A'
);
INSERT INTO base_noticias (nt_titulo, nt_contenido, nt_usr_id, nt_estado) VALUES 
  ('Noticia 1', 'Contenido 1 contenido 1 contenido 1 contenido 1 contenido 1.', 11, 'A');

