CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  descripcion VARCHAR(255),
  precio NUMERIC(10,2),
  stock INTEGER,
  id_categoria INTEGER,
  id_proveedor INTEGER,
  CONSTRAINT fk_categoria
    FOREIGN KEY (id_categoria)
    REFERENCES categoria(id_categoria)
    ON DELETE SET NULL,
  CONSTRAINT fk_proveedor
    FOREIGN KEY (id_proveedor)
    REFERENCES proveedor(id_proveedor)
    ON DELETE SET NULL
);

CREATE TABLE categoria (
  id_categoria SERIAL PRIMARY KEY,
  descripcion VARCHAR(255)
);

CREATE TABLE cliente (
  id_cliente SERIAL PRIMARY KEY,
  nombres VARCHAR(255),
  apellidos VARCHAR(255),
  direccion VARCHAR(255),
  telefono VARCHAR(20)
);

CREATE TABLE proveedor (
  id_proveedor SERIAL PRIMARY KEY,
  razonsocial VARCHAR(255),
  direccion VARCHAR(255),
  telefono VARCHAR(20)
);