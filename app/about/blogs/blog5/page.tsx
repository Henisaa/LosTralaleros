import "./estilo.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="background ">
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="colorBlanco">
            ¡Comienzo de venta Merchandising De Project Sekai!
          </h1>
          <div className="Imagenes mb-5">
            <Image
              src="/Sakuramiku.png"
              alt="Sakura Miku"
              width={500}
              height={200}
            />

            <Image src="/gorda.png" alt="Teto" width={500} height={200} />
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
              Estamos orgullosos de anunciar que desde hoy comenzaremos a vender
              merchandising de Project Sekai
            </h4>
            <h4 className="mb-5 card-text colorBlanco">
              Por ahora, Solo Tenemos a Miku Sakura y a Kasane Teto, sin embargo
              planeamos traer mas figuras de personajes relacionados con project
              sekai prontamente
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
