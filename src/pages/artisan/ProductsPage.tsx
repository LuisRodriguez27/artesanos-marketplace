import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  NoSymbolIcon,
  ArrowDownTrayIcon 
} from '@heroicons/react/24/outline'
import ArtisanLayout from '../../components/artisan/ArtisanLayout'

// Mock data for products
const products = [
  {
    id: 1,
    name: 'Artesanía de Barro Negro',
    type: 'Barro Negro',
    price: 350,
    stock: 5,
    status: 'Activo',
    imageSrc: 'https://via.placeholder.com/150x150?text=Barro+Negro',
  },
  {
    id: 2,
    name: 'Textil Bordado a Mano',
    type: 'Textiles',
    price: 500,
    stock: 1,
    status: 'Activo',
    imageSrc: 'https://via.placeholder.com/150x150?text=Textil',
  },
  {
    id: 3,
    name: 'Joyería de Plata',
    type: 'Joyería',
    price: 1200,
    stock: 3,
    status: 'Activo',
    imageSrc: 'https://via.placeholder.com/150x150?text=Joyeria',
  },
  {
    id: 4,
    name: 'Cerámica Tradicional',
    type: 'Cerámica',
    price: 450,
    stock: 0,
    status: 'Inactivo',
    imageSrc: 'https://via.placeholder.com/150x150?text=Ceramica',
  },
]

// Filter options
const types = ['Todos', 'Barro Negro', 'Textiles', 'Joyería', 'Cerámica']
const statuses = ['Todos', 'Activo', 'Inactivo']

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    type: 'Todos',
    status: 'Todos',
    search: '',
  })

  // Apply filters
  const filteredProducts = products.filter(product => {
    if (filters.type !== 'Todos' && product.type !== filters.type) {
      return false
    }
    if (filters.status !== 'Todos' && product.status !== filters.status) {
      return false
    }
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    return true
  })

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      // In a real app, you would delete the product from the database
      alert(`Producto ${id} eliminado`)
    }
  }

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo'
    // In a real app, you would update the product status in the database
    alert(`Producto ${id} cambiado a ${newStatus}`)
  }

  return (
    <ArtisanLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Mis Productos</h1>
            <Link 
              to="/dashboard/productos/nuevo" 
              className="btn btn-primary flex items-center gap-x-2"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              Añadir producto
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-6">
          {/* Filters */}
          <div className="mb-6 bg-white shadow p-6 rounded-lg">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700">
                  Tipo de Artesanía
                </label>
                <select
                  id="typeFilter"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  id="statusFilter"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="searchFilter" className="block text-sm font-medium text-gray-700">
                  Buscar
                </label>
                <input
                  type="text"
                  id="searchFilter"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Buscar por nombre"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Products list */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-gray-500">No se encontraron productos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.imageSrc}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                          AGOTADO
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                      <div className="flex space-x-1">
                        <Link 
                          to={`/producto/${product.id}`} 
                          className="text-gray-500 hover:text-primary-500 p-1" 
                          title="Ver en tienda"
                        >
                          <EyeIcon className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link 
                          to={`/dashboard/productos/${product.id}`} 
                          className="text-gray-500 hover:text-primary-500 p-1" 
                          title="Editar"
                        >
                          <PencilIcon className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <button 
                          type="button" 
                          className="text-gray-500 hover:text-red-500 p-1" 
                          title="Eliminar"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <TrashIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.type}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)} MXN</p>
                      <p className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(product.id, product.status)}
                        className={`flex-1 py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center ${product.status === 'Activo' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {product.status === 'Activo' ? (
                          <>
                            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                            Activo
                          </>
                        ) : (
                          <>
                            <NoSymbolIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                            Inactivo
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Actualizar stock para producto ${product.id}`)}
                        className="flex-1 bg-primary-50 text-primary-700 hover:bg-primary-100 py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center"
                      >
                        <ArrowDownTrayIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Stock
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ArtisanLayout>
  )
}