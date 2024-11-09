import { routes } from "@utils/const"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Bienvenido a TodoBox</h1>
          <p className="py-6 prose">
            Todobox es una aplicación de gestión de tareas enfocada en facilitar
            la organización personal mediante el uso de metodologías como GTD
            (Getting Things Done). Su diseño sencillo permite a los usuarios
            capturar, organizar y gestionar sus tareas de forma intuitiva,
            manteniéndose productivos y enfocados en lo que importa.
          </p>
          <Link to={routes.login} className="btn btn-primary">
            Empieza ahora
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
