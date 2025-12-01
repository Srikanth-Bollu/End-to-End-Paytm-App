import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch current user info to exclude from list
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setCurrentUserId(response.data._id);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter);
                // Filter out the current user from the list
                const filteredUsers = response.data.user.filter(user => user._id !== currentUserId);
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUserId !== null) {
            fetchUsers();
        }
    }, [filter, currentUserId]);

    return (
        <div className="glass-card rounded-2xl p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Send Money</h2>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
            </div>

            <div className="mb-4">
                <div className="relative">
                    <input
                        onChange={(e) => setFilter(e.target.value)}
                        type="text"
                        placeholder="Search users by name..."
                        className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {loading ? (
                    // Loading skeleton
                    Array(3).fill(0).map((_, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-xl animate-pulse">
                            <div className="flex items-center space-x-3">
                                <div className="rounded-full h-12 w-12 bg-gray-300"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                            <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
                        </div>
                    ))
                ) : users.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No users found</p>
                        <p className="text-gray-400 text-sm mt-1">Try searching with a different name</p>
                    </div>
                ) : (
                    users.map(user => <User key={user._id} user={user} />)
                )}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    const getRandomGradient = () => {
        const gradients = [
            'from-purple-500 to-indigo-600',
            'from-pink-500 to-rose-600',
            'from-blue-500 to-cyan-600',
            'from-green-500 to-emerald-600',
            'from-orange-500 to-red-600',
            'from-yellow-500 to-orange-600',
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 card-hover">
            <div className="flex items-center space-x-4">
                <div className={`rounded-full h-12 w-12 bg-gradient-to-br ${getRandomGradient()} flex items-center justify-center shadow-md`}>
                    <span className="text-white font-semibold text-lg">
                        {user.firstName[0].toUpperCase()}
                    </span>
                </div>
                <div>
                    <p className="font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.username}</p>
                </div>
            </div>

            <Button
                onClick={() => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstName + " " + user.lastName);
                }}
                label="Send Money"
            />
        </div>
    );
}