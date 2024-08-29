// app/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./styles/app.scss";

export default function Home() {
  const router = useRouter();
  const handleRedirect = async () => {
    const token = await localStorage.getItem('token');
    if(token) {
      // User is authenticated, proceed to the dashboard
      router.push('/dashboard');
    } else {
    router.push('/login');
    }
  }
  useEffect(() => {
    handleRedirect();
  }, []);
  
  return null; // Or some placeholder content
}
