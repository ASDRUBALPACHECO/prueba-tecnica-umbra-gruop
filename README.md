# Ohana Beach House — Landing Page Inmobiliaria de Ultra-Lujo

> **Proyecto Desarrollado para la Prueba Técnica — Frontend / Fullstack (24 Horas)**  
> **Empresa / Evaluador:** Umbra Group  
> **Candidato:** Desarrollador Frontend / Fullstack  
> **Tema:** Lanzamiento de un proyecto residencial costero de ultra-lujo (*Ohana Beach House*)  
> **Repositorio:** Código fuente completo con Frontend (React 19 + TypeScript + Vite) y Backend (Node.js + Express + Persistencia JSON).

---

## 1. Visión del Proyecto y Enfoque de Diseño

Para esta prueba técnica concebí **Ohana Beach House**, una propuesta inmobiliaria ficticia de alta gama ubicada en un enclave costero reservado del Mediterráneo. Al no contar con un diseño previo en Figma ni guías de estilo dadas, asumí la autoría completa del criterio de producto, la identidad visual, la arquitectura de la información y la experiencia interactiva.

Mi objetivo fue alejarme de las típicas plantillas genéricas o soluciones basadas en gradientes saturados, apostando por una **estética editorial de lujo arquitectónico**:
- **Paleta Cromática Armónica:** Inspirada en canteras naturales de piedra caliza crema (`#fbf9f6`), arena dorada (`#fedeb2`), madera noble de cedro (`#725b38`) y contrastes profundos en azul noche/obsidiana (`#0c141d` y `#14202d`).
- **Tipografía Editorial:** Uso de fuentes Google Fonts de alta legibilidad (*Plus Jakarta Sans* y *Outfit*) con jerarquía estricta mediante *font-label-caps* y tracking espaciado.
- **Riqueza Sensorial e Interactiva:** Modelado 3D en tiempo real con WebGL, animaciones guiadas por el desplazamiento (*scroll-driven motion*), simulación de física de cámara y un backend funcional con persistencia en disco.

---

## 2. Requisitos del Sistema

Siguiendo las pautas de la prueba técnica de Umbra Group, identifiqué y desglosé los requisitos en dos grupos:

### 2.1. Requisitos Funcionales (RF)

| ID | Requisito Funcional | Implementación y Módulo en Código |
| :--- | :--- | :--- |
| **RF-01** | **Hero con Movimiento:** Portada con título, subtítulo, navegación, CTA e imagen con efecto de desplazamiento continuo. | `src/components/Hero.tsx` con parallax vertical suave atado al scroll (`useTransform`). |
| **RF-02** | **Proyecto & Manifiesto:** Bloque de concepto con texto e imágenes que se animan suavemente al entrar al viewport. | `src/components/Concepto.tsx` con `TextReveal`, 4 pilares biofílicos y modal de certificación internacional. |
| **RF-03** | **Cifras Dinámicas:** Indicadores clave del proyecto renderizados dinámicamente desde datos. | `src/components/Cifras.tsx` y `src/components/AnimatedCounter.tsx` con contadores animados por intersección. |
| **RF-04** | **Carrusel de Amenidades:** Carrusel interactivo donde seleccionar una amenidad despliega información y visuales específicos. | `src/components/Amenidades.tsx` con scroll horizontal táctil y modal de detalle con horarios y servicios. |
| **RF-05** | **Catálogo de Tipologías (Mín. 4):** Exhibición de al menos 4 inmuebles con filtrado por categorías/tabs y vista detallada. | `src/components/Tipologias.tsx` con 4 tipologías reales (*Garden Villa*, *Oceanfront Suite*, *Sky Penthouse*, *Signature Estate*). |
| **RF-06** | **Dossier Arquitectónico:** Ficha técnica profunda con planos acotados, memoria de calidades y visor de alta definición. | `src/components/DossierModal.tsx` con pestañas de Ficha Técnica, Plano Espacial y Memoria de Materiales. |
| **RF-07** | **Experiencia Inmersiva:** Bloque visual de alto impacto con efecto parallax cinemático. | `src/components/Experiencia.tsx` con traslación en eje opuesto y redirección fluida a la consulta privada. |
| **RF-08** | **Mapa de Ubicación Interactivo:** Representación del enclave con al menos 3 puntos de interés interactivos. | `src/components/Ubicacion.tsx` con mapa costero vectorial SVG, 3 pines de radar (*Ohana*, *Marina*, *Aeropuerto*) y popover dinámico de tiempos de traslado. |
| **RF-09** | **Formulario de Contacto Funcional:** Formulario con nombre, email, teléfono, residencia de interés, mensaje y validaciones. | `src/components/Contacto.tsx` con validación estricta, llamada a API asíncrona y tarjeta de confirmación con recibo de folio. |
| **RF-10** | **Menú Móvil con Animación:** Navegación responsive tipo Drawer lateral con apertura y cierre fluidos. | `src/components/Header.tsx` con botón hamburguesa morphing y panel lateral con `AnimatePresence`. |
| **RF-11** | **Backend y Consumo Asíncrono de Datos:** La información no debe estar hardcodeada en el marcado HTML; debe servirse mediante una API. | `server.ts` con Express sirviendo endpoints REST (`/api/residences`, `/api/amenidades`, etc.) y `src/services/api.ts` con estados de carga y error. |
| **RF-12** | **Persistencia Real de Solicitudes:** Registro en disco de los formularios de contacto enviados. | `server/inquiries.json` almacena las solicitudes de clientes con fecha, folio oficial y tipología seleccionada. |
| **RF-13** | **Internacionalización Bilingüe (ES / EN):** Soporte de cambio de idioma en tiempo real que afecte a toda la aplicación. | `LanguageContext.tsx` y conmutador `ES / EN` en el Header que consulta `/api/content/:lang`. |
| **RF-14** | **Simulador Financiero / Calculadora:** Cálculo interactivo de inversión, financiamiento y retorno. | `src/components/CalculadoraInversion.tsx` con sliders interactivos de enganche, plazos de obra, plusvalía y ocupación. |
| **RF-15** | **Descarga de Dossier en PDF:** Capacidad de exportar la ficha de cualquier residencia en un documento descargable. | `src/services/pdfGenerator.ts` integrando `jsPDF` y `html2canvas` para generar el PDF en el navegador. |

---

### 2.2. Requisitos No Funcionales (RNF)

| ID | Requisito No Funcional | Solución Implementada |
| :--- | :--- | :--- |
| **RNF-01** | **Rendimiento de Carga y Ejecución:** Carga rápida sin cuellos de botella y animaciones a 60 FPS. | Vite 6 como bundler ultrarrápido; texturas e imágenes servidas en tamaño optimizado 2048px; animaciones delegadas a la GPU mediante `transform: translateY` y `opacity`. |
| **RNF-02** | **Responsive Design Real:** Experiencia móvil adaptada y táctil, sin scroll horizontal accidental. | Sistema de layout con CSS Grid y Flexbox fluido; carruseles con scroll-snap nativo por gestos táctiles; media queries para breakpoints móviles (`< 768px`) y desktop. |
| **RNF-03** | **Accesibilidad (A11y):** Inclusión para usuarios con sensibilidades y tecnologías de asistencia. | Detección nativa de `prefers-reduced-motion` con el hook `useReducedMotion()`; estructura semántica (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`); atributos ARIA (`aria-modal`, `role="dialog"`, `aria-label`) y estados de foco visibles (`:focus-visible`). |
| **RNF-04** | **Calidad y Mantenibilidad del Código:** Arquitectura limpia y extensible sin duplicación de lógica. | TypeScript en modo estricto en frontend y backend; tipado de modelos de datos en `types.ts`; desacoplamiento entre componentes visuales, servicios de red y estilos CSS. |
| **RNF-05** | **Tolerancia a Fallos y Manejo de Estados:** La app no debe romperse si falla una petición de red. | Implementación de estados de carga con *Skeleton Loaders*, captura de excepciones `try/catch` en `ApiService` con mensajes amigables y botones de reintento. |
| **RNF-06** | **Seguridad en Entrada de Datos:** Sanitización de formularios y prevención de datos malformados. | Validación de formato de correo y teléfono mediante expresiones regulares; verificación de políticas de privacidad; prevención de inyección en endpoints de Express. |
| **RNF-07** | **Optimización SEO y Redes Sociales:** Indexación semántica y tarjetas sociales enriquecidas. | `index.html` con etiquetas Open Graph completas (`og:title`, `og:image`, `og:description`), meta tags de geolocalización y marcado estructurado JSON-LD con esquema de arquitectura residencial. |

---

## 3. Instrucciones de Instalación y Ejecución

He configurado el proyecto para que tanto el servidor de frontend como el backend de Express se ejecuten de manera simultánea y sencilla.

### Prerrequisitos
- **Node.js:** Versión 18 o superior (probado y optimizado en Node 20 / 22 LTS).
- **NPM:** Gestor de paquetes incluido con Node.js.

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd ohana-beach-house
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el proyecto en modo desarrollo:**
   Para ejecutar el Frontend y el Backend simultáneamente:
   ```bash
   # Terminal 1: Iniciar el servidor Backend Express (Puerto 3001)
   npm run server

   # Terminal 2: Iniciar el servidor de desarrollo Vite (Puerto 3000)
   npm run dev
   ```
   *Nota: Si solo inicias el frontend con `npm run dev`, la aplicación cuenta con un fallback local inteligente en `ApiService` que asegura que los datos y tipologías se visualicen incluso sin el backend encendido.*

4. **Acceder a la aplicación:**
   Abre en tu navegador: **`http://localhost:3000/`**

5. **Ejecutar pruebas automatizadas:**
   ```bash
   npm run test
   ```
   *Ejecuta la suite de Vitest con 11 pruebas unitarias sobre los servicios y validaciones.*

6. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 4. Arquitectura y Estructura del Código

El proyecto sigue una arquitectura desacoplada y orientada a componentes modulares:

```
ohana-beach-house/
├── docs/                                 # Documento base de la prueba técnica de Umbra Group
├── public/                               # Activos estáticos públicos
├── server/                               # Backend de datos e internacionalización
│   ├── db.ts                             # Base de datos en memoria para residencias y amenidades
│   ├── inquiries.json                    # Archivo de persistencia de formularios de contacto recibidos
│   └── translations.ts                   # Diccionario bilingüe maestro (Español e Inglés)
├── src/
│   ├── components/                       # Componentes de interfaz de usuario desacoplados
│   │   ├── Amenidades.tsx / .css         # Carrusel interactivo y modal con Lightbox Ultra-HD
│   │   ├── AnimatedCounter.tsx           # Contador numérico acelerado por requestAnimationFrame
│   │   ├── BottomNav.tsx / .css          # Dock de navegación flotante inferior para móviles
│   │   ├── CalculadoraInversion.tsx/.css # Simulador financiero editorial (sin gradientes)
│   │   ├── Cifras.tsx / .css             # Tarjetas de dimensiones y métricas del complejo
│   │   ├── Concepto.tsx / .css           # Manifiesto arquitectónico, 4 pilares y galardón
│   │   ├── Contacto.tsx / .css           # Formulario con validación y recibo de folio real
│   │   ├── DossierModal.tsx / .css       # Modal de ficha técnica, plano acotado y memoria de materiales
│   │   ├── Experiencia.tsx / .css        # Sección inmersiva con efecto de scroll
│   │   ├── Footer.tsx / .css             # Pie de página semántico con navegación y sellos LEED
│   │   ├── Header.tsx / .css             # Barra superior fija, selector ES/EN y drawer móvil
│   │   ├── Hero.tsx / .css               # Portada con parallax vertical desacoplado
│   │   ├── MagneticButton.tsx            # Microinteracción con atracción magnética al cursor
│   │   ├── ModelViewer3D.tsx / .css      # Visor 3D WebGL Three.js con órbita, auto-giro y modos
│   │   ├── ScrollProgressBar.tsx         # Barra superior de progreso de lectura dorada
│   │   ├── TextReveal.tsx                # Efecto de texto con máscara cinemática
│   │   ├── Tipologias.tsx / .css         # 4 residencias, filtros y skeletons de carga
│   │   └── Ubicacion.tsx / .css          # Mapa interactivo costero con popovers y pines
│   ├── context/
│   │   └── LanguageContext.tsx           # Proveedor de estado global de idioma (ES / EN)
│   ├── hooks/
│   │   └── useBodyScrollLock.ts          # Bloqueo accesible de scroll al abrir modales
│   ├── services/
│   │   ├── api.ts                        # Cliente HTTP con fallback, loading y reintentos
│   │   ├── api.test.ts                   # Suite de pruebas unitarias con Vitest
│   │   └── pdfGenerator.ts               # Motor de generación de Dossier PDF con jsPDF
│   ├── types.ts                          # Interfaces y contratos de tipos TypeScript
│   ├── App.tsx                           # Ensamblador principal de la landing page
│   └── index.css                         # Tokens de diseño, tipografías e imagen rendering
├── server.ts                             # Servidor Express REST con endpoints bilingües y persistencia
├── index.html                            # HTML5 semántico con SEO, OpenGraph y JSON-LD
├── tsconfig.json                         # Configuración estricta de compilador TypeScript
└── vite.config.ts                        # Configuración de empaquetado y plugins de Vite
```

---

## 5. Ingeniería de Efectos, Animaciones y Modelado 3D

En este apartado detallo cómo implementé técnicamente cada interacción clave y el funcionamiento interno de las animaciones:

### 5.1. Efecto Parallax Vertical en Portada y Experiencia
Para lograr un movimiento de profundidad óptico sin ralentizar la tasa de refresco del navegador, utilicé la biblioteca `motion/react`:
- En [`Hero.tsx`](file:///c:/Users/asdru/Downloads/ohana-beach-house/src/components/Hero.tsx), vinculo el scroll vertical a la referencia del contenedor mediante `useScroll({ target: containerRef, offset: ['start start', 'end start'] })`.
- Aplico `useTransform` para mapear el progreso `[0, 1]` a una traslación vertical `['0%', '28%']` en la imagen de fondo y `['0%', '16%']` en la capa de texto. Esto crea una sensación tridimensional de planos independientes.
- **Accesibilidad responsable:** Si el usuario tiene activado el modo de reducción de movimiento en su sistema operativo, `useReducedMotion()` intercepta el valor y fija la traslación en `['0%', '0%']`, garantizando el confort visual.

### 5.2. TextReveal y Animaciones de Entrada (Scroll Reveal)
- En [`TextReveal.tsx`](file:///c:/Users/asdru/Downloads/ohana-beach-house/src/components/TextReveal.tsx), divido el contenido visual y le aplico una máscara de recorte (`clip-path: inset(0% 0% 0% 0%)`).
- El componente monitorea su entrada en pantalla con `whileInView` y un umbral `amount: 0.3`, disparando una curva bezier cúbica `[0.16, 1, 0.3, 1]` que simula la aceleración y frenado natural de una cámara de cine.

### 5.3. Contadores Numéricos Dinámicos con Aceleración Cúbica
- En [`AnimatedCounter.tsx`](file:///c:/Users/asdru/Downloads/ohana-beach-house/src/components/AnimatedCounter.tsx), no utilizo librerías externas pesadas. Implementé una función de interpolación basada en `requestAnimationFrame` que arranca cuando el elemento intersecta el viewport mediante un `IntersectionObserver`.
- El progreso se suaviza con una función de *easeOutExpo*:
  $$\text{progreso} = 1 - 2^{-10 \cdot t}$$
  Esto hace que los números comiencen rápido y frenen con precisión milimétrica en el valor meta, formateándose con `Intl.NumberFormat`.

### 5.4. Modelado 3D WebGL con Three.js (`ModelViewer3D.tsx`)
En lugar de cargar pesados modelos `.gltf` o `.obj` de decenas de megabytes que arruinarían la métrica de *Largest Contentful Paint* (LCP), **le pedí a la IA que diseñara y construyera proceduralmente la geometría arquitectónica en código con Three.js, al ser esto una tecnologia que desconocía junto a su libreria, opté por la IA para la generacion de esta y monitoree su rendimiento y optimización para web**:
1. **Generación Paramétrica por Residencia:**
   - **Overview:** Maqueta general del acantilado con plataformas escalonadas de piedra caliza, módulos residenciales y muelle costero.
   - **Garden Villa:** Planta baja expandida con muros de contención, piscina de inmersión y jardín biofílico.
   - **Oceanfront Residence:** Doble voladizo acristalado sobre el mar con pérgolas perimetrales y solárium frontal.
   - **Sky Penthouse:** Corona del complejo con rooftop abierto, barandillas transparentes y mástil arquitectónico.
   - **Cliffside Estate:** Geometría escalonada integrada verticalmente en la roca con accesos privados y terraza volada.
2. **Materiales PBR Realistas:**
   - Caliza Navona mate (`roughness: 0.85`), carpintería de cedro termotratado (`roughness: 0.6`) y ventanales reflectantes translúcidos (`transmission: 0.9`, `roughness: 0.1`).
3. **Simulación Dinámica del Océano:**
   - En cada cuadro del bucle `requestAnimationFrame`, recorro la geometría de una malla de agua plana de 128 subdivisiones, deformando sus vértices con una ecuación senoidal doble:
     $$z(x, y, t) = \sin(x \cdot 0.15 + t \cdot 1.2) \cdot 0.12 + \cos(y \cdot 0.15 + t \cdot 0.9) \cdot 0.08$$
     Esto crea un oleaje continuo y realista con brillos especulares.
4. **Controles Orbitales Matemáticos con Inercia:**
   - Implementé manualmente el cálculo de coordenadas esféricas (radio $r$, ángulo polar $\phi$ y ángulo azimutal $\theta$) para permitir orbitar con el ratón o el dedo táctil, con límites de inclinación para evitar giros desorientadores.
5. **Transición Cinemática entre Residencias:**
   - Al seleccionar una residencia en el selector HUD, la cámara no se corta bruscamente; utiliza interpolación vectorial `Vector3.lerp` para desplazarse suavemente hacia las coordenadas óptimas de la residencia elegida.
6. **Selector de Iluminación y Modo Blueprint CAD:**
   - **Golden Hour vs. Twilight:** Conmuta la luz direccional del sol y la luz ambiental entre un crepúsculo cálido (`#ffeedd`) y una noche azulada (`#2a4060`), ajustando sombras `PCFSoftShadowMap`.
   - **Studio vs. Blueprint:** Cambia los materiales fotorrealistas por un renderizado de líneas alámbricas (*wireframe*) en azul cian luminiscente para inspeccionar la estructura arquitectónica.
7. **Pausa Funcional de Auto-Rotación:**
   - El botón de giro automático cuenta con una bandera de control en `useRef` que permite pausar y reanudar la rotación sin trabarse.

### 5.5. Visor Lightbox Ultra-HD en 2048px
- Detecté que los enlaces de imágenes servían miniaturas comprimidas. Modifiqué la base de datos para solicitar imágenes con parámetro `=s2048` e implementé un visor modal a pantalla completa con desenfoque de fondo (`backdrop-filter: blur(16px)`) y propiedad CSS `image-rendering: -webkit-optimize-contrast` para apreciar cada detalle constructivo en ultra alta definición.

### 5.6. Calculadora Financiera de Inversión (Cero Gradientes)
- En [`CalculadoraInversion.tsx`](file:///c:/Users/asdru/Downloads/ohana-beach-house/src/components/CalculadoraInversion.tsx), diseñé una ficha financiera limpia basada en bordes finos y tarjetas neutras:
  - **Cuota de construcción:** $\text{Saldo a Financiar} = \text{Precio} - \text{Enganche} - \text{Entrega}$; luego se divide entre los meses elegidos (18, 24 o 36).
  - **Plusvalía a 5 años con interés compuesto:** $V_5 = P \cdot (1 + r)^5$.
  - **Rentabilidad de renta vacacional:** Basada en tarifa diaria estimada y días ocupados al año, deduciendo costes operativos del 28%.

---

## 6. Backend, Persistencia y API en Tiempo Real

Para dar estricto cumplimiento al criterio del pliego de **"evitar páginas completamente hardcodeadas"**, desarrollé un servidor Express en TypeScript ([`server.ts`](file:///c:/Users/asdru/Downloads/ohana-beach-house/server.ts)):

### 6.1. Endpoints de la API REST
- `GET /api/residences?lang=:lang`: Retorna el catálogo completo de las 4 residencias traducidas.
- `GET /api/amenities?lang=:lang`: Retorna las 6 amenidades de club privado con sus descripciones y horarios.
- `GET /api/locations?lang=:lang`: Retorna los 3 puntos de radar del mapa.
- `GET /api/calculator?lang=:lang`: Retorna las opciones de inmuebles con sus precios en USD para la calculadora.
- `GET /api/content/:lang`: Retorna todo el árbol editorial bilingüe (ES / EN) consumido por `LanguageContext`.
- `POST /api/contact/inquiry`: Procesa las solicitudes del formulario de contacto.

### 6.2. Persistencia en Disco y Respuestas Personalizadas
- Al enviar el formulario de contacto, el backend valida que los campos requeridos estén presentes y que la política de privacidad haya sido aceptada.
- Genera un código de folio único con formato criptográfico `OBH-XXXXXX`.
- **Persiste la solicitud en disco:** Guarda el registro completo en el archivo [`server/inquiries.json`](file:///c:/Users/asdru/Downloads/ohana-beach-house/server/inquiries.json).
- **Respuesta real y personalizada:** Devuelve un mensaje formulado en el idioma del cliente (`es` o `en`), mencionando su nombre, la tipología de su interés y el plazo de contacto de 2 horas.

---

## 7. Uso de IA (Sección Obligatoria del Documento Umbra Group)

Siguiendo la plantilla requerida en la sección 11 del documento de la prueba técnica, declaro con total transparencia el uso de Inteligencia Artificial en el desarrollo de este proyecto:

### Herramienta(s):
- **Antigravity AI Coding Assistant (Google DeepMind)** operando con el modelo **Gemini**.

### Para qué la utilicé:
1. **Asistencia en Diseño Visual y Dirección de Arte:**
   - La utilicé para definir una paleta cromática sofisticada orientada al mercado inmobiliario ultra-prime (piedra caliza crema, arena dorada, madera de cedro y fondo oscuro medianoche para el visor 3D).
   - Para estructurar la composición visual y jerarquía tipográfica sin depender de bibliotecas pesadas de componentes.
   - Para pulir la maquetación editorial de la calculadora financiera, eliminando gradientes artificiales y logrando una presentación tipo *memorándum de inversión* sobrio y elegante.
2. **Asistencia en el Modelado 3D y Shaders Procedurales:**
   - Para plantear la geometría paramétrica inicial de cada una de las 5 configuraciones de Three.js (la disposición de voladizos, pérgolas, soláriums y escalones en el acantilado rocoso).
   - Para derivar las funciones matemáticas de deformación senoidal de vértices que simulan el oleaje del océano en tiempo real.
   - Para estructurar las matrices de iluminación bifásica (luz cálida crepuscular de Golden Hour vs. luz fría nocturna Twilight) y el cambio a modo Blueprint CAD (wireframe).
3. **Optimización y Refactorización:**
   - Generación de la suite de pruebas unitarias con Vitest.
   - Expansión de diccionarios bilingües exhaustivos en el backend para una traducción 100% íntegra al inglés.

### Código o partes asistidas:
- `src/components/ModelViewer3D.tsx`: Rutinas matemáticas de Three.js para la creación de mallas procedurales y el bucle de render con oscilación senoidal.
- `server.ts` y `server/translations.ts`: Estructura del servidor Express, persistencia en archivo `inquiries.json` y los árboles de traducción bilingüe.
- `src/services/api.ts` y `src/services/pdfGenerator.ts`: Scaffolding del cliente HTTP desacoplado y la lógica de renderizado de lienzo para exportación a PDF.
- `src/components/CalculadoraInversion.tsx`: Fórmulas de interés compuesto para plusvalía acumulada a 5 años y desgloses de financiamiento mensual.

### Qué revisé/modifiqué:
- **Control del 3D y Render:** Modifiqué los parámetros de cámara, límites de inclinación polar y el cálculo de inercia del ratón para asegurar que el usuario nunca quedara desorientado debajo del suelo o con la vista invertida.
- **Corrección del Botón de Giro Automático:** Detecté que el botón de auto-rotación original quedaba en bucle infinito debido a una variable de estado que se pisaba; lo refactoricé utilizando una referencia mutable `useRef` para garantizar una pausa y reactivación instantánea y confiable.
- **Eliminación de Elementos Redundantes:** Retiré el modal simulado de tour virtual y el botón de audio procedural de oleaje para mantener el foco en la interacción inmobiliaria real y en el modelado 3D.
- **Alineación Estricta al Pliego Técnico:** Verifiqué manualmente que existieran 4 tipologías completas (superando el mínimo exigido), que los 4 pilares y la certificación del jurado se tradujeran completamente al inglés, y que la persistencia en el backend fuera real.
- **Accesibilidad y Rendimiento:** Implementé manualmente las comprobaciones de `prefers-reduced-motion` en cada sección con movimiento.

### Decisiones técnicas tomadas por mí:
- **Geometría Procedural en Three.js vs. Carga de Archivo `.gltf` Externo:** Opté deliberadamente por construir las mallas de las residencias mediante código paramétrico. Cargar un modelo 3D externo de 40 MB habría destruido el tiempo de carga móvil de la landing page; la solución en código pesa apenas unas pocas líneas y renderiza instantáneamente a 60 FPS.
- **Mantener el Conmutador de Luz solo dentro del Visor 3D:** Decidí mantener el selector *Golden Hour / Twilight* dentro del visor 3D para permitir al inversionista evaluar la residencia bajo distintas condiciones de luz solar.
- **Persistencia en JSON vs. Base de Datos Compleja:** El pliego indicaba expresamente que no era obligatorio usar base de datos. Elegí un archivo `server/inquiries.json` estructurado, lo cual garantiza persistencia real en disco sin requerir configuraciones de contenedores Docker o bases de datos externas para la evaluación.
- **Arquitectura de Traducción desde el Backend:** En lugar de utilizar librerías cliente estáticas como `i18next` con JSONs empotrados en el bundle, creé un endpoint `/api/content/:lang`. Esto simula un Headless CMS real de nivel empresarial.

### Problemas encontrados en código generado y cómo los solucioné:
1. **Pérdida de nitidez al ampliar imágenes:** La IA inicialmente utilizó enlaces directos que cargaban miniaturas de baja resolución. Lo solucioné modificando las URLs de Google User Content para incluir el parámetro `=s2048`, forzando el renderizado de alta fidelidad, y agregué un visor Lightbox a pantalla completa con `image-rendering: -webkit-optimize-contrast`.
2. **Textos en español persistentes al cambiar a inglés:** Algunas secciones (como los pilares arquitectónicos, descripciones de las residencias 3D y notas de la calculadora) permanecían en español porque leían constantes locales. Lo resolví unificando todas las fuentes de texto en `server/translations.ts` y conectándolas a través del hook `useLanguage()`.
3. **Petición del formulario sin persistencia real:** Inicialmente el backend solo respondía con un JSON en memoria que se perdía al reiniciar. Implementé la lectura y escritura sincrónica en `server/inquiries.json` para que cada consulta quede guardada de forma permanente y auditable.

---