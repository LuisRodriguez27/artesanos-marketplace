import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  UsersIcon, 
  ShoppingBagIcon, 
  CreditCardIcon, 
  Square3Stack3DIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

// Mock data for dashboard
const stats = [
  { id: 1, name: 'Total Artesanos', value: '48', icon: UsersIcon, change: '+12%', changeType: 'increase' },
  { id: 2, name: 'Total Compradores', value: '195', icon: UsersIcon, change: '+18%', changeType: 'increase' },
  { id: 3, name: 'Pedidos (Este mes)', value: '42', icon: ShoppingBagIcon, change: '+8%', changeType: 'increase' },
  { id: 4, name: 'Ventas (Este mes)', value: '$24,500', icon: CreditCardIcon, change: '+5%', changeType: 'increase' },
]

const recentArtisans = [
  { id: 1, name: 'María González', location: 'Oaxaca', type: 'Barro Negro', date: '15/08/2023', status: 'Activo' },
  { id: 2, name: 'Juan Pérez', location: 'Puebla', type: 'Textiles', date: '20/08/2023', status: 'Activo' },
  { id: 3, name: 'Ana Martínez', location: 'Chiapas', type: 'Joyería', date: '25/08/2023', status: 'Pendiente' },
  { id: 4, name: 'Carlos Ramírez', location: 'Michoacán', type: 'Madera', date: '01/09/2023', status: 'Activo' },
]

const recentOrders = [
  { id: 1, orderNumber: 'ORD-1234', customer: 'Luis Torres', total: 1200, date: '10/09/2023', status: 'Entregado' },
  { id: 2, orderNumber: 'ORD-1235', customer: 'Sofia García', total: 850, date: '12/09/2023', status: 'En preparación' },
  { id: 3, orderNumber: 'ORD-1236', customer: 'Roberto Díaz', total: 2100, date: '15/09/2023', status: 'Enviado' },
  { id: 4, orderNumber: 'ORD-1237', customer: 'Carmen López', total: 450, date: '18/09/2023', status: 'Pendiente de pago' },
]

export default function AdminDashboardPage() {
  const [selectedTab, setSelectedTab] = useState('general')
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link to="/" className="text-xl font-bold text-primary-600">
                  Artesanos Marketplace
                </Link>
              </div>
              <div className="ml-6 flex items-center space-x-4">
                <Link to="/admin" className="bg-primary-50 text-primary-600 rounded-md px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/admin/artesanos" className="text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium">
                  Artesanos
                </Link>
                <Link to="/admin/compradores" className="text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium">
                  Compradores
                </Link>
                <Link to="/admin/pedidos" className="text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium">
                  Pedidos
                </Link>
                <Link to="/admin/configuracion" className="text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium">
                  Configuración
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="bg-primary-600 p-1 rounded-full text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Ver notificaciones</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>
              </div>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://via.placeholder.com/150?text=Admin"
                    alt="Foto de perfil del administrador"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Administrativo</h1>
          
          <div className="mt-6">
            <div className="flex space-x-4 border-b border-gray-200">
              <button
                className={`pb-4 text-sm font-medium ${selectedTab === 'general' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setSelectedTab('general')}
              >
                Vista General
              </button>
              <button
                className={`pb-4 text-sm font-medium ${selectedTab === 'artisans' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setSelectedTab('artisans')}
              >
                Artesanos
              </button>
              <button
                className={`pb-4 text-sm font-medium ${selectedTab === 'orders' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setSelectedTab('orders')}
              >
                Pedidos
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <div className="font-medium text-primary-700 hover:text-primary-900">
                        {stat.change}
                        {stat.changeType === 'increase' ? (
                          <span className="text-green-500 ml-1">↑</span>
                        ) : (
                          <span className="text-red-500 ml-1">↓</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent artisans */}
            {(selectedTab === 'general' || selectedTab === 'artisans') && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Artesanos Recientes</h2>
                  <Link
                    to="/admin/artesanos"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Ver todos
                  </Link>
                </div>
                <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {recentArtisans.map((artisan) => (
                      <li key={artisan.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://via.placeholder.com/150?text=${artisan.name.charAt(0)}`}
                                  alt={artisan.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-primary-600">{artisan.name}</div>
                                <div className="text-sm text-gray-500">{artisan.location}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-sm text-gray-500 mr-4">{artisan.type}</div>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${artisan.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {artisan.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <Square3Stack3DIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                Tipo: {artisan.type}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <ArrowPathIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              Registrado el {artisan.date}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Recent orders */}
            {(selectedTab === 'general' || selectedTab === 'orders') && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Pedidos Recientes</h2>
                  <Link
                    to="/admin/pedidos"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Ver todos
                  </Link>
                </div>
                <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          # Orden
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                            {order.orderNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${order.total.toFixed(2)} MXN
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Entregado' ? 'bg-green-100 text-green-800' : order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' : order.status === 'En preparación' ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-primary-600 hover:text-primary-900">Ver detalles</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}