import React, { useEffect, useState } from 'react'
import Logo from '../logook.png';


import { URL_ITEMS } from '../utils/config';

export const Home = () => {


	const [listaItems, setListaItems] = useState(null);
	const [listaGrupos, setListaGrupos] = useState(null);




	useEffect(() => {
		if (listaItems === null) {
			fetch(URL_ITEMS)
				.then((response) => {
					switch (response.status) {
						case 200: response.json().then((lista) => {
							const listaG = lista.filter((element, index, self) => {
								return index === self.findIndex(e =>
									e.IdGrupo === element.IdGrupo
								);
							});
							setListaGrupos(listaG);
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



	return (
		<>
			{
				listaItems !== null
					?
					listaItems.length > 0
						?
						<div className="container">
							<div className="m-5"><img src={Logo} alt='logo' /></div>
							<div className="row text-center">
								<h3>
									Amalia Pizzería<br />
									470160
								</h3>
							</div>

							<div className="accordion" id="accordionExample">
								{
									listaGrupos.map((grupo, indexGrupo) => {
										return (

											<div className="accordion-item" key={indexGrupo}>
												<h2 className="accordion-header" id={'heading' + indexGrupo}>
													<button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target={'#collapse' + indexGrupo} aria-expanded={indexGrupo === 0 ? 'true' : 'false'} aria-controls={'collapse' + indexGrupo}>
														{grupo.NombreGrupo}
													</button>
												</h2>
												<div id={'collapse' + indexGrupo} className="accordion-collapse collapse" aria-labelledby={'heading' + indexGrupo} data-bs-parent="#accordionExample">
													<div className="accordion-body">
														{
															listaItems.map((item, indexItem) => {
																return (
																	(item.IdGrupo === grupo.IdGrupo) &&
																	<div className="card my-5" key={indexItem}>
																		<div className="card-header fw-bold">
																			{item.Nombre}
																		</div>
																		<div className="card-body"><p>{item.Descripcion}</p></div>
																		<div className="card-footer text-end">$ {Number(item.Precio).toFixed(2)}</div>
																	</div>
																)

															})
														}
													</div>
												</div>
											</div>

										)
									})
								}
							</div >
						</div>
						:
						(
							<h5>No hay ïtems cargados </h5>
						)
					:
					<h5>Cargando . . . </h5>
			}
		</>
	)
}
