//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grupo } from "./components/Grupo";
import { Item } from './components/Item';
import { Home } from './components/Home';


/**
 * 
 *  <Route exact path="/" element={<Home />} />
 */

function App() {
	return (
		<BrowserRouter basename="/Amalia">
			<Routes>
			<Route exact path="/" element={<Home />} />
				<Route exact path="/admin/" element={<Grupo />} />
				<Route exact path="/admin/grupos" element={<Grupo />} />
				<Route exact path="/admin/items" element={<Item />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
