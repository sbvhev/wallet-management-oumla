"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUUID = localStorage.getItem("reference");
    if (localStorage.getItem("reference")) {
      router.push("/walletManagement");
    }
  }, []);

  return (
    <div className="flex h-screen w-screen bg-proBack justify-center">
      <div className="flex flex-col max-w-[1400px]">
        <div className="flex flex-row justify-between items-center h-heightHead w-full">
          <div className="flex items-center">
            <Image
              className="h-[45px] max-w-full"
              src="/images/dashboard-logo.png"
              width="50"
              height="100"
              alt="logo"
            />
            <div className="text-2xl font-bold text-proText ml-3">
              Wallet Management
            </div>
          </div>
          <div className="flex items-center" />
        </div>
      </div>
    </div>
  );
}
