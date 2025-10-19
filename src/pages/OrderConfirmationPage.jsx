import { Link, useParams } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="max-w-lg rounded-lg bg-white p-8 text-center shadow-lg dark:bg-background-dark-alt">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Order Successful!</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Thank you for your purchase. Your order ID is{' '}
          <span className="font-medium text-primary">#{orderId}</span>. You will receive an email confirmation shortly.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="rounded-lg bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary/90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
