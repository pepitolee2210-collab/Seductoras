"use client";

import Link from "next/link";
import {
  Eye,
  MousePointerClick,
  Star,
  Crown,
  ImagePlus,
  UserPen,
  ArrowUpCircle,
  BarChart3,
  ChevronRight,
  Sparkles,
  Home,
} from "lucide-react";

const STATS = [
  { label: "Vistas este mes", value: "5,670", icon: Eye, color: "text-brand-400", bg: "bg-brand-500/10" },
  { label: "Clics en contacto", value: "234", icon: MousePointerClick, color: "text-coral-500", bg: "bg-coral-500/10" },
  { label: "Calificación", value: "4.9", icon: Star, color: "text-gold-500", bg: "bg-gold-500/10" },
  { label: "Tier actual", value: "PRO", icon: Crown, color: "text-brand-400", bg: "bg-brand-500/10" },
] as const;

const QUICK_ACTIONS = [
  { label: "Agregar Foto", href: "/panel/fotos", icon: ImagePlus, color: "text-brand-400" },
  { label: "Editar Perfil", href: "/panel/perfil", icon: UserPen, color: "text-coral-500" },
  { label: "Subir de Plan", href: "#upgrade", icon: ArrowUpCircle, color: "text-gold-500" },
] as const;

const CHART_BARS = [
  { day: "Lun", height: 40 },
  { day: "Mar", height: 65 },
  { day: "Mié", height: 50 },
  { day: "Jue", height: 80 },
  { day: "Vie", height: 95 },
  { day: "Sáb", height: 70 },
  { day: "Dom", height: 55 },
];

export default function PanelDashboardPage() {
  const currentTier: string = "pro";

  return (
    <main className="min-h-screen bg-dark-900 pt-20 sm:pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-secondary">Mi Panel</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand">
              Mi Panel
            </h1>
            <p className="text-text-secondary mt-1">
              Bienvenida, Sofía. Aquí está tu resumen.
            </p>
          </div>
          <span className="badge-pro inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold w-fit">
            <Crown className="w-4 h-4" />
            PRO
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5 card-hover"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg} mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-secondary mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5 flex items-center gap-4 hover:border-brand-500/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center group-hover:bg-brand-500/10 transition-colors">
                <action.icon className={`w-6 h-6 ${action.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-text-primary">{action.label}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-brand-400 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Chart placeholder */}
        <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-brand-400" />
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Vistas Recientes
            </h2>
          </div>
          <div className="flex items-end justify-between gap-3 h-40">
            {CHART_BARS.map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-brand-500/80 to-brand-400/40 rounded-t-lg transition-all"
                  style={{ height: `${bar.height}%` }}
                />
                <span className="text-xs text-text-muted">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade banner (show if not VIP) */}
        {currentTier !== "vip" && (
          <div className="relative overflow-hidden bg-gradient-to-r from-gold-500/10 via-brand-500/10 to-coral-500/10 border border-gold-500/20 rounded-2xl p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-gold-500" />
                  <h3 className="font-display text-xl font-bold text-gold-500">
                    Pasa a VIP
                  </h3>
                </div>
                <p className="text-text-secondary text-sm">
                  Fotos ilimitadas, videos ilimitados, stories, prioridad en búsqueda
                  y badge dorado. Destaca sobre las demás.
                </p>
              </div>
              <button className="shimmer bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
                Subir a VIP — $49.99/mes
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
