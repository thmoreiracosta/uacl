import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      password: Yup.string().required("Senha é obrigatória"),
    }),
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);

      try {
        await login(values.email, values.password);
        navigate("/membro/dashboard");
      } catch (err) {
        console.error("Erro ao fazer login:", err);
        setError("Email ou senha incorretos. Por favor, tente novamente.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
        Entrar
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`w-full px-3 py-2 border ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className={`w-full px-3 py-2 border ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
              checked={formik.values.remember}
              onChange={formik.handleChange}
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-700"
            >
              Lembrar-me
            </label>
          </div>

          <Link
            to="/esqueci-senha"
            className="text-sm text-secondary hover:text-primary"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link
            to="/cadastro"
            className="font-medium text-secondary hover:text-primary"
          >
            Cadastre-se
          </Link>
        </p>
      </div>

      {/* ✅ Botão Card para voltar para Home */}
      <div className="mt-6 flex justify-center">
        <Link
          to="/"
          className="inline-block px-6 py-3 border rounded-lg shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700"
        >
          ← Voltar para a Home
        </Link>
      </div>
    </div>
  );
};
