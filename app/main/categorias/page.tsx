"use client"; // <--- ¡Importante! Porque usaremos estado (botones)

import { useState } from "react";
import ProductGrid from "@/app/components/ProductGrid";
import { products } from "@/app/about/lib/data";
import { Product } from "@/app/about/lib/data";

export default function CategoriasPage() {
  // 1. Creamos un "estado" para guardar la categoría seleccionada
  const [categoriaActual, setCategoriaActual] = useState("Todos");

  // 2. Filtramos la lista de productos según el estado
  const productosFiltrados = products.filter((product: Product) => {
    if (categoriaActual === "Todos") {
      return true; // Si es "Todos", los mostramos todos
    }
    return product.category === categoriaActual; // Si no, filtramos
  });

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

        {/* 3. ¡Tus botones! */}
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

      {/* 4. Le pasamos solo los productos filtrados al ProductGrid */}
      <ProductGrid products={productosFiltrados} />
    </>
  );
}
