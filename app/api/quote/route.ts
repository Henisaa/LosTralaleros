import { NextResponse } from "next/server";

type Holiday = {
  nombre: string;
  fecha: string; // YYYY-MM-DD
};

// ---------- Utils ----------

function isWeekend(dateStr: string): boolean {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  // 0 = Domingo, 6 = Sábado
  return day === 0 || day === 6;
}

// NUEVA FUNCIÓN (Reemplaza a 'addDays'): Busca inteligentemente el siguiente día hábil
function getNextBusinessDay(startDateStr: string, holidays: Holiday[]): string {
  let d = new Date(startDateStr + "T00:00:00");
  let safety = 0;
  
  while (safety < 365) {
    // Avanzamos 1 día
    d.setDate(d.getDate() + 1);
    const dateString = d.toISOString().slice(0, 10);
    const day = d.getDay();
    
    const isWknd = day === 0 || day === 6;
    const isHol = holidays.some(h => h.fecha === dateString);
    
    // Si NO es finde Y NO es feriado, ¡encontramos el día!
    if (!isWknd && !isHol) {
      return dateString;
    }
    safety++;
  }
  return startDateStr;
}

// NUEVA API (Boostr): Trae los feriados del año específico
async function fetchHolidays(year: number): Promise<Holiday[]> {
  const url = `https://api.boostr.cl/holidays/${year}.json`;
  
  try {
    const res = await fetch(url, { 
      next: { revalidate: 3600 },
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) {
      console.error(`Error consultando Boostr (${res.status})`);
      return [];
    }

    const json = await res.json();
    const listaRaw = json.data || [];

    // Mapeamos los datos de Boostr (date/title) a nuestro formato
    const holidays: Holiday[] = listaRaw.map((item: any) => ({
      fecha: item.date,
      nombre: item.title
    }));

    return holidays;

  } catch (error) {
    console.error("Error de red al consultar API:", error);
    return [];
  }
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
    
    // 1. Obtenemos feriados con la nueva API
    const holidays = await fetchHolidays(year);

    const holiday = holidays.find(h => h.fecha === shippingDate) || null;
    const weekend = isWeekend(shippingDate);

    let allowPayment = true;
    let allowExpress = true;
    let finalShippingDate = shippingDate;
    let message = "Fecha de despacho válida.";

    // 2. Usamos la lógica corregida
    if (holiday || weekend) {
      allowExpress = false;
      
      // AQUÍ USAMOS LA NUEVA FUNCIÓN (NO uses addDays)
      finalShippingDate = getNextBusinessDay(shippingDate, holidays);

      if (holiday) {
        message = `Es feriado (${holiday.nombre}). Despacho movido al ${finalShippingDate}.`;
      } else {
        message = `Es fin de semana. Despacho movido al ${finalShippingDate}.`;
      }

      if (shippingType === "express") {
        allowPayment = false;
        message += " (Envíos Express no disponibles)";
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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}