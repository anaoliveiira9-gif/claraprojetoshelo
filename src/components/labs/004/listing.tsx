"use client";

import { useMemo, useState } from "react";
import { PROPERTIES, type PropertyType } from "./data";
import { MapListView } from "./map-list-view";

const TIPOS: PropertyType[] = ["Apartamento", "Casa", "Cobertura", "Terreno"];

export function ListingClient({
  initialQ,
  initialTipo,
}: {
  initialQ: string;
  initialTipo: string;
}) {
  const [q, setQ] = useState(initialQ);
  const [tipo, setTipo] = useState(initialTipo);
  const [quartosMin, setQuartosMin] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const min = precoMin ? Number(precoMin) : undefined;
    const max = precoMax ? Number(precoMax) : undefined;
    const quartos = quartosMin ? Number(quartosMin) : undefined;

    return PROPERTIES.filter((p) => {
      if (needle) {
        const haystack = `${p.bairro} ${p.cidade} ${p.titulo}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      if (tipo && p.tipo !== tipo) return false;
      if (quartos !== undefined && p.quartos < quartos) return false;
      if (min !== undefined && p.preco < min) return false;
      if (max !== undefined && p.preco > max) return false;
      return true;
    });
  }, [q, tipo, quartosMin, precoMin, precoMax]);

  function clearFilters() {
    setQ("");
    setTipo("");
    setQuartosMin("");
    setPrecoMin("");
    setPrecoMax("");
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 rounded-sm border border-[#DDD5C8] bg-[#F8F5F0] p-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-3">
        <label className="block">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">
            Cidade ou bairro
          </span>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar…"
            className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1 text-sm text-[#241E1A] placeholder:text-[#6B6157]/60 focus:border-[#2F4A3B] focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">
            Tipo
          </span>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            data-cursor-hover
            className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1 text-sm text-[#241E1A] focus:border-[#2F4A3B] focus:outline-none"
          >
            <option value="">Todos os tipos</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">
            Quartos (mín.)
          </span>
          <select
            value={quartosMin}
            onChange={(e) => setQuartosMin(e.target.value)}
            data-cursor-hover
            className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1 text-sm text-[#241E1A] focus:border-[#2F4A3B] focus:outline-none"
          >
            <option value="">Qualquer</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">
            Preço mín. (R$)
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={precoMin}
            onChange={(e) => setPrecoMin(e.target.value)}
            placeholder="0"
            className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1 text-sm text-[#241E1A] placeholder:text-[#6B6157]/60 focus:border-[#2F4A3B] focus:outline-none"
          />
        </label>

        <div className="flex items-end gap-3">
          <label className="block flex-1">
            <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">
              Preço máx. (R$)
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={precoMax}
              onChange={(e) => setPrecoMax(e.target.value)}
              placeholder="Sem limite"
              className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1 text-sm text-[#241E1A] placeholder:text-[#6B6157]/60 focus:border-[#2F4A3B] focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={clearFilters}
            data-cursor-hover
            className="shrink-0 pb-1 text-[10px] uppercase tracking-[0.16em] text-[#6B6157] underline underline-offset-4 hover:text-[#241E1A]"
          >
            Limpar
          </button>
        </div>
      </div>

      <p className="mt-6 mb-4 text-xs uppercase tracking-[0.16em] text-[#6B6157]">
        {filtered.length} {filtered.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
      </p>

      <MapListView properties={filtered} />
    </div>
  );
}
