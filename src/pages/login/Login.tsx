import React, {useState} from "react";
import LoginService, {DecodedToken, UserRole} from "../../services/LoginService";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Optional loading state
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        setError(""); // Reset error before attempting login
        setLoading(true); // Set loading state

        try {
            // Call the login method from LoginService
            const decodedToken: DecodedToken = await LoginService.login(email, password);
            console.log("Logged in successfully:", decodedToken);
            if (decodedToken.role == UserRole.ADMIN){
                navigate("/admin");
            }else{
                navigate("/animals");
            }
            window.location.reload();
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className='flex flex-col items-center w-full mt-40 gap-4'>
            <h2 className='text-3xl font-bold'>Login</h2>
            <form onSubmit={handleSubmit} className='rounded rounded-2xl p-6 border shadow-sm w-1/3 flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border rounded p-2 text-sm'
                        required
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='text-sm font-semibold'>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border rounded p-2 text-sm'
                        required
                    />
                </div>
                {error && <p className='text-red-500 text-sm font-semibold mt-2'>{error}</p>}
                <button type="submit" disabled={loading} className="mt-4 w-full bg-black text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800">
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default Login;
