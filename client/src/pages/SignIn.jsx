import {Link} from 'react-router-dom'

const SignIn = () => {
  return (
    <>
      <section className=" w-full h-screen flex flex-col items-center justify-center">
        <form
          className="flex flex-col w-1/3"
          >
          <label className="text-slate-400 font-mono" htmlFor="email">
            Email
          </label>
          <input
            className="mt-2 mb-4 border border-slate-500 p-2"
            type="email"
            id="email"
          />
          <label className="text-slate-400 font-mono" htmlFor="password">
            Password
          </label>
          <input
            className="mt-2 mb-4 border border-slate-500 p-2"
            type="password"
            id="password"
          />
          <button
            className="mt-8 bg-slate-600 hover:bg-slate-500 py-2 text-white rounded-sm"
            type="submit">
            Sign In
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
      </section>
    </>
  );
};

export default SignIn;
