import Link from "next/link";

export default function TerminosPage() {
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
          Términos de Uso
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Última actualización: marzo 2026
        </p>

        <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder y utilizar Seductoras (&quot;la Plataforma&quot;),
              aceptas estos Términos de Uso en su totalidad. Si no estás de
              acuerdo con alguna parte de estos términos, no debes utilizar la
              Plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              2. Requisitos de Edad
            </h2>
            <p>
              Debes ser mayor de 18 años para acceder a la Plataforma. Al
              utilizar el servicio, declaras y garantizas que cumples con este
              requisito de edad mínima.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              3. Naturaleza del Servicio
            </h2>
            <p>
              Seductoras es un directorio de anuncios clasificados. La
              Plataforma no ofrece, promueve ni facilita servicios sexuales.
              Todo el contenido es publicado bajo la exclusiva responsabilidad
              de los anunciantes. Seductoras actúa únicamente como
              intermediario tecnológico.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              4. Contenido del Usuario
            </h2>
            <p>
              Los usuarios son responsables del contenido que publican. Está
              prohibido publicar contenido que involucre menores de edad,
              contenido no consensual, o cualquier material que viole la
              legislación colombiana vigente. Nos reservamos el derecho de
              eliminar cualquier contenido que consideremos inapropiado.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              5. Verificación de Perfiles
            </h2>
            <p>
              El proceso de verificación busca confirmar la identidad del
              anunciante. Sin embargo, Seductoras no garantiza la veracidad
              absoluta de la información proporcionada por los usuarios.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              6. Pagos y Suscripciones
            </h2>
            <p>
              Los planes de pago se facturan mensualmente. Puedes cancelar tu
              suscripción en cualquier momento. No se realizan reembolsos por
              períodos parciales. Los precios pueden cambiar con previo aviso
              de 30 días.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              7. Limitación de Responsabilidad
            </h2>
            <p>
              Seductoras no es responsable de las interacciones entre usuarios
              fuera de la Plataforma. No nos hacemos responsables de daños
              directos, indirectos o consecuentes derivados del uso del
              servicio.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              8. Modificaciones
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en
              cualquier momento. Los cambios serán efectivos inmediatamente
              después de su publicación en la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              9. Contacto
            </h2>
            <p>
              Para cualquier consulta sobre estos términos, puedes
              contactarnos a través de nuestro WhatsApp de soporte.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
