const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            slug: "Felix_contact" 
        },
        actions: {
            createAgenda: async () => {
                const store = getStore();
                const url = `https://playground.4geeks.com/contact/agendas/${store.slug}`;
                
                const resp = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                });

                if (resp.status === 201 || resp.status === 400) {
                    getActions().getContacts();
                } else {
                    console.error("Error creando agenda");
                }
            },

            getContacts: async () => {
                const store = getStore();
                const url = `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts`;

                const resp = await fetch(url);
                if (!resp.ok) {
                    console.error("Error cargando contactos");
                    return;
                }
                const data = await resp.json();
                if (data.contacts) {
                    setStore({ contacts: data.contacts });
                }
            },

            createContact: async (contactData) => {
                const store = getStore();
                const actions = getActions();
                const url = `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts`;

                const resp = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData)
                });

                if (resp.ok) {
                    actions.getContacts();
                    return true;
                } else {
                    console.error("Error creando contacto");
                    return false;
                }
            },

            updateContact: async (id, contactData) => {
                const store = getStore();
                const actions = getActions();
                const url = `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts/${id}`;

                const resp = await fetch(url, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData)
                });

                if (resp.ok) {
                    actions.getContacts();
                    return true;
                } else {
                    console.error("Error actualizando contacto");
                    return false;
                }
            },

            deleteContact: async (id) => {
                const store = getStore();
                const actions = getActions();
                const url = `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts/${id}`;

                const resp = await fetch(url, {
                    method: "DELETE"
                });

                if (resp.ok) {
                    actions.getContacts();
                } else {
                    console.error("Error eliminando contacto");
                }
            }
        }
    };
};

export default getState;
