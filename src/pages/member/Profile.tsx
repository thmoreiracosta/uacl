import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  const profileFormik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "(21) 98765-4321", // Mock data
      address: "Rua São Clemente, 225", // Mock data
      city: "Rio de Janeiro", // Mock data
      state: "RJ", // Mock data
      zipCode: "22260-001", // Mock data
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nome é obrigatório"),
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      phone: Yup.string(),
      address: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipCode: Yup.string(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setSuccessMessage(null);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real app, this would update the user profile
        console.log("Profile updated:", values);

        setSuccessMessage("Perfil atualizado com sucesso!");
      } catch {
        setError(
          "Ocorreu um erro ao atualizar seu perfil. Por favor, tente novamente."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Senha atual é obrigatória"),
      newPassword: Yup.string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .required("Nova senha é obrigatória"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "As senhas não conferem")
        .required("Confirmação de senha é obrigatória"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setSuccessMessage(null);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real app, this would update the user's password
        console.log("Password updated:", values);

        setSuccessMessage("Senha atualizada com sucesso!");
        passwordFormik.resetForm();
      } catch {
        setError(
          "Ocorreu um erro ao atualizar sua senha. Por favor, tente novamente."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-primary">
          Meu Perfil
        </h1>
        <p className="text-gray-600">
          Gerencie suas informações pessoais e senha.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "profile"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-primary"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Informações Pessoais
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "password"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-primary"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Alterar Senha
          </button>
        </div>

        <div className="p-6">
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {activeTab === "profile" ? (
            <form onSubmit={profileFormik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileFormik.values.name}
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      profileFormik.touched.name && profileFormik.errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                    disabled={isLoading}
                  />
                  {profileFormik.touched.name && profileFormik.errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {profileFormik.errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileFormik.values.email}
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      profileFormik.touched.email && profileFormik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                    disabled={isLoading}
                  />
                  {profileFormik.touched.email &&
                    profileFormik.errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {profileFormik.errors.email}
                      </p>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={profileFormik.values.phone}
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileFormik.values.address}
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={profileFormik.values.city}
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Estado
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={profileFormik.values.state}
                      onChange={profileFormik.handleChange}
                      onBlur={profileFormik.handleBlur}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      CEP
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={profileFormik.values.zipCode}
                      onChange={profileFormik.handleChange}
                      onBlur={profileFormik.handleBlur}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-primary text-white font-medium hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={passwordFormik.handleSubmit}>
              <div className="space-y-6 max-w-md">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordFormik.values.currentPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      passwordFormik.touched.currentPassword &&
                      passwordFormik.errors.currentPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                    disabled={isLoading}
                  />
                  {passwordFormik.touched.currentPassword &&
                    passwordFormik.errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {passwordFormik.errors.currentPassword}
                      </p>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordFormik.values.newPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      passwordFormik.touched.newPassword &&
                      passwordFormik.errors.newPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                    disabled={isLoading}
                  />
                  {passwordFormik.touched.newPassword &&
                    passwordFormik.errors.newPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {passwordFormik.errors.newPassword}
                      </p>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordFormik.values.confirmPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      passwordFormik.touched.confirmPassword &&
                      passwordFormik.errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                    disabled={isLoading}
                  />
                  {passwordFormik.touched.confirmPassword &&
                    passwordFormik.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {passwordFormik.errors.confirmPassword}
                      </p>
                    )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-primary text-white font-medium hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {isLoading ? "Alterando..." : "Alterar Senha"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
