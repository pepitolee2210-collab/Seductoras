"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Star } from "lucide-react";
import { TIER_CONFIG } from "@/lib/mock-data";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  tier: "basic" | "pro" | "vip";
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
  icon: typeof Star;
}

const PLANS: Plan[] = [
  {
    tier: "basic",
    name: "Basic",
    price: "Gratis",
    period: "",
    description: "Ideal para empezar. Publica tu perfil básico sin costo.",
    icon: Star,
    cta: "Crear Perfil Gratis",
    features: [
      { text: "Hasta 5 fotos", included: true },
      { text: "1 video", included: true },
      { text: "Perfil básico", included: true },
      { text: "Aparición en búsquedas", included: true },
      { text: "Historias", included: false },
      { text: "Prioridad en resultados", included: false },
      { text: "Badge verificada", included: false },
      { text: "Estadísticas avanzadas", included: false },
    ],
  },
  {
    tier: "pro",
    name: "PRO",
    price: "$24.99",
    period: "/mes",
    description:
      "Más visibilidad y herramientas para destacar tu perfil.",
    icon: Sparkles,
    cta: "Activar PRO",
    popular: true,
    features: [
      { text: "Hasta 15 fotos", included: true },
      { text: "5 videos", included: true },
      { text: "Perfil completo", included: true },
      { text: "Aparición prioritaria", included: true },
      { text: "Badge PRO", included: true },
      { text: "Estadísticas básicas", included: true },
      { text: "Historias", included: false },
      { text: "Posición #1 en búsquedas", included: false },
    ],
  },
  {
    tier: "vip",
    name: "VIP",
    price: "$49.99",
    period: "/mes",
    description:
      "Máxima exposición. El plan premium para acompañantes top.",
    icon: Crown,
    cta: "Ser VIP",
    features: [
      { text: "Fotos ilimitadas", included: true },
      { text: "Videos ilimitados", included: true },
      { text: "Perfil premium con verificación", included: true },
      { text: "Posición #1 en búsquedas", included: true },
      { text: "Badge VIP dorada", included: true },
      { text: "Historias activas", included: true },
      { text: "Estadísticas avanzadas", included: true },
      { text: "Soporte prioritario", included: true },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

export default function PlanesPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            Elige tu <span className="text-gradient-brand">Plan</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Publica tu perfil y conecta con miles de clientes. Elige el plan
            que mejor se adapte a tus necesidades.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const isVip = plan.tier === "vip";
            const isPro = plan.tier === "pro";

            return (
              <motion.div
                key={plan.tier}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`relative overflow-hidden rounded-2xl border p-6 ${
                  isVip
                    ? "border-gold-400/50 bg-gradient-to-b from-gold-400/5 to-dark-800 glow-gold"
                    : isPro
                      ? "border-brand-500/50 bg-gradient-to-b from-brand-500/5 to-dark-800 glow-brand"
                      : "border-dark-700 bg-dark-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-bold text-white">
                    Popular
                  </div>
                )}

                <plan.icon
                  className={`mb-4 h-8 w-8 ${
                    isVip
                      ? "text-gold-400"
                      : isPro
                        ? "text-brand-400"
                        : "text-text-muted"
                  }`}
                />

                <h2 className="text-xl font-bold">{plan.name}</h2>
                <div className="mt-2 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      isVip
                        ? "text-gradient-gold"
                        : isPro
                          ? "text-gradient-brand"
                          : ""
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-text-muted">{plan.period}</span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={`flex items-center gap-2 text-sm ${
                        feature.included
                          ? "text-text-primary"
                          : "text-text-muted line-through"
                      }`}
                    >
                      <Check
                        className={`h-4 w-4 shrink-0 ${
                          feature.included
                            ? isVip
                              ? "text-gold-400"
                              : "text-brand-400"
                            : "text-dark-500"
                        }`}
                      />
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-xl px-6 py-3 font-semibold transition-all ${
                    isVip
                      ? "bg-gradient-to-r from-gold-400 to-gold-500 text-dark-900 hover:shadow-lg hover:shadow-gold-400/25"
                      : isPro
                        ? "bg-gradient-to-r from-brand-400 to-brand-600 text-white hover:shadow-lg hover:shadow-brand-500/25"
                        : "border border-dark-500 text-text-secondary hover:border-dark-400 hover:text-text-primary"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ-like section */}
        <div className="mt-16 text-center">
          <p className="text-sm text-text-muted">
            Todos los planes incluyen soporte por WhatsApp. Puedes cambiar o
            cancelar tu plan en cualquier momento. Precios en USD.
          </p>
        </div>
      </div>
    </main>
  );
}
