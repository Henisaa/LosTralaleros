export const runtime = "nodejs";

import { NextResponse } from "next/server";

type Holiday = {
  nombre: string;
  fecha: string;
};

const INTERNAL_TOKEN = process.env.CHECKOUT_API_TOKEN;

// Utils
function isWeekend(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  return day === 0 || day === 6;
}

function addDays(dateStr: string, days: number) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

async function fetchHolidays(year: number): Promise<Holiday[]> {
  const url = `https://apis.digital.gob.cl/fl/feriados/${year}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error consultando feriados");
  }
  return res.json();
}

export async function POST(req: Request) {
  // 🔐 Seguridad
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${INTERNAL_TOKEN}`) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    const { shippingDate, shippingType = "standard", cartTotal = 0 } = await req.json();

    if (!shippingDate || !/^\d{4}-\d{2}-\d{2}$/.test(shippingDate)) {
      return NextResponse.json(
        { ok: false, error: "Fecha inválida" },
        { status: 400 }
      );
    }

    const year = Number(shippingDate.substring(0, 4));
    const holidays = await fetchHolidays(year);

    const holiday = holidays.find(h => h.fecha === shippingDate) || null;
    const weekend = isWeekend(shippingDate);

    let allowPayment = true;
    let allowExpress = true;
    let finalShippingDate = shippingDate;
    let message = "Fecha válida.";

    if (holiday || weekend) {
      allowExpress = false;
      finalShippingDate = addDays(shippingDate, 1);
      message = holiday
        ? `Feriado legal: ${holiday.nombre}`
        : "Fin de semana";

      if (shippingType === "express") {
        allowPayment = false;
      }
    }

    const shippingCost = shippingType === "express" ? 5990 : 2990;

    return NextResponse.json({
      ok: true,
      holiday,
      weekend,
      allowPayment,
      allowExpress,
      finalShippingDate,
      shippingCost,
      totalWithShipping: cartTotal + shippingCost,
      message
    });

  } catch {
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
