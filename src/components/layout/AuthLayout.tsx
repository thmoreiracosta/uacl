import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center border-4 border-secondary">
              <span className="text-white font-serif text-2xl font-bold">CL</span>
            </div>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-serif font-bold text-primary">
          União Apostólica Cardeal Leme
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};