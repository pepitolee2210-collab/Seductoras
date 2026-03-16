"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, MapPin, Sparkles } from "lucide-react";
import EscortCard from "@/components/EscortCard";
import { MOCK_ESCORTS, FILTER_CITIES } from "@/lib/mock-data";

const vipEscorts = MOCK_ESCORTS.filter((e) => e.tier === "vip");
const proEscorts = MOCK_ESCORTS.filter((e) => e.tier === "pro");
const basicEscorts = MOCK_ESCORTS.filter((e) => e.tier === "basic");

const STATS = [
  { value: "+500", label: "Perfiles activos", icon: Users },
  { value: "100%", label: "Verificadas", icon: Shield },
  { value: "Medellín y más", label: "Ciudades principales", icon: MapPin },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 pt-16">
        <div className="noise-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-600/10 via-transparent to-dark-900" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Las Acompañantes Más{" "}
            <span className="text-gradient-brand">Exclusivas</span> de Colombia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary sm:text-xl"
          >
            Perfiles verificados, reseñas reales y la experiencia más premium.
            Encuentra tu acompañante ideal en segundos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/explorar"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-400 to-brand-600 px-8 py-3.5 font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand-500/25"
            >
              Explorar Ahora
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/planes"
              className="inline-flex items-center gap-2 rounded-xl border border-dark-500 px-8 py-3.5 font-semibold text-text-secondary transition-colors hover:border-brand-500/50 hover:text-text-primary"
            >
              Publicar Perfil
            </Link>
          </motion.div>

          {/* City pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {FILTER_CITIES.map((city) => (
              <Link
                key={city}
                href={`/explorar?city=${city}`}
                className="rounded-full border border-dark-600 bg-dark-800/50 px-4 py-1.5 text-sm text-text-muted transition-colors hover:border-brand-500/50 hover:text-brand-400"
              >
                {city}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VIP Section ── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-gold-400" />
          <h2 className="font-display text-3xl font-bold">
            Perfiles <span className="text-gradient-gold">VIP</span>
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vipEscorts.map((escort, i) => (
            <motion.div
              key={escort.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
            >
              <EscortCard escort={escort} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRO Section ── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold">
            Perfiles <span className="text-gradient-brand">PRO</span>
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proEscorts.map((escort, i) => (
            <motion.div
              key={escort.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
            >
              <EscortCard escort={escort} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Basic Section ── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold">
            Más Acompañantes
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {basicEscorts.map((escort, i) => (
            <motion.div
              key={escort.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
            >
              <EscortCard escort={escort} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA: Publish Profile ── */}
      <section className="px-4 py-20">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-dark-600 bg-dark-800 p-8 text-center sm:p-12">
          <div className="noise-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              ¿Eres <span className="text-gradient-brand">acompañante</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              Publica tu perfil y llega a miles de clientes potenciales.
              Verificación rápida, total control de tu perfil y máxima
              visibilidad.
            </p>
            <Link
              href="/planes"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-400 to-brand-600 px-8 py-3.5 font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand-500/25"
            >
              Ver Planes y Precios
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="rounded-2xl border border-dark-700 bg-dark-800 p-6 text-center"
            >
              <stat.icon className="mx-auto mb-3 h-8 w-8 text-brand-400" />
              <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
