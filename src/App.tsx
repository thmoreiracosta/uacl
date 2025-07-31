/* import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './components/layout/AuthLayout';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import CardealLeme from './pages/CardealLeme';
import Initiatives from './pages/Initiatives';
import Events from './pages/Events';
import Contact from './pages/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Member Pages
import { Dashboard } from './pages/member/Dashboard';
import { Courses } from './pages/member/Courses';
import { Schedule } from './pages/member/Schedule';
import { Notifications } from './pages/member/Notifications';
import { Profile } from './pages/member/Profile';

// Payment Pages
import { Membership } from './pages/payment/Membership';
import { Success } from './pages/payment/Success';

export function App() {
  return (
    <Routes>
      {/* Public Routes */ /*}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/cardeal-leme" element={<CardealLeme />} />
        <Route path="/iniciativas" element={<Initiatives />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/seja-membro" element={<Membership />} />
      </Route>

      {/* Auth Routes */ /*}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/cadastro" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/esqueci-senha" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
      </Route>

      {/* Member Routes (Protected) */ /*}
      <Route element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        <Route path="/membro/dashboard" element={<Dashboard />} />
        <Route path="/membro/cursos" element={<Courses />} />
        <Route path="/membro/agenda" element={<Schedule />} />
        <Route path="/membro/notificacoes" element={<Notifications />} />
        <Route path="/membro/perfil" element={<Profile />} />
      </Route>

      {/* Payment Success */ /*}
      <Route path="/pagamento/sucesso" element={<Success />} />
    </Routes>
  );
}*/

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../src/hooks/useAuth";

import { ThemeProvider } from "../src/providers/ThemeProvider";

// Layouts
import { MainLayout } from "../src/components/layout/MainLayout";
import { DashboardLayout } from "../src/components/layout/DashboardLayout";
import { AuthLayout } from "../src/components/layout/AuthLayout";

// Public Pages
import { Home } from "../src/pages/Home";
import { About } from "../src/pages/About";
import { CardealLeme } from "../src/pages/CardealLeme";
import { Initiatives } from "../src/pages/Initiatives";
import { Events } from "../src/pages/Events";
import { Contact } from "../src/pages/Contact";

// Auth Pages
import { Login } from "../src/pages/auth/Login";
import { Register } from "../src/pages/auth/Register";
import { ForgotPassword } from "../src/pages/auth/ForgotPassword";

// Member Pages
import { Dashboard } from "../src/pages/member/Dashboard";
import { Profile } from "../src/pages/member/Profile";
import { Courses } from "../src/pages/member/Courses";
import { Schedule } from "../src/pages/member/Schedule";
import { Notifications } from "../src/pages/member/Notifications";

// Payment Pages
import { Membership } from "../src/pages/payment/Membership";
import { Success } from "../src/pages/payment/Success";

// Protected Route
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<About />} />
            <Route path="cardeal-leme" element={<CardealLeme />} />
            <Route path="iniciativas" element={<Initiatives />} />
            <Route path="eventos" element={<Events />} />
            <Route path="contato" element={<Contact />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="cadastro" element={<Register />} />
            <Route path="esqueci-senha" element={<ForgotPassword />} />
          </Route>

          {/* Member Routes */}
          <Route
            path="/membro"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/membro/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="perfil" element={<Profile />} />
            <Route path="cursos" element={<Courses />} />
            <Route path="agenda" element={<Schedule />} />
            <Route path="notificacoes" element={<Notifications />} />
          </Route>

          {/* Payment Routes */}
          <Route path="/seja-membro" element={<Membership />} />
          <Route path="/pagamento/sucesso" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

