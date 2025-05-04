import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
            <h1 className="text-5xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-xl text-gray-700 mb-2">Please login first to access the pages.</p>
            <Link to="/">
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow">
                    Go to Home and Login First
                </Button>
            </Link>
        </div>
    );
}
