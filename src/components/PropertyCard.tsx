import { Edit2Icon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";
import { propertyService } from "@/services/property";
import SuccessState from "./SuccessState";
import ErrorState from "./ErrorState";

const PropertyCard = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  const [askForConfirmation, setAskForConfirmation] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleDelete = async () => {
    const response = await propertyService.deleteProperty(data.id);
    if (response?.message) {
      setErrorMessage(`Deletion Failed" : "Update failed`);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);
    } else if (response.status === 200) window.location.reload();
  };
  return (
    <div
      onClick={() => {
        navigate(`/property/${data.id}`);
      }}
      className="cursor-pointer hover:scale-[105%]  transition-all duration-300 w-full max-w-sm bg-white dark:bg-primary-green-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl "
    >
      {showErrorMessage && (
        <ErrorState
          title="Something went wrong"
          description={
            errorMessage || "An error occurred while processing your request."
          }
          onClose={() => setShowErrorMessage(false)}
        />
      )}
      {askForConfirmation && (
        <SuccessState
          description="are you sure you want delete ?"
          title="Aask For Confirmation ?"
          onAction={handleDelete}
          actionLabel="Continue"
          onClose={() => setAskForConfirmation(false)}
        />
      )}
      <div className="relative">
        <LazyImage
          src={data.imageUrl}
          alt={data.title}
          className="w-full h-56 object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit-property/${data.id}`);
          }}
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title={"edit"}
          className="absolute hover:bg-primary-green-100 dark:text-primary-green cursor-pointer top-3 right-3 bg-white rounded-full p-2 shadow-md transition"
        >
          <Edit2Icon size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAskForConfirmation(true);
          }}
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title={"delete"}
          className="absolute  hover:bg-primary-green-100 text-red-600 cursor-pointer top-14 right-3 bg-white rounded-full p-2 shadow-md transition"
        >
          <XIcon size={20} />
        </button>
      </div>

      <div className="p-4 flex flex-col max-w-[300px]  gap-2 ">
        <div className="flex items-end  text-nowrap">
          <h3
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={data.title}
            className="text-xl inline   max-w-[85%] overflow-clip font-semibold text-gray-800"
          >
            {data.title}{" "}
          </h3>
          <span className="text-sm font-bold  pb-[2px] text-gray-500 capitalize">
            &nbsp;| {data.type}
          </span>
        </div>
        <p className="text-gray-600  text-sm  overflow-clip text-nowrap">
          {data.description}
        </p>
        <p className="text-gray-500 text-sm overflow-clip text-nowrap">
          {data.location}
        </p>
        <p className="text-lg font-bold text-primary-green">
          ${data.pricePerNight}{" "}
          <span className="text-sm font-normal">/ night</span>
        </p>
        <button
          className={`mt-2 w-full ${
            data.available ? "bg-primary-green" : "bg-red-500"
          } text-white py-2 rounded-lg hover:bg-primary-green-200 hover:text-primary-green transition`}
        >
          {data.available ? "Available" : "Not Available"}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
