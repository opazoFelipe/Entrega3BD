<?php
    require ('../conexion.php');

function getAsignaturas()
{
    $sql="select 
	        a.codigo, 
	        a.nombre, 
	        a.rut_profesor, 
	        a.sala_laboratorio as sala
        from 
	        asignatura a
        order by 
	        a.codigo";

    $conexion=new conexion();
    $bd=$conexion->get_conexion();
    $smt=$bd->prepare($sql);
    if($smt->execute())
    {
        $tablaAsignaturas=
        "
            <table id='Asignaturas'>
                <thead id='theadAsignaturas'>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Rut Profesor</th>
                        <th>Sala</th>
                        <th>Opciones</th>
                        <th>Asociar/Ver</th>
                    </tr>
                </thead>
                <tbody id='tbodyAsignaturas'>
        ";
        while($result = $smt->fetch(PDO::FETCH_ASSOC))
        {
            $codigo=$result["codigo"];
            $codigo=strtoupper($codigo);

            $nombre=$result["nombre"];
            $nombre=strtoupper($nombre);

            $rutProfesor=$result["rut_profesor"];
            $rutProfesor=strtoupper($rutProfesor);

            $sala=$result["sala"];
            $sala=strtoupper($sala);

            $tablaAsignaturas.=
                "<tr>
                    <td id='".$codigo."codigo'>".$codigo."</td>
                    <td id='".$codigo."nombre'>".$nombre."</td>
                    <td id='".$codigo."rutProfesor'>".$rutProfesor."</td>
                    <td id='".$codigo."sala'>".$sala."</td>
                    <td>
                        <button id=".$codigo." onclick='modificarAsignatura(this)'>MODIFICAR</button>
                        <button id=".$codigo." onclick='eliminarAsignatura(this)'>ELIMINAR</button>
                    </td>
                    <td>
                        <button id=".$codigo." name=".$nombre." onclick='asignarAlumno(this.id, this.name)'>ALUMNO</button>
                        <button id=".$codigo." name=".$nombre." onclick='asignarProfesor(this.id, this.name)'>PROFESOR</button>
                        <button id=".$codigo." name=".$nombre." onclick='asignarCurso(this.id, this.name)'>CURSO</button>
                        <button id=".$codigo." name=".$nombre." onclick='asignarBloque(this.id, this.name)'>BLOQUE</button>
                    </td>
                </tr>";
                    
        }
        $tablaAsignaturas.="</tbody>";
        echo $tablaAsignaturas;                    
    }
}

getAsignaturas();

?>