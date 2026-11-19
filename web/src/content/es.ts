// ===== Textos en español. Todo el copy comercial vive aquí para aprobación de AMAE21. =====
export const es = {
  meta: {
    title: "AMAE21 Lofts | Hotel boutique en Del Valle, San Pedro Garza García",
    description: "Lofts boutique en el corazón del Centrito Valle. Reserva directo y recibe desayuno incluido o late checkout.",
  },
  nav: { home: "Inicio", rooms: "Cuartos", location: "Ubicación", book: "Reservar", faq: "Preguntas", privacy: "Privacidad" },
  cta: "Reservar directo",
  // Texto exacto por confirmar con AMAE21.
  benefitBanner: "Reserva directo: desayuno incluido o late checkout",
  home: {
    title: "Lofts boutique en el corazón del Centrito Valle",
    subtitle: "21 cuartos con diseño cálido, check-in sin contacto y todo a unos pasos.",
    highlightsTitle: "Por qué quedarte aquí",
    highlights: [
      { t: "Ubicación", d: "A pasos del Centrito Valle y la Calzada del Valle." },
      { t: "Check-in sin contacto", d: "Llega a tu hora, sin filas ni esperas." },
      { t: "Elevador", d: "Acceso cómodo a todos los niveles." },
      { t: "Terraza", d: "Un espacio para descansar al aire libre." },
    ],
    roomsTitle: "Nuestros cuartos",
    roomsCta: "Ver todos los cuartos",
    reviewsTitle: "Lo que dicen nuestros huéspedes",
    reviewsNote: "Reseñas pendientes de autorización por AMAE21.",
    reviews: [
      { q: "Reseña de ejemplo: texto por reemplazar con una reseña real y autorizada.", a: "Huésped — PLACEHOLDER" },
      { q: "Reseña de ejemplo: texto por reemplazar con una reseña real y autorizada.", a: "Huésped — PLACEHOLDER" },
    ],
    finalTitle: "Elige tu beneficio al reservar directo",
    finalText: "Desayuno incluido o late checkout, confirmado con tu reserva.",
  },
  rooms: {
    title: "Cuartos", intro: "Cuatro tipos de loft, todos pensados para sentirse en casa.",
    guests: "Hasta {n} personas", amenities: "Amenidades", view: "Ver cuarto", book: "Reservar", photoNote: "FOTO AMAE21",
  },
  location: {
    title: "Ubicación", intro: "Río Salinas 218, Col. Del Valle, San Pedro Garza García, N.L.",
    nearbyTitle: "Qué hay cerca",
    nearby: [
      { t: "Centrito Valle", d: "Restaurantes, cafés y vida nocturna a pasos." },
      { t: "Calzada del Valle", d: "Una de las avenidas más emblemáticas de San Pedro." },
      { t: "Parque Fundidora", d: "Parque, museos y eventos en Monterrey." },
      { t: "Cintermex", d: "Centro de convenciones y exposiciones." },
    ],
    gettingThereTitle: "Cómo llegar",
    gettingThere: "Desde el aeropuerto (MTY) llegas en auto en aproximadamente 35–45 minutos según tráfico. En app de transporte o taxi, indica “Río Salinas 218, Del Valle”. [POR CONFIRMAR con AMAE21: tiempos, estacionamiento y referencias]",
    openMap: "Abrir en Google Maps", mapTitle: "Mapa de AMAE21 Lofts",
  },
  book: {
    title: "Reservar", intro: "Reserva directo y elige tu beneficio. El pago se realiza de forma segura en nuestro motor de reservas.",
    benefit: "Beneficio por reservar directo", openNew: "¿No carga el motor? Ábrelo en una pestaña nueva",
    secure: "No cobramos nada fuera del motor de reservas.", loading: "Cargando motor de reservas…",
  },
  faq: {
    title: "Preguntas frecuentes", note: "Respuestas provisionales: AMAE21 debe confirmarlas antes de publicar.",
    items: [
      { q: "¿A qué hora es el check-in y el check-out?", a: "Check-in desde las [HH:MM] y check-out hasta las [HH:MM]. [POR CONFIRMAR] Con late checkout (beneficio de reserva directa, sujeto a disponibilidad) puedes salir más tarde." },
      { q: "¿Cómo funciona el check-in sin contacto?", a: "Te enviamos las instrucciones por WhatsApp antes de tu llegada. [POR CONFIRMAR]" },
      { q: "¿Hay estacionamiento?", a: "[POR CONFIRMAR: disponibilidad, costo y número de lugares]" },
      { q: "¿Aceptan mascotas?", a: "[POR CONFIRMAR: política de mascotas, cargo y restricciones]" },
      { q: "¿Puedo solicitar factura?", a: "[POR CONFIRMAR: proceso y plazo para facturación (CFDI)]" },
      { q: "¿Cómo obtengo el beneficio de reserva directa?", a: "Reserva en esta página. El beneficio (desayuno incluido o late checkout) se confirma con tu reserva. [POR CONFIRMAR: condiciones]" },
    ],
  },
  privacy: {
    title: "Aviso de privacidad",
    banner: "BORRADOR PROVISIONAL — debe ser validado por un abogado antes de publicarse.",
    sections: [
      { t: "Responsable", p: "[Razón social], con domicilio en Río Salinas 218, Col. Del Valle, San Pedro Garza García, N.L., es responsable del tratamiento de sus datos personales." },
      { t: "Datos que recabamos", p: "Nombre, número de WhatsApp y correo electrónico, proporcionados voluntariamente en el registro de huéspedes." },
      { t: "Finalidades", p: "Contactarle sobre su estancia y, solo si usted lo autoriza, enviarle información y ofertas de reserva directa." },
      { t: "Derechos ARCO y revocación", p: "Puede ejercer sus derechos de acceso, rectificación, cancelación y oposición, o revocar su consentimiento, escribiendo a [correo de privacidad]." },
      { t: "Cambios al aviso", p: "Cualquier cambio se publicará en esta página. Última actualización: [fecha]." },
    ],
  },
  register: {
    title: "Registro de huéspedes", intro: "Déjanos tus datos para recibir novedades y beneficios exclusivos en tu próxima reserva directa.",
    name: "Nombre completo", whatsapp: "WhatsApp (con lada)", email: "Correo electrónico",
    consent: "Acepto que AMAE21 Lofts me contacte por WhatsApp y correo con información y ofertas, conforme al",
    privacyLink: "aviso de privacidad", submit: "Enviar registro", sending: "Enviando…",
    ok: "¡Gracias! Tu registro quedó guardado.", error: "No pudimos guardar tu registro. Intenta de nuevo o avisa en recepción.",
    notConfigured: "El registro aún no está configurado (falta conectar Supabase).",
    errName: "Escribe tu nombre.", errWa: "Escribe un WhatsApp válido (10 dígitos o con lada internacional).",
    errEmail: "Escribe un correo válido.", errConsent: "Debes aceptar el consentimiento para registrarte.",
  },
  footer: { rights: "Todos los derechos reservados.", directNote: "Reserva directo para mejores beneficios." },
  whatsapp: { label: "Escríbenos por WhatsApp", message: "Hola, me gustaría información para reservar en AMAE21 Lofts." },
  hotelSchemaDescription: "Hotel boutique de 21 lofts en Del Valle, San Pedro Garza García, Nuevo León.",
};
export type Dict = typeof es;
