import { Link } from "react-router-dom";
export default function RegisterPage() {
  return (
    <div className="mt-4 grow flex justify-items-center justify-around">
      <div>
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto">
          <input type="FirstName" placeholder="First Name" />
          <input type="LastName" placeholder="Last Name" />
          <input type="Email" placeholder="your@email.com" />
          <input type="Password" placeholder="Create password" />
          <button className="primary">Register</button>
          <div className="text-center px-2 py-2 text-gray-500">
            Already a member?
            <Link className="underline text-black" to={"/login"}>
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
