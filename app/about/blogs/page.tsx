import { Col } from "react-bootstrap";
import Link from "next/link";
import Carta from "../Card";

export default function Home() {
  return (
    <>
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
        {/*Primer Blog*/}

        <Col md={4} className="mb-5">
          <Carta
            imageSrc="/SilksongLogo.jpg"
            title="Preventa Exclusiva de Hollow Knight: Silksong"
            bodyText="Preventa Exclusiva de merchandasing por la salida de Hollow Knight: Silksong"
            style={{ width: "30rem" }}
          >
            <Link href="/about/blogs/blog1">
              <button className="btn btn-primary">Ver Detalles</button>
            </Link>
          </Carta>
        </Col>
        {/*Segundo Blog*/}
        <Col md={4} className="mb-5">
          <Carta
            imageSrc="/DoomDarkAgesLogo.jpeg"
            title="Comienzo de Venta de Doom: Dark Ages"
            bodyText="Presentamos Nuestro Nuevo Merchandising Oficial de Doom, Protagonizado por el Doom Slayer"
            style={{ width: "30rem" }}
          >
            <Link href="/about/blogs/blog2">
              <button className="btn btn-primary">Ver Detalles</button>
            </Link>
          </Carta>
        </Col>

        {/*Tercer Blog*/}
        <Col md={4} className="mb-5">
          <Carta
            imageSrc="/LibraryOfRuinaLogo.png"
            title="Venta de Merchandising Inspirado en Library of Ruina"
            bodyText="Presentamos nuestro Nuevo Merchandising de Library of Ruina, ademas de tener un ArtBook exclusivo."
            style={{ width: "30rem" }}
          >
            <Link href="/about/blogs/blog3">
              <button className="btn btn-primary">Ver Detalles</button>
            </Link>
          </Carta>
        </Col>

        {/*Cuarto Blog*/}
        <Col md={4} className="mb-5">
          <Carta
            imageSrc="/TheBattleCatsLogo.png"
            title="Venta de Merchandising de The Battle Cats "
            bodyText="Presentamos nuestro Nuevo Merchandising de The Battle Cats"
            style={{ width: "30rem" }}
          >
            <Link href="/about/blogs/blog4">
              <button className="btn btn-primary">Ver Detalles</button>
            </Link>
          </Carta>
        </Col>

        {/*Quinto Blog*/}
        <Col md={4} className="mb-5">
          <Carta
            imageSrc="/ProjectSekaiLogo.png"
            title="Venta de Merchandising de Project Sekai "
            bodyText="Presentamos nuestras Nuevas Figuras del videojuego Project Sekai"
            style={{ width: "30rem" }}
          >
            <Link href="/about/blogs/blog5">
              <button className="btn btn-primary">Ver Detalles</button>
            </Link>
          </Carta>
        </Col>
        {/*Sexto Blog*/}
        <Col md={4} className="mb-5">
          <Carta
            imageSrc="/LimbusCompanyLogo.jpg"
            title="Nueva Venta de Productos de Limbus Company"
            bodyText="Presentamos nuestros nuevos productos del videojuego Gacha Limbus Company"
            style={{ width: "30rem" }}
          >
            <Link href="/about/blogs/blog6">
              <button className="btn btn-primary">Ver Detalles</button>
            </Link>
          </Carta>
        </Col>
        {/*Septimo Blog*/}
        <Col md={4} className="mb-5">
          <Carta
            imageSrc="/UltrakillLogo.png"
            title="Nueva Venta de Productos de Ultrakill"
            bodyText="Presentamos nuevo merchandising de Ultrakill, protagonizado por V1 y V2"
            style={{ width: "30rem" }}
          >
            <Link href="/about/blogs/blog7">
              <button className="btn btn-primary">Ver Detalles</button>
            </Link>
          </Carta>
        </Col>
      </div>
    </>
  );
}
