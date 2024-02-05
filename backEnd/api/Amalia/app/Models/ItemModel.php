<?php namespace App\Models;


use CodeIgniter\Model;
use CodeIgniter\Database\Query;


class ItemModel extends Model {


	protected $table = 'amalia_items';
	protected $primaryKey = 'Id';
	protected $allowedFields = [ 'IdGrupo', 'Nombre', 'Descripcion', 'Precio', 'HayStock'];


    

    public function GetList()
    {
        $listaItems = $this->select('amalia_items.*, amalia_grupos.Nombre NombreGrupo')
            ->join('amalia_grupos', 'amalia_grupos.Id=amalia_items.IdGrupo', 'left')
            ->orderBy('amalia_grupos.Nombre, amalia_items.HayStock DESC, amalia_items.Nombre')
            ->findAll();
        return $listaItems;
    }

}



?>