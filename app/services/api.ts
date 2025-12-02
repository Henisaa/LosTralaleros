
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Producto {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  category: string;
}

export const getProductos = async (): Promise<Producto[]> => {
  try {
    
    const res = await fetch(`${API_URL}/api/productos`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error al conectar con el backend");
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
};

export const crearOrden = async (ordenData: any) => {
  const res = await fetch(`${API_URL}/api/ordenes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ordenData),
  });
  
  if (!res.ok) throw new Error("Error al crear la orden");
  return await res.json();
};