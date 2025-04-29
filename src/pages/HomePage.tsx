import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero section */}
      <div className="bg-white">
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
            <div className="px-6 lg:px-0 lg:pt-4">
              <div className="mx-auto max-w-2xl">
                <div className="max-w-lg">
                  <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Conectando artesanos con el mundo
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Descubre artesanías auténticas mexicanas, conoce a sus creadores y apoya el talento local
                    con cada compra.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      to="/catalogo"
                      className="btn btn-primary"
                    >
                      Explorar catálogo
                    </Link>
                    <Link
                      to="/registro-artesano"
                      className="btn btn-outline"
                    >
                      Soy artesano
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
              <div className="relative overflow-hidden rounded-xl bg-primary-500 shadow-xl lg:h-full">
                <img 
                  src="/img/artesania1.jpg" 
                  alt="Artesanías mexicanas" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured artisan types */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tipos de Artesanía</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Descubre la rica tradición artesanal mexicana
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {['Barro Negro', 'Textiles', 'Joyería'].map((type) => (
              <div key={type} className="overflow-hidden rounded-lg bg-white shadow">
                <div className="h-48 w-full bg-gray-200">
                  <img 
                    src={`https://via.placeholder.com/400x200?text=${type}`} 
                    alt={type} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">{type}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className="mt-4">
                    <Link
                      to={`/tipos-artesania/${type.toLowerCase().replace(' ', '-')}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      Conocer más <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured products */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Productos Destacados</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Piezas únicas hechas a mano por talentosos artesanos mexicanos
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg">
                <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200">
                  <img
                    src={`https://via.placeholder.com/300x300?text=Producto+${i+1}`}
                    alt={`Producto ${i+1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <Link to={`/producto/${i+1}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        Producto {i+1}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Artesano {i+1}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">$120.00 MXN</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              to="/catalogo" 
              className="btn btn-primary inline-block"
            >
              Ver todo el catálogo
            </Link>
          </div>
        </div>
      </div>

      {/* Become an artisan CTA */}
      <div className="bg-primary-50">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ¿Eres artesano?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Únete a nuestra plataforma y lleva tus productos a miles de personas
              interesadas en adquirir artesanías auténticas mexicanas.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/registro-artesano"
                className="btn btn-primary"
              >
                Registrarme como artesano
              </Link>
              <Link
                to="/acerca-de"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Conocer más <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}