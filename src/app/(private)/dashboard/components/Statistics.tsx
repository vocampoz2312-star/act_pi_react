"use client";

import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
// Define Task type here if not imported from another file
type Task = {
  id: string;
  title: string;
  completed: boolean;
  complexity: "Alta" | "Media" | "Baja";
  priority: "Alta" | "Media" | "Baja";
};

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

type Props = {
  tasks: Task[];
};

const Statistics: React.FC<Props> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const complexityCounts = {
    Alta: tasks.filter((t) => t.complexity === "Alta").length,
    Media: tasks.filter((t) => t.complexity === "Media").length,
    Baja: tasks.filter((t) => t.complexity === "Baja").length,
  };

  const priorityCounts = {
    Alta: tasks.filter((t) => t.priority === "Alta").length,
    Media: tasks.filter((t) => t.priority === "Media").length,
    Baja: tasks.filter((t) => t.priority === "Baja").length,
  };

  const complexityData = {
    labels: ["Alta", "Media", "Baja"],
    datasets: [
      {
        label: "Tareas por Complejidad",
        data: [complexityCounts.Alta, complexityCounts.Media, complexityCounts.Baja],
        backgroundColor: ["#f87171", "#facc15", "#4ade80"],
      },
    ],
  };

  const priorityData = {
    labels: ["Alta", "Media", "Baja"],
    datasets: [
      {
        label: "Tareas por Prioridad",
        data: [priorityCounts.Alta, priorityCounts.Media, priorityCounts.Baja],
        backgroundColor: ["#f87171", "#facc15", "#4ade80"],
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-10 bg-white p-6 rounded-lg shadow-md border border-[#90b9d3]">
      <h2 className="text-xl font-semibold text-[#04547e] mb-4">📊 Estadísticas</h2>
      <p>Total de tareas: {totalTasks}</p>
      <p>Porcentaje completadas: {completionPercentage}% ✅</p>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-[#04547e] font-semibold mb-2">Por Complejidad</h3>
          <Pie data={complexityData} />
        </div>
        <div className="flex-1">
          <h3 className="text-[#04547e] font-semibold mb-2">Por Prioridad</h3>
          <Bar data={priorityData} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
