import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-text-muted hover:text-brand-400"
        >
          &larr; Volver al inicio
        </Link>

        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Política de Privacidad
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Última actualización: marzo 2026
        </p>

        <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              1. Información que Recopilamos
            </h2>
            <p>
              Recopilamos la información que proporcionas al crear tu perfil,
              incluyendo nombre (o alias), fotos, descripción, datos de
              contacto y preferencias de servicio. También recopilamos datos
              de uso como dirección IP, tipo de navegador y páginas visitadas.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              2. Uso de la Información
            </h2>
            <p>Utilizamos tu información para:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Proporcionar y mantener el servicio</li>
              <li>Verificar perfiles y prevenir fraude</li>
              <li>Mejorar la experiencia del usuario</li>
              <li>Enviar comunicaciones sobre tu cuenta</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              3. Protección de Datos
            </h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para
              proteger tu información personal. Los datos se almacenan en
              servidores seguros y el acceso está restringido al personal
              autorizado.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              4. Compartir Información
            </h2>
            <p>
              No vendemos ni compartimos tu información personal con terceros,
              excepto cuando sea necesario para: (a) cumplir con la ley, (b)
              proveer el servicio, o (c) proteger nuestros derechos legales.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              5. Cookies
            </h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar tu
              experiencia, recordar tus preferencias y analizar el tráfico del
              sitio. Puedes configurar tu navegador para rechazar cookies,
              aunque esto puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              6. Tus Derechos
            </h2>
            <p>
              De acuerdo con la legislación colombiana de protección de datos
              (Ley 1581 de 2012), tienes derecho a:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Conocer, actualizar y rectificar tus datos personales</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Revocar la autorización de tratamiento</li>
              <li>Acceder de forma gratuita a tus datos</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              7. Retención de Datos
            </h2>
            <p>
              Conservamos tu información mientras tu cuenta esté activa. Al
              eliminar tu cuenta, tus datos personales serán eliminados en un
              plazo de 30 días, salvo que exista una obligación legal de
              conservarlos.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              8. Menores de Edad
            </h2>
            <p>
              No recopilamos intencionalmente información de menores de 18
              años. Si detectamos que un menor ha proporcionado datos
              personales, los eliminaremos de inmediato.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              9. Contacto
            </h2>
            <p>
              Para ejercer tus derechos o resolver dudas sobre esta política,
              contáctanos a través de nuestro WhatsApp de soporte.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
