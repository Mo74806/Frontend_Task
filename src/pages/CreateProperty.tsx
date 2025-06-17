import Navbar from "@/components/Navbar";
import PropertyForm from "@/components/PropertyForm";

const CreateProperty = () => {
  return (
    <div className="flex pt-[100px] md:pt-0 dark:bg-primary-green-200 min-h-screen">
      {/* Sidebar */}
      <Navbar loggedIn={true} />

      {/* Main Content */}
      <main className="flex border grow p-6 items-center justify-center  md:ml-[250px]">
        <PropertyForm type="Create" />
      </main>
    </div>
  );
};

export default CreateProperty;
