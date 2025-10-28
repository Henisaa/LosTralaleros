"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand bg-white shadow-sm fixed-top"
      style={{ zIndex: 1030 }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/about">
          <Image
            src="/logo_tralaleros.jpeg"
            alt="Logo"
            width={30}
            height={30}
            className="me-2"
          />
          <span className="fw-bold text-primary">Los Tralaleros</span>
        </a>

        <ul className="navbar-nav d-flex justify-content-center w-100">
          <li className="nav-item">
            <Link href="/about" legacyBehavior>
              <a className="nav-link">Inicio</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about" legacyBehavior>
              <a className="nav-link">Productos</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about/blogs" legacyBehavior>
              <a className="nav-link">Blogs</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/nosotros" legacyBehavior>
              <a className="nav-link">Nosotros</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/contacto" legacyBehavior>
              <a className="nav-link">Contacto</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
