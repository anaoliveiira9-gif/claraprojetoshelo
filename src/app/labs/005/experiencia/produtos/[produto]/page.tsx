import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/components/labs/005/products";
import { ProductDetail } from "./product-detail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ produto: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ produto: string }>;
}): Promise<Metadata> {
  const { produto } = await params;
  const product = getProductBySlug(produto);
  return { title: product ? `${product.name} — ÉTÉR` : "ÉTÉR" };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ produto: string }>;
}) {
  const { produto } = await params;
  const product = getProductBySlug(produto);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-16">
      <ProductDetail product={product} />
    </main>
  );
}
