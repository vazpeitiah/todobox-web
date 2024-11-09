import { useAuthContext } from '@hooks/useAuthContext'
import { routes } from '@utils/const'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { decodedToken } = useAuthContext()

  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Bienvenido {decodedToken?.name}
          </h1>
          <p className="mt-4 text-xl">
            Comienza a organizar tus tareas de forma sencilla
          </p>
          <div className="mt-6">
            <Link to={routes.tasks.root} className="btn btn-primary">
              Empieza ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
