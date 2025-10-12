import { useState } from "react";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  return (
    <section>
      <h3 className="mb-4 text-lg font-bold text-black dark:text-white">Payment Method</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className={`flex cursor-pointer items-center rounded-lg border p-4 ${paymentMethod === 'credit-card' ? 'border-primary bg-primary/5' : 'border-black/10 bg-white'} dark:bg-background-dark dark:has-[:checked]:border-primary dark:has-[:checked]:bg-primary/10`}>
            <input checked={paymentMethod === 'credit-card'} onChange={() => setPaymentMethod('credit-card')} className="form-radio border-black/20 text-primary dark:border-white/20" name="paymentMethod" type="radio" />
            <span className="ml-3 text-sm font-medium text-black dark:text-white">Credit Card</span>
          </label>
          <label className={`flex cursor-pointer items-center rounded-lg border p-4 ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-black/10 bg-white'} dark:bg-background-dark dark:has-[:checked]:border-primary dark:has-[:checked]:bg-primary/10`}>
            <input checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="form-radio border-black/20 text-primary dark:border-white/20" name="paymentMethod" type="radio" />
            <span className="ml-3 text-sm font-medium text-black dark:text-white">PayPal</span>
          </label>
        </div>
        {paymentMethod === 'credit-card' && (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium text-black/80 dark:text-white/80" htmlFor="cardNumber">Card Number</label>
              <input className="form-input w-full rounded border-black/10 bg-white px-4 py-3 text-black placeholder:text-black/50 dark:border-white/10 dark:bg-background-dark dark:text-white dark:placeholder:text-white/50" id="cardNumber" placeholder="Enter your card number" type="text" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-black/80 dark:text-white/80" htmlFor="expiryDate">Expiry Date</label>
                <input className="form-input w-full rounded border-black/10 bg-white px-4 py-3 text-black placeholder:text-black/50 dark:border-white/10 dark:bg-background-dark dark:text-white dark:placeholder:text-white/50" id="expiryDate" placeholder="MM/YY" type="text" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-black/80 dark:text-white/80" htmlFor="cvv">CVV</label>
                <input className="form-input w-full rounded border-black/10 bg-white px-4 py-3 text-black placeholder:text-black/50 dark:border-white/10 dark:bg-background-dark dark:text-white dark:placeholder:text-white/50" id="cvv" placeholder="Enter your CVV" type="text" />
              </div>
            </div>
          </>
        )}
        {paymentMethod === 'paypal' && (
          <div className="flex justify-center">
            <button className="flex items-center justify-center rounded-lg bg-[#0070BA] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0070BA] focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark">
              Login with PayPal
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentForm;
