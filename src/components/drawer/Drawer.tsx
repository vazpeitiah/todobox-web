import { useAuthContext } from '@hooks/useAuthContext'
import { routes } from '@utils/const'
import { Package } from 'iconoir-react'
import { Link } from 'react-router-dom'
import { useDrawerStore } from '../../stores/drawer'

const Drawer = () => {
  const { isLogged } = useAuthContext()
  const { toggle } = useDrawerStore()

  return (
    <ul className="menu bg-base-200 min-h-full w-80 p-4 gap-6">
      <li className="menu-title flex-row items-center gap-2">
        <Package className="w-6 h-6" />
        <h1 className="text-xl font-bol">TodoBox</h1>
      </li>
      {isLogged ? (
        <></>
      ) : (
        <>
          <li>
            <Link
              to={routes.login}
              className="btn btn-outline"
              onClick={toggle}
            >
              Iniciar sesión
            </Link>
          </li>
          <li>
            <Link
              to={routes.signUp}
              className="btn btn-outline"
              onClick={toggle}
            >
              Registrarme
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}

export default Drawer
