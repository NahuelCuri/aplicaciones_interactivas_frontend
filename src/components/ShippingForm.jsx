const ShippingForm = () => {
  return (
    <section>
      <h3 className="mb-4 text-lg font-bold text-black dark:text-white">Shipping Address</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-black/80 dark:text-white/80" htmlFor="fullName">Full Name</label>
          <input className="form-input w-full rounded border-black/10 bg-white px-4 py-3 text-black placeholder:text-black/50 dark:border-white/10 dark:bg-background-dark dark:text-white dark:placeholder:text-white/50" id="fullName" placeholder="Enter your full name" type="text" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-black/80 dark:text-white/80" htmlFor="address">Address</label>
          <input className="form-input w-full rounded border-black/10 bg-white px-4 py-3 text-black placeholder:text-black/50 dark:border-white/10 dark:bg-background-dark dark:text-white dark:placeholder:text-white/50" id="address" placeholder="Enter your address" type="text" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-black/80 dark:text-white/80" htmlFor="city">City</label>
            <input className="form-input w-full rounded border-black/10 bg-white px-4 py-3 text-black placeholder:text-black/50 dark:border-white/10 dark:bg-background-dark dark:text-white dark:placeholder:text-white/50" id="city" placeholder="Enter your city" type="text" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black/80 dark:text-white/80" htmlFor="postalCode">Postal Code</label>
            <input className="form-input w-full rounded border-black/10 bg-white px-4 py-3 text-black placeholder:text-black/50 dark:border-white/10 dark:bg-background-dark dark:text-white dark:placeholder:text-white/50" id="postalCode" placeholder="Enter your postal code" type="text" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-black/80 dark:text-white/80" htmlFor="country">Country</label>
          <select className="form-select w-full rounded border-black/10 bg-white px-4 py-3 text-black dark:border-white/10 dark:bg-background-dark dark:text-white" id="country">
            <option>Select your country</option>
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default ShippingForm;
