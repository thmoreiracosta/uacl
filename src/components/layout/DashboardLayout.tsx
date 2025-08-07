import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ButtonWhatsappContact } from "../common/ButtonWhatsappContact";
import uaclLogo from "../../assets/logo-hori.png";

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/membro/dashboard", icon: "HomeIcon" },
    { name: "Formações", href: "/membro/cursos", icon: "AcademicCapIcon" },
    { name: "Agenda", href: "/membro/agenda", icon: "CalendarIcon" },
    { name: "Notificações", href: "/membro/notificacoes", icon: "BellIcon" },
    { name: "Depoimentos", href: "/membro/depoimentos", icon: "ChatIcon" },
    { name: "Minha Assinatura", href: "/membro/assinatura", icon: ""},
    { name: "Perfil", href: "/membro/perfil", icon: "UserIcon" },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-cream">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-white font-serif text-xl">
                União Apostólica
              </span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? "bg-primary-dark text-white"
                      : "text-gray-300 hover:bg-primary-dark hover:text-white"
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary-dark p-4">
            <div className="flex items-center">
              <div>
                <div className="text-base font-medium leading-none text-white">
                  {user?.name}
                </div>
                <div className="text-sm font-medium leading-none text-gray-300">
                  {user?.email}
                </div>
              </div>
              <button
                onClick={logout}
                className="ml-auto bg-primary-dark flex-shrink-0 p-1 rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-white"
              >
                <span className="sr-only">Sair</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-80">
          <div className="flex flex-col h-0 flex-1 bg-primary ">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto ">
              <div className="flex items-center flex-shrink-0 px-4 pr-8 mt-4 mb-8 flex-col">
                <img src={uaclLogo} alt="logo-uacl-uniao-apostolica" />
                <div className="w-full h-px bg-secondary mt-4"></div>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? "bg-primary-dark text-white"
                        : "text-gray-300 hover:bg-primary-dark hover:text-white"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-500 p-4">
              <div className="flex items-center">
                <div>
                  <div className="text-sm font-medium leading-none text-white">
                    {user?.name}
                  </div>
                  <div className="text-xs font-medium leading-none text-gray-300">
                    {user?.email}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="ml-auto bg-primary-dark flex-shrink-0 p-1 rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-white"
                >
                  <span className="sr-only">Sair</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <ButtonWhatsappContact />
    </div>
  );
};
