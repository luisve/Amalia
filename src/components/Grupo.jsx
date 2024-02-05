import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


import { URL_GRUPOS } from '../utils/config';


export const Grupo = () => {




	const navigate = useNavigate();
	const [listaGrupos, setListaGrupos] = useState(null);

	/** Se ve el listado o el form para agregar */
	const [verListado, setVerListado] = useState(true);

	/** Nombre del grupo a agregar */
	const [nombre, setNombre] = useState("");
	const [id, setId] = useState(0);



	useEffect(() => {
		if (listaGrupos === null) {
			fetch(URL_GRUPOS)
				.then((response) => {
					switch (response.status) {
						case 200: response.json().then((lista) => {
							setListaGrupos(lista);
						}); break;
						case 401: break;
						default: break;
					}
				})
				.catch((error) => { })
				.finally(() => { });
		}
	}, [listaGrupos])



	const handleClicAgregar = () => {
		let HEADER_POST = { 'method': 'POST', 'body': null, 'credentials': 'include', 'withCredentials': true };
		var data = new FormData();
		if (id !== 0) {
			data.append("Id", id);
		}
		data.append("Nombre", nombre);
		HEADER_POST.body = data;
		fetch(URL_GRUPOS, HEADER_POST)
			.then((response) => {
				switch (response.status) {
					case 200: response.json().then((r) => {
						if (r.msg === "ok") {
							setVerListado(true);
							setListaGrupos(null);
						}
					}); break;
					case 401: break;
					default: break;
				}
			})
			.catch((error) => { console.log(error) })
			.finally(() => { });
	}


	const handleClicAItems = () => {
		navigate('/admin/items');
	}


	const handleClicVer = () => {
		setId(0);
		setNombre("");
		setVerListado(false);
	}


	const handleClicItem = (e) => {
		setId(e.dataset.id);
		setNombre(e.dataset.nombre);
		setVerListado(false);
	}


	const handleClicVolver = () => {
		setVerListado(true);
	}


	return (
		<>
			<div className="row">
				<button
					onClick={() => handleClicAItems()}
					className='btn btn-primary btn-block my-3'>Items</button>
			</div>
			{
				verListado === true
					?

					listaGrupos !== null
						?
						<>
							{
								listaGrupos.length > 0
									?
									<>
										<div className="container my-5">
											<ul className="list-group">
												{
													listaGrupos.map((grupo, index) => {
														return (
															<li
																onClick={(e) => handleClicItem(e.target)}
																className="list-group-item"
																data-id={grupo.Id}
																data-nombre={grupo.Nombre}
																key={index} >{grupo.Nombre}</li>
														)
													})
												}
											</ul>
										</div>
									</>
									:
									<div className="text-center">
										<h4>No hay ítems cargados</h4>
									</div>
							}
							<div className="text-center">
								<button
									onClick={() => handleClicVer()}
									className='btn btn-primary btn-block'>Agregar</button>
							</div>
						</>
						:
						<>
							<div className="jumbotron text-center">
								<h3>Cargando . . . </h3>
							</div>
						</>

					:

					<>
						<div className="container">
							<div className="row justify-content-md-center">
								<div className="col col-sm-6">
									<div className="card my-5">
										<div className="card-body">
											<div className="text-center">
												<h2>Editando Grupo.</h2>
											</div>
											<form className="form form-horizontal form-theme">
												<fieldset>
													<div className="row my-3">
														<label htmlFor="Nombre" className="col-md-4 control-label">Nombre</label>
														<div className="col-md-8">
															<input
																type="text"
																className="form-control"
																id="Nombre"
																name="Nombre"
																placeholder="Nombre"
																value={nombre}
																onChange={(e) => setNombre(e.target.value)} />
														</div>
													</div>
												</fieldset>
											</form>
										</div>
										<div className="card-footer">
											<div className="row">
												<button
													onClick={() => handleClicAgregar()}
													className='btn btn-primary btn-block my-3'>Agregar</button>
												<button
													onClick={() => handleClicVolver()}
													className='btn btn-secondary btn-block my-3'>Volver</button>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
			}
		</>
	)
}
