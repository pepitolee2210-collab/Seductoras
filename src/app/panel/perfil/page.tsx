"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Save,
  User,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Ruler,
  Weight,
  Palette,
  Languages,
  Briefcase,
  Home,
  ChevronRight,
  FileText,
} from "lucide-react";
import { FILTER_SERVICES, FILTER_ZONES, FILTER_BODY } from "@/lib/mock-data";

const LANGUAGE_OPTIONS = ["Español", "English", "Italiano", "Français", "Português", "Deutsch"];

const INITIAL_FORM = {
  name: "Sofía",
  bio: "Paisa auténtica, cariñosa y apasionada. Te haré sentir como un rey.",
  age: "22",
  city: "Medellín",
  zone: "Sabaneta",
  schedule: "2PM - 11PM",
  price: "200000",
  phone: "+57 315 1234567",
  height: "160",
  weight: "50",
  measurements: "86-56-88",
  hairColor: "Negra",
  skinColor: "Morena",
};

const INITIAL_SERVICES = ["Hotel", "Domicilio", "Masajes"];
const INITIAL_LANGUAGES = ["Español"];

export default function EditPerfilPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [services, setServices] = useState<string[]>(INITIAL_SERVICES);
  const [languages, setLanguages] = useState<string[]>(INITIAL_LANGUAGES);
  const [saved, setSaved] = useState(false);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function toggleItem(list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) {
    setList((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputBase =
    "w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors";
  const zones = FILTER_ZONES[form.city] ?? [];

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
          <span className="text-text-secondary">Editar Perfil</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand">
            Editar Perfil
          </h1>
          <p className="text-text-secondary mt-1">
            Mantén tu información actualizada para atraer más clientes
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Basic info */}
          <section className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 space-y-5">
            <h2 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2">
              <User className="w-5 h-5 text-brand-400" />
              Información Básica
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Nombre</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputBase}
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Edad</label>
                <input
                  type="number"
                  min={18}
                  max={60}
                  value={form.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className={inputBase}
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Ciudad</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <select
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={`${inputBase} pl-10 appearance-none`}
                  >
                    <option value="Medellín">Medellín</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Cali">Cali</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Barranquilla">Barranquilla</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Zona</label>
                <select
                  value={form.zone}
                  onChange={(e) => handleChange("zone", e.target.value)}
                  className={`${inputBase} appearance-none`}
                >
                  <option value="">Seleccionar zona</option>
                  {zones.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Horario</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={form.schedule}
                    onChange={(e) => handleChange("schedule", e.target.value)}
                    className={`${inputBase} pl-10`}
                    placeholder="Ej: 10AM - 12AM"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Tarifa (COP)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Teléfono / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Bio / Descripción</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className={`${inputBase} pl-10 resize-none`}
                />
              </div>
            </div>
          </section>

          {/* Physical details */}
          <section className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 space-y-5">
            <h2 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2">
              <Ruler className="w-5 h-5 text-coral-500" />
              Detalles Físicos
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Estatura (cm)</label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="number"
                    value={form.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Peso (kg)</label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="number"
                    value={form.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Medidas</label>
                <input
                  type="text"
                  placeholder="90-60-90"
                  value={form.measurements}
                  onChange={(e) => handleChange("measurements", e.target.value)}
                  className={inputBase}
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Color de cabello</label>
                <div className="relative">
                  <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <select
                    value={form.hairColor}
                    onChange={(e) => handleChange("hairColor", e.target.value)}
                    className={`${inputBase} pl-10 appearance-none`}
                  >
                    {FILTER_BODY.hairColor.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Color de piel</label>
                <div className="relative">
                  <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <select
                    value={form.skinColor}
                    onChange={(e) => handleChange("skinColor", e.target.value)}
                    className={`${inputBase} pl-10 appearance-none`}
                  >
                    {FILTER_BODY.skinColor.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gold-500" />
              Servicios
            </h2>
            <div className="flex flex-wrap gap-2">
              {FILTER_SERVICES.map((service) => {
                const active = services.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleItem(services, setServices, service)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                        : "bg-dark-700 text-text-secondary border border-dark-600 hover:border-dark-500"
                    }`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Languages */}
          <section className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2">
              <Languages className="w-5 h-5 text-brand-400" />
              Idiomas
            </h2>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((lang) => {
                const active = languages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleItem(languages, setLanguages, lang)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "bg-gold-500/20 text-gold-500 border border-gold-500/30"
                        : "bg-dark-700 text-text-secondary border border-dark-600 hover:border-dark-500"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Save */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="shimmer bg-gradient-to-r from-brand-500 to-coral-500 text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Guardar Cambios
            </button>
            {saved && (
              <span className="text-green-400 text-sm font-medium animate-fade-in-up">
                Cambios guardados correctamente
              </span>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
