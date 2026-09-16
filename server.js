const path = require("path");
const express = require("express");
const { ASSETS, segments, nav, slides, services, promos, channels, pages, footer } = require("./data/site");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.locals.ASSETS = ASSETS;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.ASSETS = ASSETS;
  res.locals.segments = segments;
  res.locals.nav = nav;
  res.locals.footer = footer;
  res.locals.currentPath = req.path;
  res.locals.segment = req.query.segment || "personas";
  res.locals.year = new Date().getFullYear();
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mercantil Santa Cruz listo en el puerto ${PORT}`);
});
