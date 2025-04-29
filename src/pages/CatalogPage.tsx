import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { 
  AdjustmentsHorizontalIcon, 
  XMarkIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

const imagenes_src = ['/img/Producto1.jpg', '/img/Producto2.jpeg', '/img/Producto3.jpg']

// Sample product data
const PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  price: 100 + (i * 20),
  artisan: `Artesano ${(i % 4) + 1}`,
  artisanId: (i % 4) + 1,
  type: ['Barro Negro', 'Textiles', 'Joyería', 'Cerámica'][i % 4],
  imageSrc: imagenes_src[i],
  available: i < 10, // First 10 products are available
}))

type FilterForm = {
  postalCode: string
  priceMin: string
  priceMax: string
  artisanType: string[]
}

export default function CatalogPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS)
  const [buyerPostalCode, setBuyerPostalCode] = useState<string>('')

  const { 
    register, 
    handleSubmit, 
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FilterForm>({
    defaultValues: {
      postalCode: '',
      priceMin: '',
      priceMax: '',
      artisanType: []
    }
  })

  const onFilterSubmit = (data: FilterForm) => {
    console.log('Filter data:', data)
    
    // Apply filters
    let filtered = [...PRODUCTS]
    
    // Filter by postal code (in a real app, this would check shipping compatibility)
    if (data.postalCode) {
      setBuyerPostalCode(data.postalCode)
      // For demo, we'll just filter randomly based on postal code last digit
      const lastDigit = parseInt(data.postalCode.slice(-1))
      filtered = filtered.filter((product) => product.id % 10 > lastDigit)
    }
    
    // Filter by price
    if (data.priceMin) {
      filtered = filtered.filter((product) => product.price >= parseInt(data.priceMin))
    }
    
    if (data.priceMax) {
      filtered = filtered.filter((product) => product.price <= parseInt(data.priceMax))
    }
    
    // Filter by artisan type
    if (data.artisanType && data.artisanType.length > 0) {
      filtered = filtered.filter((product) => data.artisanType.includes(product.type))
    }
    
    setFilteredProducts(filtered)
    setIsFilterOpen(false)
  }
  
  const clearFilters = () => {
    reset()
    setFilteredProducts(PRODUCTS)
    setBuyerPostalCode('')
  }
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Catálogo de Productos</h1>
          
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-700 hover:text-primary-600"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
              Filtros
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">Productos</h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block bg-white p-4 lg:p-0 rounded-lg shadow-lg lg:shadow-none fixed lg:relative inset-0 z-40 lg:z-0 overflow-y-auto lg:overflow-visible`}>
              <div className="flex items-center justify-between lg:hidden px-4 py-2 border-b">
                <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <span className="sr-only">Cerrar filtros</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
                            
              <form onSubmit={handleSubmit(onFilterSubmit)} className="divide-y divide-gray-200">
                <div className="space-y-6 px-4 py-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Ubicación</h3>
                    <div className="mt-2">
                      <div className="relative rounded-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="text"
                          {...register('postalCode', {
                            pattern: {
                              value: /^[0-9]{5}$/,
                              message: 'CP debe tener 5 dígitos'
                            }
                          })}
                          placeholder="Código Postal"
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 text-sm"
                        />
                      </div>
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">Para ver productos que puedan enviarse a tu ubicación</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Precio</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="priceMin" className="sr-only">Precio mínimo</label>
                        <input
                          type="number"
                          id="priceMin"
                          {...register('priceMin')}
                          placeholder="Min"
                          className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="priceMax" className="sr-only">Precio máximo</label>
                        <input
                          type="number"
                          id="priceMax"
                          {...register('priceMax')}
                          placeholder="Max"
                          className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Tipo de Artesanía</h3>
                    <div className="mt-2 space-y-2">
                      {['Barro Negro', 'Textiles', 'Joyería', 'Cerámica'].map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            id={`type-${type}`}
                            type="checkbox"
                            value={type}
                            {...register('artisanType')}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor={`type-${type}`} className="ml-3 text-sm text-gray-600">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-6 space-y-3">
                  <button
                    type="submit"
                    className="w-full btn btn-primary"
                  >
                    Aplicar filtros
                  </button>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="w-full btn btn-outline"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </form>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {buyerPostalCode && (
                <div className="mb-6 rounded-md bg-blue-50 p-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <MapPinIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-blue-700">Mostrando productos enviables al CP: {buyerPostalCode}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setValue('postalCode', '')
                          setBuyerPostalCode('')
                          setFilteredProducts(PRODUCTS)
                        }}
                        className="ml-3 text-sm font-medium text-blue-700 hover:text-blue-600"
                      >
                        Cambiar
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {filteredProducts.length === 0 ? (
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">No se encontraron productos</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>No hay productos que coincidan con los filtros seleccionados. Prueba con otros criterios.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link to={`/producto/${product.id}`}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            <Link to={`/artesano/${product.artisanId}`} className="hover:text-primary-600">
                              {product.artisan}
                            </Link>
                          </p>
                          <p className="mt-1 text-sm text-gray-500">{product.type}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)} MXN</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}