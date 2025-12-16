"use client";

import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { getProductos, Producto } from "@/app/services/api";
import ProductCard from "@/app/components/ProductCard";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const data = await getProductos();
        setFeaturedProducts(data.slice(0, 9));
      } catch (error) {
        console.error("Error al cargar productos destacados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetProducts();
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="text-center"
        style={{
          padding: "4rem 1rem",
          background: "linear-gradient(135deg, #eaf1ff, #fff)",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "1rem" }}>
          Bienvenido a Los Tralaleros
        </h1>
        <p className="lead fs-5" style={{ color: "#444" }}>
          La más alta calidad en merchandising de videojuegos
        </p>
      </section>

      {/* CAROUSEL */}
      <Carousel fade style={{ maxWidth: "100%", margin: "0 auto" }}>
        <Carousel.Item style={{ height: "400px" }}>
          <Image
            src="/SilksongLogo.jpg"
            fill
            style={{ objectFit: "cover" }}
            alt="Hornet"
            priority
          />
          <Carousel.Caption
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h5>Nueva Merch de Silksong</h5>
            <p>
              Debido al lanzamiento de Hollow Knight: Silksong, hemos lanzado
              nueva merch.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "400px" }}>
          <Image
            src="/DoomDarkAges.png"
            fill
            style={{ objectFit: "cover" }}
            alt="Doomslayer"
          />
          <Carousel.Caption
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h5>Nueva Merch de Doom</h5>
            <p>
              Con el nuevo lanzamiento de Doom The Dark Ages, lanzamos nueva
              merch.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "400px" }}>
          <Image
            src="/TheBattleCatsLogo.png"
            fill
            style={{ objectFit: "cover" }}
            alt="Battlecats"
          />
          <Carousel.Caption
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h5>Merch de Battlecats</h5>
            <p>
              Colaboración oficial con The Battle Cats, ¡nueva merch ya
              disponible!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* PRODUCTOS DESTACADOS */}
      <section className="container py-5">
        <h2 className="text-center mt-4 mb-4">Productos Destacados</h2>

        {isLoading ? (
          <div className="text-center py-5">
            <p>Cargando productos destacados...</p>
          </div>
        ) : (
          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            {featuredProducts.map((product) => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}

            {featuredProducts.length === 0 && (
              <div className="col-12 text-center">
                <p>No hay productos destacados disponibles en este momento.</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-5 mb-4">
          <Link href="/main/productos" className="btn btn-primary btn-lg">
            Ver todo el catálogo
          </Link>
        </div>
      </section>
    </>
  );
}
