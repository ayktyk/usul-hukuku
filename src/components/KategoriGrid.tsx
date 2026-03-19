"use client";

import Link from "next/link";
import {
  Scale,
  Handshake,
  Briefcase,
  Heart,
  ShoppingCart,
  Building2,
  Gavel,
  Landmark,
  Lightbulb,
  Shield,
  Users,
  Map,
  BookOpen,
  Globe,
  Plane,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { KategoriTanimi } from "@/data/kategoriler";

const IKON_MAP: Record<string, LucideIcon> = {
  Scale,
  Handshake,
  Briefcase,
  Heart,
  ShoppingCart,
  Building2,
  Gavel,
  Landmark,
  Lightbulb,
  Shield,
  Users,
  Map,
  BookOpen,
  Globe,
  Plane,
  FileText,
};

interface KategoriGridProps {
  kategoriler: KategoriTanimi[];
}

export function KategoriGrid({ kategoriler }: KategoriGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {kategoriler.map((kategori) => {
        const Icon = IKON_MAP[kategori.ikon] || Scale;
        return (
          <Link key={kategori.id} href={`/kategori/${kategori.id}`}>
            <Card
              className={cn(
                "h-full cursor-pointer transition-all hover:scale-[1.02]",
                kategori.bgRenk,
                kategori.borderRenk,
              )}
            >
              <CardHeader className="p-4">
                <Icon className={cn("mb-2 h-6 w-6", kategori.renk)} />
                <CardTitle className="text-sm font-semibold leading-tight">
                  {kategori.ad}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                  {kategori.aciklama}
                </CardDescription>
                <div className="pt-1 text-[11px] font-medium text-muted-foreground">
                  {kategori.toplamDavaSayisi} planlanan dava
                </div>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
