import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className}`}
    >
      <Header/>
    </main>
  );
}
