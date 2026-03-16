"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  Star,
  Crown,
  Pause,
  ChevronRight,
  Home,
  Users,
  MapPin,
  ArrowUpDown,
  MoreHorizontal,
  UserCheck,
  ShieldAlert,
  Clock,
} from "lucide-react";
import { MOCK_ESCORTS, TIER_CONFIG, type Tier } from "@/lib/mock-data";

type EscortStatus = "active" | "suspended" | "pending";

interface ManagedEscort {
  id: string;
  name: string;
  tier: Tier;
  city: string;
  status: EscortStatus;
  views: number;
  rating: number;
  isVerified: boolean;
}

const MANAGED_ESCORTS: ManagedEscort[] = MOCK_ESCORTS.map((e) => ({
  id: e.id,
  name: e.name,
  tier: e.tier,
  city: e.city,
  status: e.isVerified ? "active" : ("pending" as EscortStatus),
  views: e.viewsCount,
  rating: e.rating,
  isVerified: e.isVerified,
}));

const STATUS_CONFIG: Record<EscortStatus, { label: string; color: string; icon: typeof UserCheck }> = {
  active: { label: "Activa", color: "text-green-400 bg-green-500/10", icon: UserCheck },
  suspended: { label: "Suspendida", color: "text-red-400 bg-red-500/10", icon: ShieldAlert },
  pending: { label: "Pendiente", color: "text-gold-500 bg-gold-500/10", icon: Clock },
};

export default function PerfilesPage() {
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState<Tier | "all">("all");
  const [filterStatus, setFilterStatus] = useState<EscortStatus | "all">("all");
  const [escorts, setEscorts] = useState(MANAGED_ESCORTS);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return escorts.filter((e) => {
      const matchSearch =
        search === "" ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.city.toLowerCase().includes(search.toLowerCase());
      const matchTier = filterTier === "all" || e.tier === filterTier;
      const matchStatus = filterStatus === "all" || e.status === filterStatus;
      return matchSearch && matchTier && matchStatus;
    });
  }, [escorts, search, filterTier, filterStatus]);

  function changeTier(id: string, newTier: Tier) {
    setEscorts((prev) =>
      prev.map((e) => (e.id === id ? { ...e, tier: newTier } : e))
    );
    setOpenMenu(null);
  }

  function toggleSuspend(id: string) {
    setEscorts((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "suspended" ? "active" : "suspended" }
          : e
      )
    );
    setOpenMenu(null);
  }

  return (
    <main className="min-h-screen bg-dark-900 pt-20 sm:pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/admin" className="hover:text-text-secondary transition-colors">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-secondary">Perfiles</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand">
              Gestionar Perfiles
            </h1>
            <p className="text-text-secondary mt-1">
              Administra todos los perfiles de acompañantes
            </p>
          </div>
          <div className="flex items-center gap-2 bg-dark-800 border border-dark-700 rounded-xl px-4 py-2">
            <Users className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-semibold text-text-primary">
              {escorts.length}
            </span>
            <span className="text-sm text-text-secondary">perfiles total</span>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Buscar por nombre o ciudad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value as Tier | "all")}
                className="bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-8 py-3 text-text-primary appearance-none focus:outline-none focus:border-brand-500 transition-colors"
              >
                <option value="all">Todos los tiers</option>
                <option value="vip">VIP</option>
                <option value="pro">PRO</option>
                <option value="basic">BASIC</option>
              </select>
            </div>

            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as EscortStatus | "all")}
                className="bg-dark-800 border border-dark-600 rounded-xl pl-10 pr-8 py-3 text-text-primary appearance-none focus:outline-none focus:border-brand-500 transition-colors"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activa</option>
                <option value="suspended">Suspendida</option>
                <option value="pending">Pendiente</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table / List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-dark-800/50 border border-dark-700 rounded-2xl">
            <Users className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary">No se encontraron perfiles</p>
            <p className="text-sm text-text-muted mt-1">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        ) : (
          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl overflow-hidden">
            {/* Table header (desktop) */}
            <div className="hidden lg:grid grid-cols-[1fr_100px_120px_120px_80px_80px_60px] gap-4 px-6 py-3 bg-dark-700/30 border-b border-dark-700 text-xs text-text-muted uppercase tracking-wide">
              <span>Nombre</span>
              <span>Tier</span>
              <span>Ciudad</span>
              <span>Estado</span>
              <span className="text-right">Vistas</span>
              <span className="text-right">Rating</span>
              <span />
            </div>

            {/* Rows */}
            <div className="divide-y divide-dark-700/50">
              {filtered.map((escort) => {
                const statusCfg = STATUS_CONFIG[escort.status];
                const StatusIcon = statusCfg.icon;
                const tierCfg = TIER_CONFIG[escort.tier];

                return (
                  <div
                    key={escort.id}
                    className="relative flex flex-col lg:grid lg:grid-cols-[1fr_100px_120px_120px_80px_80px_60px] gap-2 lg:gap-4 px-6 py-4 hover:bg-dark-700/20 transition-colors items-start lg:items-center"
                  >
                    {/* Name */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-dark-600 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-text-muted" />
                      </div>
                      <span className="font-semibold text-text-primary">
                        {escort.name}
                      </span>
                    </div>

                    {/* Tier badge */}
                    <div>
                      <span className={`${tierCfg.color} text-xs px-2 py-1 rounded-full font-bold inline-flex items-center gap-1`}>
                        {escort.tier === "vip" && <Crown className="w-3 h-3" />}
                        {tierCfg.label}
                      </span>
                    </div>

                    {/* City */}
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <MapPin className="w-3.5 h-3.5 lg:hidden" />
                      {escort.city}
                    </div>

                    {/* Status */}
                    <div>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusCfg.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusCfg.label}
                      </span>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-1 lg:justify-end text-sm text-text-secondary">
                      <Eye className="w-3.5 h-3.5 lg:hidden" />
                      {escort.views.toLocaleString("es-CO")}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 lg:justify-end text-sm text-text-secondary">
                      <Star className="w-3.5 h-3.5 text-gold-500" />
                      {escort.rating}
                    </div>

                    {/* Actions menu */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === escort.id ? null : escort.id)
                        }
                        className="p-2 rounded-lg hover:bg-dark-600 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4 text-text-muted" />
                      </button>

                      {openMenu === escort.id && (
                        <div className="absolute right-0 top-full mt-1 w-52 bg-dark-800 border border-dark-600 rounded-xl shadow-xl z-20 py-2">
                          <button
                            onClick={() => setOpenMenu(null)}
                            className="w-full px-4 py-2.5 text-left text-sm text-text-secondary hover:bg-dark-700 hover:text-text-primary transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Ver perfil
                          </button>

                          {/* Tier change options */}
                          {(["vip", "pro", "basic"] as Tier[])
                            .filter((t) => t !== escort.tier)
                            .map((t) => (
                              <button
                                key={t}
                                onClick={() => changeTier(escort.id, t)}
                                className="w-full px-4 py-2.5 text-left text-sm text-text-secondary hover:bg-dark-700 hover:text-text-primary transition-colors flex items-center gap-2"
                              >
                                <Crown className="w-4 h-4" />
                                Cambiar a {TIER_CONFIG[t].label}
                              </button>
                            ))}

                          <div className="border-t border-dark-600 my-1" />

                          <button
                            onClick={() => toggleSuspend(escort.id)}
                            className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2 ${
                              escort.status === "suspended"
                                ? "text-green-400 hover:bg-green-500/10"
                                : "text-red-400 hover:bg-red-500/10"
                            }`}
                          >
                            <Pause className="w-4 h-4" />
                            {escort.status === "suspended"
                              ? "Reactivar"
                              : "Suspender"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
