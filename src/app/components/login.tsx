"use client"; // 👈 NECESARIO en Next.js porque usas useState

import { useState } from "react";
import { LogIn } from "lucide-react"; // librería de iconos moderna (lucide)
import type { FormEvent } from "react";

// Definimos la interfaz de props
interface LoginProps {
  onLogin: (usuario: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [usuario, setUsuario] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");

  // credenciales quemadas (ejemplo)
  const credenciales = {
    usuario: "admin",
    password: "1234",
  };

  const manejarLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usuario === credenciales.usuario && password === credenciales.password) {
      onLogin(usuario);
    } else {
      alert("Usuario o contraseña incorrectos ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        {/* Encabezado */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mb-3">
            <LogIn className="text-blue-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
          <p className="text-gray-500 text-sm">Inicia sesión en tu cuenta</p>
        </div>

        {/* Formulario */}
        <form onSubmit={manejarLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>

        {/* Opcional: link de registro o ayuda */}
        <p className="text-sm text-center text-gray-500 mt-6">
          ¿Olvidaste tu contraseña?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Recuperar
          </a>
        </p>
      </div>
    </div>
  );
}
