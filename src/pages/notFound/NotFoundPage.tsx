import { routes } from '@utils/const'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md1">
          <h1 className="text-5xl font-bold">
            <span className="text-6xl font-bold">404</span>
            <br />
            <span className="text-2xl">Página no encontrada</span>
          </h1>
          <Link to={routes.root} className="link mt-4">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
