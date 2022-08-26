import { useAuth } from "context/AuthContext";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type LocationState = {
  email: string | undefined;
  password: string | undefined;
};

export const SignInForm = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [email, setEmail] = useState(state?.email || "");
  const [password, setPassword] = useState(state?.password || "");
  const [error, setError] = useState("");
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/browse");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <div className="px-4 md:px-12 py-16 w-full bg-black/50 md:w-[500px] rounded">
      <h1 className="w-[90%] mx-[5%] text-3xl font-bold">Sign In</h1>
      <form className="mt-8" onSubmit={handleSubmit}>
        {error && (
          <span className="w-[90%] mx-[5%] p-4 mb-4 text-red-500 transition duration-500">
            {error}
          </span>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[90%] mx-[5%] p-4 my-2 text-white bg-gray-600 border-orange-500 rounded focus:outline-none focus:bg-slate-700 focus:border-b-2"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[90%] mx-[5%] p-4 my-2 text-white bg-gray-600 border-orange-500 rounded focus:outline-none focus:bg-slate-700 focus:border-b-2"
          required
        />

        <button
          type="submit"
          className="w-[90%] mx-[5%] p-4 mt-10 text-lg font-bold rounded bg-darkred">
          Sign In
        </button>

        <p className="mt-10 w-[90%] mx-[5%]">
          <span className="mr-2 text-gray-500">New to Netflix?</span>
          <Link to="/signup">Sign Up Now</Link>
        </p>

        <p className="mt-3 w-[90%] mx-[5%] text-xs text-slate-400">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </form>
    </div>
  );
};
