import { Link } from 'react-router-dom'
import { 
  ArrowTrendingUpIcon, 
  CurrencyDollarIcon, 
  ShoppingCartIcon,
  ExclamationCircleIcon,
  UsersIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline'
import ArtisanLayout from '../../components/artisan/ArtisanLayout'

// Mock data
const stats = [
  { name: 'Ventas este mes', value: '15', icon: ShoppingCartIcon },
  { name: 'Ingresos este mes', value: '$8,250.00 MXN', icon: CurrencyDollarIcon },
  { name: 'Total clientes', value: '12', icon: UsersIcon },
  { name: 'Productos activos', value: '8', icon: QrCodeIcon },
]

const recentOrders = [
  {
    id: 1,
    orderNumber: 'ORD-1234',
    date: '2023-08-15',
    customerName: 'Juan López',
    status: 'Entregado',
    total: 1200,
  },
  {
    id: 2,
    orderNumber: 'ORD-1235',
    date: '2023-08-16',
    customerName: 'Ana Martínez',
    status: 'En preparación',
    total: 850,
  },
  {
    id: 3,
    orderNumber: 'ORD-1236',
    date: '2023-08-17',
    customerName: 'Carlos Ramírez',
    status: 'Enviado',
    total: 2100,
  }
]

const lowStockProducts = [
  {
    id: 1,
    name: 'Artesanía de Barro Negro',
    stock: 2,
    image: 'https://via.placeholder.com/100x100?text=Barro+Negro',
  },
  {
    id: 2,
    name: 'Textil Bordado a Mano',
    stock: 1,
    image: 'https://via.placeholder.com/100x100?text=Textil',
  }
]

export default function DashboardPage() {
  return (
    <ArtisanLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="mt-8">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-primary-500 p-3">
                      <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Orders */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Pedidos recientes</h2>
                <div className="mt-4 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                              Orden
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Fecha
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Cliente
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Estado
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {recentOrders.map((order) => (
                            <tr key={order.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-primary-600 sm:pl-0">
                                <Link to={`/dashboard/pedidos/${order.id}`}>{order.orderNumber}</Link>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.date}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.customerName}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                                  order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                ${order.total.toFixed(2)} MXN
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/dashboard/pedidos" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    Ver todos los pedidos
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Productos con stock bajo</h2>
                <div className="mt-4 flow-root">
                  <ul className="divide-y divide-gray-200">
                    {lowStockProducts.map((product) => (
                      <li key={product.id} className="py-4 flex">
                        <div className="flex-shrink-0">
                          <img src={product.image} alt={product.name} className="h-16 w-16 rounded-md object-cover" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              <Link to={`/dashboard/productos/${product.id}`} className="hover:underline">
                                {product.name}
                              </Link>
                            </h3>
                            <div className="flex items-center">
                              <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" aria-hidden="true" />
                              <span className="text-sm font-medium text-red-500">{product.stock} disponibles</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Link 
                              to={`/dashboard/productos/${product.id}`} 
                              className="text-sm text-primary-600 hover:text-primary-500"
                            >
                              Actualizar stock
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Link to="/dashboard/productos" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    Gestionar todos los productos
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Acciones rápidas</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <QrCodeIcon className="h-6 w-6 text-primary-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Añadir nuevo producto</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Añade un nuevo producto a tu catálogo con fotos y descripción.
                      </p>
                      <div className="mt-4">
                        <Link
                          to="/dashboard/productos/nuevo"
                          className="btn btn-primary inline-flex text-sm"
                        >
                          Añadir producto
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UsersIcon className="h-6 w-6 text-primary-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Editar perfil</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Actualiza tu información, biografía y políticas de envío.
                      </p>
                      <div className="mt-4">
                        <Link
                          to="/dashboard/perfil"
                          className="btn btn-primary inline-flex text-sm"
                        >
                          Editar perfil
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CurrencyDollarIcon className="h-6 w-6 text-primary-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Configurar métodos de pago</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Conecta tu cuenta de Stripe para recibir pagos con tarjeta.
                      </p>
                      <div className="mt-4">
                        <Link
                          to="/dashboard/metodos-pago"
                          className="btn btn-primary inline-flex text-sm"
                        >
                          Configurar pagos
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ArtisanLayout>
  )
}