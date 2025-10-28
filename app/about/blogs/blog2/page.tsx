import Image from "next/image";
import "./estilo.css";
export default function Home() {
  return (
    <>
      <div className="background ">
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="colorBlanco">
            ¡Comienzo de venta Merchandising De Doom!
          </h1>
          <div className="Imagenes mb-5">
            <Image
              src="/DoomSlayer.png"
              alt="Doom Slayer"
              width={400}
              height={200}
            />
          </div>

          <div
            className="card text mb-3"
            style={{
              maxWidth: "50rem",
              margin: "0 auto",
              backgroundColor: "transparent",
            }}
          >
            <p className="card-text colorBlanco">
              Estamos orgullosos de anunciar que desde hoy comenzaremos a vender
              merchandising de uno de los personajes más emblemáticos de Doom.
            </p>
            <p className="card-text colorBlanco">
              Esta personaje siendo el propio Doom Slayer con el diseño de su
              entrega mas reciente Doom: The Dark Ages. El Doom Slayer es
              conocido por su brutalidad, grandes habilidades de combate y su
              papel crucial en la historia siendo considerado un protector de la
              humanidad.
            </p>
            <p className="mb-5 card-text colorBlanco">
              El merchandising incluirá una variedad de productos, como figuras
              de acción y posters
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
