import React, { useEffect, useState } from 'react'
import Logo from '../logook.png';


import { URL_ITEMS } from '../utils/config';
import icoTel from '../images/tel-icon.png';
import icoWha from '../images/wha-icon.png';



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
							<div className="text-center">
								<img src={Logo} alt='logo' className='img m-5' />
							</div>
							<div className="row text-center">
								<h3>
									Amalia Pizzería
									<br />
									<div className='row'>
										<div className='ico col-6 text-end'><img src={icoTel} alt='Telefono' /></div>
										<div className='texto col-6 text-start'><span>343-4070160</span></div>
									</div>
									<div className='row'>
										<div className='ico col-6 text-end'><img src={icoWha} alt='Whatsapp' /></div>
										<div className='texto col-6 text-start'><span>343-5251159</span></div>
									</div>
								</h3>
							</div>

							<div className="accordion home" id="accordionExample">
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
																	<div className="card my-5 text-center" key={indexItem}>
																		{
																			item.HayStock === "0" &&
																			<div className='agotado opacity-50 text-nowrap text-center'>AGOTADO</div>
																		}
																		<div className="card-header fw-bold">
																			{item.Nombre}
																		</div>
																		<div className="card-body"><p>{item.Descripcion}</p></div>
																		<div className="card-footer text-end">
																			{
																				item.HayStock === "1"
																					?
																					<>
																						$ {Number(item.Precio).toFixed(2)}
																					</>
																					:
																					"_"
																			}
																		</div>
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
