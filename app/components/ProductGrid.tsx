import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/app/about/lib/data"; // Importamos el TIPO

// Definimos que este componente espera recibir una lista de productos
type ProductGridProps = {
  products: Product[];
};

// Hacemos que la función acepte esa lista de productos
export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="container py-5">
      <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
        {/* Mapeamos la lista recibida */}
        {products.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
