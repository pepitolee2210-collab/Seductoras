"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  const inputBase =
    "w-full bg-dark-800 border border-dark-600 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors";

  return (
    <main className="min-h-screen bg-dark-900 pt-20 sm:pt-24 pb-16 px-4 flex items-start justify-center">
      <div className="w-full max-w-md">
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
            <LogIn className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-text-secondary">
            Accede a tu panel de acompañante
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 space-y-5">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputBase} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputBase} pl-10 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-dark-500 bg-dark-700 text-brand-500 focus:ring-brand-500/30"
                />
                Recordarme
              </label>
              <span className="text-brand-400 cursor-pointer hover:underline">
                ¿Olvidaste tu contraseña?
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="shimmer w-full bg-gradient-to-r from-brand-500 to-coral-500 text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity text-lg"
          >
            Ingresar
          </button>

          {/* Register link */}
          <p className="text-center text-text-secondary text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/registro" className="text-brand-400 hover:underline">
              Regístrate como acompañante
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
