import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  CheckIcon, 
  ExclamationCircleIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

// Sample cart items grouped by artisan
const cartByArtisan = [
  {
    artisan: {
      id: 1,
      name: 'María González',
      location: 'San Bartolo Coyotepec, Oaxaca',
      shippingZones: ['Colonia', 'Municipio', 'Estado'],
      paymentMethods: ['Efectivo', 'Tarjeta'],
      shippingPolicy: 'Envío gratuito en mi municipio. Envíos a otros estados tienen costo adicional.',
    },
    items: [
      {
        id: 1,
        name: 'Artesanía de Barro Negro',
        price: 350,
        quantity: 1,
        imageSrc: 'https://via.placeholder.com/100x100?text=Producto+1',
      }
    ],
    subtotal: 350,
  },
  {
    artisan: {
      id: 2,
      name: 'Juan Pérez',
      location: 'Teotitlán del Valle, Oaxaca',
      shippingZones: ['Estado'],
      paymentMethods: ['Efectivo'],
      shippingPolicy: 'Envío con costo adicional según la distancia.',
    },
    items: [
      {
        id: 2,
        name: 'Textil Bordado a Mano',
        price: 500,
        quantity: 2,
        imageSrc: 'https://via.placeholder.com/100x100?text=Producto+2',
      }
    ],
    subtotal: 1000,
  }
]

type FormValues = {
  fullName: string
  email: string
  phone: string
  postalCode: string
  address: string
  colony: string
  municipality: string
  state: string
  paymentMethods: Record<number, string>
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [shippingCompatibility, setShippingCompatibility] = useState<Record<number, boolean>>({})

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      postalCode: '',
      address: '',
      colony: '',
      municipality: '',
      state: '',
      paymentMethods: {}
    }
  })

  const postalCode = watch('postalCode')

  const handlePostalCodeBlur = async () => {
    if (postalCode && postalCode.length === 5) {
      // In a real app, you would call your API to get location data
      console.log('Consultando API Copomex para CP:', postalCode)
      
      // Mock data for the example
      const mockLocationData = {
        colony: 'Nombre de Colonia',
        municipality: 'Nombre de Municipio',
        state: 'Estado'
      }
      
      setValue('colony', mockLocationData.colony)
      setValue('municipality', mockLocationData.municipality)
      setValue('state', mockLocationData.state)
      
      // Check shipping compatibility for each artisan
      const compatibility: Record<number, boolean> = {}
      
      cartByArtisan.forEach(group => {
        // In a real app, you would check if the buyer's location is within the artisan's shipping zones
        // For this example, we'll just use random compatibility based on artisan ID
        compatibility[group.artisan.id] = group.artisan.id % 2 === 0
      })
      
      setShippingCompatibility(compatibility)
    }
  }

  const canProceed = Object.keys(shippingCompatibility).length > 0 && 
    Object.values(shippingCompatibility).every(compatible => compatible)

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data)
    
    // In a real app, you would submit the order to your API
    setOrderNumber(`ORD-${Math.floor(Math.random() * 10000)}`)
    setOrderComplete(true)
  }

  const total = cartByArtisan.reduce((sum, group) => sum + group.subtotal, 0)

  if (orderComplete) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">¡Gracias por tu compra!</h1>
            <p className="mt-2 text-lg text-gray-500">Tu orden #{orderNumber} ha sido recibida.</p>
            
            <div className="mt-8 text-sm text-gray-500">
              <p>Hemos enviado un correo de confirmación a tu dirección email.</p>
              <p className="mt-2">Los artesanos se pondrán en contacto contigo para coordinar el envío y/o pago según el método seleccionado.</p>
            </div>
            
            <div className="mt-8">
              <Link to="/" className="btn btn-primary">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-7">
              {/* Step 1: Shipping Information */}
              <div className={`border-b border-gray-200 pb-8 ${step !== 1 && 'opacity-50'}`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Información de Envío</h2>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      Editar
                    </button>
                  )}
                </div>

                {step === 1 ? (
                  <form className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                          Nombre completo
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="fullName"
                            {...register('fullName', { required: 'El nombre es obligatorio' })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                          {errors.fullName && (
                            <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Correo electrónico
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="email"
                            {...register('email', { 
                              required: 'El correo es obligatorio',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Correo electrónico inválido'
                              }
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Teléfono
                        </label>
                        <div className="mt-1">
                          <input
                            type="tel"
                            id="phone"
                            {...register('phone', { required: 'El teléfono es obligatorio' })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                          {errors.phone && (
                            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                          Código Postal
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            type="text"
                            id="postalCode"
                            {...register('postalCode', { 
                              required: 'El código postal es obligatorio',
                              pattern: {
                                value: /^[0-9]{5}$/,
                                message: 'El código postal debe tener 5 dígitos'
                              }
                            })}
                            className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            onBlur={handlePostalCodeBlur}
                          />
                          {errors.postalCode && (
                            <p className="mt-2 text-sm text-red-600">{errors.postalCode.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Dirección
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="address"
                            {...register('address', { required: 'La dirección es obligatoria' })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                          {errors.address && (
                            <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="colony" className="block text-sm font-medium text-gray-700">
                          Colonia
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="colony"
                            {...register('colony', { required: 'La colonia es obligatoria' })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            readOnly
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">
                          Municipio
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="municipality"
                            {...register('municipality', { required: 'El municipio es obligatorio' })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          Estado
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="state"
                            {...register('state', { required: 'El estado es obligatorio' })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping compatibility check */}
                    {Object.keys(shippingCompatibility).length > 0 && (
                      <div className="rounded-md bg-blue-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Verificación de compatibilidad de envío</h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <ul className="list-disc space-y-1 pl-5">
                                {cartByArtisan.map(group => (
                                  <li key={group.artisan.id}>
                                    {group.artisan.name}: {shippingCompatibility[group.artisan.id] 
                                      ? 'Compatible ✓' 
                                      : 'No compatible ⨯'}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {!canProceed && (
                              <div className="mt-4">
                                <div className="flex">
                                  <div className="flex-shrink-0">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm text-red-700">
                                      Uno o más artesanos no pueden enviar a tu ubicación. Modifica tu dirección o elimina esos productos.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          if (canProceed) {
                            setStep(2)
                          } else {
                            alert('Por favor verifica la compatibilidad de envío antes de continuar')
                          }
                        }}
                        className="w-full btn btn-primary"
                        disabled={!canProceed || Object.keys(shippingCompatibility).length === 0}
                      >
                        Continuar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">
                      {watch('fullName')}<br />
                      {watch('email')} | {watch('phone')}<br />
                      {watch('address')}, {watch('colony')}<br />
                      {watch('municipality')}, {watch('state')}, CP: {watch('postalCode')}
                    </p>
                  </div>
                )}
              </div>

              {/* Step 2: Payment Method */}
              <div className={`mt-8 ${step !== 2 && 'opacity-50'}`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Método de Pago</h2>
                </div>

                {step === 2 && (
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    {cartByArtisan.map(group => (
                      <div key={group.artisan.id} className="border-t border-gray-200 pt-6">
                        <h3 className="text-base font-medium text-gray-900">
                          Productos de {group.artisan.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {group.artisan.location}
                        </p>

                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-900">Métodos de pago disponibles:</p>
                          <div className="mt-2 space-y-3">
                            {group.artisan.paymentMethods.includes('Efectivo') && (
                              <div className="flex items-center">
                                <input
                                  id={`cash-${group.artisan.id}`}
                                  type="radio"
                                  value="Efectivo"
                                  {...register(`paymentMethods.${group.artisan.id}`, { 
                                    required: 'Selecciona un método de pago' 
                                  })}
                                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <label htmlFor={`cash-${group.artisan.id}`} className="ml-3 block text-sm text-gray-700">
                                  <div className="flex items-center">
                                    <BanknotesIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                                    Efectivo (Coordinación directa con el artesano)
                                  </div>
                                </label>
                              </div>
                            )}

                            {group.artisan.paymentMethods.includes('Tarjeta') && (
                              <div className="flex items-center">
                                <input
                                  id={`card-${group.artisan.id}`}
                                  type="radio"
                                  value="Tarjeta"
                                  {...register(`paymentMethods.${group.artisan.id}`, { 
                                    required: 'Selecciona un método de pago' 
                                  })}
                                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <label htmlFor={`card-${group.artisan.id}`} className="ml-3 block text-sm text-gray-700">
                                  <div className="flex items-center">
                                    <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                                    Tarjeta
                                  </div>
                                </label>
                              </div>
                            )}
                          </div>
                          {errors.paymentMethods?.[group.artisan.id] && (
                            <p className="mt-2 text-sm text-red-600">{errors.paymentMethods[group.artisan.id]?.message}</p>
                          )}
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-900">Política de envío:</p>
                          <p className="mt-1 text-sm text-gray-500">{group.artisan.shippingPolicy}</p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-gray-200 pt-6">
                      <button
                        type="submit"
                        className="w-full btn btn-primary"
                      >
                        Confirmar Pedido
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-16 lg:col-span-5 lg:mt-0">
              <div className="rounded-lg bg-white p-6 shadow-md lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">Resumen de la orden</h2>

                <div className="mt-6 space-y-4">
                  <h3 className="sr-only">Items</h3>
                  
                  {cartByArtisan.map(group => (
                    <div key={group.artisan.id} className="border-b border-gray-200 pb-4">
                      <p className="font-medium text-gray-900">Productos de {group.artisan.name}</p>
                      {group.items.map(item => (
                        <div key={item.id} className="mt-2 flex items-center py-2">
                          <img
                            src={item.imageSrc}
                            alt={item.name}
                            className="h-16 w-16 flex-none rounded-md object-cover object-center"
                          />
                          <div className="ml-4 flex-auto">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} MXN x {item.quantity}</p>
                          </div>
                          <p className="ml-4 text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)} MXN</p>
                        </div>
                      ))}
                      <p className="mt-2 flex justify-between text-sm font-medium">
                        <span>Subtotal</span>
                        <span>${group.subtotal.toFixed(2)} MXN</span>
                      </p>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium text-gray-900">Total de la orden</p>
                      <p className="text-base font-medium text-gray-900">${total.toFixed(2)} MXN</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}