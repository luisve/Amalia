import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


import { URL_GRUPOS, URL_ITEMS } from '../utils/config';

export const Item = () => {


	const navigate = useNavigate();
	const [listaItems, setListaItems] = useState(null);
	const [listaGrupos, setListaGrupos] = useState(null);

	/** Se ve el listado o el form para agregar */
	const [verListado, setVerListado] = useState(true);

	/** Nombre del grupo a agregar */
	const [nombre, setNombre] = useState("");
	const [idGrupo, setIdGrupo] = useState(0);
	const [descripcion, setDescripcion] = useState("");
	const [id, setId] = useState(0);
	const [precio, setPrecio] = useState(0);
	const [hayStock, setHayStock] = useState(1);


	/** Se obtiene el listado de grupos */
	useEffect(() => {
		if (listaGrupos === null) {
			fetch(URL_GRUPOS)
				.then((response) => {
					switch (response.status) {
						case 200: response.json().then((lista) => {
							setListaGrupos(lista);
							setIdGrupo(lista[0].Id);
						}); break;
						case 401: break;
						default: break;
					}
				})
				.catch((error) => { })
				.finally(() => { });
		}
	}, [listaGrupos])



	/** Se obtiene la lista de items */
	useEffect(() => {
		if (listaItems === null) {
			fetch(URL_ITEMS)
				.then((response) => {
					switch (response.status) {
						case 200: response.json().then((lista) => {
							setListaItems(lista);
						}); break;
						case 401: break;
						default: break;
					}
				})
				.catch((error) => { })
				.finally(() => { });
		}
	}, [listaItems])



	const handleClicAgregar = () => {
		let HEADER_POST = { 'method': 'POST', 'body': null, 'credentials': 'include', 'withCredentials': true };
		var data = new FormData();
		if (id !== 0) {
			data.append("Id", id);
		}
		data.append("Nombre", nombre);
		data.append("IdGrupo", idGrupo);
		data.append("Descripcion", descripcion);
		data.append('Precio', precio);
		data.append('HayStock', hayStock);
		HEADER_POST.body = data;
		fetch(URL_ITEMS, HEADER_POST)
			.then((response) => {
				switch (response.status) {
					case 200: response.json().then((r) => {
						if (r.msg === "ok") {
							setVerListado(true);
							setListaItems(null);
						}
					}); break;
					case 401: break;
					default: break;
				}
			})
			.catch((error) => { console.log(error) })
			.finally(() => { });
	}

	/*
		const handleClickStock = (valor) => {
			setHayStock(valor);
	console.log( "stock " + hayStock );
			handleClicAgregar();
		}
	*/

	const handleClicAGrupos = () => {
		navigate('/admin/grupos');
	}


	const handleClicVer = () => {
		setId(0);
		setNombre("");
		setVerListado(false);
	}



	const handleClicItem = (e) => {
		setId(e.dataset.id);
		setNombre(e.dataset.nombre);
		setIdGrupo(e.dataset.idgrupo);
		setHayStock(e.dataset.haystock);
		setDescripcion(e.dataset.descripcion)
		setPrecio(e.dataset.precio);
		setVerListado(false);
	}



	const handleClicVolver = () => {
		setVerListado(true);
	}



	return (
		<>
			<div className="container">
				<div className="row">
					<button
						onClick={() => handleClicAGrupos()}
						className='btn btn-primary btn-block my-3'>Grupos</button>
				</div>
			</div>
			{
				verListado === true
					?

					listaItems !== null
						?
						<>
							{
								listaItems.length > 0
									?
									<>
										<div className="container my-5">
											<ul className="list-group">
												{
													listaItems.map((item, index) => {
														return (
															<li
																onClick={(e) => handleClicItem(e.target)}
																className="list-group-item"
																data-haystock={item.HayStock}
																data-id={item.Id}
																data-nombre={item.Nombre}
																data-idgrupo={item.IdGrupo}
																data-precio={item.Precio}
																data-descripcion={item.Descripcion}
																key={index} >{item.NombreGrupo + ' ' + item.Nombre + ' ' + item.Precio}</li>
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
												<h2>Editando Item.</h2>
											</div>
											<form className="form form-horizontal">
												<fieldset>
													<div className="row my-3">
														<label htmlFor="Grupo" className="col-md-4 control-label">Grupo</label>
														<div className="col-md-8">
															<select
																className='form-select'
																id='IdGrupo'
																onChange={(e) => setIdGrupo(e.target.value)}
																value={idGrupo}>
																{
																	listaGrupos.map((grupo, index) => {
																		return (
																			<option key={index} value={grupo.Id}>{grupo.Nombre}</option>
																		)
																	})
																}
															</select>
														</div>
													</div>

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
													<div className="row my-3">
														<label htmlFor="Descripcion" className="col-md-4 control-label">Descripcion</label>
														<div className="col-md-8">
															<textarea
																className="form-control"
																id="Descripcion"
																name="Descripcion"
																placeholder="Descripcion"
																value={descripcion}
																rows={4}
																cols={50}
																onChange={(e) => setDescripcion(e.target.value)}
															/>
														</div>
													</div>
													<div className="row my-3">
														<label htmlFor="Precio" className="col-md-4 control-label">Precio</label>
														<div className="col-md-8">
															<input
																type="number"
																className="form-control"
																id="Precio"
																name="Precio"
																placeholder="Precio"
																value={precio}
																onChange={(e) => setPrecio(e.target.value)} />
														</div>
													</div>

												</fieldset>
											</form>
										</div>
										<div className="card-footer">
											<div className="row">
												<button
													onClick={() => handleClicAgregar()}
													className='btn btn-primary btn-block my-3'>
													{id === 0 ? "Agregar" : "Actualizar"}
												</button>
												{
													id !== 0 &&
														(hayStock === "1")
														?
														<button
															onClick={() => setHayStock("0")}
															className='btn btn-primary btn-block my-3 btn-danger'>
															No hay Mas
														</button>
														:
														<button
															onClick={() => setHayStock("1")}
															className='btn btn-primary btn-block my-3 btn-success'>
															Hay Stock
														</button>

												}
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
