# Artesanos Marketplace

Una plataforma digital para conectar artesanos mexicanos con compradores, permitiendo la venta directa de artesanías auténticas.

## Características principales

- **Registro y gestión de artesanos**
  - Registro con validación de Código Postal vía API Copomex
  - Perfil personalizable con biografía y tipos de artesanía
  - Configuración de zonas de envío basadas en ubicación geográfica
  - Selección de métodos de pago (efectivo y/o tarjeta)

- **Gestión de productos**
  - Catálogo de productos con fotografías
  - Organización por tipo de artesanía
  - Gestión de inventario
  - Control de estado (activo/inactivo)

- **Experiencia del comprador**
  - Navegación por catálogo con filtros
  - Verificación de envío basada en código postal
  - Carrito de compras
  - Proceso de checkout simplificado
  - Selección de método de pago según artesano

- **Gestión de pedidos**
  - Panel de control para artesanos
  - Actualización de estado de pedidos
  - Notificaciones por correo

## Tecnologías utilizadas

- **Frontend:**
  - React 18
  - TypeScript
  - Vite (build tool)
  - React Router (navegación)
  - React Hook Form (formularios)
  - Zustand (gestión de estado)
  - Tailwind CSS (estilos)
  - Headless UI (componentes accesibles)
  - Heroicons (iconos)

- **Próximas integraciones:**
  - Stripe para pagos
  - API Copomex para validación de códigos postales
  - Cloudinary para almacenamiento de imágenes

## Requisitos previos

- Node.js (v18.0.0 o superior)
- npm (v9.0.0 o superior) o yarn (v1.22.0 o superior)

## Instalación y configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/artesanos-marketplace.git
cd artesanos-marketplace
```

2. Instalar dependencias:
```bash
npm install
# o
yarn
```

3. Configurar variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

5. Abrir en el navegador:
- La aplicación estará disponible en `http://localhost:5173`

## Estructura del proyecto

```
artesanos-marketplace/
├── public/           # Archivos públicos y estáticos
├── src/              # Código fuente
│   ├── components/   # Componentes reutilizables
│   │   ├── ui/       # Componentes de interfaz básicos
│   │   ├── artisan/  # Componentes específicos para artesanos
│   │   └── product/  # Componentes relacionados con productos
│   ├── hooks/        # Custom hooks
│   ├── layouts/      # Layouts de la aplicación
│   ├── pages/        # Páginas principales
│   │   ├── artisan/  # Páginas del dashboard de artesanos
│   │   ├── buyer/    # Páginas específicas para compradores
│   │   └── admin/    # Páginas de administración
│   ├── services/     # Servicios de API
│   ├── store/        # Estado global con Zustand
│   ├── types/        # Definiciones de TypeScript
│   └── utils/        # Utilidades y helpers
├── .env              # Variables de entorno (no incluido en repositorio)
└── .env.example      # Ejemplo de variables de entorno
```

## Flujo de usuario

### Artesanos
1. Registro con validación de CP
2. Configuración de perfil y tipos de artesanía
3. Configuración de zonas de envío y métodos de pago
4. Carga de productos
5. Gestión de pedidos

### Compradores
1. Navegación de catálogo
2. Filtrado por CP para verificar disponibilidad de envío
3. Añadir productos al carrito
4. Checkout con validación de compatibilidad de envío
5. Selección de método de pago según el artesano
6. Seguimiento de pedido

## Próximas mejoras

- Integración con Stripe Connect para pagos con tarjeta
- Sistema de calificaciones y reseñas
- Estadísticas y reportes para artesanos
- Soporte para múltiples idiomas
- Aplicación móvil

## Licencia

MIT

## Contacto

Soporte: soporte@artesanosmarketplace.com
Sitio web: https://artesanosmarketplace.com
