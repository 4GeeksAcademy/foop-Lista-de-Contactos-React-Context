export const initialStore = () => {
    return {
        // Lista de contactos
        contacts: [],
        // Contacto actualmente seleccionado para editar
        currentContact: null,
        // Slug de la agenda que se usará en la API
        agendaSlug: "seniorteam", 
        // URL base de la API de contactos
        apiURL: "https://playground.4geeks.com/contact/agendas/"
    }
}

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        
        // Acción para establecer la lista completa de contactos
        case 'set_contacts':
            return {
                ...store,
                contacts: action.payload
            };

        // Acción para establecer el contacto que se está editando
        case 'set_current_contact':
            return {
                ...store,
                currentContact: action.payload
            };

        // Acción para limpiar el contacto actual después de una edición/creación
        case 'clear_current_contact':
            return {
                ...store,
                currentContact: null
            };

        default:
            // Es buena práctica devolver el estado si la acción no es reconocida
            return store;
    }
}
