import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import userService from '../services/userService';
import { useAuth } from '../services/AuthContext';

const BecomeSellerPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClick = async () => {
    try {
      const response = await userService.becomeSeller();
      const { access_token, user } = response.data;
      login(user, access_token);
      navigate('/');
    } catch (error) {
      console.error('Failed to become a seller', error);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-10 sm:py-16">
        <div className="flex flex-col gap-6 p-4 w-full max-w-4xl">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-text-slate-gray text-4xl font-black leading-tight tracking-[-0.033em]">Confirm You Want to Become a Seller</p>
            <p className="text-gray-500 text-lg font-normal leading-normal">Review the details below before proceeding.</p>
          </div>
          <div className="bg-surface-white p-8 md:p-12 rounded-xl shadow-lg flex flex-col items-center justify-center gap-8">
            <div className="text-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: '64px' }}>storefront</span>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-text-slate-gray text-2xl font-bold leading-tight">You're one step away from selling!</p>
              <p className="text-gray-500 text-base font-normal leading-normal max-w-2xl">
                By becoming a seller, you agree to our terms and conditions. You'll be responsible for your product listings, order fulfillment, and responding to customer inquiries. Please be aware that fees or commissions may apply.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-4">
              <button onClick={handleClick} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] grow transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <span className="truncate">Confirm &amp; Create Seller Profile</span>
              </button>
              <Link to="/" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-transparent border border-primary text-primary text-base font-bold leading-normal tracking-[0.015em] grow transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <span className="truncate">Cancel</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BecomeSellerPage;
