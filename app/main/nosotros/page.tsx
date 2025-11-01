import Image from 'next/image';

export default function NosotrosPage() {
  return (
    <>
      <section className="text-center" style={{ padding: '4rem 1rem', background: 'linear-gradient(135deg, #eaf1ff, #fff)' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Los Tralaleros Corp</h2>
        <p className="lead fs-5" style={{ color: '#444' }}>
          Más que una empresa sobre merch de videojuegos.
        </p>
      </section>

      <section style={{ backgroundColor: '#f8f9fa', padding: '4rem 2rem' }}>
        <div className="container">
          <div 
            className="bg-white rounded-4 p-5 text-center mx-auto shadow-sm"
            style={{ maxWidth: '800px' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Nuestra historia</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#555' }}>
              Somos una empresa que fue creada a partir por tres personas con una pasión con los videojuegos, mediante una charla sobre productos de videojuegos,
              se decidió crear esta con productos de diversas industrias de videojuegos con la misma alta calidad como nosotros como jugadores queremos.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-3">Nuestra Misión</h2>
            <p className="lead text-secondary">
              La misión de nuestra empresa es entregar la mejor relación calidad-precio en nuestro amplio catálogo para nuestros clientes, y que estos
              puedan estar satisfechos con su compra, que no tengan arrepentimiento alguno y sentir la calidad en la palma de sus manos.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <Image 
              src="/Valoresdeempresa.png" 
              alt="Misión de la empresa" 
              width={500} 
              height={333} 
              className="img-fluid rounded-4 shadow"
            />
          </div>
        </div>

        <hr className="my-5" />

        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center order-lg-2">
            <Image 
              src="/career-goals-1024x708.png" 
              alt="Objetivo de la empresa" 
              width={500} 
              height={365} 
              className="img-fluid rounded-4 shadow"
            />
          </div>
          <div className="col-lg-6 order-lg-1">
            <h2 className="fw-bold mb-3">Nuestro objetivo</h2>
            <p className="lead text-secondary">
              El objetivo de la empresa es poder masificarse y que esta pueda seguir ofreciendo diversos productos con la mejor calidad posible gracias a nuestros socios
              y colaboradores, y por su parte, cuidar el medio ambiente a largo plazo con materiales biodegradables.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}