import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Notfound from "./pages/404/Notfound";
import NavBar from "./Components/NavBar/NavBar";
import Explore from "./pages/Explore/Explore";
import Notifications from "./pages/Notifications/Notifications";
import Messages from "./pages/Messages/Messages";
import About from "./pages/About/About";
import Buyouts from "./pages/Buyouts/Buyouts";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import SignInForm from "./pages/SignIn/SignIn";
import RequireAuth from "./Components/ProtectedRoute/ProtectedRoute";
import { AuthContext } from "./UseContext/UseAuth/UseAuth";
import { useContext } from "react";
// import Spinner from "./Components/Spinner/Spinner";

function App() {
  const { state } = useContext(AuthContext);
  // if (state.user == null) return <Spinner />;
  return (
    <>
      <BrowserRouter>
        {state.token && <NavBar />}
        <Routes>
          <Route
            index
            element={
              <RequireAuth redirectTo="../signin">
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="home"
            element={
              <RequireAuth redirectTo="../signin">
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="explore"
            element={
              <RequireAuth redirectTo="../signin">
                <Explore />
              </RequireAuth>
            }
          />
          <Route
            path="notifications"
            element={
              <RequireAuth redirectTo="../signin">
                <Notifications />
              </RequireAuth>
            }
          />
          <Route
            path="messages"
            element={
              <RequireAuth redirectTo="../signin">
                <Messages />
              </RequireAuth>
            }
          />
          <Route
            path="buyouts"
            element={
              <RequireAuth redirectTo="../signin">
                <Buyouts />
              </RequireAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth redirectTo="../signin">
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="sellouts"
            element={
              <RequireAuth redirectTo="../signin">
                <Explore />
              </RequireAuth>
            }
          />
          <Route
            path="about"
            element={
              <RequireAuth redirectTo="../signin">
                <About />
              </RequireAuth>
            }
          />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignInForm />} />
          <Route
            path="/*"
            element={
              <RequireAuth redirectTo="../signin">
                <Notfound />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
