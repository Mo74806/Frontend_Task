import FilterOption from "@/components/FilterOption";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { propertyService } from "@/services/property";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaginationComponent } from "@/components/Pagination";
// import PaginationComponent from "@/components/Pagination";
const Home = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [seacValue, setSearchValue] = useState("");
  const [type, setType] = useState<
    "All" | "Villa" | "House" | "Apartment" | "Studio"
  >("All");
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["propertyData", page, seacValue, type],
    queryFn: async () => {
      const response = await propertyService.getAll(
        page,
        1,
        type === "All" ? "" : type.toLocaleLowerCase(),
        seacValue
      );
      setTotalPages(response.totalPages);
      return response.data || [];
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex pt-[100px] md:pt-0 dark:bg-primary-green-200 min-h-screen">
      {/* Sidebar */}
      <Navbar loggedIn={true} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-[250px]">
        <div className="flex md:flex-row gap-y-2     flex-col gap-x-2 justify-center">
          <SearchBar handleSearch={(value) => setSearchValue(value)} />
          <FilterOption
            handleSearch={(type: string) => {
              setType(
                type as "All" | "Villa" | "House" | "Apartment" | "Studio"
              );
            }}
            options={["Villa", "House", "Apartment", "Studio"]}
            text="Type"
          />
        </div>

        <div className="flex flex-wrap gap-3  mx-[20px] lg:mx-[50px] xl:mx-[100px] justify-center  mt-[24px] ">
          {isFetching || isLoading ? (
            <div>Loading...</div>
          ) : (
            data &&
            data.map((item: any) => (
              <div key={item.id} className="  mb-6 ">
                <PropertyCard data={item} />
              </div>
            ))
          )}
          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            onChange={(page) => setPage(page)}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
