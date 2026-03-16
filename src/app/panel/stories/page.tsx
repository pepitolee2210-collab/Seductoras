"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  Clock,
  Trash2,
  Crown,
  Home,
  ChevronRight,
  Zap,
  Eye,
} from "lucide-react";

const IS_VIP = false;

const MOCK_STORIES = [
  { id: "s1", title: "Noche en Medellín", timeLeft: "18h restantes", views: 142 },
  { id: "s2", title: "Nuevo look", timeLeft: "6h restantes", views: 89 },
  { id: "s3", title: "Disponible hoy", timeLeft: "23h restantes", views: 201 },
];

export default function StoriesPage() {
  const [isVip] = useState(IS_VIP);
  const [stories, setStories] = useState(MOCK_STORIES);

  function handleDelete(id: string) {
    setStories((prev) => prev.filter((s) => s.id !== id));
  }

  function handleUpload() {
    setStories((prev) => [
      ...prev,
      {
        id: `s_${Date.now()}`,
        title: `Story ${prev.length + 1}`,
        timeLeft: "24h restantes",
        views: 0,
      },
    ]);
  }

  return (
    <main className="min-h-screen bg-dark-900 pt-20 sm:pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/panel" className="hover:text-text-secondary transition-colors">
            Mi Panel
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-secondary">Stories</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand">
            Mis Stories
          </h1>
          <p className="text-text-secondary mt-1">
            Publica contenido efímero para atraer más atención
          </p>
        </div>

        {!isVip ? (
          /* Not VIP - upgrade CTA */
          <div className="flex flex-col items-center text-center py-16">
            <div className="w-24 h-24 rounded-3xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-6">
              <Crown className="w-12 h-12 text-gold-500" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              Función Exclusiva VIP
            </h2>
            <p className="text-text-secondary max-w-md mb-8">
              Las stories te permiten compartir momentos y atraer clientes con contenido
              que desaparece en 24 horas. Solo disponible para perfiles VIP.
            </p>

            <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 max-w-sm w-full mb-8 space-y-4">
              <h3 className="font-semibold text-text-primary">Con VIP obtienes:</h3>
              <ul className="space-y-3 text-sm text-text-secondary text-left">
                {[
                  "Stories ilimitadas de 24 horas",
                  "Fotos y videos ilimitados",
                  "Prioridad en búsqueda",
                  "Badge dorado verificado",
                  "Estadísticas avanzadas",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gold-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <button className="shimmer bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg">
              Subir a VIP — $49.99/mes
            </button>
          </div>
        ) : (
          /* VIP - stories management */
          <>
            {/* Upload zone */}
            <button
              type="button"
              onClick={handleUpload}
              className="w-full border-2 border-dashed border-gold-500/30 hover:border-gold-500/50 hover:bg-gold-500/5 rounded-2xl p-10 flex flex-col items-center gap-3 transition-colors mb-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                <Upload className="w-7 h-7 text-gold-500" />
              </div>
              <p className="text-text-primary font-semibold">
                Subir nueva Story
              </p>
              <p className="text-sm text-text-muted">
                Foto o video — Visible por 24 horas
              </p>
            </button>

            {/* Active stories grid */}
            {stories.length === 0 ? (
              <div className="text-center py-16">
                <Sparkles className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary">No tienes stories activas</p>
                <p className="text-sm text-text-muted mt-1">
                  Sube una story para que tus visitantes la vean
                </p>
              </div>
            ) : (
              <div>
                <h2 className="font-display text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold-500" />
                  Stories Activas ({stories.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {stories.map((story) => (
                    <div
                      key={story.id}
                      className="group relative bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden"
                    >
                      {/* Placeholder content */}
                      <div className="aspect-[9/16] bg-gradient-to-b from-gold-500/5 to-dark-800 flex flex-col items-center justify-center">
                        <Sparkles className="w-8 h-8 text-gold-500/50 mb-2" />
                        <p className="text-sm font-medium text-text-primary px-3 text-center">
                          {story.title}
                        </p>
                      </div>

                      {/* Bottom info */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-dark-900/90 to-transparent p-3 pt-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-text-secondary">
                            <Clock className="w-3 h-3" />
                            {story.timeLeft}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-text-secondary">
                            <Eye className="w-3 h-3" />
                            {story.views}
                          </div>
                        </div>
                      </div>

                      {/* Delete button */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDelete(story.id)}
                          className="bg-red-500/90 hover:bg-red-500 text-white rounded-lg p-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Gold ring */}
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-gold-500/20 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
