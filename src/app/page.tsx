// src/page.tsx
"use client";

import { useState } from "react";
import Login from "./components/Login";

export default function Page() {
  // usuarioLogueado puede ser string o null
  const [usuarioLogueado, setUsuarioLogueado] = useState<string | null>(null);

  const manejarLoginExitoso = (usuario: string) => {
    setUsuarioLogueado(usuario);
  };

  const manejarLogout = () => {
    setUsuarioLogueado(null);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {!usuarioLogueado ? (
        <Login onLogin={manejarLoginExitoso} />
      ) : (
        <div className="bg-white p-6 rounded shadow w-96 text-center">
          <h2 className="text-xl font-bold mb-4">
            Bienvenido, {usuarioLogueado} 🎉
          </h2>
          <button
            onClick={manejarLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
