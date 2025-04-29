import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import ArtisanLayout from '../../components/artisan/ArtisanLayout'

// Mock data for orders
const orders = [
  {
    id: 1,
    orderNumber: 'ORD-1234',
    date: '2023-08-15',
    customerName: 'Juan López',
    customerEmail: 'juan@ejemplo.com',
    customerPhone: '5551234567',
    status: 'Entregado',
    paymentMethod: 'Efectivo',
    total: 1200,
    items: [
      {
        id: 1,
        name: 'Artesanía de Barro Negro',
        quantity: 1,
        price: 350,
      },
      {
        id: 2,
        name: 'Textil Bordado a Mano',
        quantity: 1,
        price: 850,
      }
    ]
  },
  {
    id: 2,
    orderNumber: 'ORD-1235',
    date: '2023-08-16',
    customerName: 'Ana Martínez',
    customerEmail: 'ana@ejemplo.com',
    customerPhone: '5559876543',
    status: 'En preparación',
    paymentMethod: 'Tarjeta',
    total: 850,
    items: [
      {
        id: 2,
        name: 'Textil Bordado a Mano',
        quantity: 1,
        price: 850,
      }
    ]
  },
  {
    id: 3,
    orderNumber: 'ORD-1236',
    date: '2023-08-17',
    customerName: 'Carlos Ramírez',
    customerEmail: 'carlos@ejemplo.com',
    customerPhone: '5551472583',
    status: 'Enviado',
    paymentMethod: 'Tarjeta',
    total: 2100,
    items: [
      {
        id: 3,
        name: 'Joyería de Plata',
        quantity: 1,
        price: 1200,
      },
      {
        id: 2,
        name: 'Textil Bordado a Mano',
        quantity: 1,
        price: 850,
      },
      {
        id: 1,
        name: 'Pequeña figura de Barro',
        quantity: 1,
        price: 50,
      }
    ]
  },
  {
    id: 4,
    orderNumber: 'ORD-1237',
    date: '2023-08-18',
    customerName: 'María González',
    customerEmail: 'maria@ejemplo.com',
    customerPhone: '5553698521',
    status: 'Pendiente de pago',
    paymentMethod: 'Efectivo',
    total: 450,
    items: [
      {
        id: 4,
        name: 'Cerámica Tradicional',
        quantity: 1,
        price: 450,
      }
    ]
  },
]

// Filter options
const statuses = ['Todos', 'Pendiente de pago', 'En preparación', 'Enviado', 'Entregado', 'Cancelado']
const paymentMethods = ['Todos', 'Efectivo', 'Tarjeta']

export default function OrdersPage() {
  const [filters, setFilters] = useState({
    status: 'Todos',
    paymentMethod: 'Todos',
    search: '',
    startDate: '',
    endDate: '',
  })
  
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Apply filters
  const filteredOrders = orders.filter(order => {
    if (filters.status !== 'Todos' && order.status !== filters.status) {
      return false
    }
    if (filters.paymentMethod !== 'Todos' && order.paymentMethod !== filters.paymentMethod) {
      return false
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesOrderNumber = order.orderNumber.toLowerCase().includes(searchLower)
      const matchesCustomerName = order.customerName.toLowerCase().includes(searchLower)
      const matchesCustomerEmail = order.customerEmail.toLowerCase().includes(searchLower)
      
      if (!matchesOrderNumber && !matchesCustomerName && !matchesCustomerEmail) {
        return false
      }
    }
    // Date filtering
    if (filters.startDate) {
      const startDate = new Date(filters.startDate)
      const orderDate = new Date(order.date)
      if (orderDate < startDate) return false
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate)
      endDate.setHours(23, 59, 59, 999)  // End of the day
      const orderDate = new Date(order.date)
      if (orderDate > endDate) return false
    }
    
    return true
  })

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      status: 'Todos',
      paymentMethod: 'Todos',
      search: '',
      startDate: '',
      endDate: '',
    })
  }

  const handleUpdateStatus = (orderId: number, newStatus: string) => {
    // In a real app, you would update the order status in the database
    alert(`Orden ${orderId} actualizada a ${newStatus}`)
  }

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'Entregado': return 'bg-green-100 text-green-800'
      case 'Enviado': return 'bg-blue-100 text-blue-800'
      case 'En preparación': return 'bg-yellow-100 text-yellow-800'
      case 'Pendiente de pago': return 'bg-orange-100 text-orange-800'
      case 'Cancelado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOrderDetails = (orderId: number) => {
    return orders.find(order => order.id === orderId)
  }

  const selectedOrderDetails = selectedOrder ? getOrderDetails(selectedOrder) : null

  return (
    <ArtisanLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Mis Pedidos</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-6">
          {/* Search and filters */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-auto relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full md:w-80 rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Buscar por # orden, cliente o email"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
              Filtros
            </button>
          </div>

          {/* Advanced filters */}
          {isFilterOpen && (
            <div className="mb-6 bg-white p-4 shadow rounded-lg">
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-4">
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
                  <label htmlFor="paymentMethodFilter" className="block text-sm font-medium text-gray-700">
                    Método de pago
                  </label>
                  <select
                    id="paymentMethodFilter"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    value={filters.paymentMethod}
                    onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                  >
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="startDateFilter" className="block text-sm font-medium text-gray-700">
                    Desde
                  </label>
                  <input
                    type="date"
                    id="startDateFilter"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="endDateFilter" className="block text-sm font-medium text-gray-700">
                    Hasta
                  </label>
                  <input
                    type="date"
                    id="endDateFilter"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="ml-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}

          {/* Orders list */}
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            {filteredOrders.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No se encontraron órdenes con los filtros seleccionados.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <li key={order.id}>
                    <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="truncate">
                            <div className="flex">
                              <p className="truncate text-sm font-medium text-primary-600">{order.orderNumber}</p>
                              <p className="ml-1 truncate text-sm text-gray-500">({order.date})</p>
                            </div>
                            <div className="mt-1">
                              <p className="text-sm text-gray-500">
                                {order.customerName} &bull; {order.customerEmail} &bull; {order.customerPhone}
                              </p>
                            </div>
                          </div>
                          <div className="ml-2 flex flex-shrink-0">
                            <p className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(order.status)}`}>
                              {order.status}
                            </p>
                            <p className="ml-2 inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                              {order.paymentMethod}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Total: ${order.total.toFixed(2)} MXN
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {order.items.length} producto(s)
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order.id)}
                              className="rounded-md bg-white font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                              Ver detalles
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Order details modal */}
          {selectedOrderDetails && (
            <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedOrder(null)}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div>
                      <div className="mt-3 sm:mt-0 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                          Detalles de la Orden: {selectedOrderDetails.orderNumber}
                        </h3>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">
                            Fecha: {selectedOrderDetails.date}
                          </p>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900">Información del Cliente:</p>
                            <p className="text-sm text-gray-500">{selectedOrderDetails.customerName}</p>
                            <p className="text-sm text-gray-500">{selectedOrderDetails.customerEmail}</p>
                            <p className="text-sm text-gray-500">{selectedOrderDetails.customerPhone}</p>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-900">Estado actual:</p>
                            <span className={`mt-1 inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeClass(selectedOrderDetails.status)}`}>
                              {selectedOrderDetails.status}
                            </span>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-900">Método de pago:</p>
                            <p className="text-sm text-gray-500">{selectedOrderDetails.paymentMethod}</p>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-900">Productos:</p>
                            <ul className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                              {selectedOrderDetails.items.map((item) => (
                                <li key={item.id} className="flex py-2">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} MXN x {item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)} MXN</p>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-2 flex justify-between">
                              <p className="text-sm font-medium text-gray-900">Total:</p>
                              <p className="text-sm font-medium text-gray-900">${selectedOrderDetails.total.toFixed(2)} MXN</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <label htmlFor="orderStatus" className="block text-sm font-medium text-gray-700">
                              Actualizar estado
                            </label>
                            <div className="mt-1 flex">
                              <select
                                id="orderStatus"
                                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                defaultValue={selectedOrderDetails.status}
                              >
                                {statuses.filter(s => s !== 'Todos').map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                onClick={() => {
                                  const select = document.getElementById('orderStatus') as HTMLSelectElement
                                  handleUpdateStatus(selectedOrderDetails.id, select.value)
                                }}
                                className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                              >
                                Actualizar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setSelectedOrder(null)}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ArtisanLayout>
  )
}