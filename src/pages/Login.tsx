import React, { useState } from "react";
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
import Navbar from "@/components/Navbar";
import { authService } from "@/services/auth";
const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsSubmitting(true);
    console.log(values);
    if (values.email && values.password) {
      const response = await authService.login(values);
      console.log(response);
      if (response.status === 200) {
        if (response.data.length === 1 && response.data[0].role === "admin") {
          console.log("login successfully");
        }
      }
    }
    setIsSubmitting(false);
  }
  return (
    <div className="dark:bg-primary-green-200">
      <Navbar />
      <div className="w-full h-[100vh] row items-center flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-primary-green-200 border-[2px] border-primary-green rounded-[20px] md:w-[50%]  w-[95%] p-[24px] m-[50px]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-green text-xl font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-primary-green-200 h-[50px] "
                      placeholder="Enter Your Email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-green text-xl font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-primary-green-200 h-[50px] "
                      type="password"
                      placeholder="Enter Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isSubmitting ? (
              <Button className="w-full bg-primary-green text-lg h-[50px] hover:bg-primary-green-200 transition-all duration-300 cursor-pointer hover:text-primary-green hover:border hover:border-primary-green">
                Loading
              </Button>
            ) : (
              <Button
                className="w-full bg-primary-green text-lg h-[50px] hover:bg-primary-green-200 transition-all duration-300 cursor-pointer hover:text-primary-green hover:border hover:border-primary-green"
                type="submit"
              >
                Login
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
