import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    };

    return (
        <div className="shadow-lg bg-white border-b border-gray-100 h-16 flex justify-between items-center px-6 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">₹</span>
                </div>
                <span className="text-2xl font-bold gradient-text">PayTM App</span>
            </div>

            <div className="flex items-center space-x-4">
                {loading ? (
                    <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                ) : user ? (
                    <>
                        <div className="text-right hidden sm:block">
                            <p className="text-sm text-gray-500">Welcome back,</p>
                            <p className="text-sm font-semibold text-gray-800">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                        <div className="relative group">
                            <div className="rounded-full h-12 w-12 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-xl">
                                {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
                            </div>
                            {/* Dropdown menu */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2">
                                <div className="p-4 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.username}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-b-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-gray-500">Guest</div>
                )}
            </div>
        </div>
    );
};