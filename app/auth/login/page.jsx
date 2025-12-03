"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// URL Base del microservicio Spring Boot
const API_URL = "http://localhost:8080/api/v1/users";

// Llamada al backend
async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.text(); // backend responde con texto plano
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") === "true") {
      router.push("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);

      if (response.includes("Login correcto")) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("email", email);

        alert("¡Login exitoso!");
        router.push("/");
      } else {
        alert(response);
      }

    } catch (error) {
      alert("Error al iniciar sesión.");
    }
  };

  return (
    <div className="container text-center mt-5 pt-5">
      <h1 className="titulo">Iniciar sesión</h1>

      <div className="logo">
        <span className="icono"><img src="/logo_tralaleros.jpeg" width={60} /></span>
        <p className="marca">Los <span className="azul">Tralaleros</span></p>
      </div>

      <div className="card-form mx-auto">
        <div className="tabs mb-3">
          <button className="btn-tab active">Iniciar sesión</button>
          <a href="/auth/register" className="btn-tab">Registrarse</a>
        </div>

        <form onSubmit={handleLogin}>
          
          <div className="mb-3 text-start">
            <label className="form-label">Correo electrónico</label>
            <input
              data-testid="login-email"
              type="email"
              className="form-control input-rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Clave</label>
            <input
              data-testid="login-password"
              type="password"
              className="form-control input-rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button data-testid="login-btn" type="submit" className="btn btn-registrarse w-100 mt-3">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
