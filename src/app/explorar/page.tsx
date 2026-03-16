"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import EscortCard from "@/components/EscortCard";
import {
  MOCK_ESCORTS,
  FILTER_CITIES,
  FILTER_ZONES,
  FILTER_SERVICES,
  FILTER_BODY,
  FILTER_AGE_RANGES,
  TIER_CONFIG,
  type Tier,
} from "@/lib/mock-data";

type SortOption = "featured" | "newest" | "price_low" | "price_high" | "rating";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Destacadas" },
  { value: "newest", label: "Nuevas" },
  { value: "price_low", label: "Precio: bajo a alto" },
  { value: "price_high", label: "Precio: alto a bajo" },
  { value: "rating", label: "Mejor valoradas" },
];

function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-dark-700 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-text-primary"
      >
        {title}
        {open ? (
          <ChevronUp className="h-4 w-4 text-text-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-muted" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-dark-500 bg-dark-700 text-brand-500 accent-brand-500"
      />
      <span className="text-sm text-text-secondary">{label}</span>
    </label>
  );
}

export default function ExplorarPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedCity, setSelectedCity] = useState("Medellín");
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>("");
  const [selectedHair, setSelectedHair] = useState<string[]>([]);
  const [selectedSkin, setSelectedSkin] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<Tier | "">("");
  const [priceRange, setPriceRange] = useState(500000);

  const zones = FILTER_ZONES[selectedCity] ?? [];

  function toggleArray(arr: string[], value: string): string[] {
    return arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
  }

  function matchesAgeRange(age: number, range: string): boolean {
    if (!range) return true;
    if (range === "36+") return age >= 36;
    const [min, max] = range.split("-").map(Number);
    return age >= min && age <= max;
  }

  const filtered = useMemo(() => {
    let result = [...MOCK_ESCORTS];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.zone.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q)
      );
    }

    // City
    result = result.filter((e) => e.city === selectedCity);

    // Zone
    if (selectedZones.length > 0) {
      result = result.filter((e) => selectedZones.includes(e.zone));
    }

    // Age
    if (selectedAgeRange) {
      result = result.filter((e) => matchesAgeRange(e.age, selectedAgeRange));
    }

    // Price
    result = result.filter((e) => e.price <= priceRange);

    // Services
    if (selectedServices.length > 0) {
      result = result.filter((e) =>
        selectedServices.some((s) => (e.services as readonly string[]).includes(s))
      );
    }

    // Hair color
    if (selectedHair.length > 0) {
      result = result.filter((e) => selectedHair.includes(e.hairColor));
    }

    // Skin color
    if (selectedSkin.length > 0) {
      result = result.filter((e) => selectedSkin.includes(e.skinColor));
    }

    // Tier
    if (selectedTier) {
      result = result.filter((e) => e.tier === selectedTier);
    }

    // Sort
    switch (sortBy) {
      case "featured":
        result.sort(
          (a, b) =>
            TIER_CONFIG[a.tier].priority - TIER_CONFIG[b.tier].priority
        );
        break;
      case "newest":
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCity,
    selectedZones,
    selectedAgeRange,
    priceRange,
    selectedServices,
    selectedHair,
    selectedSkin,
    selectedTier,
    sortBy,
  ]);

  const filterContent = (
    <div>
      {/* City */}
      <FilterSection title="Ciudad" defaultOpen>
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedZones([]);
          }}
          className="w-full rounded-lg border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary"
        >
          {FILTER_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </FilterSection>

      {/* Zones */}
      {zones.length > 0 && (
        <FilterSection title="Zona" defaultOpen>
          {zones.map((zone) => (
            <Checkbox
              key={zone}
              label={zone}
              checked={selectedZones.includes(zone)}
              onChange={() =>
                setSelectedZones(toggleArray(selectedZones, zone))
              }
            />
          ))}
        </FilterSection>
      )}

      {/* Age range */}
      <FilterSection title="Edad">
        <div className="flex flex-wrap gap-2">
          {FILTER_AGE_RANGES.map((range) => (
            <button
              key={range}
              onClick={() =>
                setSelectedAgeRange(selectedAgeRange === range ? "" : range)
              }
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                selectedAgeRange === range
                  ? "bg-brand-500 text-white"
                  : "bg-dark-700 text-text-secondary hover:text-text-primary"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price range */}
      <FilterSection title="Precio máximo">
        <input
          type="range"
          min={100000}
          max={500000}
          step={50000}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-brand-500"
        />
        <p className="mt-1 text-sm text-text-muted">
          Hasta{" "}
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }).format(priceRange)}
        </p>
      </FilterSection>

      {/* Services */}
      <FilterSection title="Servicios">
        {FILTER_SERVICES.map((service) => (
          <Checkbox
            key={service}
            label={service}
            checked={selectedServices.includes(service)}
            onChange={() =>
              setSelectedServices(toggleArray(selectedServices, service))
            }
          />
        ))}
      </FilterSection>

      {/* Body: Hair */}
      <FilterSection title="Color de cabello">
        {FILTER_BODY.hairColor.map((color) => (
          <Checkbox
            key={color}
            label={color}
            checked={selectedHair.includes(color)}
            onChange={() => setSelectedHair(toggleArray(selectedHair, color))}
          />
        ))}
      </FilterSection>

      {/* Body: Skin */}
      <FilterSection title="Tono de piel">
        {FILTER_BODY.skinColor.map((color) => (
          <Checkbox
            key={color}
            label={color}
            checked={selectedSkin.includes(color)}
            onChange={() => setSelectedSkin(toggleArray(selectedSkin, color))}
          />
        ))}
      </FilterSection>

      {/* Tier */}
      <FilterSection title="Tipo de perfil">
        {(["vip", "pro", "basic"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTier(selectedTier === t ? "" : t)}
            className={`mr-2 mb-2 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              selectedTier === t
                ? `${TIER_CONFIG[t].color} text-xs`
                : "bg-dark-700 text-text-secondary hover:text-text-primary"
            }`}
          >
            {TIER_CONFIG[t].label}
          </button>
        ))}
      </FilterSection>
    </div>
  );

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Explorar <span className="text-gradient-brand">Acompañantes</span>
          </h1>
          <p className="mt-2 text-text-secondary">
            {filtered.length} perfiles disponibles en {selectedCity}
          </p>
        </div>

        {/* Search + Sort bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Buscar por nombre, zona..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-dark-600 bg-dark-800 py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-dark-600 bg-dark-800 px-4 py-2.5 text-sm text-text-secondary lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-xl border border-dark-600 bg-dark-800 px-4 py-2.5 text-sm text-text-secondary focus:border-brand-500 focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-20 rounded-2xl border border-dark-700 bg-dark-800 p-4">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
                Filtros
              </h3>
              {filterContent}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((escort) => (
                  <EscortCard key={escort.id} escort={escort} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg text-text-secondary">
                  No se encontraron perfiles con estos filtros.
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  Intenta ajustar tus criterios de búsqueda.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-dark-950/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-dark-800 p-5 lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filtros</h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-text-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
