import "./estilo.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="background ">
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="colorBlanco">Preventa Merchandising Hollow knight!</h1>
          <div className="Imagenes mb-5">
            <Image
              src="/Hornet.jpg"
              alt="Hornet jpg"
              width={500}
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
              Debido a la salida de Hollow Knight: Silksong, Pensamos que esta
              es una instancia ideal para preparar una preventa exclusiva del
              merchandising de uno de los personajes más populares de Hollow
              Knight.
            </p>
            <p className="card-text colorBlanco">
              Este personaje siendo Hornet, la cual es la princesa de Hallownest
              y una de las protagonistas de Hollow Knight: Silksong. Hornet es
              conocida por su agilidad, habilidades de combate y su papel
              crucial en la historia del juego original.
            </p>
            <p className="card-text colorBlanco">
              La preventa incluirá una variedad de productos, como figuras de
              acción y posters
            </p>
            <p className="card-text colorBlanco">
              ¡Aprovecha nuestra preventa y asegura tu artículo antes que nadie!
              Fecha de lanzamiento: 20 de Septiembre del 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
