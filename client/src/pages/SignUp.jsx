import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        //Handle Specific Error like username of email id already present
        setError(data.error);
        setLoading(false);
        return;
      } else if (data.success === false) {
        // Handle other errors
        setError(data.message);
        setLoading(false);
        return;
      } else {
        // User created successfully
        setLoading(false);
        setError(null);
        navigate("/user/signin");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <section className=" w-full h-screen flex flex-col items-center justify-center">
        <form className="flex flex-col w-1/3" onSubmit={handleSubmit}>
          <label className="text-slate-400 font-mono" htmlFor="username">
            Name
          </label>
          <input
            className="mt-2 mb-4 border border-slate-500 p-2"
            type="text"
            id="username"
            onChange={handleChange}
          />
          <label className="text-slate-400 font-mono" htmlFor="email">
            Email
          </label>
          <input
            className="mt-2 mb-4 border border-slate-500 p-2"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <label className="text-slate-400 font-mono" htmlFor="password">
            Password
          </label>
          <input
            className="mt-2 mb-4 border border-slate-500 p-2"
            type="password"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="mt-8 bg-slate-600 hover:bg-slate-500 py-2 text-white rounded-sm"
            type="submit">
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <span className=" inline-block mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/user/signin"
            className="text-rose-600 font-semibold hover:text-rose-900 font-mono">
            Signin
          </Link>
        </span>
        {error && <p className=" text-red-700 mt-5">{error}</p>}
      </section>
    </>
  );
};

export default SignUp;
