import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonWhatsappContact } from "../components/common/ButtonWhatsappContact";

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nome é obrigatório"),
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      phone: Yup.string(),
      subject: Yup.string().required("Assunto é obrigatório"),
      message: Yup.string().required("Mensagem é obrigatória"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real app, this would send the form data to a server
        console.log("Form submitted:", values);

        setIsSubmitted(true);
      } catch (err) {
        console.error("Error submitting form:", err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24 mt-24 relative">
        <div className="absolute inset-0 opacity-10 cross-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Estamos à disposição para responder suas dúvidas, receber
              sugestões ou conversar sobre como você pode participar de nossas
              atividades.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">
                  Fale Conosco
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Envie-nos uma mensagem
              </h2>
              <p className="text-gray-700 mb-8">
                Preencha o formulário abaixo e entraremos em contato o mais
                breve possível. Sua mensagem é importante para nós.
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 p-6 rounded-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-green-800">
                      Mensagem Enviada!
                    </h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    Obrigado por entrar em contato conosco. Recebemos sua
                    mensagem e responderemos o mais breve possível.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      formik.resetForm();
                    }}
                    className="text-green-700 font-medium hover:text-green-800"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-3 py-2 border ${
                          formik.touched.name && formik.errors.name
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                        disabled={isLoading}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-3 py-2 border ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                        disabled={isLoading}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-6">
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
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Assunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border ${
                        formik.touched.subject && formik.errors.subject
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                      disabled={isLoading}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.subject}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border ${
                        formik.touched.message && formik.errors.message
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                      disabled={isLoading}
                    ></textarea>
                    {formik.touched.message && formik.errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-primary text-white font-medium hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {isLoading ? "Enviando..." : "Enviar Mensagem"}
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div>
              <div className="bg-white p-8 border border-gray-200 h-full">
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">
                  Informações de Contato
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Endereço
                      </h4>
                      <p className="text-gray-700">
                      Av. das Américas, 2901
                        <br />
                        Barra da Tijuca, Rio de Janeiro - RJ
                        <br />
                        CEP: 22631-002
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Telefone
                      </h4>
                      <p className="text-gray-700">
                        (21) 2537-1234
                        <br />
                        (21) 98765-4321
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-700">
                        contato@uniaoapostolica.com                        
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Horário de Funcionamento
                      </h4>
                      <p className="text-gray-700">
                        Segunda a Sexta: 9h às 18h
                        <br />
                        Sábado: 9h às 12h
                        <br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Redes Sociais
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20"
                    >
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20"
                    >
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20"
                    >
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20"
                    >
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-secondary w-12 mr-4"></div>
              <span className="text-secondary uppercase tracking-widest text-sm">
                Localização
              </span>
              <div className="h-px bg-secondary w-12 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Como Chegar
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="bg-gray-200 h-96 flex items-center justify-center">
            <p className="text-gray-500">Mapa será carregado aqui</p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-cream p-6 border-t-4 border-primary">
              <h3 className="text-xl font-serif font-bold text-primary mb-3">
                De Carro
              </h3>
              <p className="text-gray-700">
                Estacionamento próprio com entrada pela Rua São Clemente, 225.
                Vagas limitadas, por ordem de chegada.
              </p>
            </div>
            <div className="bg-cream p-6 border-t-4 border-primary">
              <h3 className="text-xl font-serif font-bold text-primary mb-3">
                Transporte Público
              </h3>
              <p className="text-gray-700">
                Metrô: Estação Botafogo (10 minutos a pé).
                <br />
                Ônibus: Linhas 409, 410, 426, 581 (ponto na esquina).
              </p>
            </div>
            <div className="bg-cream p-6 border-t-4 border-primary">
              <h3 className="text-xl font-serif font-bold text-primary mb-3">
                Acessibilidade
              </h3>
              <p className="text-gray-700">
                Nossa sede possui rampas de acesso, elevadores e banheiros
                adaptados para pessoas com mobilidade reduzida.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ButtonWhatsappContact />
    </div>
  );
};
