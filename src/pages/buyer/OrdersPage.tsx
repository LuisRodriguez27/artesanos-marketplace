import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

// Mock orders data
const orders = [
  {
    id: 1,
    orderNumber: 'ORD-1234',
    date: '15/08/2023',
    total: 1200,
    status: 'Entregado',
    items: [
      {
        id: 1,
        name: 'Artesanía de Barro Negro',
        quantity: 1,
        price: 350,
        imageSrc: 'https://via.placeholder.com/80x80?text=Barro+Negro',
      },
      {
        id: 2,
        name: 'Textil Bordado a Mano',
        quantity: 1,
        price: 850,
        imageSrc: 'https://via.placeholder.com/80x80?text=Textil',
      }
    ],
    artisan: {
      id: 1,
      name: 'María González',
    },
    paymentMethod: 'Efectivo',
    trackingNumber: null,
  },
  {
    id: 2,
    orderNumber: 'ORD-1235',
    date: '20/08/2023',
    total: 850,
    status: 'En preparación',
    items: [
      {
        id: 2,
        name: 'Textil Bordado a Mano',
        quantity: 1,
        price: 850,
        imageSrc: 'https://via.placeholder.com/80x80?text=Textil',
      }
    ],
    artisan: {
      id: 2,
      name: 'Juan Pérez',
    },
    paymentMethod: 'Tarjeta',
    trackingNumber: null,
  },
  {
    id: 3,
    orderNumber: 'ORD-1236',
    date: '05/09/2023',
    total: 1500,
    status: 'Enviado',
    items: [
      {
        id: 3,
        name: 'Joyería de Plata',
        quantity: 1,
        price: 1200,
        imageSrc: 'https://via.placeholder.com/80x80?text=Joyeria',
      },
      {
        id: 1,
        name: 'Pequeña figura de Barro',
        quantity: 2,
        price: 150,
        imageSrc: 'https://via.placeholder.com/80x80?text=Figura',
      }
    ],
    artisan: {
      id: 3,
      name: 'Carlos Ramírez',
    },
    paymentMethod: 'Tarjeta',
    trackingNumber: 'TRACK123456789',
  },
]

export default function BuyerOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null)

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
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Mis Pedidos</h1>
          <p className="mt-2 text-sm text-gray-500">
            Revisa el estado de tus pedidos y su historial.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden p-6 text-center">
            <p className="text-gray-500">No tienes pedidos aún</p>
            <Link to="/catalogo" className="mt-4 inline-block btn btn-primary">
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Orden #{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                      </p>
                      <p className="text-sm font-medium text-gray-900">${order.total.toFixed(2)} MXN</p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order.id)}
                      className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      Ver detalles
                      <ChevronRightIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order details modal */}
        {selectedOrderDetails && (
          <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedOrder(null)}></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Detalles de la Orden: {selectedOrderDetails.orderNumber}
                    </h3>
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">Fecha: {selectedOrderDetails.date}</p>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                            selectedOrderDetails.status
                          )}`}
                        >
                          {selectedOrderDetails.status}
                        </span>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-900">Artesano:</p>
                        <p className="text-sm text-gray-500">
                          <Link to={`/artesano/${selectedOrderDetails.artisan.id}`} className="text-primary-600 hover:text-primary-500">
                            {selectedOrderDetails.artisan.name}
                          </Link>
                        </p>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-900">Método de pago:</p>
                        <p className="text-sm text-gray-500">{selectedOrderDetails.paymentMethod}</p>
                      </div>

                      {selectedOrderDetails.trackingNumber && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-900">Número de seguimiento:</p>
                          <p className="text-sm text-gray-500">{selectedOrderDetails.trackingNumber}</p>
                        </div>
                      )}

                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900">Productos:</h4>
                        <ul className="mt-3 divide-y divide-gray-100 border-t border-gray-200">
                          {selectedOrderDetails.items.map((item) => (
                            <li key={item.id} className="flex py-4">
                              <img
                                src={item.imageSrc}
                                alt={item.name}
                                className="h-16 w-16 flex-none rounded-md object-cover object-center"
                              />
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-sm font-medium">
                                    <h3 className="text-gray-900">
                                      <Link to={`/producto/${item.id}`} className="hover:underline">
                                        {item.name}
                                      </Link>
                                    </h3>
                                    <p className="ml-4 text-gray-900">${(item.price * item.quantity).toFixed(2)} MXN</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} MXN x {item.quantity}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex justify-between text-sm font-medium">
                          <p className="text-gray-900">Total</p>
                          <p className="text-gray-900">${selectedOrderDetails.total.toFixed(2)} MXN</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
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
  )
}