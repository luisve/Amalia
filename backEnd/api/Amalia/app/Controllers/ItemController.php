<?php namespace App\Controllers;



use CodeIgniter\RESTful\ResourceController;



class ItemController extends ResourceController
{



	protected $modelName = 'App\Models\ItemModel';




	public function Get()
	{
		$Id = $this->request->getVar('Id');
		if ($Id == null) {
			$listaItems = $this->model->GetList();
			return $this->respond($listaItems);
		} else {
		}
	}



	public function Set()
	{
		$data = $this->request->getPost();
		if (isset($data["Id"])) {
			if ($this->model->save($data)) {
				return $this->respond(array("msg" => "ok"));
			} else {
				return $this->respond(array("msg" => "error"));
			}
		} else {
			if ($this->model->insert($data)) {
				return $this->respond(array("msg" => "ok"));
			} else {
				return $this->respond(array("msg" => "error"));
			}
		}
	}


}
