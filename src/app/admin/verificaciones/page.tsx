"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Home,
  ChevronRight,
  Calendar,
  MapPin,
  Camera,
  IdCard,
  User,
} from "lucide-react";
import { MOCK_ESCORTS } from "@/lib/mock-data";

type Status = "pending" | "approved" | "rejected";

interface PendingEscort {
  id: string;
  name: string;
  city: string;
  zone: string;
  submittedDate: string;
  status: Status;
}

const PENDING_ESCORTS: PendingEscort[] = [
  ...MOCK_ESCORTS.filter((e) => !e.isVerified).map((e) => ({
    id: e.id,
    name: e.name,
    city: e.city,
    zone: e.zone,
    submittedDate: "14 Mar 2026",
    status: "pending" as Status,
  })),
  {
    id: "pending_extra",
    name: "Carolina",
    city: "Bogotá",
    zone: "Chapinero",
    submittedDate: "15 Mar 2026",
    status: "pending" as Status,
  },
];

export default function VerificacionesPage() {
  const [escorts, setEscorts] = useState(PENDING_ESCORTS);

  function handleAction(id: string, action: "approved" | "rejected") {
    setEscorts((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: action } : e))
    );
  }

  const pending = escorts.filter((e) => e.status === "pending");
  const resolved = escorts.filter((e) => e.status !== "pending");

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
          <span className="text-text-secondary">Verificaciones</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand">
              Verificaciones Pendientes
            </h1>
            <p className="text-text-secondary mt-1">
              Revisa y aprueba los perfiles de nuevas acompañantes
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-xl px-4 py-2">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span className="text-sm font-semibold text-gold-500">
              {pending.length} pendientes
            </span>
          </div>
        </div>

        {/* Pending list */}
        {pending.length === 0 ? (
          <div className="text-center py-16 bg-dark-800/50 border border-dark-700 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-text-primary font-semibold">
              No hay verificaciones pendientes
            </p>
            <p className="text-sm text-text-muted mt-1">
              Todas las solicitudes han sido procesadas
            </p>
          </div>
        ) : (
          <div className="space-y-6 mb-12">
            {pending.map((escort) => (
              <div
                key={escort.id}
                className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-dark-600 flex items-center justify-center">
                        <User className="w-6 h-6 text-text-muted" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-text-primary">
                          {escort.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {escort.city} — {escort.zone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {escort.submittedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Document preview */}
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wide mb-2 flex items-center gap-1">
                        <IdCard className="w-3.5 h-3.5" />
                        Documento de identidad
                      </p>
                      <div className="w-48 h-28 bg-dark-700 border border-dark-600 rounded-xl flex items-center justify-center">
                        <IdCard className="w-8 h-8 text-text-muted" />
                      </div>
                    </div>

                    {/* Selfie previews */}
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wide mb-2 flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" />
                        Selfies de verificación
                      </p>
                      <div className="flex gap-3">
                        {[1, 2, 3].map((n) => (
                          <div
                            key={n}
                            className="w-20 h-20 bg-dark-700 border border-dark-600 rounded-xl flex items-center justify-center"
                          >
                            <Camera className="w-6 h-6 text-text-muted" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-3 lg:w-44">
                    <button
                      onClick={() => handleAction(escort.id, "approved")}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 font-semibold py-3 rounded-xl transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleAction(escort.id, "rejected")}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold py-3 rounded-xl transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resolved history */}
        {resolved.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-4">
              Procesadas Recientemente
            </h2>
            <div className="space-y-3">
              {resolved.map((escort) => (
                <div
                  key={escort.id}
                  className="flex items-center gap-4 bg-dark-800/30 border border-dark-700/50 rounded-xl p-4"
                >
                  <div className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary">{escort.name}</p>
                    <p className="text-xs text-text-muted">
                      {escort.city} — {escort.submittedDate}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      escort.status === "approved"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {escort.status === "approved" ? "Aprobada" : "Rechazada"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
