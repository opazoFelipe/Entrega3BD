<?php
	class conexion
	{
		public function get_conexion()
		{
			try
			{
				$conexion=new PDO('pgsql: host = localhost; port= 5432; dbname = BDentrega3', "postgres", "felipe");
				$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conexion;
			}catch(PDOException $e)
			{
					echo "La conexion fallo <br>".$e->getMessage();
			}
		}
	}
?>