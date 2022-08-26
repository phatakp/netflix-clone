import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <span className="text-3xl font-bold md:text-6xl">
        Unlimited movies, TV
      </span>
      <span className="text-3xl font-bold md:text-6xl">shows and more.</span>
      <span className="my-4 text-lg md:text-2xl">
        Watch anywhere. Cancel anytime.
      </span>
      <span className="mx-auto md:text-xl">
        Ready to watch? Enter your email to create or restart your membership.
      </span>
      <div className="flex flex-col items-center w-full h-16 mt-4 md:flex-row">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-[90%] h-full p-6 md:p-0 md:px-4 bg-white md:w-2/3 text-slate-700 focus:outline-none focus:border-b-2 border-orange-400"
        />
        <Link
          to="/signin"
          state={{ email }}
          className="flex items-center justify-around h-full p-4 mt-4 md:p-0 md:px-4 md:w-1/3 md:text-2xl bg-darkred md:mt-0">
          Get Started
          <FiChevronRight className="md:text-3xl font-extralight" />
        </Link>
      </div>
    </div>
  );
};

export default HomeBanner;
