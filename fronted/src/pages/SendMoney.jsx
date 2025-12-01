import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [userResponse, balanceResponse] = await Promise.all([
                    axios.get("http://localhost:3000/api/v1/user/me", {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    }),
                    axios.get("http://localhost:3000/api/v1/account/balance", {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                ]);
                setCurrentUser(userResponse.data);
                setBalance(balanceResponse.data.balance);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleTransfer = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        if (parseFloat(amount) > balance) {
            alert("Insufficient balance");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                    to: id,
                    amount: parseFloat(amount)
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            // Show success message
            alert("✅ " + response.data.message);

            // Redirect back to dashboard
            navigate("/dashboard");
        } catch (error) {
            alert("❌ " + (error.response?.data?.message || "Transfer failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back button */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Dashboard</span>
                </button>

                <div className="glass-card rounded-2xl p-8 shadow-2xl animate-fade-in">
                    <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Send Money</h2>

                    {/* Transfer Flow Visualization */}
                    <div className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            {/* Sender */}
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg mb-2">
                                    <span className="text-white font-bold text-xl">
                                        {currentUser ? currentUser.firstName[0].toUpperCase() + currentUser.lastName[0].toUpperCase() : '?'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">From</p>
                                <p className="font-semibold text-gray-800 text-center">
                                    {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Loading...'}
                                </p>
                                {balance !== null && (
                                    <p className="text-xs text-gray-500 mt-1">Balance: ₹{balance.toFixed(2)}</p>
                                )}
                            </div>

                            {/* Arrow */}
                            <div className="flex-shrink-0 mx-4">
                                <svg className="w-8 h-8 text-purple-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>

                            {/* Receiver */}
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg mb-2">
                                    <span className="text-white font-bold text-xl">
                                        {name ? name[0].toUpperCase() : '?'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">To</p>
                                <p className="font-semibold text-gray-800 text-center">{name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-6">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            htmlFor="amount"
                        >
                            Amount (in ₹)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                            <input
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                                type="number"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg font-semibold"
                                id="amount"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                        </div>
                        {amount && parseFloat(amount) > 0 && (
                            <p className="mt-2 text-sm text-gray-600">
                                {parseFloat(amount) > balance ? (
                                    <span className="text-red-600">⚠️ Insufficient balance</span>
                                ) : (
                                    <span className="text-green-600">✓ Available balance: ₹{balance?.toFixed(2)}</span>
                                )}
                            </p>
                        )}
                    </div>

                    {/* Transfer Button */}
                    <button
                        onClick={handleTransfer}
                        disabled={loading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                        className={`w-full py-4 rounded-xl font-semibold text-white text-lg shadow-lg transition-all duration-300 ${loading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl transform hover:-translate-y-1 btn-hover'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'Initiate Transfer'
                        )}
                    </button>

                    {/* Security Note */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-start space-x-2">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-blue-800">
                                Your transaction is secure and will be processed instantly. Please verify the recipient details before confirming.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};