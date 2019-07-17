<?php
    require ('conexion.php');

    class asignatura
    {
        //Funcion para ingresar Asignaturas
        public function inAsignatura($cod, $rutProf, $nomAsig, $salaOLab)
        {
            $conexion=new conexion();
            $bd=$conexion->get_conexion();
            $sql="select inAsignatura(?, ?, ?, ?)";
            $smt=$bd->prepare($sql);
            $smt->bindValue(1, $cod, PDO::PARAM_INT);
            $smt->bindValue(2, $rutProf, PDO::PARAM_SRT);
            $smt->bindValue(3, $nomAsig, PDO::PARAM_SRT);
            $smt->bindValue(4, $salaOLab, PDO::PARAM_SRT);
            if($smt->execute())
            {
                echo "Datos ingresados Correctamente";
            }else{
                echo "Error al ingresar los datos";
            }
            $conexion=null;
        }

        //Funcion para modificar Asignaturas
        public function modAsignatura($codActual, $codNuevo, $rutProf, $nomAsig, $salaOLab)
        {
            $se_le_otorga=true;
            $consta_de=true;
            $esta_en=true;

            $conexion=new conexion();
            $bd=$conexion->get_conexion();

            $sql1="select sAsigConsta_de(?)";
            $smt=$bd->prepare($sql1);
            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
            if($smt->execute())
            {
                $resultado = $smt->fetch(PDO::FETCH_ASSOC);
                if($resultado["sasigconsta_de"]>0)
                    $consta_de=true;
                else
                    $consta_de=false;
            }

            $sql2="select sAsigEsta_en(?)";
            $smt=$bd->prepare($sql2);
            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
            if($smt->execute())
            {
                $resultado = $smt->fetch(PDO::FETCH_ASSOC);
                if($resultado["sasigesta_en"]>0)
                    $esta_en=true;
                else
                    $esta_en=false;
            }

            $sql3="select sAsigSe_le_otorga(?)";
            $smt=$bd->prepare($sql3);
            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
            if($smt->execute())
            {
                $resultado = $smt->fetch(PDO::FETCH_ASSOC);
                if($resultado["sasigse_le_otorga"]>0)
                    $se_le_otorga=true;
                else
                    $se_le_otorga=false;
            }

            if($esta_en===true)
            {
                $sql8="alter table esta_en drop constraint esta_en_codigo_asignatura_fkey";
                $smt=$bd->prepare($sql8);
                if($smt->execute())
                {
                   
                }else
                {
                    echo "Error al eliminar constraint fkey de la relacion esta_en";
                    die();
                }
    

                $sql4="select modEsta_en(?,?)";
                $smt=$bd->prepare($sql4);
                $smt->bindValue(1, $codActual, PDO::PARAM_INT);
                $smt->bindValue(2, $codNuevo, PDO::PARAM_INT);
                if($smt->execute())
                {
                   
                }else
                {
                    echo "Error al actualizar la relacion esta_en";
                    die();
                }
                   
            }

            if($consta_de===true)
            {
                $sql9="alter table consta_de drop constraint consta_de_codigo_asignatura_fkey";
                $smt=$bd->prepare($sql9);
                if($smt->execute())
                {
                   
                }else
                {
                    echo "Error al eliminar constraint fkey de la relacion consta_de";
                }

                $sql5="select modConsta_de(?,?)";
                $smt=$bd->prepare($sql5);
                $smt->bindValue(1, $codActual, PDO::PARAM_INT);
                $smt->bindValue(2, $codNuevo, PDO::PARAM_INT);
                if($smt->execute())
                {
                   
                }else
                {
                    echo "Error al actualizar la relacion consta_de";
                }

            }

            if($se_le_otorga===true)
            {
                $sql10="alter table consta_de drop constraint se_le_otorga_codigo_asignatura_fkey";
                $smt=$bd->prepare($sql10);
                if($smt->execute())
                {
                   
                }else
                {
                    echo "Error al eliminar constraint fkey de la relacion se_le_otorga";
                }

                $sql6="select modSe_le_otorga(?,?)";
                $smt=$bd->prepare($sql6);
                $smt->bindValue(1, $codActual, PDO::PARAM_INT);
                $smt->bindValue(2, $codNuevo, PDO::PARAM_INT);
                if($smt->execute())
                {
                   
                }else
                {
                    echo "Error al actualizar la relacion se_le_otorga";
                }

            }

            $sql7="select modAsignatura(?,?,?,?,?)";
            $smt=$bd->prepare($sql7);
            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
            $smt->bindValue(2, $codNuevo, PDO::PARAM_INT);
            $smt->bindValue(3, $rutProf, PDO::PARAM_STR);
            $smt->bindValue(4, $nomAsig, PDO::PARAM_STR);
            $smt->bindValue(5, $salaOLab, PDO::PARAM_STR);
            if($smt->execute())
            {
                echo "Asignatura modificado correctamente";
                if($consta_de==true)
                {
                    $sql11="ALTER TABLE consta_de
                            ADD CONSTRAINT consta_de_codigo_asignatura_fkey
                            FOREIGN KEY (codigo_asignatura) 
                            REFERENCES asignatura(codigo);";
                    $smt=$bd->prepare($sql11);
                    if($smt->execute())
                    {
               
                    }else
                    {
                        echo "Error al insertar constraint fkey de la relacion consta_de";
                    }
                }
               
                if($esta_en==true)
                {
                    $sql12="ALTER TABLE esta_en
                            ADD CONSTRAINT esta_en_codigo_asignatura_fkey
                            FOREIGN KEY (codigo_asignatura) 
                            REFERENCES asignatura(codigo);";
                    $smt=$bd->prepare($sql12);
                    if($smt->execute())
                    {
           
                    }else
                    {
                        echo "Error al insertar constraint fkey de la relacion esta_en";
                    }
                }
                
                if($se_le_otorga==true)
                {
                    $sql13="ALTER TABLE se_le_otorga
                            ADD CONSTRAINT se_le_otorga_codigo_asignatura_fkey
                            FOREIGN KEY (codigo_asignatura) 
                            REFERENCES asignatura(codigo);";
                    $smt=$bd->prepare($sql13);
                    if($smt->execute())
                    {
       
                    }else
                    {
                        echo "Error al insertar constraint fkey de la relacion se_le_otorga";
                    }
                }
               
            }else
            {
                echo "Error al actualizar la asignatura";
                die();
            }
            $conexion=null;
        }   
        
        //Funcion para eliminar Asignatura
        public function delAsignatura($codActual)
        {
            //Banderas para permitir la eliminacion de la asignatura
            //Si la asignatura se existe como clave foranea en la relacion
            //consta_de o en la relacion esta_en las banderas flag1 y flag2
            //tomaran valor true, si no existe los valores seran false.
            //Para poder ejecutar la eliminacion de la asignatura, ambas banderas
            //obligatoriamente deben tener como valor false.
            $flag1=true; //Bandera para la relacion consta_de
            $flag2=true; //Bandera para la relacion esta_en

            //Si flag1 y flag2 son false, buscar en la relacion se_le_otorga 
            //si existe la asignatura, si es asi entonces borrar el bloque primero
            //y luego borrar la asignatura. Caso contrario, eliminar directamente la 
            //asignatura.
            //Si la asignatura tiene bloque asignado flag3 es true, sino, es false.
            $flag3=true; //Bandera para la relacion se_le_otorga

            $conexion=new conexion();
            $bd=$conexion->get_conexion();
            
            $sql="select sAsigConsta_de(?)";
            $smt=$bd->prepare($sql);
            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
            if($smt->execute())
            {
                $resultado = $smt->fetch(PDO::FETCH_ASSOC);
                if($resultado["sasigconsta_de"]>0)
                    $flag1=true;
                else
                    $flag1=false;
            }

            $sql="select sAsigEsta_en(?)";
            $smt=$bd->prepare($sql);
            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
            if($smt->execute())
            {
                $resultado = $smt->fetch(PDO::FETCH_ASSOC);
                if($resultado["sasigesta_en"]>0)
                    $flag2=true;
                else
                    $flag2=false;
            }

            if($flag1==false && $flag2==false)
            {
                $sql="select sAsigSe_le_otorga(?)";
                $smt=$bd->prepare($sql);
                $smt->bindValue(1, $codActual, PDO::PARAM_INT);
                if($smt->execute())
                {
                    $resultado = $smt->fetch(PDO::FETCH_ASSOC);
                    if($resultado["sasigse_le_otorga"]>0)
                    {
                        $sql2="select delBloqueAsig(?)";
                        $smt=$bd->prepare($sql2);
                        $smt->bindValue(1, $codActual, PDO::PARAM_INT);
                        if($smt->execute())
                        {
                            $sql3="select delAsignatura(?)";
                            $smt=$bd->prepare($sql3);
                            $smt->bindValue(1, $codActual, PDO::PARAM_INT);
                            if($smt->execute())
                            {
                                echo "Asignatura Eliminada Correctamente";
                            }else
                                echo "Error al eliminar la Asignatura";
                        }else 
                            echo "Error al eliminar el bloque de la asignatura";
                            $conexion=null;
                            die(1);
                    }
                    else
                    {
                        $sql3="select delAsignatura(?)";
                        $smt=$bd->prepare($sql3);
                        $smt->bindValue(1, $codActual, PDO::PARAM_INT);
                        if($smt->execute())
                        {
                            echo "Asignatura Eliminada Correctamente";
                        }else
                            echo "Error al eliminar la Asignatura"; 
                            $conexion=null;
                            die(1);
                    }       
                }else
                  echo "Error al buscar la asignatura en la relacion se_le_otorga";
                  $conexion=null;
                  die(1);
            }
            else
            {
                if($flag1==true && $flag2==true)
                {
                    echo "No es posible eliminar la asignatura debido que a existe como clave foranea en las relaciones consta_de y esta_en";
                    $conexion=null;
                    die(1);
                }
                
                if($flag1==true && $flag2==false)
                {
                    echo "No es posible eliminar la asignatura debido a que existe como clave foranea en la relacion consta_de";
                    $conexion=null;
                    die(1);
                }
                    
                if($flag1==false && $flag2==true)
                {
                    echo "No es posible eliminar la asignatura debido a que existe como clave foranea en la relacion esta_en";
                    $conexion=null;   
                    die(1); 
                }
            }
            $conexion=null;   
        } 
        
        //Funcion para obtener las asignaturas de la base de datos
        public function getAsignaturas()
        {
            $sql="select 
            a.codigo, a.nombre, a.rut_profesor, a.sala_laboratorio, c.codigo_curso, b.descripcion as bloque
            from
            asignatura a,
            consta_de c,
            bloque b,
            se_le_otorga s
            where 
            a.codigo=s.codigo_asignatura and
            a.codigo=c.codigo_asignatura and
            s.codigo_bloque=b.codigo;";

            $conexion=new conexion();
            $bd=$conexion->get_conexion();
            $smt=$bd->prepare($sql);
            if($smt->execute())
            {
                $asignaturas=array();
                $i=0;
                while($result = $smt->fetch(PDO::FETCH_ASSOC))
			    {
                    $codigo=$result["codigo"];
                    $nombre=$result["nombre"];
                    $rutProfesor=$result["rut_profesor"];
                    $sala=$result["sala_laboratorio"];
                    $codigoCurso=$result["codigo_curso"];
                    $bloque=$result["bloque"];
                    $asignaturas[$i]=
                    [
                        "codigo"=>$codigo, 
                        "nombre"=>$nombre,
                        "rutProfesor"=>$rutProfesor,
                        "sala"=>$sala,
                        "codigoCurso"=>$codigoCurso,
                        "bloque"=>$bloque
                    ];	
                    $i++;		
                }
			    $arregloJSON=json_encode($asignaturas);
                echo $arregloJSON;
            }
        }

        //funcion para obtener los alumnos asociados actualmente a una asignatura,
        //solo requiere el codigo de la asignatura
        function getAlumnosEnAsignatura($codigoAsignatura)
        {
            $conexion=new conexion();
            $bd=$conexion->get_conexion();
            $sql=
                "select 
                    e.rut_alumno, 
                    a.nombres, 
                    a.apellidos
                from 
                    esta_en e,
                    alumno a
                where
                    e.codigo_asignatura=? and
                    e.rut_alumno=a.rut"
            ;

            $smt=$bd->prepare($sql);
            $smt->bindValue(1, $codigoAsignatura, PDO::PARAM_INT);
            if($smt->execute())
            {
                $datos=array();
                $i=0;
                while($result = $smt->fetch(PDO::FETCH_ASSOC))
			    {
                    $rutAlumno=$result["rut_alumno"];
                    $nombres=$result["nombres"];
                    $apellidos=$result["apellidos"];
                    $datos[$i]=
                    [
                        "rutAlumno"=>$rutAlumno, 
                        "nombres"=>$nombres,
                        "apellidos"=>$apellidos
                    ];	
                    $i++;		
                }
			    $arregloJSON=json_encode($datos);
			    echo $arregloJSON;
            }else{
                echo "Error al ingresar los datos";
            }
            $conexion=null;
        }
    }

    $asig=new asignatura();
    //$asig->modAsignatura(8, 16, '16.381.101-k', 'Quimica', 'SALA 6A');
    $asig->getAlumnosEnAsignatura(6);
?>