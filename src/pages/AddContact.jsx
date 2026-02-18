import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const currentContact = store.contacts.find(c => c.id == id);
            if (currentContact) {
                setContact({
                    name: currentContact.name,
                    email: currentContact.email,
                    phone: currentContact.phone,
                    address: currentContact.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = false;

        if (id) {
            success = await actions.updateContact(id, contact);
        } else {
            success = await actions.createContact(contact);
        }

        if (success) navigate("/");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{id ? "Edit Contact" : "Add a new contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" value={contact.name} onChange={handleChange} placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={contact.email} onChange={handleChange} placeholder="Enter email" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" value={contact.phone} onChange={handleChange} placeholder="Enter phone" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={contact.address} onChange={handleChange} placeholder="Enter address" required />
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
            <Link to="/">or get back to contacts</Link>
        </div>
    );
};
