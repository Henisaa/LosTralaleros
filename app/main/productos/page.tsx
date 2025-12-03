"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/app/components/ProductGrid";
// Importamos desde el NUEVO servicio
import { getProductos, Producto } from "@/app/services/productService";

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetProducts();
  }, []);

  return (
    <>
      <section
        className="text-center"
        style={{ padding: "4rem 1rem", background: "#f8f9fa" }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "1rem" }}>
          Nuestro Catálogo
        </h1>
        <p className="lead fs-5" style={{ color: "#444" }}>
          Aquí puedes comprar todos nuestros productos.
        </p>
      </section>

      {/* Renderizado condicional: Cargando o Grid */}
      {loading ? (
        <div className="text-center py-5">
          <p className="fs-4 text-muted">Cargando catálogo...</p>
        </div>
      ) : (
        <ProductGrid products={productos} />
      )}
    </>
  );
}