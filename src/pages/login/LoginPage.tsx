import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, Navigate } from "react-router-dom"

import { useAuthContext } from "@hooks/useAuthContext"
import { routes } from "@utils/const"
import { AuthParams, authParamsSchema } from "@utils/types"
import { ErrorMessage } from "@components"

const defaultValues: AuthParams = {
  email: "",
  password: ""
}

const LoginPage = () => {
  const { isLogged, login } = useAuthContext()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: zodResolver(authParamsSchema)
  })

  const handleOnSubmit: SubmitHandler<AuthParams> = (data) => {
    login(data)
  }

  if (isLogged) {
    return <Navigate to={routes.root} />
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="card bg-base-100 shadow-lg sm:w-96">
          <form className="card-body" onSubmit={handleSubmit(handleOnSubmit)}>
            <h1 className="card-title font-bold text-2xl">Iniciar sesión</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo electrónico</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                {...register("email")}
              />
              {errors.email?.message && (
                <ErrorMessage>{errors.email.message.toString()}</ErrorMessage>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                placeholder="Escribe tu contraseña"
                className="input input-bordered"
                {...register("password")}
              />
              {errors.password?.message && (
                <ErrorMessage>
                  {errors.password.message.toString()}
                </ErrorMessage>
              )}
              {/*   <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Inicar sesión</button>
              <div className="text-sm mt-3">
                <span className=" text-gray-500">¿No tienes cuenta? </span>
                <Link to={routes.signUp} className="link">
                  Regístrate
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
