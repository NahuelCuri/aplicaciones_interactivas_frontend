import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from './TextInput';
import authService from '../services/authService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    setValidationError('');

    setError('');
    setLoading(true);
    console.log('Attempting to log in with:', { email, password });
    try {
      const response = await authService.login(email, password);
      console.log('Login successful:', response.data);

      // Store both token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
          Email address
        </label>
        <div className="mt-1">
          <TextInput
            type="email"
            name="email"
            id="email"
            placeholder="your.email@example.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {validationError && <p className="text-red-500 text-xs mt-1">{validationError}</p>}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
            Password
          </label>
          <div className="text-sm">
            <a className="font-medium text-primary hover:text-primary/80" href="#">
              Forgot your password?
            </a>
          </div>
        </div>
        <div className="mt-1">
          <TextInput
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log('Password input:', e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <button
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;