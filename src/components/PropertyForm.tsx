import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { propertyService } from "@/services/property";
import { useNavigate } from "react-router-dom";
import SuccessState from "./SuccessState";
import { useQuery } from "@tanstack/react-query";
import ErrorState from "./ErrorState";

const PropertyForm = ({
  type,
  propertyId,
}: {
  type: "Create" | "Edit";
  propertyId?: string;
}) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const propertyFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    type: z.enum(["apartment", "house", "villa", "studio"], {
      errorMap: () => ({ message: "Please select a valid property type" }),
    }),
    pricePerNight: z
      .number({ invalid_type_error: "Enter a number" })
      .min(1, "Price per night must be greater than 0"),
    location: z.string().min(1, "Location is required"),
    imageUrl: z.string().url("Invalid URL format").optional(),
    available: z.boolean(),
  });

  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "apartment",
      pricePerNight: 1,
      location: "",
      imageUrl: "",
      available: true,
    },
  });

  useQuery({
    queryKey: ["singlePropertyData"],
    queryFn: async () => {
      try {
        if (propertyId) {
          let response = await propertyService.getsingle(propertyId!);
          if (response?.message) {
            setErrorMessage("Something Went Wrong");
            setShowErrorMessage(true);
            setTimeout(() => {
              setShowErrorMessage(false);
            }, 2000);
          } else if (response.status === 200) {
            form.reset(response.data);
          } else {
            setErrorMessage("Something Went Wrong");
            setShowErrorMessage(true);
            setTimeout(() => {
              setShowErrorMessage(false);
            }, 2000);
          }
        }
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
  async function onSubmit(values: z.infer<typeof propertyFormSchema>) {
    setSubmitting(true);
    try {
      const response =
        type === "Create"
          ? await propertyService.create(values)
          : await propertyService.updateProperty(propertyId!, values);
      if (response?.message) {
        setErrorMessage(
          `${type === "Create" ? "Creation Failed" : "Update failed"}`
        );
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2000);
      } else if (
        response.status === 201 ||
        response.status === 200 ||
        response.status === 203
      ) {
        // Handle successful creation
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
          navigate(`/property/${response.data.id}`);
        }, 2000);
      } else {
        setErrorMessage(
          `${type === "Create" ? "Creation Failed" : "Update failed"}`
        );
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 2000);
      }
    } catch (e: any) {
      setErrorMessage(e.errorMessage);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className=" h-[100%] items-center flex">
      {showConfirmation && (
        <SuccessState
          description={`Your property has been ${type}ed successfully.`}
          onClose={() => setShowConfirmation(false)}
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
      <div className="max-w-lg mx-auto p-6 align-self-center  bg-white dark:bg-primary-green-100 rounded-2xl border border-primary-green">
        <h2 className="text-2xl font-bold text-primary-green mb-6">
          {type} Property
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-green">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-transparent border border-primary-green focus:ring-primary-green focus:border-primary-green text-primary-green"
                      placeholder="Property title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description as Textarea */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-green">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // rows={4}
                      className="w-full bg-transparent border   border-primary-green focus:outline-gray-500 rounded-md p-2 text-primary-green focus:ring-primary-green focus:border-primary-green"
                      placeholder="Enter property description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-green">Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 bg-transparent border border-primary-green rounded-md text-primary-green focus:ring-primary-green focus:border-primary-green"
                      >
                        <option value="apartment">Apartment</option>
                        <option value="studio">Studio</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="pricePerNight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-green">
                      Price per Night
                    </FormLabel>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-primary-green text-sm">
                        $
                      </span>
                      <FormControl>
                        <input
                          type="number"
                          {...field}
                          className="pl-8 bg-transparent outline-primary-green  foucs:ring-0 foucs:outline-[1px] border h-[40px] border-primary-green rounded-md  text-primary-green "
                          placeholder="Enter price"
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || 0)
                          }
                        />
                        {/* <Input
                          type="number"
                          {...field}
                          className="pl-8 bg-transparent border border-primary-green rounded-md text-primary-green focus:ring-primary-green focus:border-primary-green"
                          placeholder="Enter price"
                        /> */}
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-green">Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-transparent border border-primary-green rounded-md text-primary-green focus:ring-primary-green focus:border-primary-green"
                      placeholder="Property location"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-green">
                    Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-transparent border border-primary-green rounded-md text-primary-green focus:ring-primary-green focus:border-primary-green"
                      placeholder="https://..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Available */}
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-green">
                    Available
                  </FormLabel>
                  <FormControl>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={field.value}
                      onClick={() => field.onChange(!field.value)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 transition ${
                        field.value
                          ? "bg-primary-green border-primary-green"
                          : "bg-gray-300 border-primary-green"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                          field.value ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}

            <Button
              type="submit"
              className="w-full bg-primary-green hover:bg-primary-green-200 text-white rounded-md py-2"
            >
              {submitting ? (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="h-5 w-5 animate-spin rounded-full border-1 border-white border-t-transparent"></div>
                </div>
              ) : (
                `${type} Property`
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PropertyForm;
