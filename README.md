# Teoría de Códigos

Sitio web educativo que reúne los proyectos de la materia **Teoría de Códigos**: herramientas
interactivas para experimentar con cifrado César, códigos lineales, matrices generadoras y códigos
duales. Publicado en [teoria-de-codigo.asprino.tech](https://teoria-de-codigo.asprino.tech/).

Integrantes: Sebastian Asprino, Aaron Cabrales, Brainer Gutiérrez y Oskleiderbeth Vásquez.

## Funcionalidades

| Página | Qué hace | Implementación |
| --- | --- | --- |
| `/cifrado-cesar` | Cifra y descifra texto con el cifrado César; la clave se elige con un slider (0–100) y el resultado se copia con un clic. | Lógica en **Rust compilada a WebAssembly** (`wasm-bindgen`), consumida desde React. |
| `/matriz` | Verifica si un código (palabras separadas por `, `) es lineal en la base indicada y, si lo es, calcula su base, sus parámetros `k`, `n`, `d` y la matriz generadora. | JavaScript puro (`src/component/matriz`). Enlace a un cuaderno de Google Colab para generar el código a partir de la matriz. |
| `/codigo-dual` | Acceso al cuaderno de Google Colab que identifica autodualidad / auto-ortogonalidad. | Enlace externo; `dual.js` contiene una implementación JS experimental. |

Otras características:

- Interfaz con [Material Web](https://github.com/material-components/material-web) (Web Components)
  integrados en React mediante `@lit/react`, con tema claro/oscuro automático según
  `prefers-color-scheme` (definido en `src/style/style.astro`).
- Navegación con View Transitions de Astro.
- Notificaciones con `toastr` al copiar resultados.

## Stack

- **Astro 4** (sitio estático) + **React 18** para las islas interactivas
- **Rust + wasm-bindgen** para el cifrado César (`wasm/TC_wasm`)
- Material Web, toastr, numeric
- TypeScript (`astro check`) para validar el proyecto antes del build

## Estructura

```text
.
├── astro_web_app/                 # Aplicación web (Astro)
│   ├── public/                    # Íconos y favicon
│   └── src/
│       ├── pages/                 # Rutas: index, cifrado-cesar, matriz, codigo-dual
│       ├── component/
│       │   ├── shared/material.js # Envoltorios React de los Web Components de Material
│       │   ├── cifrado_cesar/     # Selector cifrar/descifrar y formulario común (CesarForm)
│       │   ├── matriz/            # Linealidad, base, parámetros y matriz generadora
│       │   ├── codigo_dual/       # Página de código dual y algoritmo experimental
│       │   └── anuncios.astro     # Scripts de anuncios (Adsterra)
│       ├── style/                 # <head>, barra de navegación, botón de inicio y estilos globales
│       ├── css/                   # Paletas Material exportadas (claro/oscuro, contraste medio/alto); no importadas actualmente
│       └── wasm/pkg/              # Salida de wasm-pack consumida por la app
├── wasm/
│   ├── README.md                  # Guía para compilar Rust a WebAssembly
│   └── TC_wasm/                   # Crate de Rust con cifrar_cesar / descifrar_cesar
├── index.html, test.html          # Pruebas aisladas de Pyodide (no forman parte del sitio)
└── .github/workflows/ci.yml       # CI: astro check + build
```

## Desarrollo

Requisitos: Node.js 18+ y npm.

```sh
cd astro_web_app
npm ci            # Instala dependencias desde package-lock.json
npm run dev       # Servidor de desarrollo en http://localhost:4321
npm run build     # astro check + build estático en ./dist
npm run preview   # Sirve el build localmente
```

### Recompilar el módulo WebAssembly

Requiere [rustup](https://rustup.rs/) y `wasm-pack` (`cargo install wasm-pack`). Ver `wasm/README.md`.

```sh
cd wasm/TC_wasm
wasm-pack build --target web
```

El resultado de `pkg/` se copia a `astro_web_app/src/wasm/pkg/` (la app importa `hola_wasm.js`).

## Despliegue

`npm run build` genera un sitio estático en `astro_web_app/dist/`, publicable en cualquier hosting
estático. La URL pública se configura en `site` dentro de `astro_web_app/astro.config.mjs` y se usa
para generar la URL canónica de cada página.

## Integración continua

`.github/workflows/ci.yml` ejecuta `npm ci` y `npm run build` (incluye `astro check`) dentro de
`astro_web_app/` en cada push y pull request a `main`.
