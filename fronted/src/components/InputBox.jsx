export function InputBox({ label, placeholder, onChange, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50"
      />
    </div>
  );
}