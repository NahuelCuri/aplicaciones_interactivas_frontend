import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';

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
          <a className="font-medium text-primary hover:text-primary/80" href="/register">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
