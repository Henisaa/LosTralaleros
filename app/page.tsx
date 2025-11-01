"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "./components/LogoutButton";

export default function Home() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const logged = sessionStorage.getItem("loggedIn");
    const user = sessionStorage.getItem("user");

    if (logged !== "true" || !user) {
      router.push("/auth/login");
      return;
    }

    const parsed = JSON.parse(user);
    setUserEmail(parsed.email);
  }, [router]);

  return (
    <div className="container text-center mt-5 pt-5">
      <h1 className="titulo">Bienvenido 👋</h1>

      <p className="mt-3">
        Sesión iniciada como: <strong>{userEmail}</strong>
      </p>

      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
