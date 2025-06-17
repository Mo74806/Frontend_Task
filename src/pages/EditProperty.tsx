import Navbar from "@/components/Navbar";
import PropertyForm from "@/components/PropertyForm";
import { useParams } from "react-router-dom";

const EditProperty = () => {
  const { propertyId } = useParams();
  return (
    <div className="flex pt-[100px] md:pt-0 dark:bg-primary-green-200 min-h-screen">
      {/* Sidebar */}
      <Navbar loggedIn={true} />
      {/* Main Content */}
      <main className="flex border grow p-6 items-center justify-center  md:ml-[250px]">
        <PropertyForm type="Edit" propertyId={propertyId} />
      </main>
    </div>
  );
};

export default EditProperty;
