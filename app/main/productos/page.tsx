import ProductGrid from '@/app/components/ProductGrid';

export default function ProductosPage() {
  return (
    <>
      <section className="text-center" style={{ padding: '4rem 1rem', background: '#f8f9fa' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
          Nuestro Catálogo
        </h1>
        <p className="lead fs-5" style={{ color: '#444' }}>Aquí puedes comprar todos nuestros productos.</p>
      </section>
      
      <ProductGrid /> 
    </>
  );
}