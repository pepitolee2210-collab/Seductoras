"use client";

import Link from "next/link";
import { Star, CheckCircle, MapPin } from "lucide-react";
import { TIER_CONFIG, type Escort } from "@/lib/mock-data";

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const GRADIENT_MAP: Record<string, string> = {
  vip: "from-gold-400 to-gold-500",
  pro: "from-brand-400 to-brand-600",
  basic: "from-dark-600 to-dark-500",
};

export default function EscortCard({ escort }: { escort: Escort }) {
  const tier = TIER_CONFIG[escort.tier];
  const gradientBg = GRADIENT_MAP[escort.tier] ?? GRADIENT_MAP.basic;

  return (
    <Link href={`/perfil/${escort.username}`} className="block">
      <div className="card-hover group relative overflow-hidden rounded-2xl border border-dark-700 bg-dark-800">
        {/* Photo placeholder */}
        <div
          className={`relative flex h-64 items-center justify-center bg-gradient-to-br ${gradientBg} sm:h-72`}
        >
          <span className="text-5xl font-bold text-white/30 font-display">
            {escort.name.charAt(0)}
          </span>

          {/* Online indicator */}
          {escort.isOnline && (
            <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-dark-900/70 px-2.5 py-1 text-xs font-medium text-green-400 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              En línea
            </span>
          )}

          {/* Tier badge */}
          <span
            className={`${tier.color} absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-bold`}
          >
            {tier.label}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-400 transition-colors">
              {escort.name}, {escort.age}
            </h3>
            {escort.isVerified && (
              <CheckCircle className="h-4 w-4 text-brand-400" />
            )}
          </div>

          <div className="mb-3 flex items-center gap-1 text-sm text-text-muted">
            <MapPin className="h-3.5 w-3.5" />
            {escort.zone}, {escort.city}
          </div>

          <div className="flex items-center justify-between">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
              <span className="text-sm font-medium text-text-primary">
                {escort.rating}
              </span>
              <span className="text-xs text-text-muted">
                ({escort.reviews})
              </span>
            </div>

            {/* Price */}
            <span className="text-sm font-semibold text-brand-400">
              {formatCOP(escort.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
