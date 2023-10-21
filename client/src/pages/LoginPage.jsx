import { Link } from "react-router-dom";
export default function LoginPage() {
  return (
    <div className="mt-4 grow flex justify-items-center justify-around">
      <div>
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="Email" placeholder="your@email.com" />
          <input type="Password" placeholder="password" />
          <button className="primary">Login</button>
          <div className="text-center px-2 py-2 text-gray-500">
            Dont have an accound?
            <Link className="underline text-black" to={"/register"}>
              Click Here To Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
