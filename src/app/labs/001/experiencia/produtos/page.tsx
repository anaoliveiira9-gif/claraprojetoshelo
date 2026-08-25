import type { Metadata } from "next";
import type { ProductCategory } from "@/components/labs/001/products";
import { Catalog } from "./catalog";

export const metadata: Metadata = {
  title: "Catálogo — ÉTÉR",
};

const VALID: (ProductCategory | "Todos")[] = [
  "Todos",
  "Perfumes",
  "Ambiente",
  "Corpo",
];

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categoria =
    typeof params.categoria === "string" ? params.categoria : "Todos";
  const initialCategory = (VALID as string[]).includes(categoria)
    ? (categoria as ProductCategory | "Todos")
    : "Todos";

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-16">
      <h1 className="font-eter-serif text-3xl sm:text-4xl">Catálogo</h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#171512]/60">
        Perfumes, objetos de ambiente e cuidados para o corpo — todos
        compostos a partir das mesmas famílias olfativas.
      </p>
      <div className="mt-10">
        <Catalog initialCategory={initialCategory} />
      </div>
    </main>
  );
}
