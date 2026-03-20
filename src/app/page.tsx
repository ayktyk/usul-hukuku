import { AnaSayfaArama } from "@/components/AnaSayfaArama";
import { tumDavalar } from "@/data";
import { KATEGORILER } from "@/data/kategoriler";

export default function AnaSayfa() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <AnaSayfaArama
        kategoriler={KATEGORILER}
        toplamDavaSayisi={tumDavalar.length}
      />
    </main>
  );
}
