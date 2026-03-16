"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  CheckCircle,
  MapPin,
  Clock,
  Globe,
  Phone,
  MessageCircle,
  Camera,
  Video,
  Eye,
  Flag,
  Ruler,
  Weight,
  Palette,
  Scissors,
} from "lucide-react";
import EscortCard from "@/components/EscortCard";
import {
  MOCK_ESCORTS,
  MOCK_REVIEWS,
  TIER_CONFIG,
  type Escort,
} from "@/lib/mock-data";

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
}

const GRADIENT_MAP: Record<string, string> = {
  vip: "from-gold-400/20 to-dark-800",
  pro: "from-brand-500/20 to-dark-800",
  basic: "from-dark-700 to-dark-800",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating)
              ? "fill-gold-400 text-gold-400"
              : "text-dark-500"
          }`}
        />
      ))}
    </div>
  );
}

export default function PerfilPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const escort = MOCK_ESCORTS.find(
    (e) => e.username === username
  ) as Escort | undefined;

  const [showContact, setShowContact] = useState(false);

  if (!escort) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Perfil no encontrado</h1>
          <Link
            href="/explorar"
            className="mt-4 inline-block text-brand-400 hover:underline"
          >
            Volver a explorar
          </Link>
        </div>
      </main>
    );
  }

  const tier = TIER_CONFIG[escort.tier];
  const reviews = MOCK_REVIEWS.filter((r) => r.escortId === escort.id);
  const relatedEscorts = MOCK_ESCORTS.filter(
    (e) => e.id !== escort.id && e.city === escort.city
  ).slice(0, 3);

  return (
    <main className="min-h-screen pt-16 pb-12">
      {/* Banner */}
      <div
        className={`relative h-48 bg-gradient-to-b ${GRADIENT_MAP[escort.tier]} sm:h-64`}
      >
        <div className="noise-overlay absolute inset-0" />
        <div className="absolute top-4 left-4 z-10">
          <Link
            href="/explorar"
            className="flex items-center gap-1.5 rounded-full bg-dark-900/60 px-3 py-1.5 text-sm text-text-secondary backdrop-blur-sm transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <div className="flex-1">
            {/* Avatar + basic info */}
            <div className="-mt-16 relative z-10 mb-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div
                  className={`flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-dark-800 bg-gradient-to-br ${
                    escort.tier === "vip"
                      ? "from-gold-400 to-gold-500"
                      : escort.tier === "pro"
                        ? "from-brand-400 to-brand-600"
                        : "from-dark-600 to-dark-500"
                  } text-4xl font-bold text-white/40 font-display shadow-xl`}
                >
                  {escort.name.charAt(0)}

                  {/* Online indicator */}
                  {escort.isOnline && (
                    <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-dark-800 bg-green-400" />
                  )}
                </div>

                <div className="pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-display text-3xl font-bold">
                      {escort.name}, {escort.age}
                    </h1>
                    {escort.isVerified && (
                      <CheckCircle className="h-5 w-5 text-brand-400" />
                    )}
                    <span
                      className={`${tier.color} rounded-full px-2.5 py-0.5 text-xs font-bold`}
                    >
                      {tier.label}
                    </span>
                    {escort.isOnline && (
                      <span className="flex items-center gap-1 text-sm text-green-400">
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        En línea
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {escort.zone}, {escort.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {escort.schedule}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-text-muted">
                    <Globe className="h-3.5 w-3.5" />
                    {escort.languages.join(", ")}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mb-8 flex flex-wrap gap-4 rounded-xl border border-dark-700 bg-dark-800 p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                <span className="font-semibold">{escort.rating}</span>
                <span className="text-sm text-text-muted">
                  ({escort.reviews} reseñas)
                </span>
              </div>
              <span className="text-dark-600">|</span>
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <Camera className="h-4 w-4" />
                {escort.photosCount} fotos
              </div>
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <Video className="h-4 w-4" />
                {escort.videosCount} videos
              </div>
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <Eye className="h-4 w-4" />
                {escort.viewsCount.toLocaleString("es-CO")} visitas
              </div>
              <div className="ml-auto text-xl font-bold text-brand-400">
                {formatCOP(escort.price)}
              </div>
            </div>

            {/* Contact button */}
            <div className="mb-8">
              {showContact ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3 rounded-xl border border-dark-700 bg-dark-800 p-4 sm:flex-row"
                >
                  <a
                    href={`tel:${escort.phone}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-dark-700 px-4 py-3 font-medium text-text-primary transition-colors hover:bg-dark-600"
                  >
                    <Phone className="h-4 w-4" />
                    {escort.phone}
                  </a>
                  <a
                    href={`https://wa.me/${escort.phone.replace(/[\s+]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full rounded-xl bg-gradient-to-r from-brand-400 to-brand-600 px-6 py-3.5 font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand-500/25 sm:w-auto"
                >
                  Mostrar contacto
                </button>
              )}
            </div>

            {/* Photo gallery placeholders */}
            <section className="mb-8">
              <h2 className="mb-4 font-display text-xl font-bold">Fotos</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: Math.min(escort.photosCount, 6) }, (_, i) => (
                  <div
                    key={i}
                    className={`flex aspect-[3/4] items-center justify-center rounded-xl bg-gradient-to-br ${
                      escort.tier === "vip"
                        ? "from-gold-400/10 to-dark-700"
                        : "from-brand-500/10 to-dark-700"
                    } border border-dark-700`}
                  >
                    <Camera className="h-8 w-8 text-text-muted/30" />
                  </div>
                ))}
              </div>
            </section>

            {/* Videos */}
            {escort.videosCount > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 font-display text-xl font-bold">Videos</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {Array.from({ length: escort.videosCount }, (_, i) => (
                    <div
                      key={i}
                      className="flex aspect-video items-center justify-center rounded-xl border border-dark-700 bg-dark-700"
                    >
                      <Video className="h-8 w-8 text-text-muted/30" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Bio */}
            <section className="mb-8">
              <h2 className="mb-3 font-display text-xl font-bold">Sobre mí</h2>
              <p className="leading-relaxed text-text-secondary">{escort.bio}</p>
            </section>

            {/* Services */}
            <section className="mb-8">
              <h2 className="mb-3 font-display text-xl font-bold">Servicios</h2>
              <div className="flex flex-wrap gap-2">
                {escort.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-dark-600 bg-dark-800 px-3 py-1.5 text-sm text-text-secondary"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </section>

            {/* Physical details */}
            <section className="mb-8">
              <h2 className="mb-4 font-display text-xl font-bold">
                Detalles físicos
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-dark-700 bg-dark-800 p-3 text-center">
                  <Ruler className="mx-auto mb-1 h-5 w-5 text-brand-400" />
                  <p className="text-sm text-text-muted">Altura</p>
                  <p className="font-semibold">{escort.height} cm</p>
                </div>
                <div className="rounded-xl border border-dark-700 bg-dark-800 p-3 text-center">
                  <Weight className="mx-auto mb-1 h-5 w-5 text-brand-400" />
                  <p className="text-sm text-text-muted">Peso</p>
                  <p className="font-semibold">{escort.weight} kg</p>
                </div>
                <div className="rounded-xl border border-dark-700 bg-dark-800 p-3 text-center">
                  <Scissors className="mx-auto mb-1 h-5 w-5 text-brand-400" />
                  <p className="text-sm text-text-muted">Cabello</p>
                  <p className="font-semibold">{escort.hairColor}</p>
                </div>
                <div className="rounded-xl border border-dark-700 bg-dark-800 p-3 text-center">
                  <Palette className="mx-auto mb-1 h-5 w-5 text-brand-400" />
                  <p className="text-sm text-text-muted">Piel</p>
                  <p className="font-semibold">{escort.skinColor}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-text-muted">
                Medidas: {escort.measurements}
              </p>
            </section>

            {/* Reviews */}
            <section className="mb-8">
              <h2 className="mb-4 font-display text-xl font-bold">
                Reseñas ({reviews.length})
              </h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-xl border border-dark-700 bg-dark-800 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dark-600 text-xs font-bold text-text-secondary">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {review.author}
                            </p>
                            <p className="text-xs text-text-muted">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted">
                  Este perfil aún no tiene reseñas.
                </p>
              )}
            </section>

            {/* Report */}
            <div className="flex justify-end">
              <button className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-coral-500">
                <Flag className="h-4 w-4" />
                Reportar perfil
              </button>
            </div>
          </div>

          {/* Sidebar: related escorts */}
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-20">
              <h3 className="mb-4 font-display text-lg font-bold">
                Perfiles similares
              </h3>
              <div className="flex flex-col gap-4">
                {relatedEscorts.map((e) => (
                  <EscortCard key={e.id} escort={e} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
