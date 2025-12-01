import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            <Appbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-600">Manage your wallet and send money to friends</p>
                </div>

                <Balance />
                <Users />
            </div>
        </div>
    );
};