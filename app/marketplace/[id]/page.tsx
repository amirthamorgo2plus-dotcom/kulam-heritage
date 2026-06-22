import { notFound } from "next/navigation";
import { marketMandapams, getMarketMandapam } from "@/data/mandapamMarket";
import MandapamProfile from "@/components/marketplace/MandapamProfile";

export function generateStaticParams() {
  return marketMandapams.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const m = getMarketMandapam(params.id);
  return { title: m ? `${m.name} — Kamma Nest` : "Mandapam — Kamma Nest" };
}

export default function MandapamProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const m = getMarketMandapam(params.id);
  if (!m) notFound();
  return <MandapamProfile m={m} />;
}
