import { useEffect, useState } from "react";
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

import { authService } from "@/services/auth";
import { useLogin } from "@/context/LoginContext";
import { useNavigate } from "react-router-dom";
import ErrorState from "@/components/ErrorState";

const Login = () => {
  const navigate = useNavigate();
  const { setLogin, login } = useLogin();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  useEffect(() => {
    if (login) navigate("/");
  }, [login]);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsSubmitting(true);
    try {
      if (values.email && values.password) {
        const response = await authService.login(values);
        if (response?.message) {
          setErrorMessage("Login Failed");
          setShowErrorMessage(true);
          setTimeout(() => {
            setShowErrorMessage(false);
          }, 2000);
        } else if (response.status === 200) {
          if (response.data.length === 1 && response.data[0].role === "admin") {
            setLogin(true);
            navigate("/");
          } else {
            setErrorMessage("Email or password are not correct");
            setShowErrorMessage(true);
            setTimeout(() => {
              setShowErrorMessage(false);
            }, 2000);
          }
        }
      }
    } catch (e: any) {
      setErrorMessage(e.errorMessage);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="dark:bg-primary-green-200">
      <title>Login</title>

      {showErrorMessage && (
        <ErrorState
          title="Login Failed"
          description={
            errorMessage || "An error occurred while processing your request."
          }
          onClose={() => setShowErrorMessage(false)}
        />
      )}
      <div className="w-full h-[100vh] row items-center flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-primary-green-200 dark:bg-primary-green-100 border-[2px] border-primary-green rounded-[20px] md:w-[50%]  w-[100%] p-[24px] md:m-[50px] m-[15px]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-green  text-xl font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="!bg-primary-green-200  h-[50px] "
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
                      className="!bg-primary-green-200 h-[50px] "
                      type="password"
                      placeholder="Enter Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full bg-primary-green text-lg h-[50px] text-white hover:bg-primary-green-200 transition-all duration-300 cursor-pointer hover:text-primary-green hover:border hover:border-primary-green"
              type="submit"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="h-5 w-5 animate-spin rounded-full border-1 border-white border-t-transparent"></div>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
