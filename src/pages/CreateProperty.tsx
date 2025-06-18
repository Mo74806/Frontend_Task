import PropertyForm from "@/components/PropertyForm";

const CreateProperty = () => {
  return (
    <div className="flex flex-col   w-[100%]">
      <title>Create Property</title>
      {/* Main Content */}
      <PropertyForm type="Create" />
    </div>
  );
};

export default CreateProperty;
