import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const initialFormState = {
    name: "",
    email: "",
    phone: "",
    address: "",
};

export const AddContact = () => {
    const { id } = useParams(); // Para obtener el ID si estamos en modo edición
    const navigate = useNavigate();
    const { actions, store } = useGlobalReducer();

    // Inicializa el formulario con el contacto actual (si existe) o con valores vacíos
    const contactToEdit = id && store.currentContact && store.currentContact.id == id 
        ? store.currentContact 
        : null;

    const [contact, setContact] = useState(contactToEdit || initialFormState);

    // Ajusta el estado si se carga un contacto para edición
    useEffect(() => {
        if (contactToEdit) {
            setContact(contactToEdit);
        } else if (id) {

            setContact(initialFormState);
        }
    }, [contactToEdit, id]);

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones básicas (se pueden mejorar)
        if (!contact.name || !contact.email || !contact.phone || !contact.address) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (id && contactToEdit) {
            // Modo edición
            actions.updateContact(id, contact, navigate);
        } else {
            // Modo creación
            actions.addContact(contact, navigate);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">
                {contactToEdit ? "Editar Contacto" : "Agregar Nuevo Contacto"}
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Nombre completo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="name"
                        placeholder="Nombre completo"
                        value={contact.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Ej: ejemplo@dominio.com"
                        value={contact.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Teléfono"
                        value={contact.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Dirección"
                        value={contact.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {contactToEdit ? "Guardar cambios" : "Guardar"}
                </button>
                <Link to="/" className="mt-3 d-block text-center">
                    Volver a la lista de contactos
                </Link>
            </form>
        </div>
    );
};