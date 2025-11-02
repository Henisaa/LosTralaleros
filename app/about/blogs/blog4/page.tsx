import "./estilo.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="background ">
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="colorBlanco">
            ¡Comienzo de venta Merchandising The Battle Cats!
          </h1>
          <div className="Imagenes mb-5">
            <Image
              src="/BasicCat.png"
              alt="Basic Cat"
              width={500}
              height={200}
            />

            <Image src="/AxeCat.png" alt="Axe Cat" width={500} height={200} />
          </div>

          <div
            className="card text mb-3"
            style={{
              maxWidth: "60rem",
              margin: "0 auto",
              backgroundColor: "transparent",
            }}
          >
            <h3 className="card-text colorBlanco">
              anunciamos que desde el dia 15 de septiembre del 2025 comenzaremos
              a vender Merchandising de The Battle Cats
            </h3>
            <h3 className="card-text colorBlanco">
              Por Ahora Comenzaremos Vendiendo solo el Gato Normal y Gato Hacha,
              pero pensamos en expandirnos a otros personajes proximamente
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
