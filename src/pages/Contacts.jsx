import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const [idToDelete, setIdToDelete] = useState(null);

    useEffect(() => {
        actions.createAgenda();
    }, []);

    const handleDeleteClick = (id) => {
        setIdToDelete(id); 
    };

    const confirmDelete = () => {
        actions.deleteContact(idToDelete);
        setIdToDelete(null);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>

            <div className="list-group">
                {store.contacts.length === 0 ? (
                    <div className="text-center p-3">No hay contactos. ¡Añade uno!</div>
                ) : (
                    store.contacts.map((item) => (
                        <ContactCard 
                            key={item.id} 
                            contact={item} 
                            onDelete={() => handleDeleteClick(item.id)} 
                        />
                    ))
                )}
            </div>
           
            {idToDelete && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">¿Estás seguro?</h5>
                                <button type="button" className="btn-close" onClick={() => setIdToDelete(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Si borras este contacto, no podrás recuperarlo.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIdToDelete(null)}>Oh no!</button>
                                <button type="button" className="btn btn-primary" onClick={confirmDelete}>Yes baby!</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
