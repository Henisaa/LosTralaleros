"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") === "true") router.push("/");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) return alert("No hay usuarios registrados.");

    if (email === user.email && password === user.password) {
      sessionStorage.setItem("loggedIn", "true");
      alert("¡Login exitoso!");
      router.push("/");
    } else {
      alert("Correo o contraseña incorrectos.");
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
