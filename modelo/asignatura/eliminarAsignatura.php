<?php
    require ('../conexion.php');
    $codActual=$_POST["codigoAsignatura"];

        function delAsignatura($codActual)
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

    delAsignatura($codActual);
?>