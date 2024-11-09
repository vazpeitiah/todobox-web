import { useAuthContext } from "@hooks/useAuthContext"
import { routes } from "@utils/const"
import clsx from "clsx"
import { Package, Plus, ProfileCircle } from "iconoir-react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const { isLogged, logout } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(routes.login)
  }

  return (
    <nav
      className={clsx("bg-base-100 fixed top-0 w-full", {
        ["sticky"]: isLogged
      })}
    >
      <div className="navbar mx-auto max-w-4xl">
        <div className="navbar-start">
          <Link
            className="btn btn-ghost text-xl font-black"
            to={isLogged ? routes.root : routes.about}
          >
            <Package className="w-6 h-6" />
            TodoBox
          </Link>
        </div>
        {isLogged ? (
          <>
            <div className="navbar-center gap-2">
              <Link to={routes.tasks.root} className="btn btn-ghost btn-sm">
                Tareas
              </Link>
            </div>
            <div className="navbar-end gap-4">
              <Link
                to={routes.tasks.new}
                className="btn btn-success btn-xs text-sm"
              >
                <Plus />
                Nueva
              </Link>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <ProfileCircle />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to={routes.profile} className="justify-between">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-end gap-2">
              <Link to={routes.login} className="btn btn-primary btn-sm">
                Iniciar sesión
              </Link>
              <Link to={routes.signUp} className="btn btn-ghost btn-sm">
                Registrarse
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
