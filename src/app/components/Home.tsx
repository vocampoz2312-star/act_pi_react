"use client";

import React, { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  status: "nueva" | "gestion" | "completada";
  priority: "Alta" | "Media" | "Baja";
  complexity: "Alta" | "Media" | "Baja";
};

const initialTasks: Task[] = [
  { id: 1, text: "Diseñar login", completed: false, status: "nueva", priority: "Alta", complexity: "Media" },
  { id: 2, text: "Crear backend", completed: false, status: "gestion", priority: "Media", complexity: "Alta" },
  { id: 3, text: "Deploy inicial", completed: true, status: "completada", priority: "Baja", complexity: "Baja" },
];

const statuses = [
  { key: "nueva", label: "Tareas Nuevas" },
  { key: "gestion", label: "Tareas en Gestión" },
  { key: "completada", label: "Tareas Completadas" },
];

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [newTaskPriority, setNewTaskPriority] = useState<Task["priority"]>("Media");
  const [complexityFilter, setComplexityFilter] = useState<"Todas" | "Alta" | "Media" | "Baja">("Todas");

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      status: "nueva",
      priority: newTaskPriority,
      complexity: "Media", // 👈 por defecto
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
    setNewTaskPriority("Media");
  };

  const moveTask = (id: number, newStatus: Task["status"]) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  const filteredTasks = tasks.filter(task =>
    complexityFilter === "Todas" ? true : task.complexity === complexityFilter
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-6">
      {/* 🔹 Header con título y filtro */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#04547e]">
          Gestor de Tareas
        </h1>
        <select
          value={complexityFilter}
          onChange={(e) => setComplexityFilter(e.target.value as any)}
          className="px-4 py-2 rounded-md border border-[#5c8ca9] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#90b9d3] text-[#244454]"
        >
          <option value="Todas">Todas las complejidades</option>
          <option value="Alta">Complejidad Alta</option>
          <option value="Media">Complejidad Media</option>
          <option value="Baja">Complejidad Baja</option>
        </select>
      </div>

      {/* 🔹 Formulario de creación */}
      <div className="flex justify-center mb-6 gap-4 max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md border border-[#5c8ca9] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#90b9d3] text-[#244454]"
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value as Task["priority"])}
          className="px-4 py-2 rounded-md border border-[#5c8ca9] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#90b9d3] text-[#244454]"
        >
          <option value="Alta">Prioridad Alta</option>
          <option value="Media">Prioridad Media</option>
          <option value="Baja">Prioridad Baja</option>
        </select>
        <button
          onClick={handleAddTask}
          className="bg-[#04709e] text-white px-4 py-2 rounded-md hover:bg-[#04547e] transition"
        >
          Agregar
        </button>
      </div>

      {/* 🔹 Kanban */}
      <div className="flex gap-6 max-w-7xl mx-auto">
        {statuses.map(({ key, label }) => (
          <div
            key={key}
            className="bg-white rounded-md shadow-md border border-[#5c8ca9] p-4 flex-1 flex flex-col max-h-[70vh] overflow-y-auto"
          >
            <h2 className="font-semibold text-xl mb-4 text-[#04547e]">{label}</h2>
            <ul className="space-y-3 flex-1">
              {filteredTasks
                .filter(task => task.status === key)
                .map(task => (
                  <li
                    key={task.id}
                    className="bg-[#244454] p-3 rounded-md flex justify-between items-center text-white shadow-sm"
                  >
                    <span className="text-sm">{task.text}</span>
                    <div className="flex gap-2 items-center">
                      {/* Badge de prioridad */}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          task.priority === "Alta"
                            ? "bg-red-400 text-white"
                            : task.priority === "Media"
                            ? "bg-yellow-400 text-[#244454]"
                            : "bg-green-400 text-white"
                        }`}
                      >
                        {task.priority}
                      </span>
                      {/* Botones de mover */}
                      {key !== "nueva" && (
                        <button
                          onClick={() => moveTask(task.id, "nueva")}
                          className="px-2 py-1 bg-[#90b9d3] text-[#244454] rounded hover:opacity-80"
                          title="Mover a Tareas Nuevas"
                        >
                          ←
                        </button>
                      )}
                      {key !== "gestion" && (
                        <button
                          onClick={() => moveTask(task.id, "gestion")}
                          className="px-2 py-1 bg-[#86acc4] text-[#244454] rounded hover:opacity-80"
                          title="Mover a Tareas en Gestión"
                        >
                          →
                        </button>
                      )}
                      {key !== "completada" && (
                        <button
                          onClick={() => moveTask(task.id, "completada")}
                          className="px-2 py-1 bg-green-200 text-[#244454] rounded hover:opacity-80"
                          title="Marcar como completada"
                        >
                          ✓
                        </button>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

