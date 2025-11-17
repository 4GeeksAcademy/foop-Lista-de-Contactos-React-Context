import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
const StoreContext = createContext()

// Define a provider component
export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore())

    // 💡 Aquí definiremos las "actions" (Funciones de fetch a la API)
    const actions = {
        // --- API & Fetch Actions ---
        // Función para obtener todos los contactos
        getContacts: async () => {
            const URL = `${store.apiURL}${store.agendaSlug}/contacts`;
            try {
                const response = await fetch(URL);
                if (response.status === 404) {
                    // Si la agenda no existe, la crea
                    await actions.createAgenda();
                    dispatch({ type: 'set_contacts', payload: [] });
                    return;
                }
                if (!response.ok) throw new Error("Error al cargar los contactos");
                const data = await response.json();
                dispatch({ type: 'set_contacts', payload: data.contacts });
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        },

        // Función para crear la agenda si no existe (llamada dentro de getContacts)
        createAgenda: async () => {
            const URL = `${store.apiURL}${store.agendaSlug}`;
            try {
                const response = await fetch(URL, { method: "POST" });
                if (!response.ok) throw new Error("Error al crear la agenda");
                console.log("Agenda creada exitosamente.");
            } catch (error) {
                console.error("Error creating agenda:", error);
            }
        },

        // Función para agregar un nuevo contacto
        addContact: async (contactData, navigate) => {
            const URL = `${store.apiURL}${store.agendaSlug}/contacts`;
            
            // Sanitización de datos
            const sanitizedData = {    
                name: contactData.name || "",
                phone: contactData.phone || "",
                email: contactData.email || "",
                address: contactData.address || ""
            };
            
            try {
                const response = await fetch(URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // Enviar sanitizedData
                    body: JSON.stringify(sanitizedData) 
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Detalle del error 422:", errorData.detail);
                    throw new Error("Error al agregar contacto");
                }

                await actions.getContacts(); // Refresca la lista
                navigate("/");

            } catch (error) {
                console.error("Error adding contact:", error);
            }
        },

        // Actualizar un contacto existente
        updateContact: async (contactId, contactData, navigate) => {
            const URL = `${store.apiURL}${store.agendaSlug}/contacts/${contactId}`; 
            
            // Sanitización de datos 
            const sanitizedData = {
                name: contactData.name || "",
                phone: contactData.phone || "",
                email: contactData.email || "",
                address: contactData.address || ""
            }
            
            try {
                const response = await fetch(URL, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    // Enviar sanitizedData
                    body: JSON.stringify(sanitizedData) 
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Detalle del error 422 en PUT:", errorData.detail); 
                    throw new Error("Error al actualizar contacto");
                }
                
                dispatch({ type: 'clear_current_contact' }); 
                await actions.getContacts(); 
                navigate("/"); 
            } catch (error) {
                console.error("Error updating contact:", error);
            }
        },

        // Eliminar un contacto
        deleteContact: async (contactId) => {
            const URL = `${store.apiURL}${store.agendaSlug}/contacts/${contactId}`; 
            try {
                const response = await fetch(URL, { method: "DELETE" });
                
                if (!response.ok) throw new Error("Error al eliminar contacto");
                
                await actions.getContacts(); 
                console.log("Contacto eliminado exitosamente.");
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        },

        // --- Store Actions ---
        // Define el contacto a editar
        setContactToEdit: (contact) => {
            dispatch({ type: 'set_current_contact', payload: contact });
        },

        // Limpia el contacto actual
        clearCurrentContact: () => {
            dispatch({ type: 'clear_current_contact' });
        }
    }

    return <StoreContext.Provider value={{ store, dispatch, actions }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state, dispatch function, and actions.
export default function useGlobalReducer() {
    const { dispatch, store, actions } = useContext(StoreContext)
    return { dispatch, store, actions }; // Devuelve actions
}