"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    alert("Sesión cerrada");
    router.push("/auth/login");
  };

  return (
    <button 
      className="btn btn-danger ms-3" 
      onClick={handleLogout}
      data-testid="logout-btn"
    >
      Cerrar sesión
    </button>
  );
}
