import { createContext, useContext, useEffect, useState } from "react";

type LoginContextType = {
  login: boolean;
  logout: () => void;
  setLogin: (value: boolean) => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [login, setLogin] = useState<boolean>(() => {
    const storedLogin = localStorage.getItem("login");
    return storedLogin === "true";
  });

  useEffect(() => {
    localStorage.setItem("login", String(login));
  }, [login]);

  const logout = () => {
    setLogin(false);
    localStorage.setItem("login", String(false));
  };

  return (
    <LoginContext.Provider value={{ login, logout, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) throw new Error("useLogin must be used within a LoginProvider");
  return context;
}
