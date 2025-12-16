"use client";

import { useCart } from "@/app/about/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

/* =========================
   Tipos
========================= */
type Holiday = {
  nombre: string;
  fecha: string;
};

type QuoteResponse = {
  ok: boolean;
  holiday: Holiday | null;
  weekend: boolean;
  allowPayment: boolean;
  allowExpress: boolean;
  finalShippingDate: string;
  shippingCost: number;
  totalWithShipping: number;
  message: string;
};

/* =========================
   Constantes
========================= */
const API_TOKEN = "los-tralaleros-2025";

/* =========================
   Componente
========================= */
export default function PagoPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [validated, setValidated] = useState(false);

  // Datos que afectan el pago
  const [shippingDate, setShippingDate] = useState<string>("");
  const [shippingType, setShippingType] =
    useState<"standard" | "express">("standard");
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* =========================
     Llamada protegida al backend
  ========================= */
  const fetchQuote = useCallback(async () => {
    if (!shippingDate) return;

    setLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          shippingDate,
          shippingType,
          cartTotal: total,
        }),
      });

      const data: QuoteResponse = await res.json();

      if (!res.ok) {
        setQuote(null);
        setApiError(data.message || "No se pudo validar la fecha de despacho");
        return;
      }

      setQuote(data);
    } catch {
      setQuote(null);
      setApiError("Error de red al validar feriados");
    } finally {
      setLoading(false);
    }
  }, [shippingDate, shippingType, total]);

  /* =========================
     Revalidar al cambiar fecha o tipo
  ========================= */
  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  /* =========================
     Submit de pago
  ========================= */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!quote || !quote.allowPayment) {
      alert("No se puede procesar el pago para la fecha seleccionada.");
      return;
    }

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    alert("Pago procesado correctamente.");
    localStorage.removeItem("cart");
    router.push("/");
    window.location.reload();
  };

  /* =========================
     Render
  ========================= */
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4">Resumen de tu compra</h1>

          {/* Carrito */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-0">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="p-3">Producto</th>
                    <th className="text-end p-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="text-center p-4">
                        <Link href="/main/productos" className="btn btn-primary">
                          Ver productos
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
                            />
                            <div>
                              <div className="fw-semibold">{item.name}</div>
                              <small className="text-muted">
                                x{item.qty} · $
                                {item.price.toLocaleString("es-CL")}
                              </small>
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
                  <tfoot>
                    <tr>
                      <th className="fs-5 p-3">Total</th>
                      <th className="text-end fs-5 p-3">
                        ${total.toLocaleString("es-CL")}
                      </th>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>

          {/* Despacho */}
          {cart.length > 0 && (
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="mb-3">Despacho</h5>

                <div className="mb-3">
                  <label className="form-label">Fecha de despacho</label>
                  <input
                    type="date"
                    className="form-control"
                    value={shippingDate}
                    onChange={(e) => setShippingDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo de despacho</label>
                  <select
                    className="form-select"
                    value={shippingType}
                    onChange={(e) =>
                      setShippingType(
                        e.target.value as "standard" | "express"
                      )
                    }
                  >
                    <option value="standard">Estándar</option>
                   <option
  value="express"
  disabled={quote ? !quote.allowExpress : true}
>

                    </option>
                  </select>
                </div>

                {loading && (
                  <div className="alert alert-info">
                    Validando feriados…
                  </div>
                )}

                {quote && (
                  <div className="alert alert-warning">
                    {quote.message}
                    <br />
                    <strong>Fecha final:</strong>{" "}
                    {quote.finalShippingDate}
                  </div>
                )}

                {apiError && (
                  <div className="alert alert-danger">{apiError}</div>
                )}
              </div>
            </div>
          )}

          {/* Pago */}
          {cart.length > 0 && (
            <form
              noValidate
              className={validated ? "was-validated" : ""}
              onSubmit={handleSubmit}
            >
              <button
                type="submit"
                className="btn btn-success w-100 btn-lg"
                disabled={!quote?.allowPayment}
              >
                Confirmar pago (${total.toLocaleString("es-CL")})
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
