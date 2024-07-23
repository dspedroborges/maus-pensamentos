import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BsGithub, BsGraphDown, BsHouse, BsNewspaper } from "react-icons/bs";
import { PiFilePdfLight } from "react-icons/pi";
import { BiBrain } from "react-icons/bi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maus pensamentos",
  description: "Calcule a sua pontuação de pensamentos disfuncionais semanalmente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <nav className="py-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 bg-blue-800">
          <h1 className="text-white font-bold text-2xl w-full text-center flex items-center gap-2 justify-center"><BiBrain/> Maus pensamentos</h1>
          <ul className="flex justify-around items-center font-bold text-white w-full">
            <Link href="/"><li className="hover:underline flex items-center gap-2"><BsHouse/> Início</li></Link>
            <Link href="/historico"><li className="hover:underline flex items-center gap-2"><BsGraphDown/> Histórico</li></Link>
            <Link href="/pensamentos-disfuncionais.pdf" target="_blank"><li className="hover:underline flex items-center gap-2"><PiFilePdfLight/> Fonte</li></Link>
          </ul>
        </nav>
        {children}
        <footer className="flex items-center justify-center bg-blue-800 py-16">
          <Link href="https://github.com/dspedroborges" target="_blank" className="hover:underline text-white flex items-center gap-2"><BsGithub/> dspedroborges</Link>
        </footer>
      </body>
    </html>
  );
}
