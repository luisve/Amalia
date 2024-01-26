<?php namespace App\Models;


use CodeIgniter\Model;
use CodeIgniter\Database\Query;


class GrupoModel extends Model {


	protected $table = 'amalia_grupos';
	protected $primaryKey = 'Id';
	protected $allowedFields = [ 'Nombre', 'Ico'];



}



?>