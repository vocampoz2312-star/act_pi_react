// src/app/components/Login.jsx
"use client";

import { useState } from "react";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const credenciales = {
    usuario: "admin",
    password: "1234",
  };

  const manejarLogin = (e) => {
    e.preventDefault();
    if (usuario === credenciales.usuario && password === credenciales.password) {
      onLogin(usuario);
    } else {
      alert("Usuario o contraseña incorrectos ❌");
    }
  };

  return (
    <form
      onSubmit={manejarLogin}
      className="bg-white p-6 rounded shadow w-80"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">🔑 Login</h2>

      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Ingresar
      </button>
    </form>
  );
}
