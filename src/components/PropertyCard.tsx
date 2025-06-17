import { Edit, Edit2, Edit2Icon, Edit3 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  console.log(data);
  return (
    <div
      onClick={() => {
        navigate(`/property/${data.id}`);
      }}
      className="w-full cursor-pointer max-w-sm bg-white dark:bg-primary-green-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
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
          className="absolute  dark:text-primary-green  hover:bg-primary-green-100 cursor-pointer top-3 right-3 bg-white rounded-full p-2 shadow-md transition"
        >
          <Edit2Icon size={20} />
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
