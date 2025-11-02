"use client";

import { useCart } from "@/app/about/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PagoPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [validated, setValidated] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
    } else {
      alert("Pago procesado correctamente.");

      localStorage.removeItem("cart");
      router.push("/");

      window.location.reload();
    }

    setValidated(true);
  };

  return (
    <div
      className="container"
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4">Resumen de tu compra</h1>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-0">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="p-3">Producto</th>
                    <th className="text-end p-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody id="cartItems">
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="text-center text-muted p-4">
                        <p className="mb-2">No hay productos en tu carrito.</p>
                        <Link href="/main/productos" legacyBehavior>
                          <a className="btn btn-primary">Ver productos</a>
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    cart.map((item) => (
                      <tr key={item.id}>
                        <td className="p-3">
                          <div className="d-flex align-items-center">
                            <Image
                              src={item.img}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="me-3 rounded"
                              style={{
                                objectFit: "cover",
                                background: "#f8f9fa",
                              }}
                            />
                            <div>
                              <div className="fw-semibold">{item.name}</div>
                              <div className="text-muted small">
                                Cantidad: x{item.qty} · $
                                {item.price.toLocaleString("es-CL")} c/u
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-end p-3">
                          ${(item.price * item.qty).toLocaleString("es-CL")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {cart.length > 0 && (
                  <tfoot className="border-top">
                    <tr>
                      <th className="fs-5 p-3">Total</th>
                      <th id="cartTotal" className="text-end fs-5 p-3">
                        ${total.toLocaleString("es-CL")}
                      </th>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>

          {cart.length > 0 && (
            <>
              <h2 className="mt-5 mb-3">Datos de pago</h2>
              <form
                id="payForm"
                noValidate
                className={validated ? "was-validated" : ""}
                onSubmit={handleSubmit}
              >
                <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <label className="form-label">Nombre en la tarjeta</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        pattern="[a-zA-Z\s]+"
                      />
                      <div className="invalid-feedback">
                        Ingresa el nombre tal como aparece en la tarjeta.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Número de tarjeta</label>
                      <input
                        type="text"
                        className="form-control"
                        inputMode="numeric"
                        pattern="\d{16}"
                        maxLength={16}
                        required
                        placeholder="1234 5678 9012 3456"
                      />
                      <div className="invalid-feedback">
                        Ingresa un número de 16 dígitos.
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Expiración</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/AA"
                          pattern="(0[1-9]|1[0-2])\/\d{2}"
                          required
                        />
                        <div className="invalid-feedback">
                          Formato MM/AA (ej: 04/28).
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          inputMode="numeric"
                          pattern="\d{3,4}"
                          maxLength={4}
                          required
                          placeholder="123"
                        />
                        <div className="invalid-feedback">
                          CVV de 3 dígitos.
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success w-100 btn-lg"
                    >
                      Confirmar pago (${total.toLocaleString("es-CL")})
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
