import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });

      if (response.data && response.data.user) {
        // Assuming that your user data is structured with a 'user' property
        setUser(response.data.user);

        alert("Login successfully");
        setRedirect(true);
      } else {
        alert("Invalid response format from the server");
      }
    } catch (e) {
      alert("Login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div
      style={{ marginTop: "100px" }}
      className="mt-4 grow flex justify-items-center justify-around"
    >
      <div>
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="py-2"
          />
          <input
            type="Password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="py-2"
          />
          <button className="primary  hover:bg-blue-700 font-bold ">
            Login
          </button>
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
