import { login } from "@api/auth";
import { useToastContext } from "@hooks/useToastContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useLogin = () => {
  const { error: toastError } = useToastContext();
  const {
    data: token,
    mutate,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toastError("Credenciales incorrectas");
        return
      }
      toastError("Error en la petición: ", {
        description: error.message,
      });
    },
  });

  return { token, login: mutate, isError, error, isSuccess };
};

export default useLogin;
