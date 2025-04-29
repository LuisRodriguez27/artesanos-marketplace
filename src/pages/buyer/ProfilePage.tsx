import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/outline'

// Mock buyer data
const buyerData = {
  id: 1,
  name: 'Juan López',
  email: 'juan@ejemplo.com',
  phone: '5551234567',
  postalCode: '06700',
  address: 'Calle Ejemplo #123',
  colony: 'Centro',
  municipality: 'Cuauhtémoc',
  state: 'Ciudad de México',
}

type FormValues = {
  name: string
  email: string
  phone: string
  postalCode: string
  address: string
  colony: string
  municipality: string
  state: string
}

export default function BuyerProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isDirty },
    watch,
    setValue
  } = useForm<FormValues>({
    defaultValues: {
      name: buyerData.name,
      email: buyerData.email,
      phone: buyerData.phone,
      postalCode: buyerData.postalCode,
      address: buyerData.address,
      colony: buyerData.colony,
      municipality: buyerData.municipality,
      state: buyerData.state,
    }
  })
  
  const onSubmit = (data: FormValues) => {
    setIsSaving(true)
    
    // In a real app, you would make an API call to update the profile
    setTimeout(() => {
      console.log('Profile data:', data)
      setIsSaving(false)
      setSaveSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }
  
  const handlePostalCodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const postalCode = e.target.value
    if (postalCode.length === 5) {
      try {
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
      } catch (error) {
        console.error('Error al consultar el código postal', error)
      }
    }
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Mi Perfil</h1>
          <p className="mt-2 text-sm text-gray-500">
            Actualiza tu información personal y dirección de envío.
          </p>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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
            
            <div>
              <h2 className="text-lg font-medium text-gray-900">Información Personal</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'El nombre es obligatorio' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
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

                <div className="sm:col-span-3">
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
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900">Dirección de Envío</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Código Postal
                  </label>
                  <div className="mt-1">
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
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      onBlur={handlePostalCodeBlur}
                    />
                    {errors.postalCode && (
                      <p className="mt-2 text-sm text-red-600">{errors.postalCode.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-6">
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

                <div className="sm:col-span-2">
                  <label htmlFor="colony" className="block text-sm font-medium text-gray-700">
                    Colonia
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="colony"
                      {...register('colony', { required: 'La colonia es obligatoria' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">
                    Municipio
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="municipality"
                      {...register('municipality', { required: 'El municipio es obligatorio' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Link 
                to="/"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Cancelar
              </Link>
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
    </div>
  )
}