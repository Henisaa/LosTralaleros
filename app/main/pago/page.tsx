"use client";

import { useCart } from "@/app/about/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, FormEvent } from "react";
import Image from "next/image";

type QuoteResponse = {
  ok: boolean;
  holiday: { nombre: string; fecha: string } | null;
  weekend: boolean;
  allowPayment: boolean;
  allowExpress: boolean;
  finalShippingDate: string;
  shippingCost: number;
  totalWithShipping: number;
  message: string;
};

export default function PagoPage() {
  const { cart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [shippingDate, setShippingDate] = useState("");
  const [shippingType, setShippingType] = useState<"standard" | "express">("standard");
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        setError(data.message || "No se pudo validar la fecha de despacho");
        return;
      }

      setQuote(data);
    } catch {
      setQuote(null);
      setError("Error de red al validar feriados");
    } finally {
      setLoading(false);
    }
  }, [shippingDate, shippingType, total]);

  useEffect(() => {
    if (shippingDate) {
      fetchQuote();
    }
  }, [shippingDate, fetchQuote]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!quote || !quote.allowPayment) {
      alert("No se puede procesar el pago para la fecha seleccionada.");
      return;
    }

    alert("Pago procesado correctamente.");
    localStorage.removeItem("cart");
    router.push("/");
    window.location.reload();
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Resumen de tu compra</h1>

      {/* CARRITO */}
      <div className="card mb-4">
        <div className="card-body p-0">
          <table className="table mb-0">
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td className="p-3">
                    <div className="d-flex align-items-center">
                      <Image src={item.img} alt={item.name} width={50} height={50} />
                      <div className="ms-3">
                        <div className="fw-semibold">{item.name}</div>
                        <small>
                          x{item.qty} · ${item.price.toLocaleString("es-CL")}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="text-end p-3">
                    ${(item.price * item.qty).toLocaleString("es-CL")}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th className="p-3">Total</th>
                <th className="text-end p-3">${total.toLocaleString("es-CL")}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* DESPACHO */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Despacho</h5>

          <input
            type="date"
            className="form-control mb-3"
            value={shippingDate}
            onChange={e => setShippingDate(e.target.value)}
          />

          <select
            className="form-select mb-3"
            value={shippingType}
            onChange={e =>
              setShippingType(e.target.value as "standard" | "express")
            }
          >
            <option value="standard">Estándar</option>
            <option
              value="express"
              disabled={quote ? !quote.allowExpress : true}
            >
              Express
            </option>
          </select>

          {loading && <div className="alert alert-info">Validando feriados…</div>}
          {quote && <div className="alert alert-warning">{quote.message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>

      {/* PAGO */}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="btn btn-success w-100 btn-lg"
          disabled={!quote?.allowPayment}
        >
          Confirmar pago
        </button>
      </form>
    </div>
  );
}
