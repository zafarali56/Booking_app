import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      await axios.post("/login", { email, password });
      alert("Login successfully");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex justify-items-center justify-around">
      <div>
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="Password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
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
