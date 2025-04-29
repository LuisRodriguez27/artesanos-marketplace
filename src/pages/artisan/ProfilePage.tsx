import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ArtisanLayout from '../../components/artisan/ArtisanLayout'
import { MapPinIcon, CheckIcon } from '@heroicons/react/24/outline'

// Mock artisan data
const artisanData = {
  id: 1,
  name: 'María González',
  email: 'maria@ejemplo.com',
  phone: '5551234567',
  photo: 'https://via.placeholder.com/150?text=MG',
  bio: 'Artesana con más de 20 años de experiencia en la elaboración de barro negro, siguiendo técnicas tradicionales heredadas por generaciones.',
  location: {
    postalCode: '70100',
    colony: 'San Bartolo Coyotepec',
    municipality: 'San Bartolo Coyotepec',
    state: 'Oaxaca',
  },
  artisanTypes: ['Barro Negro', 'Cerámica'],
  shippingZone: 'Estado', // Options: 'Colonia', 'Municipio', 'Estado'
  paymentMethods: {
    cash: true,
    card: false,
  },
  shippingPolicy: 'Envío gratuito en mi municipio. Envíos a otros estados tienen costo adicional dependiendo de la distancia y el peso del producto.'
}

type FormValues = {
  name: string
  email: string
  phone: string
  bio: string
  shippingZone: string
  paymentMethods: {
    cash: boolean
    card: boolean
  }
  shippingPolicy: string
  artisanTypes: string[]
}

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [photo, setPhoto] = useState<string | null>(artisanData.photo)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isDirty },
    watch,
    setValue
  } = useForm<FormValues>({
    defaultValues: {
      name: artisanData.name,
      email: artisanData.email,
      phone: artisanData.phone,
      bio: artisanData.bio,
      shippingZone: artisanData.shippingZone,
      paymentMethods: {
        cash: artisanData.paymentMethods.cash,
        card: artisanData.paymentMethods.card,
      },
      shippingPolicy: artisanData.shippingPolicy,
      artisanTypes: artisanData.artisanTypes,
    }
  })
  
  const watchShippingZone = watch('shippingZone')
  const watchPaymentMethods = watch('paymentMethods')
  
  const onSubmit = (data: FormValues) => {
    setIsSaving(true)
    
    // In a real app, you would make an API call to update the profile
    setTimeout(() => {
      console.log('Profile data:', data)
      console.log('Photo:', photo)
      setIsSaving(false)
      setSaveSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file)
      setPhoto(url)
    }
  }

  return (
    <ArtisanLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Mi Perfil</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Success message */}
            {saveSuccess && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">Perfil actualizado con éxito</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Información Personal</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Esta información será mostrada públicamente, así que ten cuidado con lo que compartes.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                        Foto
                      </label>
                      <div className="mt-2 flex items-center">
                        <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          {photo ? (
                            <img src={photo} alt="Foto de perfil" className="h-full w-full object-cover" />
                          ) : (
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          )}
                        </span>
                        <label
                          htmlFor="file-upload"
                          className="ml-5 cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                          <span>Cambiar</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handlePhotoChange} accept="image/*" />
                        </label>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'El nombre es obligatorio' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo electrónico
                      </label>
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone', { required: 'El teléfono es obligatorio' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Biografía / Historia
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          rows={4}
                          {...register('bio')}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Breve descripción sobre ti y tu trabajo como artesano..."
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Esta descripción será mostrada en tu perfil público.
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="artisanTypes" className="block text-sm font-medium text-gray-700">
                        Tipos de Artesanía
                      </label>
                      <div className="mt-2 space-y-2">
                        {['Barro Negro', 'Textiles', 'Joyería', 'Cerámica', 'Madera', 'Papel'].map((type) => (
                          <div key={type} className="flex items-center">
                            <input
                              id={`type-${type}`}
                              type="checkbox"
                              value={type}
                              {...register('artisanTypes')}
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
                </div>
              </div>
            </div>

            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Zonas de Envío y Pagos</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Define dónde puedes enviar tus productos y qué métodos de pago aceptas.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div>
                    <fieldset>
                      <legend className="text-sm font-medium text-gray-900">Zona de Envío</legend>
                      <p className="text-sm text-gray-500 mt-1">Selecciona un nivel máximo de alcance basado en tu ubicación</p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="shippingZone-colonia"
                            type="radio"
                            value="Colonia"
                            {...register('shippingZone', { required: true })}
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="shippingZone-colonia" className="ml-3 block text-sm font-medium text-gray-700">
                            Solo mi Colonia ({artisanData.location.colony})
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="shippingZone-municipio"
                            type="radio"
                            value="Municipio"
                            {...register('shippingZone', { required: true })}
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="shippingZone-municipio" className="ml-3 block text-sm font-medium text-gray-700">
                            Todo mi Municipio ({artisanData.location.municipality})
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="shippingZone-estado"
                            type="radio"
                            value="Estado"
                            {...register('shippingZone', { required: true })}
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="shippingZone-estado" className="ml-3 block text-sm font-medium text-gray-700">
                            Todo mi Estado ({artisanData.location.state})
                          </label>
                        </div>
                      </div>
                    </fieldset>

                    <div className="mt-6">
                      <fieldset>
                        <legend className="text-sm font-medium text-gray-900">Métodos de Pago Aceptados</legend>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-center">
                            <input
                              id="paymentMethods-cash"
                              type="checkbox"
                              {...register('paymentMethods.cash')}
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              disabled  // Efectivo siempre habilitado
                            />
                            <label htmlFor="paymentMethods-cash" className="ml-3 block text-sm font-medium text-gray-700">
                              Efectivo (siempre disponible para coordinación directa)
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="paymentMethods-card"
                              type="checkbox"
                              {...register('paymentMethods.card')}
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <label htmlFor="paymentMethods-card" className="ml-3 block text-sm font-medium text-gray-700">
                              Tarjeta (vía Stripe)
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                    {watchPaymentMethods.card && (
                      <div className="mt-6 rounded-md bg-yellow-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Configuración de Stripe requerida</h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              <p>Para aceptar pagos con tarjeta, necesitas conectar tu cuenta de Stripe.</p>
                              <p className="mt-1">
                                <a href="/dashboard/metodos-pago" className="font-medium text-yellow-700 underline hover:text-yellow-600">
                                  Configurar cuenta Stripe
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <label htmlFor="shippingPolicy" className="block text-sm font-medium text-gray-700">
                        Política de Envío y Pago
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="shippingPolicy"
                          rows={4}
                          {...register('shippingPolicy')}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Describe tus políticas de envío y pago..."
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Describe los detalles sobre costos de envío, tiempos de entrega y cómo se coordinará el pago en efectivo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Ubicación</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Esta es tu ubicación registrada basada en tu código postal.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="overflow-hidden rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-2 text-sm text-gray-500">
                        CP: {artisanData.location.postalCode}, {artisanData.location.colony}, {artisanData.location.municipality}, {artisanData.location.state}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Para cambiar tu ubicación, por favor contacta a soporte.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving || !isDirty}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ArtisanLayout>
  )
}