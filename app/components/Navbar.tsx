"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CartDropdown } from "@/app/about/context/CartContext"; // Asegúrate que esta ruta es correcta

// 1. Importa los componentes de react-bootstrap
import { Container, Nav, Navbar } from "react-bootstrap";

export default function AppNavbar() {
  // Renombré la función para evitar conflictos
  const pathname = usePathname();

  return (
    // 2. Reemplaza <nav> por <Navbar> de react-bootstrap
    <Navbar
      bg="white"
      className="shadow-sm"
      fixed="top"
      expand="lg"
      collapseOnSelect
    >
      <Container>
        {/* 3. Usa Navbar.Brand con 'as={Link}' para la navegación */}
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
          <Image
            src="/logo_tralaleros.jpeg"
            alt="Logo"
            width={30}
            height={30}
            className="me-2"
          />
          <span className="fw-bold text-primary">Los Tralaleros</span>
        </Navbar.Brand>

        {/* 4. Este es el botón de hamburguesa */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* 5. Este es el contenedor colapsable */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          {/* 6. Reemplaza <ul> por <Nav> */}
          <Nav>
            {/* 7. Usa Nav.Link con 'as={Link}' y la prop 'active' */}
            <Nav.Link as={Link} href="/" active={pathname === "/"}>
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/main/productos"
              active={pathname.startsWith("/main/productos")}
            >
              Productos
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/about/blogs"
              active={pathname.startsWith("/about/blogs")}
            >
              Blogs
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/main/nosotros"
              active={pathname === "/main/nosotros"}
            >
              Nosotros
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/main/contacto"
              active={pathname === "/main/contacto"}
            >
              Contacto
            </Nav.Link>

            <Nav.Link
              as={Link}
              href="/main/categorias"
              active={pathname === "/main/categorias"}
            >
              Categorias
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Los iconos se quedan fuera del Collapse para ser visibles en móvil */}
        <div className="d-flex align-items-center">
          <Link href="/main/auth/login" legacyBehavior>
            <a className="me-3 text-dark" title="Iniciar Sesión">
              <i className="bi bi-person fs-4"></i>
            </a>
          </Link>
          <CartDropdown />
        </div>
      </Container>
    </Navbar>
  );
}
