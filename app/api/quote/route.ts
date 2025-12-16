import { NextResponse } from "next/server";

type Holiday = {
  nombre: string;
  fecha: string; // YYYY-MM-DD
};

// ---------- Utils ----------
function isWeekend(dateStr: string): boolean {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  return day === 0 || day === 6;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

async function fetchHolidays(year: number): Promise<Holiday[]> {
  const url = `https://apis.digital.gob.cl/fl/feriados/${year}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Error consultando API de feriados");
  }

  return res.json();
}

// ---------- Endpoint ----------
export async function POST(req: Request) {
  try {
    const {
      shippingDate,
      shippingType = "standard",
      cartTotal = 0,
    } = await req.json();

    if (!shippingDate || !/^\d{4}-\d{2}-\d{2}$/.test(shippingDate)) {
      return NextResponse.json(
        { ok: false, error: "Fecha de despacho inválida" },
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
    let message = "Fecha de despacho válida.";

    if (holiday || weekend) {
      allowExpress = false;
      finalShippingDate = addDays(shippingDate, 1);

      message = holiday
        ? `La fecha seleccionada es feriado legal (${holiday.nombre}).`
        : "La fecha seleccionada cae en fin de semana.";

      if (shippingType === "express") {
        allowPayment = false;
      }
    }

    const shippingCost = shippingType === "express" ? 5990 : 2990;
    const totalWithShipping = cartTotal + shippingCost;

    return NextResponse.json({
      ok: true,
      holiday,
      weekend,
      allowPayment,
      allowExpress,
      finalShippingDate,
      shippingCost,
      totalWithShipping,
      message,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
