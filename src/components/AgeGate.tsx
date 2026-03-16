"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const AGE_GATE_KEY = "seductoras_age_verified";

export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(AGE_GATE_KEY);
    if (!verified) setShow(true);
  }, []);

  function handleConfirm() {
    localStorage.setItem(AGE_GATE_KEY, "true");
    setShow(false);
  }

  function handleDeny() {
    window.location.href = "https://google.com";
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-950/95 backdrop-blur-xl px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl border border-dark-600 bg-dark-800 p-8 text-center shadow-2xl"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>

            <h2 className="mb-2 font-display text-2xl font-bold text-gradient-brand">
              Verificación de Edad
            </h2>
            <p className="mb-6 text-text-secondary">
              Este sitio contiene contenido exclusivo para adultos. Debes ser mayor
              de 18 años para acceder.
            </p>

            <p className="mb-8 text-sm text-text-muted">
              Al hacer clic en &quot;Soy Mayor de 18&quot; confirmas que tienes la
              edad legal en tu país para ver contenido para adultos.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleConfirm}
                className="flex-1 rounded-xl bg-gradient-to-r from-brand-400 to-brand-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand-500/25"
              >
                Soy Mayor de 18
              </button>
              <button
                onClick={handleDeny}
                className="flex-1 rounded-xl border border-dark-500 px-6 py-3 font-semibold text-text-secondary transition-colors hover:border-dark-400 hover:text-text-primary"
              >
                Salir
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
