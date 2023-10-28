import { useContext } from "react";
import { UserContext } from "../UserContext"; // Adjust the import path as needed
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading....";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = " py-2 px-6 ";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full ";
    }
    return classes;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          logged in as {user.first} ({user.email})
          <button onClick={logout} className="primary max-w-sm mt-2">
            {" "}
            Logout{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
