import { ErrorMessage } from "@components"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegisterUser } from "@queries/auth"
import { routes } from "@utils/const"
import { CreateUser, createUserSchema } from "@utils/types"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const defaultValues: CreateUser = {
  email: "",
  password: "",
  confirmPassword: "",
  name: ""
}

const SignUpPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: zodResolver(createUserSchema)
  })
  const navigate =useNavigate()
  const { registerUser } = useRegisterUser({
    onSuccess: () => navigate(routes.login)
  })

  const handleOnSubmit: SubmitHandler<CreateUser> = (data) => {
    registerUser(data)
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="card bg-base-100 shadow-lg sm:w-96">
          <form className="card-body" onSubmit={handleSubmit(handleOnSubmit)}>
            <h1 className="card-title font-bold text-2xl"> Registrarme </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                placeholder="Escribe tu nombre"
                className="input input-bordered"
                {...register("name")}
              />
              {errors.name?.message && (
                <ErrorMessage>{errors.name.message.toString()}</ErrorMessage>
              )}
            </div>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmar contraseña</span>
              </label>
              <input
                type="password"
                placeholder="Escribe tu contraseña"
                className="input input-bordered"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword?.message && (
                <ErrorMessage>
                  {errors.confirmPassword.message.toString()}
                </ErrorMessage>
              )}
              {/*   <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label> */}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Registrarme</button>
              <div className="text-sm mt-3">
                <span className=" text-gray-500">¿Ya tienes una cuenta? </span>
                <Link to={routes.login} className="link">
                  Inicia sesión
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
