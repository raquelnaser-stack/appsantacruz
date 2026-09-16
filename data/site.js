const segments = [
  { id: "personas", label: "Personas", href: "/?segment=personas" },
  { id: "pyme", label: "PYME", href: "/pyme" },
  { id: "empresas", label: "Empresas", href: "/empresas" },
  { id: "banx", label: "BANX", href: "/banx" }
];

const nav = [
  { slug: "plan-familia", label: "Plan Familia" },
  { slug: "cuentas", label: "Cuentas" },
  { slug: "prestamos", label: "Préstamos" },
  { slug: "tarjetas-de-credito", label: "Tarjetas de Crédito" },
  { slug: "ahorro-a-plazo-fijo", label: "Ahorro a Plazo Fijo" },
  { slug: "giros", label: "Giros" },
  { slug: "seguros", label: "Seguros" },
  { slug: "banca-24-7", label: "Banca 24/7" },
  { slug: "contactanos", label: "Contáctanos" }
];

const slides = [
  {
    kicker: "Ahorro",
    title: "¡La MakroCuenta te da más posibilidades de ganar!",
    text: "Porque sorteamos premios en efectivo.",
    cta: "Quiero saber más",
    href: "/cuentas",
    note: "¡Te enviamos tu tarjeta GRATIS!",
    theme: "makro"
  },
  {
    kicker: "e-Wallet",
    title: "Tu dinero evoluciona",
    text: "Disfruta de una experiencia 100% digital con KOIN, disponible 24/7 para mover tu dinero en Bolivia y el mundo.",
    cta: "Más Información",
    href: "/banca-24-7",
    note: "Compra USDC al instante con QR",
    theme: "koin"
  },
  {
    kicker: "Beneficios",
    title: "¡Tu próximo pedido viene con descuento!",
    text: "Obtén 20% de descuento en restaurantes aliados al pagar con tu tarjeta BMSC.",
    cta: "Más Información",
    href: "/tarjetas-de-credito",
    note: "Beneficios con B, de BMSC",
    theme: "descuento"
  },
  {
    kicker: "Créditos",
    title: "El crédito que se adapta a tu siguiente paso",
    text: "Casa, auto o libre disponibilidad con condiciones pensadas para personas, PYME y empresas.",
    cta: "Simular ahora",
    href: "/prestamos",
    note: "Respuesta ágil y acompañamiento",
    theme: "credito"
  }
];

const services = [
  {
    icon: "savings",
    title: "Cuentas de Ahorro",
    text: "Abre una caja de ahorros con posibilidades de ganar dinero en efectivo o con una tasa de interés hasta 3.75%.",
    href: "/cuentas"
  },
  {
    icon: "credit",
    title: "Créditos",
    text: "Las mejores condiciones para acceder a tu sueño de una casa, un auto propio o un crédito con libre disponibilidad.",
    href: "/prestamos"
  },
  {
    icon: "gift",
    title: "Consulta de Puntos",
    text: "Averigua cuántos puntos tienes para canjearlos por los mejores productos y vales de consumo.",
    href: "/mis-productos"
  },
  {
    icon: "percent",
    title: "Descuentos",
    text: "Averigua todos los comercios en los cuales accedes a descuentos solo por pagar con tu tarjeta BMSC.",
    href: "/tarjetas-de-credito"
  },
  {
    icon: "coupon",
    title: "Cupones Makrocuenta",
    text: "Consulta cuántos cupones tienes asignados para el sorteo del día viernes.",
    href: "/cuentas"
  },
  {
    icon: "invoice",
    title: "Facturación electrónica",
    text: "Ponemos a tu disposición una plataforma donde encontrarás todas tus facturas.",
    href: "/banca-24-7"
  },
  {
    icon: "phone",
    title: "Call Center",
    text: "Recibe atención personalizada de nuestros ejecutivos y resuelve cualquier duda sobre productos y servicios.",
    href: "/contactanos"
  }
];

const promos = [
  {
    title: "¡La MAKRO sigue premiando!",
    text: "Consulta todos los ganadores de la Súper Makro Cuenta. ¡El próximo puedes ser tú!",
    cta: "Ver lista de ganadores",
    href: "/cuentas",
    tone: "green"
  },
  {
    title: "Bienes adjudicados, remate y de uso",
    text: "Encuentra tu próxima casa, vehículo o maquinaria a precios especiales con nuestros bienes adjudicados.",
    cta: "Más información",
    href: "/prestamos",
    tone: "sand"
  },
  {
    title: "Beneficios con B, de BMSC",
    text: "Descuentos, puntos canjeables, millas para viajar y cuotas sin interés en comercios aliados con tus tarjetas.",
    cta: "Más información",
    href: "/tarjetas-de-credito",
    tone: "mint"
  }
];

const pages = {
  "plan-familia": {
    title: "Plan Familia",
    eyebrow: "Personas",
    lead: "Un paquete de productos para organizar el día a día de tu hogar: cuenta, tarjetas y beneficios en un solo lugar.",
    highlights: [
      "Cuenta de ahorro para el hogar con tarjeta de débito sin costo de emisión.",
      "Acceso a Banca 24/7 y app móvil para toda la familia.",
      "Descuentos en comercios aliados al pagar con tarjetas BMSC."
    ]
  },
  cuentas: {
    title: "Cuentas",
    eyebrow: "Ahorro",
    lead: "Cajas de ahorro con posibilidades de ganar premios en efectivo o una tasa de interés competitiva.",
    highlights: [
      "MakroCuenta: participa en sorteos semanales con cupones automáticos.",
      "Apertura digital o en agencia, con tarjeta de débito enviada a domicilio.",
      "Consulta de saldos, movimientos y facturas desde Banca 24/7."
    ]
  },
  prestamos: {
    title: "Préstamos",
    eyebrow: "Créditos",
    lead: "Financia tu casa, tu auto o un proyecto personal con plazos y cuotas claros desde el primer día.",
    highlights: [
      "Crédito de vivienda y vehícular con acompañamiento en cada etapa.",
      "Libre disponibilidad para estudios, viajes o consolidación de gastos.",
      "Simulación orientativa en línea y evaluación con un ejecutivo."
    ]
  },
  "tarjetas-de-credito": {
    title: "Tarjetas de Crédito",
    eyebrow: "Beneficios",
    lead: "Paga en cuotas, acumula puntos y accede a descuentos en los mejores comercios del país.",
    highlights: [
      "Cuotas sin interés en establecimientos aliados.",
      "Puntos canjeables por productos, vales y experiencias.",
      "Control de consumos y pagos desde la app y Banca 24/7."
    ]
  },
  "ahorro-a-plazo-fijo": {
    title: "Ahorro a Plazo Fijo",
    eyebrow: "Inversiones",
    lead: "Haz crecer tu dinero con plazos definidos y tasas acordes al mercado boliviano.",
    highlights: [
      "Plazos flexibles según tu meta de ahorro.",
      "Constitución en bolivianos o dólares, según disponibilidad.",
      "Renovación automática o liquidación al vencimiento."
    ]
  },
  giros: {
    title: "Giros",
    eyebrow: "Transferencias",
    lead: "Envía y recibe dinero de forma ágil, con seguimiento y atención en agencias de todo el país.",
    highlights: [
      "Giros nacionales con acreditación rápida.",
      "Atención en red de agencias y canales digitales.",
      "Comisiones transparentes antes de confirmar el envío."
    ]
  },
  seguros: {
    title: "Seguros",
    eyebrow: "Protección",
    lead: "Cubre lo que más te importa: salud, vida, hogar y vehículo, con aliados especializados.",
    highlights: [
      "Pólizas pensadas para personas y familias.",
      "Contratación con asesoría en agencia o de forma digital.",
      "Acompañamiento en el proceso de denuncia y seguimiento."
    ]
  },
  "banca-24-7": {
    title: "Banca 24/7",
    eyebrow: "Canales digitales",
    lead: "Ahorra tiempo: opera cuando quieras desde la web, la app o la red de cajeros, sin filas innecesarias.",
    highlights: [
      "Transferencias, pagos de servicios y consulta de movimientos.",
      "App móvil para iOS y Android con acceso biométrico.",
      "Red de cajeros automáticos y puntos de atención en todo el país."
    ]
  },
  "mis-productos": {
    title: "Mis Productos",
    eyebrow: "Tu banca",
    lead: "Revisa el resumen de cuentas, tarjetas, créditos y beneficios asociados a tu perfil.",
    highlights: [
      "Vista unificada de productos contratados.",
      "Accesos rápidos a puntos, cupones y facturación.",
      "Este entorno es una demostración frontend; no conecta con banca real."
    ]
  },
  pyme: {
    title: "Banca PYME",
    eyebrow: "Negocios",
    lead: "Capital de trabajo, cuentas empresariales y medios de pago para hacer crecer tu empresa.",
    highlights: [
      "Cuentas y tarjetas para el flujo diario del negocio.",
      "Líneas de crédito y financiamiento de inventario.",
      "Acompañamiento de un ejecutivo PYME."
    ]
  },
  empresas: {
    title: "Banca Empresas",
    eyebrow: "Corporativo",
    lead: "Soluciones de tesorería, comercio exterior y financiamiento estructurado para compañías.",
    highlights: [
      "Cash management y pagos masivos.",
      "Comercio exterior y garantías.",
      "Mesa de dinero y productos a medida."
    ]
  },
  banx: {
    title: "BANX",
    eyebrow: "Digital",
    lead: "Una experiencia 100% digital para quienes quieren mover su dinero sin ir a una agencia.",
    highlights: [
      "Onboarding remoto y operación desde el celular.",
      "Productos de ahorro y pagos en un flujo simplificado.",
      "Soporte digital con respaldo de la red BMSC."
    ]
  }
};

const footer = {
  institutional: [
    { label: "ASFI", href: "https://www.asfi.gob.bo", external: true },
    { label: "Sobre Nosotros", href: "/contactanos" },
    { label: "Fundación BMSC", href: "/contactanos" },
    { label: "Súmate a Nuestro Equipo", href: "/contactanos" },
    { label: "RSE", href: "/contactanos" },
    { label: "Noticias Institucionales", href: "/contactanos" }
  ],
  help: [
    { label: "Preguntas Frecuentes", href: "/contactanos" },
    { label: "Punto de Reclamo", href: "/contactanos" },
    { label: "Mapa de Sitio", href: "/contactanos" },
    { label: "Educación Financiera", href: "/plan-familia" }
  ]
};

module.exports = { segments, nav, slides, services, promos, pages, footer };
