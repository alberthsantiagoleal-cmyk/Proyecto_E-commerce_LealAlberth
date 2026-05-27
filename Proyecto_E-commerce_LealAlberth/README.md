# Flow Street — E-commerce Deportivo

E-commerce de ropa deportiva y fútbol con panel de administración, desarrollado con HTML, CSS y JavaScript Vanilla. Sin frameworks, sin backend — todo funciona con `localStorage`.

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 | Estilos, animaciones, diseño responsive |
| JavaScript Vanilla | Lógica, módulos, Web Components |
| Web Components | Componentes reutilizables |
| localStorage | Persistencia de datos |
| Google Fonts | Tipografía Montserrat |

---

## Catálogo de Productos

La tienda incluye productos de las siguientes categorías:

- **Camisetas** — Camisetas mundialistas 2026 (Colombia, Brasil, Argentina, Francia)
- **Pantalones** — Joggers, cargos y shorts deportivos
- **Medias** — Medias de fútbol
- **Guayos** — Phantom GX, Predator Elite, F50 Elite

---

## Funcionalidades

### Tienda Pública (`index.html`)
- Hero section con imagen y llamado a la acción
- Catálogo dinámico de productos en grid responsive
- Buscador en tiempo real con scroll automático suave
- Filtro por categoría
- Carrito lateral con animación de entrada y salida suave
- Checkout con validación completa de formulario y email
- Persistencia del carrito entre sesiones

### Detalle de Producto (`product-detail.html`)
- Imagen ampliada del producto
- Nombre, categoría, precio y descripción
- Botón volver y botón agregar al carrito

### Panel de Administración (`admin.html`)
- Login con sesión persistente
- Sidebar con navegación entre módulos
- CRUD completo de **categorías** (crear, listar, editar, eliminar)
- CRUD completo de **productos** (código, nombre, categoría, precio, imagen URL, descripción)
- Módulo de **pedidos** ordenados del más reciente al más antiguo
- Vista de **detalle de pedido** con datos completos del cliente y productos
- Toast notifications en todas las acciones

---

## Web Components

| Componente | Uso |
|---|---|
| `<product-card>` | Tarjeta de producto en la tienda |
| `<cart-item-row>` | Fila de producto en el carrito |
| `<order-card>` | Tarjeta de pedido en el panel admin |

---

## Estructura del Proyecto

```
Proyecto_E-commerce_LealAlberth/
├── index.html
├── admin.html
├── product-detail.html
├── css/
│   ├── styles.css          # Estilos tienda pública
│   ├── admin.css           # Estilos panel admin
│   ├── product-detail.css  # Estilos detalle producto
│   └── responsive.css      # Media queries
├── js/
│   ├── app.js              # Renderizado, buscador y filtros
│   ├── auth.js             # Login, logout, sidebar
│   ├── categories.js       # CRUD categorías
│   ├── products.js         # CRUD productos
│   ├── cart.js             # Carrito y checkout
│   ├── orders.js           # Pedidos y detalle
│   ├── seed.js             # Datos iniciales (solo primera carga)
│   └── toast.js            # Notificaciones
└── components/
    ├── product-card.js
    ├── cart-item-row.js
    └── order-card.js
```

---

## Instalación

No requiere instalación ni dependencias.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/proyecto-ecommerce.git
   ```
2. Abre `index.html` en tu navegador para la tienda pública.
3. Abre `admin.html` para el panel de administración.

> Recomendado: usar la extensión **Live Server** en VS Code para evitar restricciones de CORS con imágenes externas.

---

## localStorage Keys

| Key | Contenido |
|---|---|
| `products` | Array de productos |
| `categories` | Array de categorías |
| `cart` | Array de productos en el carrito |
| `orders` | Array de pedidos realizados |
| `isAdminLogged` | Sesión activa del administrador |

---

## Autor

**Alberth Leal**  
Proyecto académico — JavaScript Vanilla E-commerce  
Grupo C3 · 2026
