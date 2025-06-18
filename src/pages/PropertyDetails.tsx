import { propertyService } from "@/services/property";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, MapPin, Bed, DollarSign, Calendar, XIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import ErrorState from "@/components/ErrorState";
import LazyImage from "../components/LazyImage";
import SuccessState from "@/components/SuccessState";

const PropertyDetails = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { propertyId } = useParams();
  const [askForConfirmation, setAskForConfirmation] = useState(false);

  const navigate = useNavigate();

  const { isLoading, isRefetching, data } = useQuery({
    queryKey: ["singlePropertyData"],
    queryFn: async () => {
      try {
        const response = await propertyService.getsingle(propertyId!);

        if (response && response.status === 200) {
          return response.data;
        } else {
          setErrorMessage("Something Went Wrong");
          setShowErrorMessage(true);
          setTimeout(() => {
            setShowErrorMessage(false);
          }, 2000);
          return [];
        }
      } catch (e) {
        setErrorMessage("Something Went Wrong");
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2000);
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });
  const handleDelete = async () => {
    const response = await propertyService.deleteProperty(data.id);
    if (response?.message) {
      setErrorMessage(`Deletion Failed" : "Update failed`);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);
    } else if (response.status === 200) navigate("/");
  };
  const handleEdit = () => {
    navigate(`/edit-property/${propertyId}`);
  };

  return (
    <div className="flex flex-col  w-[100%]">
      <title>Property Details</title>
      {askForConfirmation && (
        <SuccessState
          description="are you sure you want delete ?"
          title="Aask For Confirmation ?"
          onAction={handleDelete}
          actionLabel="Continue"
          onClose={() => setAskForConfirmation(false)}
        />
      )}

      {showErrorMessage && (
        <ErrorState
          title="Something went wrong"
          description={
            errorMessage || "An error occurred while processing your request."
          }
          onClose={() => setShowErrorMessage(false)}
        />
      )}

      {isLoading || isRefetching ? (
        <div className="w-full max-w-[100wh]  mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                <Skeleton className="w-[300px] h-[40px]" />
              </h1>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>
                  {" "}
                  <Skeleton className="w-[250px] h-[20px]" />
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Skeleton className="w-full h-[300px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-y-8">
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-primary-green-200   rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About this property
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  <Skeleton className="w-[100%] h-[20px]" />
                </p>
              </div>
            </div>

            <div className=" space-y-6">
              <div className="bg-white dark:bg-primary-green-200 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-primary-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Price per Night
                  </h3>
                </div>
                <div className="text-3xl font-bold text-primary-green-600 flex items-center gap-x-1">
                  $ <Skeleton className="w-[40%] h-[20px]" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  per night
                </p>
              </div>

              <div className="bg-white dark:bg-primary-green-200 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Bed className="h-5 w-5 text-primary-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Property Type
                  </h3>
                </div>
                <div className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                  <Skeleton className="w-[50%] h-[20px]" />
                </div>
              </div>

              <div className="bg-white dark:bg-primary-green-200 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-primary-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Availability
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {" "}
                  <Skeleton className="w-[60%] h-[20px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[100wh] mx-auto">
          <div className="flex justify-between   md:flex-row flex-col  mb-8">
            <div className=" text-start">
              <h1 className="text-3xl break-words  break-all  text-start font-bold text-gray-900 dark:text-white mb-2">
                {data?.title}
              </h1>
              <div className="flex items-center break-words break-all gap-2 text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>{data?.location}</span>
              </div>
            </div>
            <div className="text-end flex gap-x-2 md:mt-0 mt-4 ms-auto">
              <Button
                onClick={handleEdit}
                className="bg-primary-green cursor-pointer dark:bg-primary-green-100 dark:text-primary-green hover:bg-primary-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit Property
              </Button>
              <Button
                onClick={() => {
                  setAskForConfirmation(true);
                }}
                className="bg-transparent border border-red-600 dark:border-primary-green-100 cursor-pointer dark:bg-primary-green-100  hover:bg-primary-green-700 text-red-600 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <XIcon className="h-4 w-4" />
                Delete Property
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <LazyImage
                src={data?.imageUrl}
                alt={data?.title}
                className="w-full h-96 object-contain bg-primary-green-200"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-primary-green text-white px-3 py-1 rounded-full text-sm font-medium">
                  {data?.type}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-y-8">
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

            <div className=" space-y-6">
              <div className="bg-white dark:bg-primary-green-200 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-primary-green-600" />
                  <h3 className="text-lg  font-semibold text-gray-900 dark:text-white">
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
      )}
    </div>
  );
};

export default PropertyDetails;
