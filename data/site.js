const ASSETS = {
  headerLogo: "https://www.bmsc.com.bo/_nuxt/img/header-logo.96143ea.svg",
  footerLogo: "https://www.bmsc.com.bo/_nuxt/img/bmsc-logo.54724f1.svg",
  reclamo: "https://www.bmsc.com.bo/_nuxt/img/puntoDeReclamo.bfe4ba6.png",
  card: (id) => `https://backportal.bmsc.com.bo:1443/api/bmsc-cards/cards/${id}/image/main`
};

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
    kicker: "e-Wallet",
    title: "Tu dinero evoluciona",
    kickerTitle: "KOIN",
    text: "Disfruta de una experiencia 100% digital con una e-wallet disponible 24/7 para comprar USDC mediante QR y mover tu dinero en Bolivia y el mundo.",
    cta: "Más Información",
    href: "/banca-24-7",
    note: "",
    image: ASSETS.card(4168)
  },
  {
    kicker: "Ahorro",
    title: "¡La MakroCuenta te da más posibilidades de ganar!",
    kickerTitle: "",
    text: "Porque sorteamos premios en efectivo.",
    cta: "Quiero saber más",
    href: "/cuentas",
    note: "¡Te enviamos tu tarjeta GRATIS!",
    image: ASSETS.card(657)
  },
  {
    kicker: "Ahorro",
    title: "¡Ahorra con Prime hasta el 6% de tasa!",
    kickerTitle: "",
    text: "Con Prime tus ahorros alcanzan un nuevo nivel de rendimiento. Disfruta de la caja de ahorro con la tasa de interés más alta del 6% anual y accede a una experiencia de ahorro con mayores beneficios.",
    cta: "Más Información",
    href: "/cuentas",
    note: "",
    image: ASSETS.card(4167)
  },
  {
    kicker: "Ahorro",
    title: "CUENTA EXPRESS",
    kickerTitle: "Haz que tu dinero trabaje para ti",
    text: "Empieza hoy y maximiza cada depósito con una cuenta diseñada para que tus ahorros crezcan más rápido.",
    cta: "Más información",
    href: "/cuentas",
    note: "",
    image: ASSETS.card(4115)
  },
  {
    kicker: "Inversión",
    title: "DPF SÚPER KING",
    kickerTitle: "",
    text: "Elige el DPF SÚPER KING a 361 días, con una tasa preferencial de 7.75%. Haz que tus ahorros crezcan seguros y con la fuerza de un rey.",
    cta: "Más Información",
    href: "/ahorro-a-plazo-fijo",
    note: "",
    image: ASSETS.card(4085)
  },
  {
    kicker: "Descuentos",
    title: "¡Tu próximo pedido viene con descuento!",
    kickerTitle: "",
    text: "Obtén 20% de descuento pagando con tu Tarjeta de Débito BMSC en Yango. Disfruta de tus restaurantes favoritos y ahorra hasta Bs 50 por pedido.",
    cta: "Más Información",
    href: "/tarjetas-de-credito",
    note: "",
    image: ASSETS.card(4165)
  },
  {
    kicker: "Promoción",
    title: "¡Gira la suerte y vive el Mundial con BMSC!",
    kickerTitle: "",
    text: "Abre tu Súper Makro Cuenta y sé parte de la experiencia más emocionante del fútbol: gira la Ruleta Mundialera y llévate premios al momento, como el álbum oficial del Mundial FIFA 2026 o sobres de figuras del Mundial.",
    cta: "Más Información",
    href: "/cuentas",
    note: "",
    image: ASSETS.card(4126)
  },
  {
    kicker: "Créditos",
    title: "Conoce el Fondo de Crédito de Apoyo a Micro Empresas",
    kickerTitle: "",
    text: "",
    cta: "Más información",
    href: "/prestamos",
    note: "",
    image: ASSETS.card(3986)
  },
  {
    kicker: "Créditos",
    title: "Información de Refinanciamiento y/o Reprogramación de Créditos",
    kickerTitle: "",
    text: "",
    cta: "Más Información",
    href: "/prestamos",
    note: "",
    image: ASSETS.card(4027)
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
    text: "Las mejores condiciones para acceder a tu sueño de una casa, un auto propio o un crédito con libre disponibilidad para viajar, pagar tus estudios o comprar lo que sea que necesites.",
    href: "/prestamos"
  },
  {
    icon: "gift",
    title: "Consulta de Puntos",
    text: "Averigua cuantos puntos tienes para canjearlos por los mejores productos y vales de consumo.",
    href: "/mis-productos"
  },
  {
    icon: "percent",
    title: "Descuentos",
    text: "Averigua todos los comercios en los cuales accedes a descuentos solo por pagar con tu tarjeta de débito o crédito del BMSC.",
    href: "/tarjetas-de-credito"
  },
  {
    icon: "coupon",
    title: "Cupones Makrocuenta",
    text: "Consulta cuantos cupones tienes asignados para el sorteo del día viernes",
    href: "/cuentas"
  },
  {
    icon: "invoice",
    title: "Facturación electrónica.",
    text: "Ponemos a tu disposición una plataforma donde encontrarás todas tus facturas.",
    href: "/banca-24-7"
  },
  {
    icon: "phone",
    title: "Call Center",
    text: "Recibe atención personalizada de nuestros ejecutivos y resuelve cualquier duda que tengas sobre nuestros productos y servicios",
    href: "/contactanos"
  }
];

const promos = [
  {
    title: "¡La MAKRO sigue premiando!",
    text: "Consulta todos los ganadores de la Súper Makro Cuenta. ¡El próximo puedes ser tú!",
    cta: "Ver lista de ganadores",
    href: "/cuentas",
    image: ASSETS.card(369)
  },
  {
    title: "Bienes adjudicados, Remate y de uso",
    text: "Encuentra tu próxima casa, vehículo o maquinaria a precios especiales con nuestros Bienes adjudicados, de remate o de uso.",
    cta: "Más Información",
    href: "/prestamos",
    image: ASSETS.card(371)
  },
  {
    title: "Beneficios con B, de BMSC",
    text: "Premiamos tu fidelidad, con las mejores ventajas del mercado; accede a Descuentos en los mejores comercios del país, acumula Puntos que pueden ser canjeados por múltiples productos y servicios. Además, puedes sumar Millas para viajar o pagar en Cuotas sin interés en diferentes comercios con tus Tarjetas de Crédito.",
    cta: "Más información",
    href: "/tarjetas-de-credito",
    image: ASSETS.card(3567)
  }
];

const channels = [
  { title: "Banca por internet", image: ASSETS.card(324), href: "/banca-24-7" },
  { title: "Banca móvil", image: ASSETS.card(325), href: "/banca-24-7" },
  { title: "Cajeros automáticos", image: ASSETS.card(326), href: "/banca-24-7" }
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
    lead: "Te brindamos cuentas para tu día a día. Te ayudamos a cuidar tus ahorros con las mejores tasas de interés y beneficios.",
    highlights: [
      "Súper Makro Cuenta: 5 premios de Bs. 10.000 cada viernes.",
      "Cuenta Prime con tasa de interés de hasta 6%.",
      "Cuenta Express y Súper Rendimax para hacer crecer tus depósitos."
    ]
  },
  prestamos: {
    title: "Préstamos",
    eyebrow: "Créditos",
    lead: "Financia tu casa, tu auto o un proyecto personal con plazos y cuotas claros desde el primer día.",
    highlights: [
      "Crédito de vivienda y vehículo con acompañamiento en cada etapa.",
      "Libre disponibilidad para estudios, viajes o consolidación de gastos.",
      "Fondo de crédito de apoyo a micro empresas."
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
      "DPF SÚPER KING a 361 días, con tasa preferencial de 7.75%.",
      "Plazos flexibles según tu meta de ahorro.",
      "Constitución en bolivianos o dólares, según disponibilidad."
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
      "App móvil para iOS y Android.",
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
  columns: [
    {
      title: "Aviso Legal",
      links: [
        { label: "Asfi", href: "https://www.asfi.gob.bo", external: true },
        { label: "Reglamentos Normativos", href: "/contactanos" }
      ]
    },
    {
      title: "Sobre el Banco",
      links: [
        { label: "Sobre Nosotros", href: "/contactanos" },
        { label: "Fundación BMSC", href: "/contactanos" },
        { label: "Súmate a Nuestro Equipo", href: "/contactanos" },
        { label: "RSE", href: "/contactanos" },
        { label: "Noticias Institucionales", href: "/contactanos" }
      ]
    },
    {
      title: "Ayuda",
      links: [
        { label: "Preguntas Frecuentes", href: "/contactanos" },
        { label: "Punto de Reclamo", href: "/contactanos" },
        { label: "Mapa de Sitio", href: "/contactanos" }
      ]
    },
    {
      title: "Otra Información",
      links: [
        { label: "Información Adicional", href: "/contactanos" },
        { label: "Tasas y Tarifario", href: "/contactanos" },
        { label: "Venta y Remate de Bienes", href: "/prestamos" },
        { label: "Consejos de Seguridad", href: "/contactanos" },
        { label: "Licitaciones Públicas", href: "/contactanos" }
      ]
    },
    {
      title: "Educación",
      links: [{ label: "Educación Financiera", href: "/plan-familia" }]
    }
  ]
};

module.exports = { ASSETS, segments, nav, slides, services, promos, channels, pages, footer };
