import CreateProperty from "./pages/CreateProperty";
import EditProperty from "./pages/EditProperty";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/create-property" element={<CreateProperty />} />
      <Route path="/edit-property/:propertyId" element={<EditProperty />} />
      <Route path="/property/:propertyId" element={<PropertyDetails />} />
    </Routes>
  );
}

export default App;
