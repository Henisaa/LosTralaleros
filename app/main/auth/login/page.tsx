"use client";
import "../auth.css";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof window === "undefined") return;

    const user = JSON.parse(sessionStorage.getItem("user") || "null");

    if (!user) {
      alert("No hay usuarios registrados.");
      return;
    }

    if (email === user.email && password === user.password) {
      alert("¡Login exitoso!");
      sessionStorage.setItem("loggedIn", "true");
      router.push("/");
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="container text-center mt-5 mb-5">
      <h1 className="titulo">Iniciar sesión</h1>
      <div className="logo">
        <span className="icono">
          <Image
            src="/logo_tralaleros.jpeg"
            alt="Logo"
            width={60}
            height={60}
          />
        </span>
        <p className="marca">
          Los <span className="azul">Tralaleros</span>
        </p>
      </div>

      <div className="card-form mx-auto">
        <div className="tabs mb-3">
          <button className="btn-tab active">Iniciar sesión</button>
          <Link href="/main/auth/register" className="btn-tab">
            Registrarse
          </Link>
        </div>

        <form id="formLogin" onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="loginEmail">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control input-rounded"
              id="loginEmail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="loginPassword">
              Clave
            </label>
            <input
              type="password"
              className="form-control input-rounded"
              id="loginPassword"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-registrarse w-100 mt-3">
            Iniciar sesión
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <br />
          <Link href="/main/auth/register">
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
