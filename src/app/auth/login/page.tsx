import React from "react";
import Login from "../../components/login";

export default function Page() {
  const handleLogin = (usuario: string) => {
    alert(`Bienvenido ${usuario} 🎉`);
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
    </div>
  );
}
