"use client";

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getProductById, products, Product } from '@/app/lib/data';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/app/components/ProductCard'; 

export default function ProductoDetalle() {
  const params = useParams();
  const id = params.id as string;
  const product = getProductById(id);
  
  const { addToCart } = useCart();
  const [mainImg, setMainImg] = useState('');
  const [quantity, setQuantity] = useState(1);

  
  useEffect(() => {
    if (product) {
      setMainImg(product.img);
    }
  }, [product]);

  if (!product) {
    
    return notFound();
  }

  const gallery = (product.images && product.images.length ? product.images : [product.img]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.name}(s) añadido(s) al carrito!`);
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <main className="container py-4 mt-4">
      <nav className="small mb-3" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/" legacyBehavior><a className="text-decoration-none">Inicio</a></Link></li>
          <li className="breadcrumb-item"><Link href="/productos" legacyBehavior><a className="text-decoration-none">Productos</a></Link></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="border rounded shadow-sm p-3" style={{ background: '#f8f9fa' }}>
            <Image
              src={mainImg}
              alt={product.name}
              width={600}
              height={420}
              className="rounded"
              style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'contain' }}
              priority 
            />
          </div>
          <div className="d-flex gap-2 mt-3" id="thumbs">
            {gallery.map((src, i) => (
              <div key={i} className="border rounded p-1" style={{ backgroundColor: src === mainImg ? '#0d6efd' : 'transparent' }}>
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  width={70}
                  height={70}
                  className={`rounded bg-white`}
                  style={{ objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => setMainImg(src)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-5">
          <h2 id="pName" className="mb-2">{product.name}</h2>
          <h4 className="text-primary mb-3 fs-2" id="pPrice">
            ${product.price.toLocaleString('es-CL')}
          </h4>
          <p id="pDesc" className="text-muted fs-5">{product.desc}</p>
          <div className="d-flex align-items-center gap-3 my-4">
            <label htmlFor="qty" className="form-label m-0 fw-bold">Cantidad</label>
            <div className="input-group" style={{ maxWidth: '160px' }}>
              <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <input 
                id="qty" 
                type="number" 
                className="form-control text-center" 
                value={quantity} 
                min="1"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>
          <button id="addBtn" className="btn btn-primary btn-lg w-100" onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </div>
      </div>

      <hr className="my-5" />

      <section>
        <h3 className="mb-4">Productos relacionados</h3>
        <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-4">
          {relatedProducts.map(p => (
            <div className="col" key={p.id}>
              
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}