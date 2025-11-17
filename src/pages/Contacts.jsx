import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Contacts = () => {
    const { store, actions } = useGlobalReducer();

    // Carga los contactos al montar el componente
    useEffect(() => {
        actions.getContacts();
        actions.clearCurrentContact(); // Asegura que no estemos en modo edición
    }, []); 

    return (
        <div className="container">
            <div className="d-flex justify-content-end my-3">
                <Link to="/add" className="btn btn-success">
                    Agregar nuevo contacto
                </Link>
            </div>
            
            <ul className="list-group">
                {store.contacts.length === 0 ? (
                    <li className="list-group-item text-center">
                        No hay contactos. ¡Agrega uno!
                    </li>
                ) : (
                    store.contacts.map(contact => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))
                )}
            </ul>
        </div>
    );
};