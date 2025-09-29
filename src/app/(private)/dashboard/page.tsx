"use client";

import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Statistics from "./components/Statistics";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  status: "nueva" | "gestion" | "completada";
  priority: "Alta" | "Media" | "Baja";
  complexity: "Alta" | "Media" | "Baja";
};

const initialTasks: Task[] = [
  { id: "1", title: "Diseñar login", completed: false, status: "nueva", priority: "Alta", complexity: "Media" },
  { id: "2", title: "Crear backend", completed: false, status: "gestion", priority: "Media", complexity: "Alta" },
  { id: "3", title: "Deploy inicial", completed: true, status: "completada", priority: "Baja", complexity: "Baja" },
];

const statuses = [
  { key: "nueva", label: "Tareas Nuevas" },
  { key: "gestion", label: "Tareas en Gestión" },
  { key: "completada", label: "Tareas Completadas" },
];

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskPriority, setNewTaskPriority] = useState<Task["priority"]>("Media");
  const [complexityFilter, setComplexityFilter] = useState<"Todas" | "Alta" | "Media" | "Baja">("Todas");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // ✨ Estado para mostrar/ocultar estadísticas
  const [showStats, setShowStats] = useState(false);

  // ✨ Estado para el buscador de tareas
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
    else setTasks(initialTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
      status: "nueva",
      priority: newTaskPriority,
      complexity: "Media",
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskPriority("Media");
  };

  const moveTask = (id: string, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const saveEditedTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title: editingTitle } : task)));
    setEditingTaskId(null);
    setEditingTitle("");
  };

  // ✨ Filtrado combinado: por complejidad y por búsqueda
  const filteredTasks = tasks.filter((task) => {
    const matchesComplexity = complexityFilter === "Todas" ? true : task.complexity === complexityFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesComplexity && matchesSearch;
  });

  // ✨ Estado para modo oscuro
const [darkMode, setDarkMode] = useState<boolean>(false);

// Cargar modo oscuro desde localStorage
useEffect(() => {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode) setDarkMode(JSON.parse(savedMode));
}, []);

// Guardar modo oscuro en localStorage y actualizar clase `dark` del html
useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
  if (darkMode) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
}, [darkMode]);


  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#e9f3f9] to-[#c7dce9] ${darkMode ? "dark" : ""}`}>
      {/* 🔹 Header */}
      <header className="bg-[#04547e] shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gestor de Tareas</h1>
        <div className="flex items-center gap-4">
          <select
            value={complexityFilter}
            onChange={(e) => setComplexityFilter(e.target.value as any)}
            className="px-3 py-2 rounded-md border border-[#90b9d3] bg-white shadow-sm text-[#244454] focus:ring-2 focus:ring-[#04709e]"
          >
            <option value="Todas">Todas las complejidades</option>
            <option value="Alta">Complejidad Alta</option>
            <option value="Media">Complejidad Media</option>
            <option value="Baja">Complejidad Baja</option>
          </select>

          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* 🔹 Formulario */}
      <section className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border border-[#90b9d3]">
        <h2 className="text-xl font-semibold text-[#04547e] mb-4">Agregar Nueva Tarea</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Escribe una nueva tarea..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
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
            className="bg-[#04709e] text-white px-6 py-2 rounded-md hover:bg-[#04547e] transition"
          >
            Agregar
          </button>

          {/* Botón para mostrar/ocultar estadísticas */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="ml-2 bg-[#90b9d3] text-[#244454] px-4 py-2 rounded-md hover:bg-[#86acc4] transition"
          >
            {showStats ? "Ocultar Estadísticas" : "Mostrar Estadísticas"}
          </button>
        </div>

        {/* 🔍 Buscador de tareas */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Buscar tarea..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-[#5c8ca9] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#90b9d3] text-[#244454]"
          />
        </div>
      </section>

      {/* 🔹 Tablero */}
      <main className="max-w-7xl mx-auto mt-10 flex gap-6">
        {statuses.map(({ key, label }) => {
          const tasksByStatus = filteredTasks.filter((task) => task.status === key);
          return (
            <div key={key} className="bg-white rounded-lg shadow-lg border border-[#90b9d3] p-5 flex-1 flex flex-col">
              <h2 className="font-semibold text-lg mb-4 text-[#04547e] border-b border-[#90b9d3] pb-2">
                {label} ({tasksByStatus.length})
              </h2>
              <ul className="space-y-3 flex-1 overflow-y-auto">
                {tasksByStatus.map((task) => (
                  <li
                    key={task.id}
                    className="bg-[#244454] p-3 rounded-md flex justify-between items-center text-white shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1 mr-2 px-2 py-1 rounded bg-white text-[#244454] border border-[#90b9d3] focus:outline-none focus:ring-2 focus:ring-[#04709e]"
                        autoFocus
                      />
                    ) : (
                      <span className="text-sm">{task.title}</span>
                    )}

                    <div className="flex gap-2 items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          task.priority === "Alta"
                            ? "bg-red-400"
                            : task.priority === "Media"
                            ? "bg-yellow-400 text-[#244454]"
                            : "bg-green-400"
                        }`}
                      >
                        {task.priority}
                      </span>

                      {editingTaskId === task.id ? (
                        <button
                          onClick={() => saveEditedTask(task.id)}
                          className="px-2 py-1 bg-green-400 text-[#244454] rounded hover:opacity-80"
                          title="Guardar cambios"
                        >
                          💾
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTaskId(task.id);
                            setEditingTitle(task.title);
                          }}
                          className="px-2 py-1 bg-[#90b9d3] text-[#244454] rounded hover:opacity-80"
                          title="Editar tarea"
                        >
                          ✏️
                        </button>
                      )}

                      {key !== "nueva" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveTask(task.id, "nueva");
                          }}
                          className="px-2 py-1 bg-[#90b9d3] text-[#244454] rounded hover:opacity-80"
                        >
                          ←
                        </button>
                      )}
                      {key !== "gestion" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveTask(task.id, "gestion");
                          }}
                          className="px-2 py-1 bg-[#86acc4] text-[#244454] rounded hover:opacity-80"
                        >
                          →
                        </button>
                      )}
                      {key !== "completada" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveTask(task.id, "completada");
                          }}
                          className="px-2 py-1 bg-green-200 text-[#244454] rounded hover:opacity-80"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </main>

      {/*  Modal Detalles */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2 text-[#04547e]">{selectedTask.title}</h2>
            <p className="mb-2">
              <strong>Complejidad:</strong> {selectedTask.complexity}
            </p>
            <p className="mb-2">
              <strong>Prioridad:</strong> {selectedTask.priority}
            </p>
            <p className="mb-2">
              <strong>Fecha de creación:</strong> {new Date(Number(selectedTask.id)).toLocaleString()}
            </p>
            <button
              onClick={() => {
                setEditingTaskId(selectedTask.id);
                setEditingTitle(selectedTask.title);
                setSelectedTask(null);
              }}
              className="mt-4 bg-[#04709e] text-white px-4 py-2 rounded hover:bg-[#04547e]"
            >
              Editar Tarea
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Mostrar componente de estadísticas solo si showStats = true */}
      {showStats && <Statistics tasks={tasks} />}
    </div>
  );
};

export default KanbanBoard;
