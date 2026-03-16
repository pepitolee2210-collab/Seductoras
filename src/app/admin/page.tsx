"use client";

import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Eye,
  Activity,
  ChevronRight,
  Home,
  Clock,
  MapPin,
  UserCheck,
  FileSearch,
  ListChecks,
  Crown,
} from "lucide-react";
import { MOCK_ESCORTS } from "@/lib/mock-data";

const STATS = [
  { label: "Total Escorts", value: "9", icon: Users, color: "text-brand-400", bg: "bg-brand-500/10" },
  { label: "Pendientes Verificación", value: "2", icon: ShieldCheck, color: "text-gold-500", bg: "bg-gold-500/10" },
  { label: "Vistas Totales", value: "45K", icon: Eye, color: "text-coral-500", bg: "bg-coral-500/10" },
  { label: "Activas Hoy", value: "5", icon: Activity, color: "text-green-400", bg: "bg-green-500/10" },
] as const;

const QUICK_ACTIONS = [
  { label: "Verificaciones Pendientes", href: "/admin/verificaciones", icon: FileSearch, color: "text-gold-500" },
  { label: "Gestionar Perfiles", href: "/admin/perfiles", icon: ListChecks, color: "text-brand-400" },
] as const;

const RECENT_REGISTRATIONS = MOCK_ESCORTS.slice(-4).reverse();

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-dark-900 pt-20 sm:pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-secondary">Admin</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand">
            Panel de Administración
          </h1>
          <p className="text-text-secondary mt-1">
            Resumen general de la plataforma Seductoras
          </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent registrations */}
          <div className="lg:col-span-2 bg-dark-800/50 border border-dark-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-semibold text-text-primary flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-400" />
                Registros Recientes
              </h2>
              <Link
                href="/admin/perfiles"
                className="text-sm text-brand-400 hover:underline"
              >
                Ver todos
              </Link>
            </div>

            <div className="space-y-3">
              {RECENT_REGISTRATIONS.map((escort) => (
                <div
                  key={escort.id}
                  className="flex items-center gap-4 bg-dark-700/30 rounded-xl p-4 hover:bg-dark-700/50 transition-colors"
                >
                  {/* Avatar placeholder */}
                  <div className="w-11 h-11 rounded-full bg-dark-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-text-muted" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-text-primary truncate">
                        {escort.name}
                      </p>
                      <span className={`${escort.tier === "vip" ? "badge-vip" : escort.tier === "pro" ? "badge-pro" : "badge-basic"} text-xs px-1.5 py-0.5 rounded-full font-bold`}>
                        {escort.tier.toUpperCase()}
                      </span>
                      {escort.isVerified && (
                        <UserCheck className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {escort.city} — {escort.zone}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">
                      {escort.isVerified ? (
                        <span className="text-green-400">Verificada</span>
                      ) : (
                        <span className="text-gold-500">Pendiente</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-text-primary flex items-center gap-2">
              <Crown className="w-5 h-5 text-gold-500" />
              Acciones Rápidas
            </h2>

            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5 flex items-center gap-4 hover:border-brand-500/30 transition-colors group block"
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

            {/* Platform summary card */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5 space-y-3">
              <h3 className="font-semibold text-text-primary text-sm">Resumen Tiers</h3>
              {[
                { tier: "VIP", count: MOCK_ESCORTS.filter((e) => e.tier === "vip").length, color: "bg-gold-500" },
                { tier: "PRO", count: MOCK_ESCORTS.filter((e) => e.tier === "pro").length, color: "bg-brand-500" },
                { tier: "BASIC", count: MOCK_ESCORTS.filter((e) => e.tier === "basic").length, color: "bg-dark-500" },
              ].map((t) => (
                <div key={t.tier} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${t.color}`} />
                  <span className="text-sm text-text-secondary flex-1">{t.tier}</span>
                  <span className="text-sm font-semibold text-text-primary">{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
