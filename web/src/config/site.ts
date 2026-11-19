// ===== Datos del negocio y ajustes. AMAE21 aprueba/edita este archivo. =====
export const site = {
  // DEMO: true = maqueta para enseñar el diseño. Reservar muestra un marcador en lugar del motor
  // de Cloudbeds y /registro NO guarda nada. Poner en false (NEXT_PUBLIC_DEMO=false) para conectar todo.
  demo: process.env.NEXT_PUBLIC_DEMO !== "false",
  name: "AMAE21 Lofts",
  // Dominio donde se publica (dominio de prueba por ahora; NO amae21.com hasta aprobación).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://amae21-test.pages.dev",
  // false mientras esté en dominio de prueba: bloquea indexación (robots + noindex).
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  address: {
    street: "Río Salinas 218",
    colony: "Col. Del Valle",
    city: "San Pedro Garza García",
    region: "Nuevo León",
    postalCode: "66220", // POR CONFIRMAR
    country: "MX",
  },
  geo: { lat: 25.657751, lng: -100.36422 },
  rooms: 21,
  // Contacto — POR CONFIRMAR con el operador.
  whatsapp: "5218100000000", // formato internacional sin "+" ni espacios. PLACEHOLDER
  phone: "+52 81 0000 0000", // PLACEHOLDER
  email: "reservas@amae21.com", // PLACEHOLDER
  instagram: "https://www.instagram.com/", // PLACEHOLDER
  // Motor de reservas existente. No se cobra nada fuera de Cloudbeds.
  cloudbedsUrl: "https://hotels.cloudbeds.com/reservation/SHqMef",
  // Analítica: Plausible (sin cookies). Dejar vacío para desactivar.
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
  // Registro de huéspedes (Supabase). Ver supabase/schema.sql
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  // Versión del texto de consentimiento; súbela cuando el aviso de privacidad cambie.
  consentVersion: "2026-11-placeholder",
} as const;

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
