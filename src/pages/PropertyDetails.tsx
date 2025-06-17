import Navbar from "@/components/Navbar";
import { propertyService } from "@/services/property";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, MapPin, Bed, DollarSign, Calendar } from "lucide-react";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const { isLoading, isRefetching, data } = useQuery({
    queryKey: ["singlePropertyData"],
    queryFn: async () => {
      const response = await propertyService.getsingle(propertyId!);
      if (response.status === 200) {
        return response.data;
      }
    },
    refetchOnWindowFocus: false,
  });

  const handleEdit = () => {
    navigate(`/edit-property/${propertyId}`);
  };

  return (
    <div className="flex pt-[100px] md:pt-0 dark:bg-primary-green-200 min-h-screen">
      <Navbar loggedIn={true} />

      {/* Main Content */}
      {isLoading || isRefetching ? (
        <main className="flex grow p-6 items-center justify-center md:ml-[250px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green-600"></div>
        </main>
      ) : (
        <main className="flex grow p-6 md:ml-[250px]">
          <div className="w-full max-w-6xl mx-auto">
            {/* Header with Edit Button */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {data?.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span>{data?.location}</span>
                </div>
              </div>
              <Button
                onClick={handleEdit}
                className="bg-primary-green cursor-pointer dark:bg-primary-green-100 dark:text-primary-green hover:bg-primary-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit Property
              </Button>
            </div>

            {/* Property Image */}
            <div className="mb-8">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={
                    // data?.imageUrl ||
                    "https://dsvgjymmlgbkpexngmjh.supabase.co/storage/v1/object/public/images/VR%201.jpg"
                  }
                  alt={data?.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {data?.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Property Details Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <div className="bg-white dark:bg-primary-green-200   rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    About this property
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {data?.description}
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <div className="bg-white dark:bg-primary-green-200 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-primary-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Price per Night
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-primary-green-600">
                    ${data?.pricePerNight}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    per night
                  </p>
                </div>

                {/* Property Type Card */}
                <div className="bg-white dark:bg-primary-green-200 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Bed className="h-5 w-5 text-primary-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Property Type
                    </h3>
                  </div>
                  <div className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                    {data?.type}
                  </div>
                </div>

                {/* Availability Card */}
                <div className="bg-white dark:bg-primary-green-200 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-primary-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Availability
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        data?.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span
                      className={`font-medium ${
                        data?.available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {data?.available ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default PropertyDetails;
