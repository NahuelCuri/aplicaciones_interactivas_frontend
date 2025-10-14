import RegisterForm from '../components/RegisterForm';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Create your account</h1>
        </div>
        <div className="bg-card-light dark:bg-card-dark p-10 rounded-xl shadow-lg">
          <RegisterForm />
        </div>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link className="font-medium text-primary hover:text-primary/80" to="/">
            I don't want an account!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
