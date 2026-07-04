# Café Aroma — Landing Page + Panel de Administración de Productos

Proyecto full-stack para una cafetería: una **landing page pública** (menú, historia, contacto) construida con React y un **panel administrativo** (dashboard + CRUD de productos) construido sobre Django REST Framework.

---

## 📦 Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Backend | Django 5.2 + Django REST Framework |
| Base de datos | SQLite (desarrollo) |
| Frontend | React 19 + Vite + React Router |
| Estilos | Tailwind CSS v4 (paleta café/madera personalizada) |
| Iconos | react-icons |

---

## 📁 Estructura del proyecto

```
Gestión-Productos-Django-React/
├── BACKEND/
│   ├── config/              # Settings, urls, wsgi/asgi
│   ├── core/
│   │   ├── models.py        # Modelo Producto (nombre, categoría, precio, stock, imagen...)
│   │   ├── admin.py
│   │   ├── api/
│   │   │   ├── serializers.py
│   │   │   ├── views.py     # CRUD + endpoint /stats/
│   │   │   └── urls.py
│   │   ├── migrations/
│   │   └── management/commands/populate_data.py
│   ├── media/                # Imágenes subidas de productos
│   ├── static/                # Estáticos (favicon, imagen default)
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
└── FRONTEND/
    ├── src/
    │   ├── pages/
    │   │   ├── Landing.jsx    # Landing pública ("/")
    │   │   └── Dashboard.jsx  # Dashboard admin ("/admin/productos")
    │   ├── components/
    │   │   ├── AdminLayout.jsx
    │   │   ├── AdminAccessModal.jsx
    │   │   ├── ProductForm.jsx
    │   │   ├── ProductList.jsx
    │   │   ├── DeleteConfirmModal.jsx
    │   │   ├── StatsCards.jsx
    │   │   ├── StockByCategoryChart.jsx
    │   │   ├── RecentProducts.jsx
    │   │   └── Reveal.jsx     # Animación de scroll
    │   ├── api/products.js    # Cliente Axios de la API
    │   ├── App.jsx             # Rutas
    │   └── index.css           # Paleta de colores (Tailwind v4 @theme)
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Puesta en marcha

### 1. Backend (Django)

```bash
cd BACKEND
python -m venv venv

# Activar entorno virtual
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate            # Windows

pip install -r requirements.txt

python manage.py migrate
python manage.py populate_data   # Carga productos de ejemplo de la cafetería
python manage.py createsuperuser # Opcional, para entrar a /admin/ de Django

python manage.py runserver
```

El backend queda disponible en **http://localhost:8000**.

> La base de datos usada en desarrollo es SQLite (`db.sqlite3`), no requiere configuración adicional.

### 2. Frontend (React + Vite)

```bash
cd FRONTEND
npm install
npm run dev
```

El frontend queda disponible en **http://localhost:5173**.

> ⚠️ El backend tiene CORS habilitado solo para `http://localhost:5173` (ver `CORS_ALLOWED_ORIGINS` en `config/settings.py`). Si cambias el puerto del frontend, actualiza esa lista.

---

## 🗺️ Rutas de la aplicación

| Ruta | Descripción |
|---|---|
| `/` | Landing pública de la cafetería (hero, historia, menú, contacto) |
| `/admin/productos` | Dashboard administrativo (estadísticas + inventario) |
| `/admin/productos/crear` | Formulario para crear un producto |
| `/admin/productos/editar/:id` | Formulario para editar un producto |

Desde la landing, los enlaces al panel administrativo ("Panel Admin" en navbar, hero y footer) muestran un modal de advertencia ("Acceso restringido — solo personal de administración") antes de navegar.

---

## 🔌 Endpoints de la API

Base URL: `http://localhost:8000/api/producto/`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/producto/` | Lista todos los productos |
| POST | `/api/producto/` | Crea un producto (`multipart/form-data`) |
| GET | `/api/producto/:id/` | Detalle de un producto |
| PUT | `/api/producto/:id/` | Actualiza un producto |
| DELETE | `/api/producto/:id/` | Elimina un producto |
| GET | `/api/producto/stats/` | Estadísticas agregadas para el dashboard (total, valor de inventario, stock bajo, stock por categoría, productos recientes) |

### Modelo `Producto`

| Campo | Tipo | Notas |
|---|---|---|
| `nombre` | string | único |
| `descripcion` | text | |
| `precio` | decimal | |
| `categoria` | choice | `cafe`, `postres`, `bebidas_frias`, `panaderia`, `otros` |
| `stock` | entero | usado para las alertas de "stock bajo" (≤5 unidades) |
| `imagen` | imagen | opcional, se sirve desde `/media/productos/` |

---

## ✨ Funcionalidades destacadas

- **Landing pública**: hero con foto real, sección "Nuestra historia" con línea de tiempo, menú dinámico consumido desde la API con filtro por categoría, sección de contacto con mapa embebido, botones de WhatsApp/Instagram y horario con badge "Abierto ahora".
- **Dashboard administrativo**: tarjetas de métricas (total de productos, valor de inventario, stock total, stock bajo), gráfico de stock por categoría y lista de productos recientes.
- **CRUD de productos** con carga de imagen, categoría y control de stock.
- **Responsive design** en todas las vistas (landing, dashboard, formularios) con Tailwind (`sm:`, `md:`, `lg:`).
- **Animaciones**: aparición al hacer scroll (`Reveal.jsx`), hover en tarjetas de producto, transición de categorías en el menú.

---

## 📝 Notas y próximos pasos sugeridos

- Las etiquetas "🔥 Más vendido" / "✨ Nuevo" y la valoración ⭐ del menú son **ilustrativas** (calculadas por fórmula a partir del `id`), ya que el modelo aún no tiene un sistema real de ventas o reseñas. Si más adelante agregas esos datos, se pueden conectar fácilmente.
- Los datos de contacto (dirección, WhatsApp, Instagram) en `Landing.jsx` son de ejemplo — reemplázalos por los reales de la cafetería antes de publicar.
- Para producción: cambiar `DEBUG = False`, definir `ALLOWED_HOSTS`, usar una base de datos como PostgreSQL, y generar un nuevo `SECRET_KEY`.

---

## 🧪 Verificación

Este proyecto fue verificado antes de entregarse:
- `npm run build` (Vite) compila sin errores.
- `eslint` sobre `src/` sin advertencias.
- Sintaxis de todos los archivos Python del backend verificada con `py_compile`.