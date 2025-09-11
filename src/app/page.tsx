import React from "react";

import Link from "next/link";

export default function Home() {
  const opciones = [
    { nombre: "Gestión de tareas", color: "border-[#04709e] text-[#04709e]" },
    { nombre: "Gestión de proyectos", color: "border-[#90b9d3] text-[#90b9d3]" },
    { nombre: "Tareas y pendientes", color: "border-[#04547e] text-[#04547e]" },
    { nombre: "Seguimiento del tiempo", color: "border-[#5c8ca9] text-[#5c8ca9]" },
    { nombre: "Objetivos y estrategia", color: "border-[#86acc4] text-[#86acc4]" },
    { nombre: "Haz tus propias creaciones", color: "border-[#244454] text-[#244454]" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      {/* Header */}
      <header className="absolute top-4 left-6 flex items-center space-x-2">
        <div className="w-8 h-8 bg-[#04709e] rounded-md flex items-center justify-center text-white font-bold">
          <img src="https://img.icons8.com/?size=100&id=gSHe5TwcX868&format=png&color=000000" alt="" />
        </div>
        <h1 className="text-lg font-bold text-white">
          <span className="text-[#90b9d3]">Gestor de tareas</span>
        </h1>
      </header>

      {/* Botones superiores */}
      <div className="absolute top-4 right-6 flex space-x-3">
        <button className="px-4 py-2 bg-[#04709e] text-white rounded-xl hover:bg-[#04547e]">
          Empezar ahora →
        </button>
      </div>

      {/* Contenido central */}
      <main className="text-center mt-20 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Trabaja más inteligente <br /> con la{" "}
          <span className="text-[#90b9d3]">#1 en gestión de tareas</span>
        </h2>
        <p className="text-lg text-[#86acc4] mb-8">
          Planifica, gestiona y haz el seguimiento de todos tus proyectos en una
          sola plataforma. <br />
          <span className="text-[#5c8ca9]">¿Qué quieres gestionar?</span>
        </p>

        {/* Opciones */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {opciones.map((opcion, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 border rounded-2xl bg-black hover:bg-[#244454] ${opcion.color}`}
            >
              {opcion.nombre}
            </button>
          ))}
        </div>

        {/* Botón inferior */}

        <Link rel="stylesheet" href="/auth/login" >
          <button className="px-6 py-3 bg-[#04709e] text-white text-lg font-semibold rounded-2xl hover:bg-[#04547e] shadow-md">
            Empezar ahora →
          </button>
        </Link>
      </main>
    </div>
  );
}
