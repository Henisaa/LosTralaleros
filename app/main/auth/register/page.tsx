"use client";
import "../auth.css";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const regionesYcomunas: { [key: string]: string[] } = {
  "Arica y Parinacota": ["Arica", "Camarones", "Putre"],
  Tarapacá: ["Iquique", "Alto Hospicio", "Pozo Almonte"],
  Antofagasta: ["Antofagasta", "Calama", "Tocopilla"],
  Atacama: ["Copiapó", "Caldera", "Vallenar"],
  Coquimbo: ["La Serena", "Coquimbo", "Ovalle"],
  Valparaíso: ["Valparaíso", "Viña del Mar", "San Antonio"],
  "Metropolitana de Santiago": [
    "Santiago",
    "Puente Alto",
    "Maipú",
    "Las Condes",
    "Providencia",
  ],
  "O’Higgins": ["Rancagua", "San Fernando", "Santa Cruz"],
  Maule: ["Talca", "Curicó", "Linares"],
  Ñuble: ["Chillán", "San Carlos", "Coihueco"],
  Biobío: ["Concepción", "Los Ángeles", "Coronel"],
  "La Araucanía": ["Temuco", "Villarrica", "Angol"],
  "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
  "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
  Aysén: ["Coyhaique", "Aysén", "Chile Chico"],
  Magallanes: ["Punta Arenas", "Puerto Natales", "Porvenir"],
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    region: "",
    comuna: "",
    terminos: false,
  });
  const [comunas, setComunas] = useState<string[]>([]);
  const router = useRouter();

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setFormData((prev) => ({ ...prev, region, comuna: "" })); // Resetear comuna
    setComunas(regionesYcomunas[region] || []);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const { email, password, password2, region, comuna, terminos } = formData;

    if (!email) {
      alert("El correo es requerido.");
      return;
    }
    if (email.length > 100) {
      alert("El correo no puede superar los 100 caracteres.");
      return;
    }
    const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!emailRegex.test(email)) {
      alert(
        "Solo se permiten correos con dominio @duoc.cl, @profesor.duoc.cl o @gmail.com"
      );
      return;
    }
    if (!password) {
      alert("La contraseña es requerida.");
      return;
    }
    if (password.length < 4 || password.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }
    if (password !== password2) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    if (!region) {
      alert("Debe seleccionar una región.");
      return;
    }
    if (!comuna) {
      alert("Debe seleccionar una comuna.");
      return;
    }
    if (!terminos) {
      alert("Debe aceptar los términos y condiciones.");
      return;
    }

    const user = { email, password, region, comuna };
    sessionStorage.setItem("user", JSON.stringify(user));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    router.push("/auth/login");
  };

  return (
    <div className="container text-center mt-5 mb-5">
      <h1 className="titulo">Registrarse</h1>
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
          <Link href="/main/auth/login" className="btn-tab">
            Iniciar sesión
          </Link>
          <button className="btn-tab active">Registrarse</button>
        </div>

        <form id="formRegistro" onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="registerEmail">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="registerEmail"
              className="form-control input-rounded"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="registerPassword">
              Clave
            </label>
            <input
              type="password"
              name="password"
              id="registerPassword"
              className="form-control input-rounded"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="registerPassword2">
              Confirmar Clave
            </label>
            <input
              type="password"
              name="password2"
              id="registerPassword2"
              className="form-control input-rounded"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="registerRegion">
              Región
            </label>
            <select
              name="region"
              id="registerRegion"
              className="form-select input-rounded"
              required
              value={formData.region}
              onChange={handleRegionChange}
            >
              <option value="">Seleccione una región</option>
              {Object.keys(regionesYcomunas).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="registerComuna">
              Comuna
            </label>
            <select
              name="comuna"
              id="registerComuna"
              className="form-select input-rounded"
              required
              value={formData.comuna}
              onChange={handleChange}
              disabled={!formData.region}
            >
              <option value="">Seleccione una comuna</option>
              {comunas.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="checkboxes text-start">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="terminos"
                id="terminos"
                required
                checked={formData.terminos}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="terminos">
                Acepto los términos y condiciones
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-registrarse w-100 mt-3">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
