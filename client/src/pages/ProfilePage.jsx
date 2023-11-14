import { useContext } from "react";
import { UserContext } from "../UserContext"; // Adjust the import path as needed
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "/api/profile";
  }

  async function logout() {
    await axios.post("/api/logout");
    setRedirect("/api/");
    setUser(null);
  }

  if (!ready) {
    return "Loading....";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/api/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {subpage === "/api/profile" && (
        <div className="mt-4 text-center max-w-lg mx-auto">
          logged in as {user.first} {user.last} <br />({user.email})
          <button
            onClick={logout}
            className="primary max-w-sm mt-2 hover:bg-blue-700 font-bold"
          >
            {" "}
            Logout{" "}
          </button>
        </div>
      )}
      {subpage === "/api/places" && <PlacesPage />}
    </div>
  );
}
