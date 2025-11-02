import "./estilo.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="background ">
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="colorBlanco">
            ¡Comienzo de venta Merchandising Library of Ruina!
          </h1>
          <div className="Imagenes mb-5">
            <Image
              src="/SephirotKeychain.jpg"
              alt="Sephirot Key Chain"
              width={500}
              height={200}
            />

            <Image
              src="/RuinaArtBook.png"
              alt="Ruina Art Book"
              width={400}
              height={200}
            />
          </div>

          <div
            className="card text mb-3"
            style={{
              maxWidth: "60rem",
              margin: "0 auto",
              backgroundColor: "transparent",
            }}
          >
            <p className="card-text colorBlanco">
              anunciamos que desde el dia 15 de septiembre del 2025 comenzaremos
              a vender merchandising inspirado en los videojuegos indie Library
              of Ruina y Lobotomy Corporation
            </p>
            <p className="card-text colorBlanco">
              Presentando importantes personajes como Netzach, Gebura, Binah,
              Chesed, Angela o entre otros.
            </p>
            <p className="card-text colorBlanco">
              este Videojuego se desarrolla en un lugar llamado La cuidad la
              cual es un complejo urbano que funciona como escenario principal
              en el universo de estos juegos. la cuidad es una extensa y
              densamente poblada expansión urbana dividida en 26 Distritos
              Governados por una entidad conocida como La Cabeza
            </p>
            <p className="card-text colorBlanco">
              Los productos incluirán Llaveros, Posters y el Exclusivo ArtBook
              de Library of Ruina.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
