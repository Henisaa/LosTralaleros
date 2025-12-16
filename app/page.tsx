"use client";

import { useCart } from "@/app/about/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";

const API_TOKEN = "los-tralaleros-2025";

export default function PagoPage() {
  const { cart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [shippingDate, setShippingDate] = useState("");
  const [shippingType, setShippingType] = useState("standard");
  const [quote, setQuote] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({ shippingDate, shippingType, cartTotal: total })
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setQuote(null);
      return;
    }
    setQuote(data);
  };

  useEffect(() => {
    if (shippingDate) fetchQuote();
  }, [shippingDate, shippingType]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!quote?.allowPayment) {
      alert("Pago bloqueado por feriado.");
      return;
    }
    alert("Pago procesado");
    localStorage.removeItem("cart");
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" onChange={e => setShippingDate(e.target.value)} />
      <select onChange={e => setShippingType(e.target.value)}>
        <option value="standard">Estándar</option>
        <option value="express" disabled={quote && !quote.allowExpress}>
          Express
        </option>
      </select>

      {quote && <p>{quote.message}</p>}
      {error && <p>{error}</p>}

      <button disabled={!quote?.allowPayment}>
        Confirmar pago (${total})
      </button>
    </form>
  );
}
