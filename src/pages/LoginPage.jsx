import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Log in to continue to UADE Marketplace</p>
        </div>
        <div className="bg-white dark:bg-background-dark rounded-xl shadow-lg p-8">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link className="font-medium text-primary hover:text-primary/80" to="/register">
            Sign up
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

export default LoginPage;
