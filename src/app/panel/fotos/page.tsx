"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Upload,
  Trash2,
  GripVertical,
  ImagePlus,
  Home,
  ChevronRight,
  Info,
  Camera,
} from "lucide-react";

const TIER_LIMITS = { vip: Infinity, pro: 15, basic: 5 } as const;
const CURRENT_TIER = "pro" as keyof typeof TIER_LIMITS;

const INITIAL_PHOTOS = Array.from({ length: 8 }, (_, i) => ({
  id: `photo_${i + 1}`,
  placeholder: true,
  order: i + 1,
}));

export default function FotosPage() {
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const maxPhotos = TIER_LIMITS[CURRENT_TIER];
  const used = photos.length;
  const limitLabel = maxPhotos === Infinity ? "Ilimitadas" : String(maxPhotos);

  function handleDelete(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  function handleUpload() {
    if (used >= maxPhotos) return;
    const newId = `photo_${Date.now()}`;
    setPhotos((prev) => [
      ...prev,
      { id: newId, placeholder: true, order: prev.length + 1 },
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
          <span className="text-text-secondary">Fotos</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand">
              Mis Fotos
            </h1>
            <p className="text-text-secondary mt-1">
              Gestiona las fotos de tu perfil
            </p>
          </div>
          <div className="flex items-center gap-2 bg-dark-800 border border-dark-700 rounded-xl px-4 py-2">
            <Camera className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-semibold text-text-primary">
              {used}/{limitLabel}
            </span>
            <span className="text-sm text-text-secondary">fotos usadas</span>
          </div>
        </div>

        {/* Upload zone */}
        <button
          type="button"
          onClick={handleUpload}
          disabled={used >= maxPhotos}
          className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 transition-colors mb-8 ${
            used >= maxPhotos
              ? "border-dark-700 opacity-50 cursor-not-allowed"
              : "border-dark-600 hover:border-brand-500/50 hover:bg-brand-500/5 cursor-pointer"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center">
            <Upload className="w-7 h-7 text-brand-400" />
          </div>
          <p className="text-text-primary font-semibold">
            {used >= maxPhotos
              ? "Límite de fotos alcanzado"
              : "Haz clic para subir fotos"}
          </p>
          <p className="text-sm text-text-muted">
            JPG o PNG — Máx. 10MB por foto
          </p>
        </button>

        {/* Reorder hint */}
        <div className="flex items-center gap-2 bg-dark-800/50 border border-dark-700 rounded-xl p-3 mb-6">
          <Info className="w-4 h-4 text-text-muted flex-shrink-0" />
          <p className="text-xs text-text-muted">
            Arrastra las fotos para reordenarlas. La primera foto será tu imagen principal.
          </p>
        </div>

        {/* Photo grid */}
        {photos.length === 0 ? (
          <div className="text-center py-16">
            <ImagePlus className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary">No tienes fotos aún</p>
            <p className="text-sm text-text-muted mt-1">
              Sube tu primera foto para atraer más clientes
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="group relative aspect-[3/4] bg-dark-800 border border-dark-700 rounded-xl overflow-hidden"
              >
                {/* Placeholder content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-dark-700/50 to-dark-800/80">
                  <Camera className="w-8 h-8 text-text-muted mb-2" />
                  <span className="text-xs text-text-muted">Foto {i + 1}</span>
                </div>

                {/* First badge */}
                {i === 0 && (
                  <div className="absolute top-2 left-2 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    Principal
                  </div>
                )}

                {/* Drag handle */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-dark-900/80 rounded-lg p-1.5 cursor-grab">
                    <GripVertical className="w-4 h-4 text-text-secondary" />
                  </div>
                </div>

                {/* Delete button */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="bg-red-500/90 hover:bg-red-500 text-white rounded-lg p-2 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
