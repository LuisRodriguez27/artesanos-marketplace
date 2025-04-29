import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StarIcon, TruckIcon, CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import { QrCodeIcon } from '@heroicons/react/24/solid'

// Sample product
const product = {
  name: 'Artesanía de Barro Negro',
  price: 350,
  rating: 4.5,
  reviewCount: 27,
  imageSrc: [
    'https://via.placeholder.com/600x600?text=Producto+1',
    'https://via.placeholder.com/600x600?text=Producto+2',
    'https://via.placeholder.com/600x600?text=Producto+3',
  ],
  description: 'Esta hermosa pieza de barro negro está hecha a mano por artesanos de Oaxaca. Cada pieza es única y refleja la tradición centenaria de esta técnica.',
  stock: 5,
  artisan: {
    id: 1,
    name: 'María González',
    location: 'San Bartolo Coyotepec, Oaxaca',
    bio: 'Artesana con más de 20 años de experiencia en la elaboración de barro negro, siguiendo técnicas tradicionales heredadas por generaciones.',
  },
  artisanType: {
    name: 'Barro Negro',
    description: 'El barro negro es una técnica milenaria originaria de Oaxaca, donde la arcilla se trabaja y quema de manera especial para lograr su característico color negro.',
  },
  shippingZones: ['Colonia', 'Municipio', 'Estado'],
  paymentMethods: ['Efectivo', 'Tarjeta'],
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [buyerPostalCode, setBuyerPostalCode] = useState('')
  const [isShippable, setIsShippable] = useState<boolean | null>(null)
  
  const handleAddToCart = () => {
    if (isShippable === false) {
      alert('Este producto no puede ser enviado a tu ubicación')
      return
    }
    
    alert(`${quantity} ${product.name}(s) agregado(s) al carrito`)
    // In a real app, you would dispatch an action to add to cart
  }
  
  const checkShippingAvailability = () => {
    if (!buyerPostalCode || buyerPostalCode.length !== 5) {
      alert('Por favor ingresa un código postal válido')
      return
    }
    
    // In a real app, you would check against the artisan's shipping zones
    // For demo, we'll just check if the postal code's last digit is even
    const lastDigit = parseInt(buyerPostalCode.slice(-1))
    setIsShippable(lastDigit % 2 === 0)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-700">Inicio</Link>
              </li>
              <li>
                <span className="text-sm text-gray-500">/</span>
              </li>
              <li>
                <Link to="/catalogo" className="text-sm font-medium text-gray-500 hover:text-gray-700">Catálogo</Link>
              </li>
              <li>
                <span className="text-sm text-gray-500">/</span>
              </li>
              <li>
                <span className="text-sm font-medium text-gray-900">{product.name}</span>
              </li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <div className="flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={product.imageSrc[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {product.imageSrc.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex items-center justify-center rounded-md ${
                      selectedImage === i ? 'ring-2 ring-primary-500' : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i+1}`} className="h-full w-full object-cover object-center" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              
              <div className="mt-3">
                <h2 className="sr-only">Información del Producto</h2>
                <p className="text-3xl tracking-tight text-gray-900">${product.price.toFixed(2)} MXN</p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reseñas</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`h-5 w-5 flex-shrink-0 ${
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-gray-500">{product.reviewCount} reseñas</p>
                </div>
              </div>

              {/* Artisan info */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Artesano</h3>
                <div className="mt-2">
                  <Link to={`/artesano/${product.artisan.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    {product.artisan.name}
                  </Link>
                  <p className="mt-1 text-sm text-gray-500">{product.artisan.location}</p>
                </div>
              </div>

              {/* Artisan type and QR */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Tipo de Artesanía</h3>
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-500">{product.artisanType.name}</span>
                  <Link 
                    to={`/tipos-artesania/${product.artisanType.name.toLowerCase().replace(' ', '-')}`}
                    className="ml-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    <QrCodeIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                    Ver historia y galería
                  </Link>
                </div>
                <p className="mt-2 text-sm text-gray-500">{product.artisanType.description}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Descripción</h3>
                <div className="mt-2 space-y-6 text-base text-gray-700">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Shipping and payment */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Envío y Pago</h3>
                <div className="mt-2">
                  <div className="flex items-center">
                    <TruckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-2 text-sm text-gray-500">
                      Zonas de envío: {product.shippingZones.join(', ')}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {product.paymentMethods.includes('Efectivo') && (
                      <div className="mr-4 flex items-center">
                        <BanknotesIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-1 text-sm text-gray-500">Efectivo</span>
                      </div>
                    )}
                    {product.paymentMethods.includes('Tarjeta') && (
                      <div className="flex items-center">
                        <CreditCardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-1 text-sm text-gray-500">Tarjeta</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping check */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Verificar disponibilidad de envío</h3>
                <div className="mt-2 flex">
                  <input
                    type="text"
                    placeholder="Ingresa tu código postal"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    value={buyerPostalCode}
                    onChange={(e) => setBuyerPostalCode(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={checkShippingAvailability}
                    className="ml-4 inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Verificar
                  </button>
                </div>
                {isShippable !== null && (
                  <p className={`mt-2 text-sm ${isShippable ? 'text-green-600' : 'text-red-600'}`}>
                    {isShippable 
                      ? '¡Buenas noticias! Este producto puede ser enviado a tu ubicación.'
                      : 'Lo sentimos, este producto no puede ser enviado a tu ubicación.'}
                  </p>
                )}
              </div>

              {/* Add to cart */}
              <div className="mt-8 flex">
                <div className="mr-4">
                  <label htmlFor="quantity" className="sr-only">Cantidad</label>
                  <select
                    id="quantity"
                    name="quantity"
                    className="rounded-md border-gray-300 py-1.5 text-base text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  >
                    {[...Array(Math.min(10, product.stock)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                </button>
              </div>

              {/* Stock */}
              <p className="mt-2 text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} disponibles` : 'Producto agotado'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}