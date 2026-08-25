"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "./favorites-context";
import { serif } from "./theme";

export function VerticeChrome({ children }: { children: React.ReactNode }) {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-[#EFEAE3] text-[#241E1A]">
      <header className="sticky top-0 z-40 border-b border-[#DDD5C8] bg-[#EFEAE3]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/labs/005/experiencia"
            data-cursor-hover
            className={`${serif} text-xl tracking-tight text-[#241E1A]`}
          >
            Vértice
          </Link>
          <nav className="flex items-center gap-5 text-xs uppercase tracking-[0.16em] text-[#7A6F63] sm:gap-7">
            <Link href="/labs/005/experiencia" data-cursor-hover className="hover:text-[#241E1A]">
              Início
            </Link>
            <Link
              href="/labs/005/experiencia/imoveis"
              data-cursor-hover
              className="hover:text-[#241E1A]"
            >
              Imóveis
            </Link>
            <Link
              href="/labs/005/experiencia/favoritos"
              data-cursor-hover
              className="flex items-center gap-1.5 hover:text-[#241E1A]"
            >
              <Heart
                className={favorites.length > 0 ? "h-4 w-4 fill-[#2F4A3B] text-[#2F4A3B]" : "h-4 w-4"}
              />
              <span>{favorites.length}</span>
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[#DDD5C8] px-5 py-8 text-center text-[10px] uppercase tracking-[0.2em] text-[#7A6F63] sm:px-8">
        Vértice — projeto conceitual de portfólio criado pela ALUMNA
      </footer>
    </div>
  );
}
