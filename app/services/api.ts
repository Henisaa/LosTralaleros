const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Producto {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  category: string;
}


export interface OrdenData {
  customerEmail: string;
  shippingAddress: string;
  totalAmount: number;
  items: {
    productoId: number;
    quantity: number;
    priceAtPurchase: number;
    productName?: string; 
  }[];
  pago: {
    paymentMethod: string;
    status: string;
  };
}

export const getProductos = async (): Promise<Producto[]> => {
  try {
    const res = await fetch(`${API_URL}/api/productos`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Fallo al obtener productos");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const crearOrden = async (ordenData: OrdenData) => {
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