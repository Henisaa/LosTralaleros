import "./estilo.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="background ">
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="colorBlanco">
            ¡Comienzo de venta Merchandising De Limbus Company!
          </h1>
          <div className="Imagenes mb-5">
            <Image src="/Ishmael.png" alt="Ishmael" width={500} height={200} />

            <Image src="/HongLu.png" alt="Hong Lu" width={500} height={200} />
          </div>

          <div
            className="card text mb-3"
            style={{
              maxWidth: "60rem",
              margin: "0 auto",
              backgroundColor: "transparent",
            }}
          >
            <h4 className="card-text colorBlanco">
              Atencion Fans de Limbus Company! este 2 de noviembre se lanzaran
              nuevos peluches, especificamente del videojuego gacha Limbus
              Company.
            </h4>
            <h4 className="mb-5 card-text colorBlanco">
              estaran disponibles personajes como Don Quixote, Ishmael y Hong
              Lu, No te lo pierdas!
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
