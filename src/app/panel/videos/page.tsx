"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Upload,
  Trash2,
  Play,
  Clock,
  Film,
  Home,
  ChevronRight,
  Video,
} from "lucide-react";

const TIER_LIMITS = { vip: Infinity, pro: 5, basic: 1 } as const;
const CURRENT_TIER = "pro" as keyof typeof TIER_LIMITS;

const INITIAL_VIDEOS = [
  { id: "v1", title: "Presentación", duration: "0:32", date: "12 Mar 2026" },
  { id: "v2", title: "En el hotel", duration: "1:15", date: "8 Mar 2026" },
];

export default function VideosPage() {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const maxVideos = TIER_LIMITS[CURRENT_TIER];
  const used = videos.length;
  const limitLabel = maxVideos === Infinity ? "Ilimitados" : String(maxVideos);

  function handleDelete(id: string) {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }

  function handleUpload() {
    if (used >= maxVideos) return;
    setVideos((prev) => [
      ...prev,
      {
        id: `v_${Date.now()}`,
        title: `Video ${prev.length + 1}`,
        duration: "0:00",
        date: "16 Mar 2026",
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
          <span className="text-text-secondary">Videos</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand">
              Mis Videos
            </h1>
            <p className="text-text-secondary mt-1">
              Gestiona tus videos de presentación
            </p>
          </div>
          <div className="flex items-center gap-2 bg-dark-800 border border-dark-700 rounded-xl px-4 py-2">
            <Film className="w-4 h-4 text-coral-500" />
            <span className="text-sm font-semibold text-text-primary">
              {used}/{limitLabel}
            </span>
            <span className="text-sm text-text-secondary">videos usados</span>
          </div>
        </div>

        {/* Upload zone */}
        <button
          type="button"
          onClick={handleUpload}
          disabled={used >= maxVideos}
          className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 transition-colors mb-8 ${
            used >= maxVideos
              ? "border-dark-700 opacity-50 cursor-not-allowed"
              : "border-dark-600 hover:border-coral-500/50 hover:bg-coral-500/5 cursor-pointer"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-coral-500/10 flex items-center justify-center">
            <Upload className="w-7 h-7 text-coral-500" />
          </div>
          <p className="text-text-primary font-semibold">
            {used >= maxVideos
              ? "Límite de videos alcanzado"
              : "Haz clic para subir un video"}
          </p>
          <p className="text-sm text-text-muted">
            MP4 — Máx. 60 segundos, 50MB
          </p>
        </button>

        {/* Video list */}
        {videos.length === 0 ? (
          <div className="text-center py-16">
            <Video className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary">No tienes videos aún</p>
            <p className="text-sm text-text-muted mt-1">
              Los videos aumentan tu visibilidad hasta un 40%
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-dark-800/50 border border-dark-700 rounded-2xl p-4 flex items-center gap-4 group hover:border-dark-600 transition-colors"
              >
                {/* Thumbnail placeholder */}
                <div className="relative w-28 h-20 sm:w-36 sm:h-24 bg-dark-700 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-coral-500/10 to-brand-500/10" />
                  <div className="relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-1.5 right-1.5 bg-dark-900/80 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary truncate">
                    {video.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </span>
                    <span className="text-xs text-text-muted">{video.date}</span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(video.id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl p-2.5 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
