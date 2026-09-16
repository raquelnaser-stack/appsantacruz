# Mercantil Santa Cruz (demo Node.js)

Sitio web de demostración inspirado en la banca de personas de Mercantil Santa Cruz. Corre en Node.js con Express y plantillas EJS.

## Cómo iniciarlo

```bash
npm install
npm start
```

Abre [http://localhost:3000](http://localhost:3000).

En desarrollo puedes usar `npm run dev` para recargar el servidor al guardar.

## Qué incluye

- Portada con carrusel, menú de productos y secciones de beneficios
- Páginas internas (cuentas, préstamos, tarjetas, Banca 24/7, PYME, empresas, BANX)
- Formulario de contacto de prueba (no envía datos a un banco real)

## GitHub y DigitalOcean

Repositorio: [github.com/raquelnaser-stack/appsantacruz](https://github.com/raquelnaser-stack/appsantacruz)

En DigitalOcean App Platform:

1. Create App → GitHub → `raquelnaser-stack/appsantacruz`, rama `main`
2. Entorno Node.js, comando `npm start`
3. El servicio usa `PORT` automáticamente y responde en `/health`

Este proyecto es un frontend de demostración. No reemplaza al sitio oficial ni a la banca por internet.
