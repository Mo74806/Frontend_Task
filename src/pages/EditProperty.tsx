import PropertyForm from "@/components/PropertyForm";
import { useParams } from "react-router-dom";

const EditProperty = () => {
  const { propertyId } = useParams();
  return (
    <div className="flex flex-col  w-[100%]">
      <title>Edit Property</title>
      {/* Main Content */}
      <PropertyForm type="Edit" propertyId={propertyId} />
    </div>
  );
};

export default EditProperty;
