import { products } from '@/app/lib/data';
import ProductCard from '@/app/components/ProductCard';

export default function ProductGrid() {
  return (
    <section className="container py-5">
      <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}