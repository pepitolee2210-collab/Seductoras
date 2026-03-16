import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

const LINKS_EXPLORE = [
  { label: "Explorar Acompañantes", href: "/explorar" },
  { label: "Planes y Precios", href: "/planes" },
  { label: "Medellín", href: "/explorar?city=Medellín" },
  { label: "Bogotá", href: "/explorar?city=Bogotá" },
];

const LINKS_LEGAL = [
  { label: "Términos de Uso", href: "/legal/terminos" },
  { label: "Política de Privacidad", href: "/legal/privacidad" },
];

export default function Footer() {
  return (
    <footer className="border-t border-dark-700/50 bg-dark-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Seductoras"
                width={220}
                height={80}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              El directorio de acompañantes más exclusivo de Colombia. Perfiles
              verificados, reseñas reales y la mejor experiencia.
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Explorar
            </h3>
            <ul className="space-y-2">
              {LINKS_EXPLORE.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Legal
            </h3>
            <ul className="space-y-2">
              {LINKS_LEGAL.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Ecosistema
            </h3>
            <a
              href="https://paisasex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-sm text-text-secondary transition-colors hover:border-brand-500/50 hover:text-brand-400"
            >
              <Heart className="h-4 w-4 text-brand-400" />
              Contenido exclusivo en PaisaSex
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-dark-700/50 pt-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} Seductoras. Todos los derechos
              reservados.
            </p>
            <p className="max-w-md text-center text-xs text-text-muted sm:text-right">
              Este sitio es exclusivo para mayores de 18 años. Todo el contenido es
              publicado por los anunciantes. Seductoras no ofrece ni promueve
              servicios sexuales.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
