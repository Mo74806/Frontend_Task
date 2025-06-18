import { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useLogin } from "./context/LoginContext";
import React from "react";

const CreateProperty = React.lazy(() => import("./pages/CreateProperty"));
const EditProperty = React.lazy(() => import("./pages/EditProperty"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const PropertyDetails = React.lazy(() => import("./pages/PropertyDetails"));

function App() {
  const { login } = useLogin();
  const navigate = useNavigate();

  //protect Routes
  useEffect(() => {
    if (window.location.pathname !== "/login" && !login) {
      navigate("/login");
    }
  }, []);

  return (
    <div
      className={
        login
          ? `flex pt-[100px] md:pt-0 dark:bg-primary-green-200 min-h-screen`
          : ""
      }
    >
      <Navbar loggedIn={login} />
      <main className={login ? `flex grow p-6 md:ml-[250px]` : ""}>
        <Suspense
          fallback={
            <div className="flex items-center mx-auto justify-center   min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green dark:border-white"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-property" element={<CreateProperty />} />
            <Route
              path="/edit-property/:propertyId"
              element={<EditProperty />}
            />
            <Route path="/property/:propertyId" element={<PropertyDetails />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
