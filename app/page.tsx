"use client";

import { products } from "@/app/about/lib/data";
import ProductCard from "@/app/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const carousel = document.getElementById("carouselExampleFade");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (carousel && (window as any).bootstrap) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).bootstrap.Carousel(carousel);
      }
    }
  }, []);

  const featuredProducts = products.slice(0, 9);

  return (
    <>
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
          La más alta calidad en merchandasing de videojuegos
        </p>
      </section>

      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        <div
          className="carousel-inner"
          style={{ height: "400px", backgroundColor: "#333" }}
        >
          <div className="carousel-item active">
            <Image
              src="/SilksongLogo.jpg"
              fill
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              alt="Hornet"
              priority={true}
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h5>Nueva Merch de Silksong</h5>
              <p>
                Debido al lanzamiento de Hollow Knight: Silksong, hemos lanzado
                nueva Merch.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <Image
              src="/DoomDarkAges.png"
              fill
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              alt="DoomDarkAges"
              priority={true}
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h5>Nueva Merch de Doom</h5>
              <p>
                Con el nuevo lanzamiento de Doom The Dark Ages, lanzamos nueva
                merch.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <Image
              src="/TheBattleCatsLogo.png"
              fill
              style={{ objectFit: "cover" }}
              className="d-block w-100"
              alt="BattleCats"
              priority={true}
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h5>Merch de Battlecats</h5>
              <p>
                Colaboración oficial con The Battle Cats, ¡nueva merch ya
                disponible!
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <section className="container py-5">
        <h2 className="text-center mt-4 mb-4">Productos Destacados</h2>
        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {featuredProducts.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center mt-5 mb-4">
          <Link href="/main/productos" legacyBehavior>
            <a className="btn btn-primary btn-lg">Ver todo el catálogo</a>
          </Link>
        </div>
      </section>
    </>
  );
}
