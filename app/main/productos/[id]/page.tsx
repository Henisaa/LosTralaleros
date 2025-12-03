"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Importamos el nuevo servicio y tipos
import { getProductoById, getProductos, Producto } from "@/app/services/productService";
import { useCart } from "@/app/about/context/CartContext";
import ProductCard from "@/app/components/ProductCard";

export default function ProductoDetalle() {
  const params = useParams();
  const id = params.id as string;
  
  const { addToCart } = useCart();
  
  // Estados para manejar la carga asíncrona
  const [product, setProduct] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Producto[]>([]);
  
  // Estados de la interfaz
  const [mainImg, setMainImg] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Buscamos el producto actual en la API
        const data = await getProductoById(id);
        
        if (data) {
          setProduct(data);
          setMainImg(data.img);
          
          // 2. Cargamos "relacionados" (Traemos todos y sacamos 4 al azar o los primeros 4 que no sean este)
          const allProducts = await getProductos();
          const related = allProducts
            .filter((p) => String(p.id) !== String(data.id))
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Si está cargando, mostramos spinner o texto
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p className="fs-4">Cargando detalles...</p>
      </div>
    );
  }

  // Si terminó de cargar y no hay producto, 404
  if (!product) {
    return notFound();
  }

  // Si hay imágenes extra las usamos, si no, usamos la principal
  const gallery = product.images && product.images.length > 0 ? product.images : [product.img];

  const handleAddToCart = () => {
    // Convertimos al tipo que espera el carrito (si hay discrepancia de tipos 'any' ayuda temporalmente)
    addToCart(product as any, quantity);
    alert(`${quantity} ${product.name}(s) añadido(s) al carrito!`);
  };

  return (
    <main className="container py-4 mt-4">
      {/* Breadcrumb de navegación */}
      <nav className="small mb-3" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/" legacyBehavior>
              <a className="text-decoration-none">Inicio</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/main/productos" legacyBehavior>
              <a className="text-decoration-none">Productos</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Columna Izquierda: Imágenes */}
        <div className="col-lg-7">
          <div
            className="border rounded shadow-sm p-3"
            style={{ background: "#f8f9fa" }}
          >
            <Image
              src={mainImg || "/placeholder.png"}
              alt={product.name}
              width={600}
              height={420}
              className="rounded"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "420px",
                objectFit: "contain",
              }}
              priority
            />
          </div>
          {/* Galería de miniaturas */}
          <div className="d-flex gap-2 mt-3" id="thumbs">
            {gallery.map((src, i) => (
              <div
                key={i}
                className="border rounded p-1"
                style={{
                  backgroundColor: src === mainImg ? "#0d6efd" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setMainImg(src)}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  width={70}
                  height={70}
                  className={`rounded bg-white`}
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Detalles y Compra */}
        <div className="col-lg-5">
          <h2 id="pName" className="mb-2">
            {product.name}
          </h2>
          <h4 className="text-primary mb-3 fs-2" id="pPrice">
            ${product.price.toLocaleString("es-CL")}
          </h4>
          
          {/* Aquí se muestra la descripción que viene de la BD */}
          <p id="pDesc" className="text-muted fs-5">
            {product.desc}
          </p>

          {/* Selector de Cantidad */}
          <div className="d-flex align-items-center gap-3 my-4">
            <label htmlFor="qty" className="form-label m-0 fw-bold">
              Cantidad
            </label>
            <div className="input-group" style={{ maxWidth: "160px" }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <input
                id="qty"
                type="number"
                className="form-control text-center"
                value={quantity}
                min="1"
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            id="addBtn"
            className="btn btn-primary btn-lg w-100"
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
        </div>
      </div>

      <hr className="my-5" />

      {/* Sección de Productos Relacionados */}
      <section>
        <h3 className="mb-4">Productos relacionados</h3>
        <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-4">
          {relatedProducts.map((p) => (
            <div className="col" key={p.id}>
              <ProductCard product={p as any} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}