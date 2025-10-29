import "./estilo.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="background ">
        <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="colorBlanco">
            ¡Comienzo de venta Merchandising De Ultrakill!
          </h1>
          <div className="Imagenes mb-5">
            <Image src="/V1Plushie.png" alt="V1" width={500} height={200} />

            <Image src="/V2Plushie.png" alt="V2" width={500} height={200} />
          </div>

          <div
            className="card text mb-3"
            style={{
              maxWidth: "60rem",
              margin: "0 auto",
              backgroundColor: "transparent",
            }}
          >
            <h4 className="card-text colorBlanco d-flex justify-content-center">
              Mankind is&nbsp;
              <span className="card-text colorRojo">Dead,</span>
              <span className="card-text colorRojo">Blood</span>&nbsp;is Fuel,
              Hell is&nbsp;
              <span className="card-text colorRojo">Full</span>.
            </h4>

            <h4 className="mb-5 card-text colorBlanco">
              Anunciamos que este 02 de Noviembre comenzaremos con la venta de
              Peluches Oficiales de Ultrakill
            </h4>
            <h4 className="mb-5 card-text colorBlanco d-flex justify-content-center">
              Protagonizado Por V1 y V2
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
