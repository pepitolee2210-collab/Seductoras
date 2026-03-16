"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MapPin } from "lucide-react";
import { FILTER_CITIES } from "@/lib/mock-data";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Explorar", href: "/explorar" },
  { label: "Planes", href: "/planes" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Medellín");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-700/50 bg-dark-900/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Seductoras"
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}

          {/* City selector */}
          <div className="relative">
            <button
              onClick={() => setCityOpen(!cityOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-dark-600 bg-dark-800 px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-dark-500 hover:text-text-primary"
            >
              <MapPin className="h-3.5 w-3.5" />
              {selectedCity}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {cityOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-dark-600 bg-dark-800 py-1 shadow-xl"
                >
                  {FILTER_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-dark-700 ${
                        selectedCity === city
                          ? "text-brand-400"
                          : "text-text-secondary"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/planes"
            className="rounded-xl bg-gradient-to-r from-brand-400 to-brand-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand-500/25"
          >
            Publicar Perfil
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-text-secondary md:hidden"
          aria-label="Menú"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-dark-700/50 bg-dark-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-text-secondary transition-colors hover:bg-dark-800 hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}

              {/* City selector mobile */}
              <div className="mt-2 border-t border-dark-700 pt-3">
                <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-text-muted">
                  Ciudad
                </p>
                <div className="flex flex-wrap gap-2 px-3">
                  {FILTER_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`rounded-full px-3 py-1 text-sm transition-colors ${
                        selectedCity === city
                          ? "bg-brand-500 text-white"
                          : "bg-dark-700 text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href="/planes"
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-xl bg-gradient-to-r from-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Publicar Perfil
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
