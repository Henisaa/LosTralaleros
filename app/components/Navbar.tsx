"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CartDropdown } from "@/app/about/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    if (path === "/productos" && pathname.startsWith("/productos"))
      return "nav-link active";
    if (path === "/blogs" && pathname.startsWith("/blogs"))
      return "nav-link active";
    return pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
      <div className="container">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand d-flex align-items-center">
            <Image
              src="/logo_tralaleros.jpeg"
              alt="Logo"
              width={30}
              height={30}
              className="me-2"
            />
            <span className="fw-bold text-primary">Los Tralaleros</span>
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" legacyBehavior>
                <a className={getLinkClass("/")}>Inicio</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/main/productos" legacyBehavior>
                <a className={getLinkClass("/productos")}>Productos</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about/blogs" legacyBehavior>
                <a className={getLinkClass("/blogs")}>Blogs</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/main/nosotros" legacyBehavior>
                <a className={getLinkClass("/nosotros")}>Nosotros</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/main/contacto" legacyBehavior>
                <a className={getLinkClass("/contacto")}>Contacto</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <Link href="/auth/login" legacyBehavior>
            <a className="me-3 text-dark" title="Iniciar Sesión">
              <i className="bi bi-person fs-4"></i>
            </a>
          </Link>
          <CartDropdown />
        </div>
      </div>
    </nav>
  );
}
