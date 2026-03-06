"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function OAuthSuccessContent() {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    }
  }, [params]);

  return <p>Logging you in...</p>;
}

export default function OAuthSuccess() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <OAuthSuccessContent />
    </Suspense>
  );
}