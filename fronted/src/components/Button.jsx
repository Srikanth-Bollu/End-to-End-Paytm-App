export function Button({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="btn-hover px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
            {label}
        </button>
    );
}