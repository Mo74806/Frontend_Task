import {
  CrossIcon,
  DeleteIcon,
  Edit,
  Edit2,
  Edit2Icon,
  Edit3,
  LucideDelete,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
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
      className="w-full max-w-sm bg-white dark:bg-primary-green-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
          src={
            // data.imageUrl ||
            "https://dsvgjymmlgbkpexngmjh.supabase.co/storage/v1/object/public/images/VR%201.jpg"
          }
          alt={data.title}
          className="w-full h-56 object-cover"
        />
        {/* Edit Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit-property/${data.id}`);
          }}
          className="absolute hover:bg-primary-green-100 dark:text-primary-green cursor-pointer top-3 right-3 bg-white rounded-full p-2 shadow-md transition"
        >
          <Edit2Icon size={20} />
        </button>
        {/* Delete Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAskForConfirmation(true);
          }}
          className="absolute  hover:bg-primary-green-100 text-red-600 cursor-pointer top-14 right-3 bg-white rounded-full p-2 shadow-md transition"
        >
          <XIcon size={20} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-gray-800">
          {data.title}{" "}
          <span className="text-sm text-gray-500 capitalize">
            | {data.type}
          </span>
        </h3>
        <p className="text-gray-600 text-sm">{data.description}</p>
        <p className="text-gray-500 text-sm">{data.location}</p>
        <p className="text-lg font-bold text-primary-green">
          ${data.pricePerNight}{" "}
          <span className="text-sm font-normal">/ night</span>
        </p>
        <button className="mt-2 w-full bg-primary-green text-white py-2 rounded-lg hover:bg-primary-green-200 hover:text-primary-green transition">
          Available
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
