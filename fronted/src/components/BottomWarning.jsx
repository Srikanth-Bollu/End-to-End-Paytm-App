import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-4 text-sm flex justify-center text-gray-600">
      <span>{label}</span>
      <Link
        className="ml-1 text-purple-600 hover:text-purple-700 font-semibold underline transition-colors duration-200"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}