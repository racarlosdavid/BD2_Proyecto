CREATE KEYSPACE Bases2Proyecto
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

USE Bases2Proyecto;

--------------------------------------------------------------
CREATE OR REPLACE FUNCTION year (input DATE)
    RETURNS NULL ON NULL INPUT RETURNS TEXT
    LANGUAGE java AS 'return input.toString().substring(0,4);';

SELECT bases2proyecto.year(toDate(now())) as year FROM system.local;

CREATE OR REPLACE FUNCTION month (input DATE)
    RETURNS NULL ON NULL INPUT RETURNS TEXT
    LANGUAGE java AS 'return input.toString().substring(5,7);';

SELECT bases2proyecto.month(toDate(now())) as month FROM system.local;
--------------------------------------------------------------

DROP TABLE usuario;
CREATE TABLE usuario (
idUsuario INT,
nombre TEXT,
direccion TEXT,
rol TEXT,
contrasenia TEXT,
PRIMARY KEY (idUsuario)  
);

INSERT INTO usuario (idUsuario,nombre,direccion,rol,contrasenia) 
VALUES (1,'Carlos David','5ta calle 2-32 zona 7','CuentaHabiente','@lfil!#_123USAC');
INSERT INTO usuario (idUsuario,nombre,direccion,rol,contrasenia) 
VALUES (100,'Carlos Ramirez','5ta avenida 12-21 zona 4','CuentaHabiente','Us@c_123Rocinante');
INSERT INTO usuario (idUsuario,nombre,direccion,rol,contrasenia) 
VALUES (101,'Banco GYT','5ta avenida 12-21 zona 4','Banco','B_Tit@nium123_!#');

SELECT * FROM usuario;


--Q1 Reporte de operaciones realizadas por un cuentahabiente
DROP TABLE operaciones_cuentahabiente;
CREATE TABLE operaciones_cuentahabiente (
cui BIGINT,
nombre TEXT,
apellido TEXT,
entidadFinanciera TEXT,
tipoCuenta TEXT,
saldo_inicial DOUBLE,
tipoOperacion TEXT,
montoTransferencia INT,
fecha TIMESTAMP,
PRIMARY KEY ((cui,nombre,apellido),fecha)  
);

COPY operaciones_cuentahabiente ( nombre, apellido, cui, entidadFinanciera, tipoCuenta, saldo_inicial, tipoOperacion, montoTransferencia, fecha  )  FROM '/home/files/OPERACIONES.csv' WITH DELIMITER=',' AND HEADER=TRUE;
SELECT * FROM operaciones_cuentahabiente;
SELECT * FROM operaciones_cuentahabiente WHERE cui = 1485345081  AND nombre = 'Javier' AND apellido = 'Theodore';


-----------------
--Q1 Reporte de operaciones realizadas por un cuentahabiente
DROP TABLE operaciones_cuentahabiente;
CREATE TABLE operaciones_cuentahabiente (
cui BIGINT,
nombre TEXT,
apellido TEXT,
entidadFinanciera TEXT,
tipoCuenta TEXT,
saldo_inicial DOUBLE,
cui2 BIGINT,
nombre2 TEXT,
apellido2 TEXT,
entidadFinanciera2 TEXT,
tipoCuenta2 TEXT,
saldo_inicial2 DOUBLE,
montoTransferencia INT,
fecha TIMESTAMP,
PRIMARY KEY ((cui,cui2,nombre,nombre2,apellido,apellido2),fecha)  
);

COPY operaciones_cuentahabiente ( nombre, apellido, cui, entidadFinanciera, tipoCuenta, saldo_inicial, nombre2, apellido2, cui2, entidadFinanciera2, tipoCuenta2, saldo_inicial2, montoTransferencia, fecha  )  FROM '/home/files/OPERACIONES2.csv' WITH DELIMITER=',' AND HEADER=TRUE;
SELECT * FROM operaciones_cuentahabiente;
SELECT nombre, apellido, cui, entidadFinanciera, tipoCuenta, saldo_inicial, nombre2, apellido2, cui2, entidadFinanciera2, tipoCuenta2, saldo_inicial2, montoTransferencia, fecha FROM operaciones_cuentahabiente WHERE cui = 1485345081  AND nombre = 'Javier' AND apellido = 'Theodore'  ALLOW FILTERING;
SELECT nombre, apellido, cui, entidadFinanciera, tipoCuenta, saldo_inicial, nombre2, apellido2, cui2, entidadFinanciera2, tipoCuenta2, saldo_inicial2, montoTransferencia, fecha FROM operaciones_cuentahabiente WHERE cui2 = 1485345081  AND nombre2 = 'Javier' AND apellido2 = 'Theodore' ALLOW FILTERING;



--Q2 Reporte de totales de creditos y debitos para una institucion financiera.
DROP TABLE creditos_debitos_instituciones;
CREATE TABLE creditos_debitos_instituciones (
cui BIGINT,
nombre TEXT,
apellido TEXT,
entidadFinanciera TEXT,
tipoCuenta TEXT,
saldo_inicial DOUBLE,
cui2 BIGINT,
nombre2 TEXT,
apellido2 TEXT,
entidadFinanciera2 TEXT,
tipoCuenta2 TEXT,
saldo_inicial2 DOUBLE,
montoTransferencia INT,
fecha TIMESTAMP,
PRIMARY KEY ((entidadFinanciera,entidadFinanciera2),fecha)  
);

COPY creditos_debitos_instituciones ( nombre, apellido, cui, entidadFinanciera, tipoCuenta, saldo_inicial, nombre2, apellido2, cui2, entidadFinanciera2, tipoCuenta2, saldo_inicial2, montoTransferencia, fecha  )  FROM '/home/files/OPERACIONES2.csv' WITH DELIMITER=',' AND HEADER=TRUE;

SELECT entidadFinanciera,SUM(montoTransferencia) AS TOTAL_DEBITOS  FROM creditos_debitos_instituciones WHERE entidadFinanciera = 'Banco G&T' ALLOW FILTERING;
SELECT entidadFinanciera2,SUM(montoTransferencia) AS TOTAL_CREDITOS  FROM creditos_debitos_instituciones WHERE entidadFinanciera2 = 'Banco G&T' ALLOW FILTERING;

-----
--Q2 Reporte de totales de creditos y debitos para una institucion financiera.
DROP TABLE creditos_debitos_instituciones;
CREATE TABLE creditos_debitos_instituciones (
cui BIGINT,
nombre TEXT,
apellido TEXT,
entidadFinanciera TEXT,
tipoCuenta TEXT,
saldo_inicial DOUBLE,
tipoOperacion TEXT,
montoTransferencia INT,
fecha TIMESTAMP,
mes TEXT,
PRIMARY KEY (entidadFinanciera,fecha)  
);

COPY creditos_debitos_instituciones ( nombre, apellido, cui, entidadFinanciera, tipoCuenta, saldo_inicial, tipoOperacion, montoTransferencia, fecha,mes  )  FROM '/home/files/OPERACIONES.csv' WITH DELIMITER=',' AND HEADER=TRUE;
SELECT entidadFinanciera,SUM(montoTransferencia) AS TOTAL_CREDITOS  FROM creditos_debitos_instituciones WHERE entidadFinanciera = 'Banco G&T' AND tipoOperacion = 'Credito' ALLOW FILTERING;
SELECT entidadFinanciera,SUM(montoTransferencia) AS TOTAL_DEBITOS  FROM creditos_debitos_instituciones WHERE entidadFinanciera = 'Banco G&T' AND tipoOperacion = 'Debito' ALLOW FILTERING;

--Q3 Reporte cuentahabientes, lista las cuentas que tiene un cuenta habiente
DROP TABLE cuenta;
CREATE TABLE cuenta (
cui bigint,
entidadFinanciera TEXT,
nombre TEXT,
apellido TEXT,
email TEXT,
fecha_registro DATE,
genero TEXT,
abreviacion TEXT,
tipoCuenta TEXT,
saldo_inicial double,
PRIMARY KEY ((nombre,apellido),entidadFinanciera)
);

COPY cuenta ( nombre, apellido, cui, email, fecha_registro, genero, entidadFinanciera, abreviacion, tipoCuenta, saldo_inicial )  FROM '/home/files/CUENTAHABIENTES.csv' WITH DELIMITER=',' AND HEADER=TRUE;

SELECT COUNT(*) FROM cuenta;
SELECT * FROM cuenta;
SELECT * FROM cuenta WHERE nombre = 'Giordano' AND apellido = 'Rimington';
SELECT * FROM cuenta WHERE entidadFinanciera = 'Banco G&T' ALLOW FILTERING;
SELECT * FROM cuenta WHERE abreviacion = 'BI' ALLOW FILTERING;
 
--Q4 Reporte de instituciones bancarias
DROP TABLE instituciones_bancarias;
CREATE TABLE instituciones_bancarias (
cui bigint,
entidadFinanciera TEXT,
nombre TEXT,
apellido TEXT,
email TEXT,
fecha_registro DATE,
genero TEXT,
abreviacion TEXT,
tipoCuenta TEXT,
saldo_inicial double,
PRIMARY KEY (entidadFinanciera)
);

COPY instituciones_bancarias ( nombre, apellido, cui, email, fecha_registro, genero, entidadFinanciera, abreviacion, tipoCuenta, saldo_inicial )  FROM '/home/files/CUENTAHABIENTES.csv' WITH DELIMITER=',' AND HEADER=TRUE;

SELECT entidadFinanciera,abreviacion FROM instituciones_bancarias GROUP BY entidadFinanciera; 


--Q5 Reporte transacciones cuentahabientes, por mes
DROP TABLE transacciones_por_mes;
CREATE TABLE transacciones_por_mes (
cui BIGINT,
nombre TEXT,
apellido TEXT,
entidadFinanciera TEXT,
tipoCuenta TEXT,
saldo_inicial DOUBLE,
tipoOperacion TEXT,
montoTransferencia INT,
fecha TIMESTAMP,
mes INT,
PRIMARY KEY ((cui,nombre,apellido),fecha)  
);

COPY transacciones_por_mes ( nombre, apellido, cui, entidadFinanciera, tipoCuenta, saldo_inicial, tipoOperacion, montoTransferencia, fecha )  FROM '/home/files/OPERACIONES.csv' WITH DELIMITER=',' AND HEADER=TRUE;
SELECT cui, nombre, apellido, fecha, bases2proyecto.month(toDate(fecha)) AS mes FROM transacciones_por_mes WHERE cui = 930849132  AND nombre = 'Bobbette' AND apellido = 'Dutton' ;
SELECT cui, nombre, apellido, fecha, month(toDate(fecha)) AS mes FROM transacciones_por_mes WHERE cui = 930849132  AND nombre = 'Bobbette' AND apellido = 'Dutton' AND fecha > '2020-08-01 00:00:00' AND fecha < '2020-09-01 00:00:00';









