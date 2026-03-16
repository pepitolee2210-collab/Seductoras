"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Upload,
  Camera,
  CheckSquare,
  ArrowLeft,
  Shield,
  Clock,
} from "lucide-react";

export default function RegistroPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    bio: "",
    agreeTerms: false,
  });
  const [idFile, setIdFile] = useState<string | null>(null);
  const [selfies, setSelfies] = useState<(string | null)[]>([null, null, null]);

  function handleChange(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSelfieSlot(index: number) {
    setSelfies((prev) => {
      const next = [...prev];
      next[index] = next[index] ? null : `selfie_${index + 1}.jpg`;
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  const inputBase =
    "w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors";

  return (
    <main className="min-h-screen bg-dark-900 pt-20 sm:pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-4">
            <UserPlus className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand mb-2">
            Crear Tu Perfil
          </h1>
          <p className="text-text-secondary max-w-md mx-auto">
            Completa el formulario para registrarte como acompañante en Seductoras
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal info */}
          <section className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 space-y-5">
            <h2 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-400" />
              Información Personal
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Nombre artístico
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Valentina"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Teléfono / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="tel"
                    placeholder="+57 300 1234567"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Ciudad
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <select
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={`${inputBase} pl-10 appearance-none`}
                  >
                    <option value="">Seleccionar ciudad</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Cali">Cali</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Barranquilla">Barranquilla</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Edad
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="number"
                    min={18}
                    max={60}
                    placeholder="23"
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Breve descripción sobre ti
              </label>
              <textarea
                rows={3}
                placeholder="Cuéntanos un poco sobre ti, tu personalidad y lo que ofreces..."
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className={`${inputBase} resize-none`}
              />
              <p className="text-xs text-text-muted mt-1">Máximo 300 caracteres</p>
            </div>
          </section>

          {/* ID Upload */}
          <section className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold-500" />
              Verificación de Identidad
            </h2>
            <p className="text-sm text-text-secondary">
              Sube una foto de tu cédula o documento de identidad. Solo la veremos
              nosotros para validar tu edad y autenticidad.
            </p>

            <button
              type="button"
              onClick={() => setIdFile(idFile ? null : "documento.jpg")}
              className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 transition-colors ${
                idFile
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-dark-600 hover:border-brand-500/50 hover:bg-brand-500/5"
              }`}
            >
              <Upload className={`w-8 h-8 ${idFile ? "text-green-400" : "text-text-muted"}`} />
              <span className={`text-sm ${idFile ? "text-green-400" : "text-text-secondary"}`}>
                {idFile ? "Documento cargado" : "Haz clic para subir tu documento"}
              </span>
              <span className="text-xs text-text-muted">JPG, PNG o PDF — Máx. 5MB</span>
            </button>
          </section>

          {/* Selfie Upload */}
          <section className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2">
              <Camera className="w-5 h-5 text-coral-500" />
              Selfies de Verificación
            </h2>
            <p className="text-sm text-text-secondary">
              Sube 3 selfies recientes para confirmar que eres tú. Deben ser claras y
              sin filtros.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {selfies.map((selfie, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelfieSlot(i)}
                  className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-colors ${
                    selfie
                      ? "border-green-500/50 bg-green-500/5"
                      : "border-dark-600 hover:border-brand-500/50 hover:bg-brand-500/5"
                  }`}
                >
                  {selfie ? (
                    <>
                      <Camera className="w-6 h-6 text-green-400" />
                      <span className="text-xs text-green-400">Cargada</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-6 h-6 text-text-muted" />
                      <span className="text-xs text-text-muted">Selfie {i + 1}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => handleChange("agreeTerms", !form.agreeTerms)}
              className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                form.agreeTerms
                  ? "bg-brand-500 border-brand-500"
                  : "border-dark-500 hover:border-brand-500/50"
              }`}
            >
              {form.agreeTerms && <CheckSquare className="w-4 h-4 text-white" />}
            </button>
            <p className="text-sm text-text-secondary">
              Acepto los{" "}
              <span className="text-brand-400 cursor-pointer hover:underline">
                Términos y Condiciones
              </span>{" "}
              y la{" "}
              <span className="text-brand-400 cursor-pointer hover:underline">
                Política de Privacidad
              </span>{" "}
              de Seductoras. Confirmo que soy mayor de 18 años.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="shimmer w-full bg-gradient-to-r from-brand-500 to-coral-500 text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity text-lg"
          >
            Crear Mi Perfil
          </button>

          {/* Notice */}
          <div className="flex items-center gap-3 bg-gold-500/10 border border-gold-500/20 rounded-xl p-4">
            <Clock className="w-5 h-5 text-gold-500 flex-shrink-0" />
            <p className="text-sm text-gold-500">
              Tu perfil será revisado en 24-48 horas. Te notificaremos por correo
              cuando sea aprobado.
            </p>
          </div>

          {/* Login link */}
          <p className="text-center text-text-secondary text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link href="/auth/login" className="text-brand-400 hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
