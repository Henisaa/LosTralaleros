

// Usamos la nueva variable de entorno para Spring Boot
const API_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;

export interface Producto {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
  desc: string;      // Tu backend Java envía 'desc'
  images?: string[]; // Lista de imágenes extra (si las hay)
}

// 1. Obtener todos los productos
export const getProductos = async (): Promise<Producto[]> => {
  try {
    const res = await fetch(`${API_URL}/api/productos`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
  } catch (error) {
    console.error("Error en getProductos:", error);
    return [];
  }
};

// 2. Obtener un producto por ID
export const getProductoById = async (id: string | number): Promise<Producto | null> => {
  try {
    const res = await fetch(`${API_URL}/api/productos/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error en getProductoById:", error);
    return null;
  }
};

// 3. Buscar productos por categoría (Usa tu endpoint /search)
export const getProductosPorCategoria = async (category: string): Promise<Producto[]> => {
  try {
    const res = await fetch(`${API_URL}/api/productos/search?category=${category}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error al filtrar productos");
    return await res.json();
  } catch (error) {
    console.error("Error en getProductosPorCategoria:", error);
    return [];
  }
};