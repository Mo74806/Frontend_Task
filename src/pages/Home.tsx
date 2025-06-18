import FilterOption from "@/components/FilterOption";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { propertyService } from "@/services/property";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaginationComponent } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorState from "@/components/ErrorState";

const Home = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [seacValue, setSearchValue] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState<
    "All" | "Villa" | "House" | "Apartment" | "Studio"
  >("All");
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["propertyData", page, seacValue, type],
    queryFn: async () => {
      try {
        const response = await propertyService.getAll(
          page,
          4,
          type === "All" ? "" : type.toLocaleLowerCase(),
          seacValue
        );
        setTotalPages(response.totalPages);
        if (response?.message) {
          setErrorMessage("Something Went Wrong");
          setShowErrorMessage(true);
          setTimeout(() => {
            setShowErrorMessage(false);
          }, 2000);
        }
        return response.data || [];
      } catch (e) {
        setErrorMessage("Something Went Wrong");
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2000);
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-[100%]">
      <title>Home</title>
      {showErrorMessage && (
        <ErrorState
          title="Something went wrong"
          description={
            errorMessage || "An error occurred while processing your request."
          }
          onClose={() => setShowErrorMessage(false)}
        />
      )}
      <div className="flex md:flex-row gap-y-2     flex-col gap-x-2 justify-center">
        <SearchBar handleSearch={(value) => setSearchValue(value)} />
        <FilterOption
          handleSearch={(type: string) => {
            setType(type as "All" | "Villa" | "House" | "Apartment" | "Studio");
          }}
          options={["All", "Villa", "House", "Apartment", "Studio"]}
          text="Type"
          selected={type}
        />
      </div>

      <div className="flex flex-wrap gap-3  mx-[20px] lg:mx-[50px] xl:mx-[100px] justify-center  mt-[24px] ">
        {isFetching || isLoading ? (
          <div className="flex flex-wrap items-center justify-center  gap-2  w-[100%]">
            {[0, 1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-[400px] w-[300px]  " />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          data.map((item: any) => (
            <div key={item.id} className="  mb-6 ">
              <PropertyCard data={item} />
            </div>
          ))
        ) : (
          <div className="flex justify-center text-2xl text-center pt-[50px]">
            <p className="font-bold dark:text-white text-primary-green">
              There is No Property Found
            </p>
          </div>
        )}
        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Home;
