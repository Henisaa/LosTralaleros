"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const regionesYcomunas = {
  "Arica y Parinacota": ["Arica", "Camarones", "Putre"],
  "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
  "Antofagasta": ["Antofagasta", "Calama", "Tocopilla"],
  "Metropolitana de Santiago": ["Santiago", "Puente Alto", "Maipú"],
};

// URL Base del microservicio Spring Boot
const API_URL = "http://localhost:8080/api/v1/users";

// Llamada al backend
async function registerUser(email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: email.split("@")[0],
      email: email,
      password: password,
    }),
  });

  return res.text();
}

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") === "true") {
      router.push("/");
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!emailRegex.test(email)) return alert("Correo inválido");
    if (password !== password2) return alert("Las contraseñas no coinciden");
    if (!region || !comuna) return alert("Seleccione región y comuna");

    try {
      const response = await registerUser(email, password);
      alert(response);

      if (response.includes("correctamente")) {
        router.push("/auth/login");
      }
    } catch (error) {
      alert("Error al registrar usuario.");
    }
  };

  return (
    <div className="container text-center mt-5 pt-5">
      <h1 className="titulo">Registrarse</h1>

      <div className="logo">
        <span className="icono"><img src="/logo_tralaleros.jpeg" width={60} /></span>
        <p className="marca">Los <span className="azul">Tralaleros</span></p>
      </div>

      <div className="card-form mx-auto">
        <div className="tabs mb-3">
          <a href="/auth/login" className="btn-tab">Iniciar sesión</a>
          <button className="btn-tab active">Registrarse</button>
        </div>

        <form onSubmit={handleRegister}>
          
          <div className="mb-3 text-start">
            <label className="form-label">Correo electrónico</label>
            <input
              data-testid="register-email"
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
              data-testid="register-password"
              type="password"
              className="form-control input-rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Confirmar clave</label>
            <input
              data-testid="register-password2"
              type="password"
              className="form-control input-rounded"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Región</label>
            <select
              data-testid="register-region"
              className="form-control input-rounded"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            >
              <option value="">Seleccione una región</option>
              {Object.keys(regionesYcomunas).map((reg) => (
                <option key={reg}>{reg}</option>
              ))}
            </select>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Comuna</label>
            <select
              data-testid="register-comuna"
              className="form-control input-rounded"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              required
            >
              <option value="">Seleccione una comuna</option>
              {region && regionesYcomunas[region].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="checkboxes text-start">
            <label>
              <input data-testid="register-terms" type="checkbox" className="form-check-input" required /> 
              Acepto los términos y condiciones
            </label>
          </div>

          <button data-testid="register-btn" type="submit" className="btn btn-registrarse w-100 mt-3">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
