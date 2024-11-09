import { useAuthContext } from "@hooks/useAuthContext"
import { routes } from "@utils/const"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const { isLogged } = useAuthContext()

  if (!isLogged) {
    return <Navigate to={routes.login} />
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default PrivateRoute
