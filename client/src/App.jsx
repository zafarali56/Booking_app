import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/api/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/api/login" element={<LoginPage />} />
          <Route path="/api/register" element={<RegisterPage />} />
          <Route path="/api/account" element={<ProfilePage />} />
          <Route path="/api/account/places" element={<PlacesPage />} />
          <Route path="/api/account/places/new" element={<PlacesFormPage />} />
          <Route path="/api/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/api/place/:id" element={<PlacePage />} />
          <Route path="/api/account/bookings" element={<BookingsPage />} />
          <Route path="/api/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
