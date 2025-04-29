import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: 'Artesanía de Barro Negro',
    price: 350,
    quantity: 1,
    imageSrc: 'https://via.placeholder.com/200x200?text=Producto+1',
    artisan: {
      id: 1,
      name: 'María González',
    },
  },
  {
    id: 2,
    name: 'Textil Bordado a Mano',
    price: 500,
    quantity: 2,
    imageSrc: 'https://via.placeholder.com/200x200?text=Producto+2',
    artisan: {
      id: 2,
      name: 'Juan Pérez',
    },
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  
  // Group items by artisan for checkout 
  const itemsByArtisan = cartItems.reduce((groups, item) => {
    const key = item.artisan.id
    if (!groups[key]) {
      groups[key] = {
        artisan: item.artisan,
        items: []
      }
    }
    groups[key].items.push(item)
    return groups
  }, {} as Record<number, { artisan: { id: number, name: string }, items: typeof cartItems }>)
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Carrito de Compras</h1>

        {cartItems.length === 0 ? (
          <div className="mt-12 rounded-md bg-gray-50 p-8 text-center">
            <p className="text-gray-700">Tu carrito está vacío</p>
            <Link to="/catalogo" className="mt-4 inline-block btn btn-primary">
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
            <div className="lg:col-span-7">
              <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.imageSrc}
                        alt={item.name}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <Link to={`/producto/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.name}
                            </Link>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)} MXN</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Artesano:{' '}
                          <Link to={`/artesano/${item.artisan.id}`} className="text-primary-600 hover:text-primary-500">
                            {item.artisan.name}
                          </Link>
                        </p>
                        <p className="mt-1 text-sm text-gray-500">Precio: ${item.price.toFixed(2)} MXN</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 px-2 py-1 text-sm font-medium text-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="mx-2 text-gray-700">{item.quantity}</span>
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 px-2 py-1 text-sm font-medium text-gray-700"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Resumen de la orden</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)} MXN</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">Total de la orden</p>
                  <p className="text-base font-medium text-gray-900">${subtotal.toFixed(2)} MXN</p>
                </div>
              </div>

              {Object.values(itemsByArtisan).length > 1 && (
                <div className="mt-6 rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Múltiples Artesanos</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Tu carrito contiene productos de {Object.values(itemsByArtisan).length} artesanos diferentes. 
                          En el checkout podrás elegir la forma de pago y envío para cada artesano por separado.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="w-full btn btn-primary block text-center"
                >
                  Proceder al Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}