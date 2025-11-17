import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactCard = ({ contact }) => {
    const navigate = useNavigate();
    const { actions } = useGlobalReducer();

    const handleDelete = async (contactId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
            await actions.deleteContact(contactId);
        }
    };

    const handleEdit = (contact) => {
        actions.setContactToEdit(contact);
        navigate(`/edit/${contact.id}`);
    };

    return (
        <li className="list-group-item">
            <div className="row w-100">
                <div className="col-12 col-sm-6 col-md-3 px-0">
                    <img 
                        src="https://picsum.photos/200/200" 
                        alt="Contact Avatar"
                        className="rounded-circle mx-auto d-block img-fluid" 
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-12 col-sm-6 col-md-9 text-start">
                    <div className="float-end">
                        {/* Botón de Editar */}
                        <button 
                            className="btn" 
                            onClick={() => handleEdit(contact)}
                        >
                            <i className="fas fa-pencil-alt me-3" />
                        </button>
                        {/* Botón de Eliminar */}
                        <button 
                            className="btn" 
                            onClick={() => handleDelete(contact.id)}
                        >
                            <i className="fas fa-trash-alt" />
                        </button>
                    </div>
                    
                    <h2 className="mb-0">{contact.name}</h2>
                    <p className="my-1">
                        <i className="fas fa-map-marker-alt text-muted me-2" />
                        {contact.address}
                    </p>
                    <p className="my-1">
                        <i className="fas fa-phone text-muted me-2" />
                        {contact.phone}
                    </p>
                    <p className="my-1">
                        <i className="fas fa-envelope text-muted me-2" />
                        {contact.email}
                    </p>
                </div>
            </div>
        </li>
    );
};

ContactCard.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired
};