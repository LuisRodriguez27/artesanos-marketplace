import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página no encontrada</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/" className="btn btn-primary">
            Regresar al inicio
          </Link>
          <Link to="/catalogo" className="text-sm font-semibold text-gray-900">
            Ver catálogo <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}