import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/api/register", {
        first,
        last,
        email,
        password,
      });
      alert("Congratulations, You are registered");
    } catch (e) {
      alert("Registration failed! please try again later.");
    }
  }

  return (
    <div
      style={{ marginTop: "100px" }}
      className="mt-4 grow flex justify-items-center justify-around "
    >
      <div>
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="First Name"
            value={first}
            onChange={(ev) => setFirst(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={last}
            onChange={(ev) => setLast(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

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
