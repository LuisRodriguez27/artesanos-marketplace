import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  postalCode: string
  acceptTerms: boolean
}

export default function ArtisanRegistrationPage() {
  const [step, setStep] = useState(1)
  const [locationData, setLocationData] = useState<{ 
    colony: string, 
    municipality: string, 
    state: string 
  } | null>(null)

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    setValue
  } = useForm<FormValues>()

  const password = watch('password')

  const onSubmit = (data: FormValues) => {
    console.log(data)
    // Here you would typically send the data to your API
    alert('Registro exitoso! En un entorno real, recibirías un correo de verificación.')
  }

  const handlePostalCodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const postalCode = e.target.value
    if (postalCode.length === 5) {
      try {
        // In a real app, you would call your API to get location data
        console.log('Consultando API Copomex para CP:', postalCode)
        
        // This is mock data for the example
        const mockLocationData = {
          colony: 'Nombre de Colonia',
          municipality: 'Nombre de Municipio',
          state: 'Estado'
        }
        
        setLocationData(mockLocationData)
      } catch (error) {
        console.error('Error al consultar el código postal', error)
      }
    }
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Registro de Artesano
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <Link to="/iniciar-sesion" className="font-medium text-primary-600 hover:text-primary-500">
              inicia sesión si ya tienes una cuenta
            </Link>
          </p>
        </div>

        <div className="mt-8 bg-white px-6 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'El nombre es obligatorio' })}
                  className="input"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'El correo es obligatorio',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Correo electrónico inválido'
                    }
                  })}
                  className="input"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register('password', { 
                    required: 'La contraseña es obligatoria',
                    minLength: {
                      value: 8,
                      message: 'La contraseña debe tener al menos 8 caracteres'
                    }
                  })}
                  className="input"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', { 
                    required: 'Por favor confirma tu contraseña',
                    validate: value => value === password || 'Las contraseñas no coinciden'
                  })}
                  className="input"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                Código Postal (CP) <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="postalCode"
                  type="text"
                  {...register('postalCode', { 
                    required: 'El código postal es obligatorio',
                    pattern: {
                      value: /^[0-9]{5}$/,
                      message: 'El código postal debe tener 5 dígitos'
                    }
                  })}
                  className="input"
                  onBlur={handlePostalCodeBlur}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            {locationData && (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Información de ubicación</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Colonia: {locationData.colony}</p>
                      <p>Municipio: {locationData.municipality}</p>
                      <p>Estado: {locationData.state}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center">
              <input
                id="acceptTerms"
                type="checkbox"
                {...register('acceptTerms', { required: 'Debes aceptar los términos y condiciones' })}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
                Acepto los{' '}
                <Link to="/terminos" className="font-medium text-primary-600 hover:text-primary-500">
                  términos y condiciones
                </Link>{' '}
                y el{' '}
                <Link to="/privacidad" className="font-medium text-primary-600 hover:text-primary-500">
                  aviso de privacidad
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center btn btn-primary"
              >
                Registrarme
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">O continúa con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
                Google
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}