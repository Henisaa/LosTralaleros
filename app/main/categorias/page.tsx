"use client";

import { useState, useEffect } from "react";
import ProductGrid from "@/app/components/ProductGrid";
// Importamos desde el NUEVO servicio
import { getProductos, getProductosPorCategoria, Producto } from "@/app/services/productService";

export default function CategoriasPage() {
  const [categoriaActual, setCategoriaActual] = useState("Todos");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Este efecto se ejecuta cada vez que cambia 'categoriaActual'
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let data;
        if (categoriaActual === "Todos") {
          // Traemos todos
          data = await getProductos();
        } else {
          // Usamos el endpoint de búsqueda del backend
          data = await getProductosPorCategoria(categoriaActual);
        }
        setProductos(data);
      } catch (error) {
        console.error("Error filtrando productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoriaActual]);

  return (
    <>
      <section
        className="text-center"
        style={{ padding: "4rem 1rem", background: "#f8f9fa" }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "1rem" }}>
          Categorías
        </h1>
        <p className="lead fs-5" style={{ color: "#444" }}>
          Filtrar productos por categoría.
        </p>

        {/* Botones de Categoría */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          <button
            className={`btn ${
              categoriaActual === "Todos"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setCategoriaActual("Todos")}
          >
            Todos
          </button>
          <button
            className={`btn ${
              categoriaActual === "Figuras"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setCategoriaActual("Figuras")}
          >
            Figuras
          </button>
          <button
            className={`btn ${
              categoriaActual === "Peluches"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setCategoriaActual("Peluches")}
          >
            Peluches
          </button>
          <button
            className={`btn ${
              categoriaActual === "Miscelaneos"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setCategoriaActual("Miscelaneos")}
          >
            Misceláneos
          </button>
        </div>
      </section>

      {/* Grid de Productos */}
      {isLoading ? (
        <div className="text-center py-5">
          <p className="fs-4 text-muted">Cargando productos...</p>
        </div>
      ) : (
        <ProductGrid products={productos} />
      )}
    </>
  );
}