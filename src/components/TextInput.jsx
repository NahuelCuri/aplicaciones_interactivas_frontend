const TextInput = ({ type, name, id, placeholder, autoComplete, required, value, onChange }) => (
  <input
    type={type}
    name={name}
    id={id}
    placeholder={placeholder}
    autoComplete={autoComplete}
    required={required}
    value={value}
    onChange={onChange}
    className="mt-1 appearance-none relative block w-full px-3 py-3 border border-input-border-light dark:border-input-border-dark bg-input-light dark:bg-input-dark placeholder-placeholder-light dark:placeholder-placeholder-dark rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
  />
);

export default TextInput;
