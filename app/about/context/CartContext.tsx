"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: { id: number; name: string; price: number; img: string },
    qty?: number
  ) => void;
  changeQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error al cargar el carrito de localStorage", error);
      localStorage.removeItem("cart"); // Limpiar si está corrupto
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0 || localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (
    product: { id: number; name: string; price: number; img: string },
    qty: number = 1
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        return [...prevCart, { ...product, qty }];
      }
    });
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const value = {
    cart,
    addToCart,
    changeQty,
    removeItem,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const CartDropdown = () => {
  const { cart, changeQty, removeItem, cartCount } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="dropdown">
      <a
        href="#"
        className="btn btn-outline-dark position-relative dropdown-toggle"
        id="cartDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-cart fs-5"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartCount}
          <span className="visually-hidden">items en el carrito</span>
        </span>
      </a>
      <ul
        className="dropdown-menu dropdown-menu-end p-3"
        aria-labelledby="cartDropdown"
        style={{ minWidth: "350px" }}
      >
        {cart.length === 0 ? (
          <li>
            <p className="text-center text-muted mb-0">El carrito está vacío</p>
          </li>
        ) : (
          <>
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex align-items-center p-2"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="me-2 rounded"
                  style={{ objectFit: "cover", background: "#f8f9fa" }}
                />
                <div className="flex-grow-1" style={{ minWidth: 0 }}>
                  <div className="fw-semibold small text-truncate">
                    {item.name}
                  </div>
                  <div className="small text-muted">
                    x{item.qty} · ${item.price.toLocaleString("es-CL")}
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="btn-group btn-group-sm ms-2" role="group">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => changeQty(item.id, -1)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => changeQty(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    title="Eliminar"
                    onClick={() => removeItem(item.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li className="d-flex justify-content-between align-items-center fw-bold px-2">
              <span>Total:</span>
              <span>${total.toLocaleString("es-CL")}</span>
            </li>
            <li className="mt-3 text-center">
              <Link href="/main/pago" className="btn btn-success w-100">
                Pagar todo
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
