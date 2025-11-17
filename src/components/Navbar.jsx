import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-dark bg-dark mb-3">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-white">
                        <i className="fas fa-users me-2"></i> 
                        Lista de Contactos
                    </span>
				</Link>
				<div className="ml-auto">
					<Link to="/add">
						<button className="btn btn-success">
                            <i className="fas fa-plus me-1"></i> Agregar Contacto
                        </button>
					</Link>
				</div>
			</div>
		</nav>
	);
};