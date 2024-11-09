import { useAuthContext } from '@hooks/useAuthContext'

const ProfilePage = () => {
  const { decodedToken } = useAuthContext()
  return (
    <div className="hero py-4">
      <div className="card bg-base-200">
        <div className="card-body">
          <h1 className="card-title">Perfil de usuario</h1>
          <div className="divider"></div>
          <table className="table">
            <tbody>
              <tr>
                <td className="font-bold">Nombre:</td>
                <td>{decodedToken?.name}</td>
              </tr>
              <tr>
                <td className="font-bold">Email:</td>
                <td>{decodedToken?.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
