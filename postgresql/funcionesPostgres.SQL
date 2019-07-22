--Esta funcion elimina la asignatura de la relacion asignatura
--Antes de usar esta funcion obligatoriamente aplicar las siguientes funciones:
--sAsigConsta_de
--sAsigesta_en
--Si alguna de las dos funciones anteriores devuelve 1 o mas columnas,
--entonces no ejecutar la funcion delAsignatura
--Si alguna de las dos funciones anteriores devuelve 0 columnas,ejecutar 
--la funcion sAsigSe_le_otorg. 
--Si esta funcion devuelve 1 o mas columnas,ejecutar la funcion delBloqueAsig 
--y finalmente la funcion delAsignatura.
--Si es funcion devuelve 0 columnas ejecutar no ejecutar la funcion delBloqueAsig,
--y ejecutar la funcion delAsignatura directamente.
create or replace function delAsignatura(int) returns void
as
$$
	delete from asignatura Where codigo=$1
$$
language SQL;


--Luego de eliminar la asignatura obligatoriamente eliminar tambien el bloque
--que se le habia asignado
create or replace function delBloqueAsig(int) returns void
as
$$
	delete from se_le_otorga where codigo_asignatura=$1;
$$
language SQL;


--Funcion creada para comprobar si una asignatura existe como
--clave foranea en la relacion consta_de antes de ser eliminada o modificada
create or replace function sAsigConsta_de(int) returns bigInt
as
$$
	select count(*) from consta_de where codigo_asignatura=$1
$$
language SQL;


--Funcion creada para comprobar si una asignatura existe como
--clave foranea en la relacion esta_en antes de ser eliminada o modificada
create or replace function sAsigEsta_en(int) returns bigInt
as
$$
	select count(*) from esta_en where codigo_asignatura=$1
$$
language SQL;


--Funcion creada para comprobar si una asignatura existe como
--clave foranea en la relacion se_le_otorga antes de ser eliminada o modificada
create or replace function sAsigSe_le_otorga(int) returns bigInt
as
$$
	select count(*) from se_le_otorga where codigo_asignatura=$1;
$$
language SQL;


--Funcion para insertar asignatura en la bd
create or replace function inAsignatura(int, varchar(12), varchar(100), varchar(100)) returns void
as
$$
	insert into asignatura values($1, $2, $3, $4);
$$
language SQL;

--Funcion para modificar asignatura en la bd
create or replace function modAsignatura(int, int, varchar(100), varchar(100)) returns void
as
$$
	update asignatura set codigo=$2,
						  nombre=$3,
						  sala_laboratorio=$4
					  Where
					  	  codigo=$1;
$$
language SQL;

--Funcion para modificar el codigo de la asignatura en la relacion esta_en
create or replace function modEsta_en(int, int) returns void
as
$$
	update esta_en set codigo_asignatura=$2 Where codigo_asignatura=$1;
$$
language SQL;

--Funcion para modificar el codigo de la asignatura en la relacion consta_de
create or replace function modConsta_de(int, int) returns void
as
$$
	update consta_de set codigo_asignatura=$2 Where codigo_asignatura=$1;
$$
language SQL;

--Funcion para modificar el codigo de la asignatura en la relacion se_le_otorga
create or replace function modSe_le_otorga(int, int) returns void
as
$$
	update se_le_otorga set codigo_asignatura=$2 Where codigo_asignatura=$1;
$$
language SQL;

