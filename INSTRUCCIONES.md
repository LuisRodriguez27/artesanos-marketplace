# Cómo ejecutar el proyecto Artesanos Marketplace

Este documento contiene instrucciones paso a paso para iniciar y ejecutar el proyecto Artesanos Marketplace en tu entorno local.

## Requisitos previos

Para ejecutar este proyecto, necesitarás:

1. Node.js (v18.0.0 o superior)
2. npm (v9.0.0 o superior) o yarn (v1.22.0 o superior)

## Pasos para ejecutar el proyecto

### 1. Instalación de dependencias

Primero, instala todas las dependencias del proyecto ejecutando uno de los siguientes comandos en la terminal:

```bash
# Si usas npm
npm install

# Si usas yarn
yarn
```

### 2. Iniciar el servidor de desarrollo

Una vez que se hayan instalado todas las dependencias, puedes iniciar el servidor de desarrollo:

```bash
# Si usas npm
npm run dev

# Si usas yarn
yarn dev
```

Esto iniciará el servidor de desarrollo de Vite. La aplicación estará disponible en:

```
http://localhost:5173
```

## Estructura del proyecto

```
artesanos-marketplace/
├── public/           # Archivos públicos y estáticos
├── src/              # Código fuente
│   ├── components/   # Componentes reutilizables
│   ├── hooks/        # Custom hooks
│   ├── layouts/      # Layouts de la aplicación
│   ├── pages/        # Páginas principales
│   ├── services/     # Servicios de API
│   ├── store/        # Estado global
│   ├── types/        # Definiciones de TypeScript
│   └── utils/        # Utilidades y helpers
├── index.html        # Punto de entrada HTML
└── package.json      # Dependencias y scripts
```

## Navegación del proyecto

El proyecto incluye varias rutas principales:

1. **Página de inicio:** `/`
2. **Catálogo de productos:** `/catalogo`
3. **Detalle de producto:** `/producto/:id`
4. **Registro de artesano:** `/registro-artesano`
5. **Inicio de sesión:** `/iniciar-sesion`
6. **Panel del artesano:** `/dashboard`
7. **Perfil de artesano (público):** `/artesano/:id`
8. **Carrito de compras:** `/carrito`
9. **Proceso de checkout:** `/checkout`
10. **Panel de administración:** `/admin`

## Consideraciones

- Este proyecto es responsivo y funciona en dispositivos móviles y de escritorio.
- Los datos que se muestran son ficticios para fines de demostración.
- En un entorno real, necesitarías configurar las APIs de Copomex y Stripe.
- Las características de pago con tarjeta requieren configuración adicional.

## Soporte

Si encuentras algún problema al ejecutar el proyecto, verifica que estés utilizando las versiones correctas de Node.js y que hayas instalado todas las dependencias correctamente.
