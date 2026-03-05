"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuthSuccess() {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    }
  }, []);

  return <p>Logging you in...</p>;
}