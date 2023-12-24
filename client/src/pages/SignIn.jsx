import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <section className=" w-full h-screen flex flex-col items-center justify-center">
        <form className="flex flex-col w-1/3" onSubmit={handleSubmit}>
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
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <span className=" inline-block mt-6 text-sm">
          You don't have an account?{" "}
          <Link
            to="/user/signup"
            className="text-rose-600 font-semibold hover:text-rose-900 font-mono">
            SignUp
          </Link>
        </span>
        {error && <p className=" text-red-700">{error}</p>}
      </section>
    </>
  );
};

export default SignIn;
