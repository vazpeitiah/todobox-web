import { useAuthContext } from '@hooks/useAuthContext'
import { routes } from '@utils/const'
import clsx from 'clsx'
import { Package, Plus, ProfileCircle } from 'iconoir-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDrawerStore } from '../../stores/drawer'

const Navbar = () => {
  const { pathname } = useLocation()
  const { isLogged, logout, decodedToken } = useAuthContext()
  const navigate = useNavigate()
  const { toggle: toggleDrawer } = useDrawerStore()

  const handleLogout = () => {
    logout()
    navigate(routes.login)
  }

  return (
    <nav
      className={clsx('bg-base-100 fixed top-0 w- z-[1] w-full', {
        ['sticky']: isLogged && pathname !== routes.root
      })}
    >
      <div className="navbar mx-auto max-w-4xl">
        <div className="navbar-start">
          <div className="flex-none md:hidden">
            <button
              onClick={toggleDrawer}
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
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
            <div className="navbar-center gap-2 hidden md:flex">
              <Link to={routes.tasks.root} className="btn btn-ghost btn-sm">
                Tareas
              </Link>
            </div>
            <div className="navbar-end gap-4 hidden md:flex">
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
                  <li className="menu-title">{decodedToken?.email}</li>
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
            <div className="navbar-end gap-2 hidden md:flex">
              <Link to={routes.signUp} className="btn btn-ghost btn-sm">
                Registrarse
              </Link>
              <Link to={routes.login} className="btn btn-outline btn-sm">
                Iniciar sesión
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
