import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container my-5 text-center">
      <h1 className="mb-4">Los Tralaleros</h1>

      <p className="lead mb-4">
        Plataforma de comercio electrónico con validación de despacho
        mediante API pública de feriados legales en Chile.
      </p>

      <div className="d-flex justify-content-center gap-3">
        <Link href="/main/productos" className="btn btn-primary btn-lg">
          Ver productos
        </Link>

        <Link href="/main/pago" className="btn btn-success btn-lg">
          Ir al pago
        </Link>
      </div>
    </main>
  );
}
