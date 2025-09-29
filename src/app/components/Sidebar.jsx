"use client";
import { useState } from "react";
import { Home, Star, CheckCircle } from "lucide-react";

export default function Sidebar({ onSelect }) {
  const [selected, setSelected] = useState("todas");

  const handleClick = (view) => {
    setSelected(view);
    onSelect(view);
  };

  return (
    <aside className="h-screen bg-[#04547e] text-white w-56 flex flex-col p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Menú</h2>

      <button
        onClick={() => handleClick("todas")}
        className={`flex items-center gap-2 p-2 rounded-md mb-2 ${
          selected === "todas" ? "bg-[#04709e]" : "hover:bg-[#244454]"
        }`}
      >
        <Home size={18} /> Todas las Tareas
      </button>

      <button
        onClick={() => handleClick("favoritas")}
        className={`flex items-center gap-2 p-2 rounded-md mb-2 ${
          selected === "favoritas" ? "bg-[#04709e]" : "hover:bg-[#244454]"
        }`}
      >
        <Star size={18} /> Favoritas
      </button>

      <button
        onClick={() => handleClick("completadas")}
        className={`flex items-center gap-2 p-2 rounded-md mb-2 ${
          selected === "completadas" ? "bg-[#04709e]" : "hover:bg-[#244454]"
        }`}
      >
        <CheckCircle size={18} /> Completadas
      </button>
    </aside>
  );
}
