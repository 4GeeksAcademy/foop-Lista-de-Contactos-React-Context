// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Contacts } from "./pages/Contacts.jsx";
import { AddContact } from "./pages/AddContact.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Ruta para la lista de contactos (página principal) */}
        <Route path= "/" element={<Contacts />} />

        {/* Ruta para agregar un nuevo contacto */}
        <Route path="/add" element={ <AddContact />} />

        {/* Ruta para editar un contacto (reutiliza el mismo componente) */}
        <Route path="/edit/:id" element={<AddContact />} />

      </Route>
    )
);