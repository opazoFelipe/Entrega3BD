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
                        <th class='columnaCodigo'>Codigo</th>
                        <th class='columnaTexto'>Nombre</th>
                        <th class='columnaTexto'>Rut Profesor</th>
                        <th class='columnaTexto'>Sala</th>
                        <th class='columnaOpciones'>Opciones</th>
                        <th class='columnaAsignar'>Asociar/Ver</th>
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
                    <td class='columnaCodigo' id='".$codigo."codigo'>".$codigo."</td>
                    <td class='columnaTexto' id='".$codigo."nombre'>".$nombre."</td>
                    <td class='columnaTexto' id='".$codigo."rutProfesor'>".$rutProfesor."</td>
                    <td class='columnaTexto' id='".$codigo."sala'>".$sala."</td>
                    <td class='columnaOpciones'>
                        <button id=".$codigo." name='".$nombre."' class='botonModificar' onclick='modificarAsignatura(this)'>MODIFICAR</button>
                        <button id=".$codigo." class='botonEliminar' onclick='eliminarAsignatura(this)'>ELIMINAR</button>
                    </td>
                    <td class='columnaAsignar'>
                        <button id=".$codigo." class='botonAsignar'name='".$nombre."' onclick='asignarAlumno(this.id, this.name)'>ALUMNO</button>
                        <button id=".$codigo." class='botonAsignar'name='".$nombre."' onclick='asignarProfesor(this.id, this.name)'>PROFESOR</button>
                        <button id=".$codigo." class='botonAsignar'name='".$nombre."' onclick='asignarCurso(this.id, this.name)'>CURSO</button>
                        <button id=".$codigo." class='botonAsignar'name='".$nombre."' onclick='asignarBloque(this.id, this.name)'>BLOQUE</button>
                    </td>
                </tr>";
                    
        }
        $tablaAsignaturas.="</tbody>";
        echo $tablaAsignaturas;                    
    }
}

getAsignaturas();

?>