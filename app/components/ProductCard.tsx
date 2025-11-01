"use client";
import { Card } from "react-bootstrap";
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { Product } from '@/app/lib/data';

type CartaProps = {
  product: Product; 
};

function ProductCard({ product }: CartaProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img
    }, 1);
    
  };

  return (
    <Card className="h-100 shadow-sm border-0 rounded-4" style={{ transition: 'transform 0.2s' }}
      onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseOut={e => e.currentTarget.style.transform = 'translateY(0px)'}
    >
      <Link href={`/productos/${product.id}`} passHref legacyBehavior>
        <a className="text-decoration-none text-dark d-block" style={{ textDecoration: 'none' }}>
          <Image
            src={product.img}
            alt={product.name}
            width={300} 
            height={220} 
            className="card-img-top"
            style={{ 
              width: '100%',
              height: "220px", 
              objectFit: "contain", 
              background: "#f8f9fa",
              borderTopLeftRadius: 'calc(1rem - 1px)', 
              borderTopRightRadius: 'calc(1rem - 1px)'
            }}
          />
          <Card.Body className="d-flex flex-column p-3">
            <Card.Title as="h5" className="h6" style={{ fontSize: '1rem', minHeight: '40px', color: 'inherit' }}>
              {product.name}
            </Card.Title>
            <Card.Text className="text-primary fw-semibold mb-3 fs-5" style={{ color: 'inherit' }}>
              ${product.price.toLocaleString('es-CL')}
            </Card.Text>
            
          </Card.Body>
        </a>
      </Link>
      
      <Card.Body className="pt-0 p-3 d-flex">
        <button 
          className="btn btn-primary mt-auto w-100" 
          onClick={handleAddToCart}
          style={{ zIndex: 2 }} 
          Añadir al carrito
        </button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;