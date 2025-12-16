"use client";

import { useCart } from "@/app/about/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const API_TOKEN = "los-tralaleros-2025";

export default function PagoPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [validated, setValidated] = useState(false);

  // datos que afectan el pago
  const [shippingDate, setShippingDate] = useState("");
  const [shippingType, setShippingType] = useState<"standard" | "express">("standard");
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  //  Llamada protegida al backend
  const fetchQuote = async () => {
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

      const data = await res.json();

      if (!res.ok) {
        setQuote(null);
        setApiError(data.error || "No se pudo validar la fecha de despacho");
        return;
      }

      setQuote(data);
    } catch {
      setQuote(null);
      setApiError("Error de red al validar feriados");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Revalidar cuando cambia fecha o tipo de despacho
  useEffect(() => {
    if (shippingDate) fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingDate, shippingType]);

  // 🚫 Pago bloqueado si API lo indica
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!quote || !quote.allowPayment) {
      alert("No se puede procesar el pago para la fecha seleccionada.");
      return;
    }

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
    <div className="container my-4">
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
                            <Image src={item.img} alt={item.name} width={50} height={50} />
                            <div className="ms-3">
                              <div className="fw-semibold">{item.name}</div>
                              <small className="text-muted">
                                x{item.qty} · ${item.price.toLocaleString("es-CL")}
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

          {/* DESPACHO (USA API CHILENA) */}
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
                      setShippingType(e.target.value as "standard" | "express")
                    }
                  >
                    <option value="standard">Estándar</option>
                    <option value="express" disabled={quote && !quote.allowExpress}>
                      Express
                    </option>
                  </select>
                </div>

                {loading && <div className="alert alert-info">Validando feriados…</div>}

                {quote && (
                  <div className="alert alert-warning">
                    {quote.message}
                    <br />
                    <strong>Fecha final:</strong> {quote.finalShippingDate}
                  </div>
                )}

                {apiError && <div className="alert alert-danger">{apiError}</div>}
              </div>
            </div>
          )}

          {/*  FORMULARIO DE PAGO */}
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
