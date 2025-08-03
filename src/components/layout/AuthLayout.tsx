import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import logoUacl from "../../assets/LOGO2.png";
import { ButtonWhatsappContact } from "../common/ButtonWhatsappContact";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <div className="flex justify-center">
            <div className="h-24 w-24 bg-primary rounded-full flex items-center justify-center border-4 border-secondary">
              <img src={logoUacl} alt="logo-uacl-uniao-apostolica" />
            </div>
          </div>
        </Link>
        <h2 className="mt-8 text-center text-4xl font-serif font-bold text-primary">
          União Apostólica <br /> 
          <strong className="text-secondary font-extrabold text-4xl">Cardeal Leme</strong>
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <Outlet />
        </div>
      </div>
      <ButtonWhatsappContact />
    </div>
  );
};
