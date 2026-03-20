import React from "react";

const AutContext = React.createContext({
  usuarioLogueado: false,
  idToken: "",
  nombre: "",
  nombreUsuario: "",
});
export default AutContext;
